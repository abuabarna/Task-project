import React from "react";

interface RadialScoreGaugeProps {
  score?: number;
  maxScore?: number;
}

const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

const describeArcPath = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
};

const describeWedge = (cx: number, cy: number, innerR: number, outerR: number, startAngle: number, endAngle: number) => {
  const innerStart = polarToCartesian(cx, cy, innerR, startAngle);
  const innerEnd = polarToCartesian(cx, cy, innerR, endAngle);
  const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerR, endAngle);
  const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
  return `
    M ${innerStart.x} ${innerStart.y}
    L ${outerStart.x} ${outerStart.y}
    A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}
    L ${innerEnd.x} ${innerEnd.y}
    A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}
    Z
  `;
};

export const RadialScoreGauge: React.FC<RadialScoreGaugeProps> = ({
  score = 550,
  maxScore = 1000,
}) => {
  const cx = 250;
  const cy = 240;
  const innerCircleRadius = 55;
  const gaugeInnerRadius = 75;
  const gaugeMaxRadius = 180;
  const START_ANGLE = -180;
  const END_ANGLE = 0;

  const segments = [
    { label: ["Software &", "Applications"], value: 528, color: "#FFA726", fill: "#FFF9E6" },
    { label: ["Networking &", "Security"], value: 998, color: "#B71C1C", fill: "#FCE4E4" },
    { label: ["Users and", "Access"], value: 198, color: "#66BB6A", fill: "#E8F5E9" },
    { label: ["Other/", "General"], value: 759, color: "#EF5350", fill: "#FFEBEE" },
  ];

  const axisTicks = [
    { val: "1000", grade: "F" }, { val: "800", grade: "D" }, { val: "600", grade: "C" },
    { val: "400", grade: "B" }, { val: "200", grade: "A" }, { val: "200", grade: "A" },
    { val: "400", grade: "B" }, { val: "600", grade: "C" }, { val: "800", grade: "D" },
    { val: "1000", grade: "F" }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-4 flex justify-center items-center bg-white">
      <div className="relative w-full" style={{ paddingBottom: "70%" }}>
        <svg
          viewBox="0 0 500 380"
          className="absolute top-0 left-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: "visible" }}
        >
          <defs>
            <radialGradient id="scoreGradient" cx="50%" cy="45%" r="50%" fx="50%" fy="30%">
              <stop offset="0%" stopColor="#FFB5AF" />
              <stop offset="50%" stopColor="#FF857B" />
              <stop offset="100%" stopColor="#FD766B" />
            </radialGradient>
            <filter id="complexShadow" x="-100%" y="-100%" width="300%" height="300%">
              <feDropShadow dx="0" dy="12" stdDeviation="15" floodColor="#FC4839" floodOpacity="0.35" />
              <feComponentTransfer in="SourceAlpha">
                <feFuncA type="table" tableValues="1 0" />
              </feComponentTransfer>
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feFlood floodColor="#FFFFFF" floodOpacity="0.4" />
              <feComposite in2="blur" operator="in" />
              <feComposite in2="SourceAlpha" operator="in" result="innerGlow" />
              <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="innerGlow" />
              </feMerge>
            </filter>
          </defs>


          {[125, 160, 195].map((r) => (
            <path
              key={r}
              d={describeArcPath(cx, cy, r, START_ANGLE, END_ANGLE)}
              fill="none"
              stroke="#F0F0F0"
              strokeDasharray="4 4"
            />
          ))}


          {segments.map((seg, i) => {
            const angleWidth = 180 / segments.length;
            const sAngle = START_ANGLE + i * angleWidth + 2;
            const eAngle = START_ANGLE + (i + 1) * angleWidth - 2;
            const midAngle = sAngle + (eAngle - sAngle) / 2;
            const currentRadius = gaugeInnerRadius + (seg.value / maxScore) * (gaugeMaxRadius - gaugeInnerRadius);
            const labelPos = polarToCartesian(cx, cy, gaugeMaxRadius + 50, midAngle);

            return (
              <g key={i}>
                <path d={describeWedge(cx, cy, gaugeInnerRadius, currentRadius, sAngle, eAngle)} fill={seg.fill} />
                <path d={describeArcPath(cx, cy, currentRadius, sAngle, eAngle)} fill="none" stroke={seg.color} strokeWidth={6} strokeLinecap="round" />

                <text x={labelPos.x} y={labelPos.y - 15} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#222">{seg.value}</text>
                <text x={labelPos.x} y={labelPos.y + 5} textAnchor="middle" fontSize="11" fill="#999" fontWeight="500">{seg.label[0]}</text>
                <text x={labelPos.x} y={labelPos.y + 18} textAnchor="middle" fontSize="11" fill="#999" fontWeight="500">{seg.label[1]}</text>
              </g>
            );
          })}


          <g transform={`translate(0, ${cy + 55})`}>
            <line x1="60" y1="0" x2="440" y2="0" stroke="#F5F5F5" strokeWidth="1" />
            {axisTicks.map((tick, i) => {
              const x = 60 + (380 / (axisTicks.length - 1)) * i;
              return (
                <g key={i}>
                  <text x={x} y={20} textAnchor="middle" fontSize="10" fill="#CCC">{tick.val}</text>
                  <text x={x} y={38} textAnchor="middle" fontSize="12" fontWeight="700" fill="#444">{tick.grade}</text>
                </g>
              );
            })}
          </g>
          <g>
            <circle cx={cx} cy={cy} r={innerCircleRadius + 22} fill="white" stroke="#F9F9F9" strokeWidth="1" />
            {segments.map((seg, i) => {
              const angleWidth = 180 / segments.length;
              return (
                <path
                  key={`r-${i}`}
                  d={describeArcPath(cx, cy, innerCircleRadius + 14, START_ANGLE + i * angleWidth + 5, START_ANGLE + (i + 1) * angleWidth - 5)}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={5}
                  strokeLinecap="round"
                />
              );
            })}
            <circle
              cx={cx}
              cy={cy}
              r={innerCircleRadius}
              fill="url(#scoreGradient)"
              filter="url(#complexShadow)"
            />
            <text x={cx} y={cy - 12} textAnchor="middle" fontSize="28" fontWeight="bold" fill="#1A1A1A">C</text>
            <text x={cx} y={cy + 30} textAnchor="middle" fontSize="40" fontWeight="900" fill="#1A1A1A">{score}</text>
            <path
              d={`M ${cx + 40} ${cy - 8} L ${cx + 52} ${cy} L ${cx + 40} ${cy + 8} Z`}
              fill="white"
              transform={`rotate(${(score / maxScore) * 180 - 180}, ${cx}, ${cy})`}
              style={{ transition: 'transform 1s ease-out' }}
            />
          </g>
        </svg>
      </div>
    </div>
  );
};