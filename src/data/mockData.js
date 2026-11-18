// Mock Data & Rule-Based Engine Simulator for AI-Powered SEO Optimization Platform
// Initial analysis uses rule-based SEO evaluation metrics.
// Pre-configured for seamless integration with Python FastAPI backend.

export const SAMPLE_WEBSITES = [
  {
    id: "site-1",
    url: "https://mytechstore.io",
    domain: "mytechstore.io",
    overallScore: 78,
    grade: "B+",
    status: "Completed",
    auditedAt: "Today, 14:32",
    totalIssues: 8,
    criticalIssues: 3,
    warningIssues: 5,
    passedChecks: 21,
    failedChecks: 7,
    totalChecks: 28,
    pageTitle: {
      value: "MyTechStore - Premium Developer Hardware, Keyboards & Ergonomic Accessories",
      length: 73,
      recommendedMin: 50,
      recommendedMax: 60,
      status: "warning",
      message: "Title tag is 73 characters. Recommended max is 60 characters to prevent truncation in search result snippets."
    },
    metaDescription: {
      value: "Shop developer-tested mechanical keyboards, ergonomic vertical mice, and high-performance monitors with 2-day delivery across North America.",
      length: 141,
      recommendedMin: 120,
      recommendedMax: 160,
      status: "passed",
      message: "Optimal length (141 chars). Well within Google's recommended range of 120-160 characters."
    },
    h1: {
      value: "Next-Gen Workstation Gear for Modern Software Engineers",
      count: 1,
      status: "passed",
      message: "Single H1 tag detected with strong contextual keywords.",
      hierarchy: { h1: 1, h2: 6, h3: 14, h4: 2 }
    },
    imageAlt: {
      total: 18,
      withAlt: 13,
      missingAlt: 5,
      status: "failed",
      message: "5 images are missing alt attributes, impacting search engine indexing and visual accessibility.",
      missingList: [
        { id: "img-1", src: "/assets/products/split-mechanical-keyboard.png", tag: "<img>", suggestedAlt: "Ergonomic split mechanical keyboard with RGB backlighting" },
        { id: "img-2", src: "/assets/banners/spring-sale-hero.webp", tag: "<img>", suggestedAlt: "Spring hardware sale promotional banner 20% off" },
        { id: "img-3", src: "/assets/icons/security-badge-ssl.svg", tag: "<img>", suggestedAlt: "256-bit SSL encrypted checkout trust badge" },
        { id: "img-4", src: "/assets/reviews/customer-avatar-david.jpg", tag: "<img>", suggestedAlt: "Verified customer testimonial avatar for David K." },
        { id: "img-5", src: "/assets/footer/payment-options-row.png", tag: "<img>", suggestedAlt: "Accepted payment methods: Stripe, Apple Pay, Visa, Mastercard" }
      ]
    },
    links: {
      total: 48,
      internal: 39,
      external: 9,
      broken: 0,
      status: "passed",
      message: "Healthy ratio of internal to external links. No broken 404 links detected.",
      sampleInternal: ["/products/keyboards", "/products/monitors", "/blog/ergonomic-desk-setup", "/shipping-policy", "/about-us"],
      sampleExternal: ["https://github.com/mytechstore", "https://twitter.com/mytechstore", "https://stripe.com"]
    },
    crawlDetails: {
      loadTime: "420ms",
      responseCode: 200,
      canonicalUrl: "https://mytechstore.io/",
      canonicalMatch: true,
      robotsTxt: "Permissive (Allow: /)",
      sitemapFound: true,
      sitemapUrl: "https://mytechstore.io/sitemap.xml",
      mobileViewport: true,
      sslSecure: true,
      charset: "UTF-8",
      openGraph: { configured: true, title: true, image: true, desc: true },
      twitterCards: { configured: false }
    },
    checks: [
      { id: "c1", category: "Meta Tags", name: "Page Title Tag Present", status: "passed", score: 10, details: "Title tag is present in document head." },
      { id: "c2", category: "Meta Tags", name: "Page Title Length (50-60 chars)", status: "warning", score: 6, details: "Title is 73 characters long (recommended max: 60)." },
      { id: "c3", category: "Meta Tags", name: "Meta Description Present & Length", status: "passed", score: 10, details: "141 characters (ideal range: 120-160 characters)." },
      { id: "c4", category: "Meta Tags", name: "Open Graph Social Meta Tags", status: "passed", score: 10, details: "og:title, og:image, and og:description found." },
      { id: "c5", category: "Meta Tags", name: "Twitter Summary Card Tags", status: "failed", score: 0, details: "twitter:card and twitter:site meta tags are missing." },
      { id: "c6", category: "Content & Structure", name: "Single H1 Heading", status: "passed", score: 10, details: "Exactly 1 H1 heading tag found." },
      { id: "c7", category: "Content & Structure", name: "Logical Heading Hierarchy", status: "passed", score: 10, details: "H1, H2, and H3 tags follow sequential order." },
      { id: "c8", category: "Content & Structure", name: "Text-to-HTML Ratio (> 15%)", status: "warning", score: 6, details: "Text ratio is 14.1%. Recommended is above 15%." },
      { id: "c9", category: "Content & Structure", name: "Keyword in Title & H1", status: "passed", score: 10, details: "Contextual keywords match between title and H1." },
      { id: "c10", category: "Accessibility & Media", name: "Image Alt Text Coverage", status: "failed", score: 2, details: "5 out of 18 images do not have alt text attributes." },
      { id: "c11", category: "Accessibility & Media", name: "Responsive Image Sizing", status: "passed", score: 10, details: "All images include width and height attributes." },
      { id: "c12", category: "Links & Crawlability", name: "Internal Linking Structure", status: "passed", score: 10, details: "39 internal links provide strong site connectivity." },
      { id: "c13", category: "Links & Crawlability", name: "Broken Link Scanner", status: "passed", score: 10, details: "Zero broken (4xx/5xx) anchor links identified." },
      { id: "c14", category: "Links & Crawlability", name: "Descriptive Anchor Texts", status: "warning", score: 6, details: "3 links use generic anchor text like 'Click Here' or 'Read More'." },
      { id: "c15", category: "Technical & Indexing", name: "Self-Referencing Canonical Tag", status: "passed", score: 10, details: "Canonical tag matches current request URL." },
      { id: "c16", category: "Technical & Indexing", name: "Robots.txt Availability", status: "passed", score: 10, details: "Valid robots.txt file returned HTTP 200." },
      { id: "c17", category: "Technical & Indexing", name: "XML Sitemap Declaration", status: "passed", score: 10, details: "sitemap.xml referenced in robots.txt." },
      { id: "c18", category: "Technical & Indexing", name: "SSL / HTTPS Protocol", status: "passed", score: 10, details: "Site is served securely over HTTPS with TLS 1.3." },
      { id: "c19", category: "Technical & Indexing", name: "Mobile Viewport Configuration", status: "passed", score: 10, details: "Viewport meta tag configured with width=device-width." },
      { id: "c20", category: "Technical & Indexing", name: "Schema.org Structured Data", status: "failed", score: 0, details: "No JSON-LD or Microdata structured schemas found." },
      { id: "c21", category: "Performance & UX", name: "Document UTF-8 Charset", status: "passed", score: 10, details: "Charset declared within first 1024 bytes of HTML." },
      { id: "c22", category: "Performance & UX", name: "Render-Blocking Stylesheets", status: "warning", score: 5, details: "2 non-critical external fonts lack asynchronous loading." },
      { id: "c23", category: "Performance & UX", name: "Compression Enabled", status: "passed", score: 10, details: "Server delivers static assets with Brotli compression." },
      { id: "c24", category: "Performance & UX", name: "Favicon Configured", status: "passed", score: 10, details: "Modern SVG favicon found in HTML header." },
      { id: "c25", category: "Code Quality", name: "No Obsolete HTML Tags", status: "passed", score: 10, details: "No deprecated tags (<font>, <center>, <marquee>) used." },
      { id: "c26", category: "Code Quality", name: "Inline CSS Styles Limit", status: "warning", score: 6, details: "24 inline style attributes detected in body elements." },
      { id: "c27", category: "Code Quality", name: "Lang Attribute on HTML", status: "passed", score: 10, details: "<html lang='en'> explicitly defined." },
      { id: "c28", category: "Code Quality", name: "Clean URL Permalinks", status: "passed", score: 10, details: "No ugly query parameters or extensions in main routes." }
    ],
    recommendations: [
      {
        id: "rec-1",
        title: "Add Missing Alt Attributes to 5 Flagged Images",
        severity: "high",
        category: "Accessibility & Media",
        impact: "High Impact: Directly improves search engine image indexing and accessibility compliance (WCAG 2.1).",
        problem: "5 image elements are missing the 'alt' attribute or have it completely empty. Search crawlers cannot decipher image contents without text cues.",
        solution: "Add descriptive, concise alternative text to each image tag explaining what the image depicts.",
        codeSnippet: `<!-- Before (Flagged): -->
<img src="/assets/products/split-mechanical-keyboard.png">

<!-- Recommended Fix: -->
<img 
  src="/assets/products/split-mechanical-keyboard.png" 
  alt="Ergonomic split mechanical keyboard with customizable RGB backlighting"
  loading="lazy"
>`
      },
      {
        id: "rec-2",
        title: "Implement Schema.org Structured Data (JSON-LD)",
        severity: "high",
        category: "Technical & Indexing",
        impact: "High Impact: Enables rich snippets, star ratings, price tags, and brand badges in Google search results.",
        problem: "No JSON-LD structured data detected on the page. Search engines cannot generate enhanced rich snippets without schema.",
        solution: "Insert a JSON-LD structured data script inside the <head> block for Organization and WebSite schemas.",
        codeSnippet: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  "name": "MyTechStore",
  "url": "https://mytechstore.io",
  "description": "Premium developer hardware and ergonomic gear",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://mytechstore.io/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>`
      },
      {
        id: "rec-3",
        title: "Shorten Page Title Tag to 50-60 Characters",
        severity: "medium",
        category: "Meta Tags",
        impact: "Medium Impact: Eliminates Google search snippet truncation and improves click-through rate (CTR).",
        problem: "Current title is 73 characters. Search engines typically truncate titles over 60 characters with '...'",
        solution: "Keep high-value primary keywords and brand name while trimming redundant words.",
        codeSnippet: `<!-- Current Title (73 Chars - Truncated in SERP): -->
<title>MyTechStore - Premium Developer Hardware, Keyboards & Ergonomic Accessories</title>

<!-- Recommended Title (52 Chars - Full Visibility): -->
<title>MyTechStore | Developer Keyboards & Ergonomic Gear</title>`
      },
      {
        id: "rec-4",
        title: "Add Twitter Card Social Metadata",
        severity: "medium",
        category: "Meta Tags",
        impact: "Medium Impact: Guarantees attractive, clickable preview cards when URLs are shared on X (Twitter).",
        problem: "Twitter card meta tags (twitter:card, twitter:title, twitter:image) are completely absent.",
        solution: "Add standard summary_large_image Twitter card tags to the <head> element.",
        codeSnippet: `<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="MyTechStore | Workstation Gear">
<meta name="twitter:description" content="Shop ergonomic mechanical keyboards and modern developer accessories.">
<meta name="twitter:image" content="https://mytechstore.io/assets/social-card.jpg">`
      },
      {
        id: "rec-5",
        title: "Replace Generic Anchor Texts with Descriptive Phrases",
        severity: "medium",
        category: "Links & Crawlability",
        impact: "Medium Impact: Strengthens contextual link juice and aids screen reader navigation.",
        problem: "3 internal links use ambiguous anchor text phrases like 'Click Here' and 'Read More'.",
        solution: "Use keyword-rich descriptive anchor copy that describes the destination page.",
        codeSnippet: `<!-- Before: -->
<a href="/blog/ergonomic-desk-setup">Read More</a>

<!-- After (Recommended): -->
<a href="/blog/ergonomic-desk-setup">Read our comprehensive ergonomic desk setup guide</a>`
      },
      {
        id: "rec-6",
        title: "Extract Inline CSS Styles to Utility Classes",
        severity: "low",
        category: "Code Quality",
        impact: "Low Impact: Cleaner HTML structure and reduced overall page weight.",
        problem: "24 elements use inline style=\"...\" attributes, bloating document markup.",
        solution: "Migrate styling rules into dedicated CSS stylesheet classes or Tailwind utilities.",
        codeSnippet: `<!-- Before: -->
<div style="margin-top: 24px; padding: 16px; border-radius: 8px;">

<!-- After: -->
<div class="card-callout">`
      }
    ]
  },
  {
    id: "site-2",
    url: "https://fintechflow.dev",
    domain: "fintechflow.dev",
    overallScore: 92,
    grade: "A",
    status: "Completed",
    auditedAt: "Today, 11:15",
    totalIssues: 3,
    criticalIssues: 0,
    warningIssues: 3,
    passedChecks: 25,
    failedChecks: 0,
    totalChecks: 28,
    pageTitle: {
      value: "FinTechFlow | Modern Automated Payment Infrastructure",
      length: 53,
      recommendedMin: 50,
      recommendedMax: 60,
      status: "passed",
      message: "Optimal title length (53 characters). Clean brand and keyword balance."
    },
    metaDescription: {
      value: "Enterprise API-first payment orchestration and automated treasury reconciliation for high-growth SaaS companies.",
      length: 115,
      recommendedMin: 120,
      recommendedMax: 160,
      status: "warning",
      message: "Slightly shorter than ideal (115 chars). Consider adding a targeted call-to-action."
    },
    h1: {
      value: "Unified Financial Infrastructure for Global Commerce",
      count: 1,
      status: "passed",
      message: "Strong H1 heading tag configured.",
      hierarchy: { h1: 1, h2: 4, h3: 8, h4: 0 }
    },
    imageAlt: {
      total: 12,
      withAlt: 12,
      missingAlt: 0,
      status: "passed",
      message: "100% of image elements have descriptive alternative text.",
      missingList: []
    },
    links: {
      total: 34,
      internal: 28,
      external: 6,
      broken: 0,
      status: "passed",
      message: "Properly structured internal site graph.",
      sampleInternal: ["/docs", "/pricing", "/security", "/enterprise"],
      sampleExternal: ["https://status.fintechflow.dev", "https://github.com/fintechflow"]
    },
    crawlDetails: {
      loadTime: "280ms",
      responseCode: 200,
      canonicalUrl: "https://fintechflow.dev/",
      canonicalMatch: true,
      robotsTxt: "Permissive (Allow: /)",
      sitemapFound: true,
      sitemapUrl: "https://fintechflow.dev/sitemap.xml",
      mobileViewport: true,
      sslSecure: true,
      charset: "UTF-8",
      openGraph: { configured: true, title: true, image: true, desc: true },
      twitterCards: { configured: true }
    },
    checks: [
      { id: "c1", category: "Meta Tags", name: "Page Title Tag Present", status: "passed", score: 10, details: "Title tag is present and well formatted." },
      { id: "c2", category: "Meta Tags", name: "Page Title Length (50-60 chars)", status: "passed", score: 10, details: "53 characters (Optimal)." },
      { id: "c3", category: "Meta Tags", name: "Meta Description Present & Length", status: "warning", score: 8, details: "115 characters (Recommended: 120-160)." },
      { id: "c4", category: "Accessibility & Media", name: "Image Alt Text Coverage", status: "passed", score: 10, details: "All 12 images contain valid alt text." },
      { id: "c5", category: "Content & Structure", name: "Single H1 Heading", status: "passed", score: 10, details: "Single focused H1 detected." }
    ],
    recommendations: [
      {
        id: "rec-201",
        title: "Expand Meta Description to 130-155 Characters",
        severity: "medium",
        category: "Meta Tags",
        impact: "Medium Impact: Maximize SERP real estate and include clear conversion call-to-action.",
        problem: "Current description is 115 characters, leaving 35-45 characters of unused visibility.",
        solution: "Add benefits and an invitation like 'Get started in under 5 minutes.'",
        codeSnippet: `<meta name="description" content="Enterprise API-first payment orchestration and automated treasury reconciliation for high-growth SaaS. Start free in under 5 minutes.">`
      }
    ]
  },
  {
    id: "site-3",
    url: "https://freshorganicbites.com",
    domain: "freshorganicbites.com",
    overallScore: 54,
    grade: "F",
    status: "Completed",
    auditedAt: "Yesterday, 19:40",
    totalIssues: 13,
    criticalIssues: 6,
    warningIssues: 7,
    passedChecks: 15,
    failedChecks: 13,
    totalChecks: 28,
    pageTitle: {
      value: "Home",
      length: 4,
      recommendedMin: 50,
      recommendedMax: 60,
      status: "failed",
      message: "Extremely short title ('Home'). Does not include brand name or ranking keywords."
    },
    metaDescription: {
      value: "",
      length: 0,
      recommendedMin: 120,
      recommendedMax: 160,
      status: "failed",
      message: "Meta description is missing completely. Search engines will pull arbitrary text."
    },
    h1: {
      value: "Welcome to Our Website",
      count: 3,
      status: "failed",
      message: "3 duplicate H1 tags detected! Pages must have exactly 1 primary H1 heading.",
      hierarchy: { h1: 3, h2: 0, h3: 5, h4: 0 }
    },
    imageAlt: {
      total: 24,
      withAlt: 8,
      missingAlt: 16,
      status: "failed",
      message: "16 images lack alternative text attributes.",
      missingList: [
        { id: "img-301", src: "/images/hero-salad.jpg", tag: "<img>", suggestedAlt: "Fresh farm-to-table organic vegetable bowl" },
        { id: "img-302", src: "/images/juice-detox.jpg", tag: "<img>", suggestedAlt: "Cold-pressed organic green detox juices" }
      ]
    },
    links: {
      total: 19,
      internal: 14,
      external: 5,
      broken: 2,
      status: "failed",
      message: "2 broken internal links found leading to 404 pages.",
      sampleInternal: ["/about", "/menu", "/locations", "/old-promo (404)"],
      sampleExternal: ["https://instagram.com/organicbites"]
    },
    crawlDetails: {
      loadTime: "1120ms",
      responseCode: 200,
      canonicalUrl: "",
      canonicalMatch: false,
      robotsTxt: "Missing (404)",
      sitemapFound: false,
      sitemapUrl: "",
      mobileViewport: true,
      sslSecure: true,
      charset: "UTF-8",
      openGraph: { configured: false },
      twitterCards: { configured: false }
    },
    checks: [
      { id: "c1", category: "Meta Tags", name: "Page Title Tag Present", status: "passed", score: 10, details: "Title tag exists." },
      { id: "c2", category: "Meta Tags", name: "Page Title Length (50-60 chars)", status: "failed", score: 0, details: "Only 4 characters ('Home')." },
      { id: "c3", category: "Meta Tags", name: "Meta Description Present", status: "failed", score: 0, details: "Meta description tag is missing." },
      { id: "c4", category: "Content & Structure", name: "Single H1 Tag Rule", status: "failed", score: 0, details: "Found 3 separate H1 elements on the page." },
      { id: "c5", category: "Accessibility & Media", name: "Image Alt Text Attributes", status: "failed", score: 0, details: "16 images missing alt tags." },
      { id: "c6", category: "Technical & Indexing", name: "Robots.txt & Sitemap", status: "failed", score: 0, details: "Both robots.txt and XML sitemap are missing." }
    ],
    recommendations: [
      {
        id: "rec-301",
        title: "Replace Generic 'Home' Title with Descriptive Keywords",
        severity: "high",
        category: "Meta Tags",
        impact: "Critical: The title tag is the #1 on-page SEO signal.",
        problem: "The title tag is currently just 'Home' (4 chars).",
        solution: "Rewrite to reflect the business name and core offerings.",
        codeSnippet: `<title>Fresh Organic Bites | Farm-to-Table Meals & Healthy Catering</title>`
      },
      {
        id: "rec-302",
        title: "Resolve Multiple H1 Tags to a Single Unique H1",
        severity: "high",
        category: "Content & Structure",
        impact: "Critical: Multiple H1s dilute topical clarity.",
        problem: "3 H1 tags were discovered on this page.",
        solution: "Keep one master H1 and convert subsidiary headings into H2 or H3 tags.",
        codeSnippet: `<!-- Keep single H1: -->
<h1>Fresh Organic Meals Delivered to Your Doorstep</h1>

<!-- Convert other H1s to H2: -->
<h2>Our Organic Farms & Sustainable Sourcing</h2>`
      }
    ]
  },
  {
    id: "site-4",
    url: "https://saasmetrics-hq.io",
    domain: "saasmetrics-hq.io",
    overallScore: 88,
    grade: "A-",
    status: "Completed",
    auditedAt: "Nov 14, 16:05",
    totalIssues: 4,
    criticalIssues: 1,
    warningIssues: 3,
    passedChecks: 24,
    failedChecks: 4,
    totalChecks: 28,
    pageTitle: {
      value: "SaaSMetrics HQ - Real-Time ARR & Churn Analytics Dashboard",
      length: 59,
      recommendedMin: 50,
      recommendedMax: 60,
      status: "passed",
      message: "Perfect length (59 chars) containing target high-intent keywords."
    },
    metaDescription: {
      value: "Monitor MRR, expansion revenue, cohort retention, and churn in one unified dashboard. Integrates with Stripe in under 2 minutes.",
      length: 129,
      recommendedMin: 120,
      recommendedMax: 160,
      status: "passed",
      message: "Optimal length (129 chars) with high clarity."
    },
    h1: {
      value: "The Financial Source of Truth for Modern SaaS Founders",
      count: 1,
      status: "passed",
      message: "Single semantic H1 tag verified.",
      hierarchy: { h1: 1, h2: 5, h3: 11, h4: 0 }
    },
    imageAlt: {
      total: 15,
      withAlt: 14,
      missingAlt: 1,
      status: "warning",
      message: "Only 1 image missing alt tag.",
      missingList: [
        { id: "img-401", src: "/static/charts/cohort-preview.png", tag: "<img>", suggestedAlt: "Customer retention cohort matrix visualization chart" }
      ]
    },
    links: {
      total: 42,
      internal: 36,
      external: 6,
      broken: 0,
      status: "passed",
      message: "Flawless internal routing structure.",
      sampleInternal: ["/pricing", "/features/mrr-tracking", "/integrations/stripe", "/security"],
      sampleExternal: ["https://docs.saasmetrics-hq.io"]
    },
    crawlDetails: {
      loadTime: "310ms",
      responseCode: 200,
      canonicalUrl: "https://saasmetrics-hq.io/",
      canonicalMatch: true,
      robotsTxt: "Permissive (Allow: /)",
      sitemapFound: true,
      sitemapUrl: "https://saasmetrics-hq.io/sitemap.xml",
      mobileViewport: true,
      sslSecure: true,
      charset: "UTF-8",
      openGraph: { configured: true, title: true, image: true, desc: true },
      twitterCards: { configured: true }
    },
    checks: [
      { id: "c1", category: "Meta Tags", name: "Page Title Tag Present", status: "passed", score: 10, details: "Clean title tag." },
      { id: "c2", category: "Meta Tags", name: "Page Title Length", status: "passed", score: 10, details: "59 characters." },
      { id: "c3", category: "Content & Structure", name: "H1 Tag Status", status: "passed", score: 10, details: "Clear semantic H1." }
    ],
    recommendations: [
      {
        id: "rec-401",
        title: "Add Descriptive Alt Tag to Cohort Chart Graphic",
        severity: "medium",
        category: "Accessibility & Media",
        impact: "Medium: Fixes the single missing alt tag across the entire site.",
        problem: "1 graphic in feature highlights section lacks alternative description.",
        solution: "Add alt='Customer retention cohort matrix chart' to the image.",
        codeSnippet: `<img src="/static/charts/cohort-preview.png" alt="Customer retention cohort matrix chart" />`
      }
    ]
  }
];

