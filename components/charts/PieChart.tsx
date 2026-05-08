import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, Circle, Text as SvgText, G, Defs, RadialGradient, Stop } from "react-native-svg";
import * as d3 from "d3-shape";

export interface PieChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  data: PieChartDataPoint[];
  width?: number;
  height?: number;
  radius?: number;
  innerRadius?: number; // For donut chart effect
  colors?: string[];
  showLabels?: boolean;
  labelColor?: string;
  showValues?: boolean;
  showPercentage?: boolean;
  valueColor?: string;
  showLegend?: boolean;
  legendPosition?: "right" | "bottom";
  backgroundColor?: string;
  strokeWidth?: number;
  strokeColor?: string;
  showGradient?: boolean;
  padAngle?: number;
  animate?: boolean;
}

const DEFAULT_COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#f97316", // orange
  "#14b8a6", // teal
  "#6366f1", // indigo
];

const PieChart: React.FC<PieChartProps> = ({
  data,
  width = 700,
  height = 700,
  radius,
  innerRadius = 0,
  colors = DEFAULT_COLORS,
  showLabels = true,
  labelColor = "#374151",
  showValues = true,
  showPercentage = true,
  valueColor = "#ffffff",
  showLegend = true,
  legendPosition = "right",
  backgroundColor = "transparent",
  strokeWidth = 2,
  strokeColor = "#ffffff",
  showGradient = true,
  padAngle = 0.02,
}) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null;

    const total = data.reduce((sum, d) => sum + d.value, 0);
    
    // Calculate radius based on dimensions and legend
    const legendWidth = showLegend && legendPosition === "right" ? 120 : 0;
    const legendHeight = showLegend && legendPosition === "bottom" ? 80 : 0;
    
    const chartWidth = width - legendWidth;
    const chartHeight = height - legendHeight;
    const calculatedRadius = radius || Math.min(chartWidth, chartHeight) / 2 - 40;
    
    const centerX = chartWidth / 2;
    const centerY = chartHeight / 2;

    // Create pie generator
    const pieGenerator = d3.pie<PieChartDataPoint>()
      .value((d) => d.value)
      .padAngle(padAngle)
      .sort(null);

    // Create arc generator
    const arcGenerator = d3.arc<d3.PieArcDatum<PieChartDataPoint>>()
      .innerRadius(innerRadius)
      .outerRadius(calculatedRadius);

    // Create label arc (positioned at 60% of radius)
    const labelArc = d3.arc<d3.PieArcDatum<PieChartDataPoint>>()
      .innerRadius(calculatedRadius * 0.6)
      .outerRadius(calculatedRadius * 0.6);

    const arcs = pieGenerator(data);

    const slices = arcs.map((arc, index) => {
      const color = data[index].color || colors[index % colors.length];
      const percentage = ((arc.value / total) * 100).toFixed(1);
      const [labelX, labelY] = labelArc.centroid(arc);
      
      return {
        path: arcGenerator(arc) || "",
        color,
        value: arc.value,
        percentage,
        label: data[index].label,
        labelX: labelX + centerX,
        labelY: labelY + centerY,
        startAngle: arc.startAngle,
        endAngle: arc.endAngle,
      };
    });

    return {
      slices,
      centerX,
      centerY,
      radius: calculatedRadius,
      total,
      legendWidth,
      legendHeight,
      chartWidth,
      chartHeight,
    };
  }, [data, width, height, radius, innerRadius, colors, showLegend, legendPosition, padAngle]);

  if (!chartData) {
    return <View style={[styles.container, { width, height, backgroundColor }]} />;
  }

  const { slices, centerX, centerY, radius: chartRadius, total, legendWidth, legendHeight, chartWidth, chartHeight } = chartData;

  return (
    <View style={[styles.container, { width, height, backgroundColor }]}>
      <View style={styles.chartContainer}>
        <Svg width={chartWidth} height={chartHeight}>
          <Defs>
            {showGradient && slices.map((slice, index) => (
              <RadialGradient
                key={`gradient-${index}`}
                id={`pieGradient-${index}`}
                cx="50%"
                cy="50%"
              >
                <Stop offset="0%" stopColor={slice.color} stopOpacity="1" />
                <Stop offset="100%" stopColor={slice.color} stopOpacity="0.7" />
              </RadialGradient>
            ))}
          </Defs>

          <G x={centerX} y={centerY}>
            {/* Pie slices */}
            {slices.map((slice, index) => (
              <G key={`slice-${index}`}>
                <Path
                  d={slice.path}
                  fill={showGradient ? `url(#pieGradient-${index})` : slice.color}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                />
                
                {/* Value labels on slices */}
                {showValues && slice.value > 0 && (
                  <SvgText
                    x={slice.labelX - centerX}
                    y={slice.labelY - centerY}
                    fontSize={14}
                    fill={valueColor}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontWeight="600"
                  >
                    {showPercentage ? `${slice.percentage}%` : slice.value.toFixed(0)}
                  </SvgText>
                )}
              </G>
            ))}

            {/* Center circle for donut chart */}
            {innerRadius > 0 && (
              <>
                <Circle
                  cx={0}
                  cy={0}
                  r={innerRadius}
                  fill={backgroundColor === "transparent" ? "#ffffff" : backgroundColor}
                />
                {showValues && (
                  <SvgText
                    x={0}
                    y={0}
                    fontSize={24}
                    fill={labelColor}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontWeight="700"
                  >
                    {total.toFixed(0)}
                  </SvgText>
                )}
              </>
            )}
          </G>
        </Svg>

        {/* Legend */}
        {/* {showLegend && (
          <View
            style={[
              styles.legend,
              legendPosition === "right" ? styles.legendRight : styles.legendBottom,
              legendPosition === "right" ? { width: legendWidth } : { height: legendHeight },
            ]}
          >
            {slices.map((slice, index) => (
              <View key={`legend-${index}`} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: slice.color }]} />
                <View style={styles.legendText}>
                  <SvgText fontSize={12} fill={labelColor} fontWeight="500">
                    {slice.label}
                  </SvgText>
                  {showLabels && (
                    <SvgText fontSize={11} fill={labelColor} opacity={0.7}>
                      {showPercentage ? `${slice.percentage}%` : slice.value.toFixed(0)}
                    </SvgText>
                  )}
                </View>
              </View>
            ))}
          </View>
        )} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  legend: {
    justifyContent: "center",
  },
  legendRight: {
    marginLeft: 20,
  },
  legendBottom: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    marginHorizontal: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    flexDirection: "column",
  },
});

export default PieChart;
