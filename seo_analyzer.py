
import requests
import socket
import ipaddress
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin


MAX_RESPONSE_SIZE = 2 * 1024 * 1024  # 2 MB
MAX_REDIRECTS = 5


def validate_public_url(url):
    """Allow only public HTTP/HTTPS website addresses."""

    parsed = urlparse(url)

    if parsed.scheme not in ("http", "https"):
        raise ValueError("Only HTTP and HTTPS URLs are allowed.")

    if not parsed.hostname:
        raise ValueError("Invalid website URL.")

    if parsed.username or parsed.password:
        raise ValueError("URLs containing credentials are not allowed.")

    hostname = parsed.hostname

    try:
        addresses = socket.getaddrinfo(hostname, None)
        for address in addresses:
            ip = ipaddress.ip_address(address[4][0])

            if not ip.is_global:
                raise ValueError("Private or internal URLs are not allowed.")

    except socket.gaierror:
        raise ValueError("Website address could not be resolved.")

    return url


def fetch_website(url):
    """Fetch HTML while checking redirects and response size."""

    session = requests.Session()
    session.trust_env = False

    try:
        for _ in range(MAX_REDIRECTS + 1):

            validate_public_url(url)

            response = session.get(
                url,
                timeout=15,
                allow_redirects=False,
                stream=True,
                headers={"User-Agent": "Mozilla/5.0 SEOAnalyzer/1.0"}
            )

            if response.is_redirect or response.is_permanent_redirect:
                location = response.headers.get("Location")
                response.close()

                if not location:
                    raise ValueError("Invalid website redirect.")

                url = urljoin(url, location)
                continue

            response.raise_for_status()

            content_type = response.headers.get("Content-Type", "").lower()

            if "text/html" not in content_type:
                response.close()
                raise ValueError("The URL does not return an HTML webpage.")

            content = bytearray()

            for chunk in response.iter_content(chunk_size=8192):
                content.extend(chunk)

                if len(content) > MAX_RESPONSE_SIZE:
                    response.close()
                    raise ValueError("Website response is too large.")

            response.close()
            return content.decode(
                response.encoding or "utf-8",
                errors="replace"
            )

        raise ValueError("Too many website redirects.")

    except requests.RequestException:
        raise ValueError(
            "Could not retrieve the webpage. Check the URL and try again."
        )

    finally:
        session.close()


def analyze_website(url):

    html = fetch_website(url)
    soup = BeautifulSoup(html, "html.parser")

    recommendations = {}

    # 1. Page title
    title_tag = soup.find("title")
    title = title_tag.get_text(strip=True) if title_tag else None

    if title:
        title_points = 20
        title_status = "pass"
        title_message = "Title found."

        if len(title) < 30 or len(title) > 60:
            recommendations["title_length"] = (
                "Review the page title length; roughly 30–60 characters is suggested."
            )
    else:
        title_points = 0
        title_status = "fail"
        title_message = "Page title is missing."
        recommendations["title"] = "Add a clear, unique page title."

    # 2. Meta description
    meta = soup.find(
        "meta",
        attrs={"name": lambda value: value and value.lower() == "description"}
    )

    description = meta.get("content", "").strip() if meta else None

    if description:
        description_points = 20
        description_status = "pass"
        description_message = "Meta description found."

        if len(description) < 120 or len(description) > 160:
            recommendations["description_length"] = (
                "Review the meta description length; roughly 120–160 characters is suggested."
            )
    else:
        description_points = 0
        description_status = "fail"
        description_message = "Meta description is missing."
        recommendations["description"] = "Add a concise page description."

    # 3. H1 headings
    h1_tags = [
        tag.get_text(" ", strip=True)
        for tag in soup.find_all("h1")
        if tag.get_text(strip=True)
    ]

    if h1_tags:
        h1_points = 20
        h1_status = "pass"
        h1_message = f"{len(h1_tags)} H1 heading(s) found."

        if len(h1_tags) > 1:
            h1_status = "warning"
            h1_message = "Multiple H1 headings found."
            recommendations["h1"] = "Review the page heading structure."
    else:
        h1_points = 0
        h1_status = "fail"
        h1_message = "H1 heading is missing."
        recommendations["h1"] = "Add a clear main heading."

    # 4. Image alt text
    images = soup.find_all("img")
    total_images = len(images)

    with_alt = sum(
        1 for image in images
        if image.has_attr("alt")
    )

    missing_alt = total_images - with_alt

    if total_images == 0:
        image_points = 20
        image_status = "not_applicable"
        image_message = "No images found."
    else:
        image_points = round(20 * with_alt / total_images)

        if missing_alt == 0:
            image_status = "pass"
            image_message = "All images have alt attributes."
        else:
            image_status = "warning"
            image_message = f"{missing_alt} images are missing alt text."
            recommendations["image_alt"] = (
                f"Add meaningful alt text to the {missing_alt} images missing it."
            )

    # 5. Links
    links = soup.find_all("a")
    total_links = len(links)

    valid_links = [
        link for link in links
        if link.get("href", "").strip()
    ]

    missing_href = total_links - len(valid_links)

    internal = 0
    external = 0

    website_domain = urlparse(url).hostname

    for link in valid_links:
        href = link["href"].strip()
        absolute_url = urljoin(url, href)
        link_domain = urlparse(absolute_url).hostname

        if link_domain == website_domain:
            internal += 1
        else:
            external += 1

    if total_links == 0:
        link_points = 20
        link_status = "not_applicable"
        link_message = "No links found."
    else:
        link_points = round(20 * len(valid_links) / total_links)

        if missing_href == 0:
            link_status = "pass"
            link_message = "All links have href values."
        else:
            link_status = "warning"
            link_message = f"{missing_href} links are missing href values."
            recommendations["links"] = (
                f"Add a valid destination to the {missing_href} links missing href."
            )

    # Final SEO score
    seo_score = (
        title_points
        + description_points
        + h1_points
        + image_points
        + link_points
    )

    # Return structured results
    return {
        "url": url,
        "seo_score": seo_score,
        "checks": {
            "title": {
                "status": title_status,
                "value": title,
                "points": title_points,
                "max_points": 20,
                "message": title_message
            },
            "meta_description": {
                "status": description_status,
                "value": description,
                "points": description_points,
                "max_points": 20,
                "message": description_message
            },
            "h1": {
                "status": h1_status,
                "value": h1_tags,
                "points": h1_points,
                "max_points": 20,
                "message": h1_message
            },
            "image_alt": {
                "status": image_status,
                "value": {
                    "total": total_images,
                    "with_alt": with_alt,
                    "missing_alt": missing_alt
                },
                "points": image_points,
                "max_points": 20,
                "message": image_message
            },
            "links": {
                "status": link_status,
                "value": {
                    "total": total_links,
                    "internal": internal,
                    "external": external,
                    "missing_href": missing_href
                },
                "points": link_points,
                "max_points": 20,
                "message": link_message
            }
        },
        "recommendations": list(recommendations.values())
    }
