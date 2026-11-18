import React from 'react';

export default function ScoreGauge({ score = 75, grade = 'B', size = 88, strokeWidth = 8 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeScore = Math.max(0, Math.min(100, score));
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  const getColor = (s) => {
    if (s >= 85) return '#10b981'; // Green
    if (s >= 70) return '#0284c7'; // Blue
    if (s >= 55) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  const currentColor = getColor(safeScore);

  return (
    <div className="score-circle-wrapper" style={{ width: size, height: size }}>
      <svg className="score-circle-svg" viewBox={`0 0 ${size} ${size}`}>
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={currentColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div className="score-circle-text">
        <span className="score-circle-number" style={{ color: currentColor }}>
          {safeScore}
        </span>
        <span className="score-circle-grade">Grade {grade}</span>
      </div>
    </div>
  );
}
