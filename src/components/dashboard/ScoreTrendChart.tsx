interface ScoreTrendChartProps {
  data?: number[];
}

export const ScoreTrendChart = ({
  data = [52, 40, 45, 48, 58, 45, 54, 56, 65, 65],
}: ScoreTrendChartProps) => {
  const width = 370;
  const height = 100;
  const paddingX = 5;
  const paddingY = 10;
  const labelAreaWidth = 25;

  const minVal = 0;
  const maxVal = 80;
  const range = maxVal - minVal || 1;

  const chartWidth = width - labelAreaWidth - paddingX * 2;

  const points = data.map((val, i) => {
    const x =
      labelAreaWidth +
      paddingX +
      (i / (data.length - 1)) * chartWidth;
    const y =
      height -
      paddingY -
      ((val - minVal) / range) * (height - 2 * paddingY);
    return { x, y, val };
  });

  const pathD = points
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`
    )
    .join(" ");

  const areaPathD = `${pathD} L ${points[
    points.length - 1
  ].x.toFixed(2)} ${height} L ${points[0].x.toFixed(2)} ${height} Z`;

  const chartColor = "#0ea5e9";

  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="relative">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="overflow-visible max-w-full h-24 sm:h-28 md:h-32"
        >
          <defs>
            <linearGradient
              id="score-trend-gradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={chartColor}
                stopOpacity={0.15}
              />
              <stop
                offset="100%"
                stopColor={chartColor}
                stopOpacity={0.02}
              />
            </linearGradient>
          </defs>


          {[80, 40, 0].map((label, i) => {
            const y =
              height -
              paddingY -
              ((label - minVal) / range) *
              (height - 2 * paddingY);
            return (
              <text
                key={`y-${i}`}
                x={labelAreaWidth - 8}
                y={y}
                fontSize="11"
                fill="#9ca3af"
                textAnchor="end"
                dominantBaseline="middle"
              >
                {label}
              </text>
            );
          })}
          <path d={areaPathD} fill="url(#score-trend-gradient)" />
          <path
            d={pathD}
            fill="none"
            stroke={chartColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.length > 0 && (
            <g>
              <circle
                cx={points[points.length - 1].x}
                cy={points[points.length - 1].y}
                r="5"
                fill={chartColor}
                fillOpacity={0.3}
              />
              <circle
                cx={points[points.length - 1].x}
                cy={points[points.length - 1].y}
                r="3"
                fill={chartColor}
              />
            </g>
          )}
        </svg>
        <div
          className="flex justify-between text-[11px] text-gray-400 mt-2"
          style={{ marginLeft: labelAreaWidth + paddingX, width: chartWidth }}
        >
          <span>M</span>
          <span>14 Jan</span>
          <span>7 Jan</span>
        </div>
      </div>
    </div>
  );
};