// Dynamic mock generator for arbitrary user URLs
export function generateMockAudit(rawUrl) {
  let cleanUrl = rawUrl.trim();
  if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
    cleanUrl = "https://" + cleanUrl;
  }

  let domain = "target-website.com";
  try {
    const parsed = new URL(cleanUrl);
    domain = parsed.hostname;
  } catch {
    domain = cleanUrl.replace(/^https?:\/\//, "").split("/")[0] || "target-website.com";
  }

  // Generate deterministic variations based on domain name hash
  const hash = domain.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const scoreBase = 65 + (hash % 28); // Score between 65 and 92
  const score = Math.min(94, Math.max(58, scoreBase));

  const totalChecks = 28;
  const failedChecks = score < 70 ? 7 : score < 85 ? 4 : 2;
  const warningChecks = score < 75 ? 6 : score < 85 ? 4 : 3;
  const passedChecks = totalChecks - failedChecks - warningChecks;
  const totalIssues = failedChecks + warningChecks;

  const capitalizedName = domain
    .replace(/^www\./, "")
    .split(".")[0]
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const hasLongTitle = hash % 2 === 0;
  const titleText = hasLongTitle
    ? `${capitalizedName} - Comprehensive Platform Solutions, Fast Services, and Modern Tools for Teams Worldwide`
    : `${capitalizedName} | Official Website & Modern Solutions`;

  const metaDescText = `Explore ${capitalizedName} for cutting-edge online solutions, seamless integrations, and modern services designed to accelerate your growth.`;

  const missingAltCount = (hash % 6) + 1;
  const totalImages = 14 + (hash % 15);

  const sampleMissingList = [
    { id: "img-gen-1", src: `/assets/media/${domain.replace(/\./g, "-")}-banner.webp`, tag: "<img>", suggestedAlt: `${capitalizedName} main hero banner graphic` },
    { id: "img-gen-2", src: "/assets/icons/feature-highlight.svg", tag: "<img>", suggestedAlt: `Key feature illustration for ${capitalizedName}` },
    { id: "img-gen-3", src: "/assets/team/founder-portrait.jpg", tag: "<img>", suggestedAlt: `Founder and team member photo` }
  ].slice(0, Math.min(3, missingAltCount));

  return {
    id: `scan-${Date.now()}`,
    url: cleanUrl,
    domain: domain,
    overallScore: score,
    grade: score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F",
    status: "Completed",
    auditedAt: "Just now",
    totalIssues: totalIssues,
    criticalIssues: failedChecks,
    warningIssues: warningChecks,
    passedChecks: passedChecks,
    failedChecks: failedChecks,
    totalChecks: totalChecks,
    pageTitle: {
      value: titleText,
      length: titleText.length,
      recommendedMin: 50,
      recommendedMax: 60,
      status: hasLongTitle ? "warning" : "passed",
      message: hasLongTitle
        ? `Title tag is ${titleText.length} characters. Recommended length is 50-60 characters to avoid SERP cutoff.`
        : `Title tag length (${titleText.length} chars) is well balanced.`
    },
    metaDescription: {
      value: metaDescText,
      length: metaDescText.length,
      recommendedMin: 120,
      recommendedMax: 160,
      status: metaDescText.length >= 120 && metaDescText.length <= 160 ? "passed" : "warning",
      message: `Meta description is ${metaDescText.length} characters (Recommended: 120-160 characters).`
    },
    h1: {
      value: `Welcome to ${capitalizedName} Platform`,
      count: 1,
      status: "passed",
      message: "Single clear H1 heading found at top level of DOM hierarchy.",
      hierarchy: { h1: 1, h2: 4, h3: 9, h4: 1 }
    },
    imageAlt: {
      total: totalImages,
      withAlt: totalImages - missingAltCount,
      missingAlt: missingAltCount,
      status: missingAltCount > 0 ? "failed" : "passed",
      message: missingAltCount > 0
        ? `${missingAltCount} out of ${totalImages} images do not have descriptive alt attributes.`
        : "All images include valid alt attributes.",
      missingList: sampleMissingList
    },
    links: {
      total: 35 + (hash % 20),
      internal: 28 + (hash % 15),
      external: 7 + (hash % 5),
      broken: 0,
      status: "passed",
      message: "Link hierarchy is healthy with active internal anchor pathways.",
      sampleInternal: ["/about", "/features", "/contact", "/pricing", "/blog"],
      sampleExternal: ["https://x.com", "https://linkedin.com"]
    },
    crawlDetails: {
      loadTime: `${260 + (hash % 220)}ms`,
      responseCode: 200,
      canonicalUrl: cleanUrl,
      canonicalMatch: true,
      robotsTxt: "Permissive (Allow: /)",
      sitemapFound: true,
      sitemapUrl: `${cleanUrl.replace(/\/$/, "")}/sitemap.xml`,
      mobileViewport: true,
      sslSecure: cleanUrl.startsWith("https://"),
      charset: "UTF-8",
      openGraph: { configured: true, title: true, image: true, desc: true },
      twitterCards: { configured: score > 75 }
    },
    checks: [
      { id: "g1", category: "Meta Tags", name: "Page Title Tag Present", status: "passed", score: 10, details: "Found <title> tag in <head>." },
      { id: "g2", category: "Meta Tags", name: "Page Title Length (50-60 chars)", status: hasLongTitle ? "warning" : "passed", score: hasLongTitle ? 6 : 10, details: `${titleText.length} characters.` },
      { id: "g3", category: "Meta Tags", name: "Meta Description Present & Length", status: "passed", score: 10, details: `${metaDescText.length} characters.` },
      { id: "g4", category: "Meta Tags", name: "Open Graph Tags Present", status: "passed", score: 10, details: "Social graph tags configured for Facebook and LinkedIn." },
      { id: "g5", category: "Meta Tags", name: "Twitter Card Tags", status: score > 75 ? "passed" : "failed", score: score > 75 ? 10 : 0, details: score > 75 ? "Twitter summary card active." : "Missing twitter:card and twitter:title." },
      { id: "g6", category: "Content & Structure", name: "Single H1 Heading Tag", status: "passed", score: 10, details: "1 main H1 detected." },
      { id: "g7", category: "Content & Structure", name: "Heading Hierarchy", status: "passed", score: 10, details: "H1, H2, and H3 tags are logically nested." },
      { id: "g8", category: "Content & Structure", name: "Text-to-HTML Ratio", status: score > 75 ? "passed" : "warning", score: score > 75 ? 10 : 6, details: "Text ratio is evaluated against page markup." },
      { id: "g9", category: "Accessibility & Media", name: "Image Alt Text Coverage", status: missingAltCount > 0 ? "failed" : "passed", score: missingAltCount > 0 ? 2 : 10, details: `${missingAltCount} images lack alt attributes.` },
      { id: "g10", category: "Links & Crawlability", name: "Internal Linking Ratio", status: "passed", score: 10, details: "Adequate internal link distribution." },
      { id: "g11", category: "Links & Crawlability", name: "Broken Link Checks", status: "passed", score: 10, details: "Zero broken hyperlinks encountered." },
      { id: "g12", category: "Technical & Indexing", name: "Canonical URL Declaration", status: "passed", score: 10, details: "Self-referential canonical tag is configured." },
      { id: "g13", category: "Technical & Indexing", name: "Robots.txt Directive", status: "passed", score: 10, details: "Crawler robots directives are accessible." },
      { id: "g14", category: "Technical & Indexing", name: "XML Sitemap Presence", status: "passed", score: 10, details: "Sitemap discovered and valid." },
      { id: "g15", category: "Technical & Indexing", name: "HTTPS / SSL Security", status: cleanUrl.startsWith("https://") ? "passed" : "failed", score: cleanUrl.startsWith("https://") ? 10 : 0, details: cleanUrl.startsWith("https://") ? "Valid SSL connection." : "Insecure HTTP protocol." },
      { id: "g16", category: "Technical & Indexing", name: "Mobile Viewport Meta Tag", status: "passed", score: 10, details: "<meta name='viewport' content='width=device-width, initial-scale=1'>" },
      { id: "g17", category: "Technical & Indexing", name: "Schema.org Structured Data", status: score > 80 ? "passed" : "failed", score: score > 80 ? 10 : 0, details: score > 80 ? "WebSite schema found." : "No structured JSON-LD data found." },
      { id: "g18", category: "Performance & UX", name: "UTF-8 Character Encoding", status: "passed", score: 10, details: "UTF-8 declared in document head." },
      { id: "g19", category: "Performance & UX", name: "Asset Compression", status: "passed", score: 10, details: "Assets served with modern compression." }
    ],
    recommendations: [
      ...(missingAltCount > 0
        ? [
            {
              id: "rec-gen-alt",
              title: `Add Alt Attributes to ${missingAltCount} Images`,
              severity: "high",
              category: "Accessibility & Media",
              impact: "High Impact: Improves Google Image Search discovery and accessibility compliance.",
              problem: `${missingAltCount} images on ${domain} do not have alt tags specified.`,
              solution: "Add succinct, descriptive alternative text describing the content or function of each image.",
              codeSnippet: `<img src="${sampleMissingList[0]?.src || "/image.jpg"}" alt="${sampleMissingList[0]?.suggestedAlt || "Descriptive keyword-rich label"}">`
            }
          ]
        : []),
      ...(hasLongTitle
        ? [
            {
              id: "rec-gen-title",
              title: "Shorten Page Title Tag to 50-60 Characters",
              severity: "medium",
              category: "Meta Tags",
              impact: "Medium Impact: Eliminates Google search snippet truncation.",
              problem: `Current title is ${titleText.length} characters long, which Google typically cuts off in desktop and mobile results.`,
              solution: "Condense title text to 55 characters while preserving brand name and primary keywords.",
              codeSnippet: `<title>${capitalizedName} | Official Platform Solutions</title>`
            }
          ]
        : []),
      {
        id: "rec-gen-schema",
        title: "Embed Schema.org Structured Data (JSON-LD)",
        severity: score < 80 ? "high" : "medium",
        category: "Technical & Indexing",
        impact: "High Impact: Qualifies page for enhanced Google SERP rich cards.",
        problem: `No WebSite or Organization schema markup detected on ${domain}.`,
        solution: "Add standard JSON-LD structured script in HTML <head>.",
        codeSnippet: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "${capitalizedName}",
  "url": "${cleanUrl}"
}
</script>`
      },
      {
        id: "rec-gen-links",
        title: "Optimize Contextual Internal Anchor Texts",
        severity: "low",
        category: "Links & Crawlability",
        impact: "Low Impact: Strengthens topical authority across topic clusters.",
        problem: "Ensure internal navigation links provide descriptive context for destination URLs.",
        solution: "Use descriptive anchor keywords instead of generic terms like 'click here' or 'more'."
      }
    ]
  };
}
