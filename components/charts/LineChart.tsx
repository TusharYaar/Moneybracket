import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, Circle, Line, Text as SvgText, G, Defs, LinearGradient, Stop } from "react-native-svg";
import * as d3 from "d3-shape";
import { scaleLinear } from "d3-scale";

export interface LineChartDataPoint {
  x: number | Date;
  y: number;
  label?: string;
}

export interface LineChartProps {
  data: LineChartDataPoint[];
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
  showGradient?: boolean;
  showPoints?: boolean;
  pointRadius?: number;
  pointColor?: string;
  showGrid?: boolean;
  gridColor?: string;
  showLabels?: boolean;
  labelColor?: string;
  curved?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  backgroundColor?: string;
  animate?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  width = 350,
  height = 250,
  strokeColor = "#3b82f6",
  strokeWidth = 3,
  fillColor = "#3b82f6",
  showGradient = true,
  showPoints = true,
  pointRadius = 5,
  pointColor = "#3b82f6",
  showGrid = true,
  gridColor = "#e5e7eb",
  showLabels = true,
  labelColor = "#6b7280",
  curved = true,
  paddingTop = 20,
  paddingBottom = 40,
  paddingLeft = 40,
  paddingRight = 20,
  backgroundColor = "transparent",
}) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    // Create scales
    const xValues = data.map((d) => (d.x instanceof Date ? d.x.getTime() : d.x));
    const yValues = data.map((d) => d.y);

    const xScale = scaleLinear()
      .domain([Math.min(...xValues), Math.max(...xValues)])
      .range([0, chartWidth]);

    const yScale = scaleLinear()
      .domain([0, Math.max(...yValues) * 1.1])
      .range([chartHeight, 0]);

    // Create line generator
    const lineGenerator = curved
      ? d3
          .line<LineChartDataPoint>()
          .x((d) => xScale(d.x instanceof Date ? d.x.getTime() : d.x))
          .y((d) => yScale(d.y))
          .curve(d3.curveCatmullRom.alpha(0.5))
      : d3
          .line<LineChartDataPoint>()
          .x((d) => xScale(d.x instanceof Date ? d.x.getTime() : d.x))
          .y((d) => yScale(d.y));

    const linePath = lineGenerator(data);

    // Create area generator for gradient fill
    const areaGenerator = curved
      ? d3
          .area<LineChartDataPoint>()
          .x((d) => xScale(d.x instanceof Date ? d.x.getTime() : d.x))
          .y0(chartHeight)
          .y1((d) => yScale(d.y))
          .curve(d3.curveCatmullRom.alpha(0.5))
      : d3
          .area<LineChartDataPoint>()
          .x((d) => xScale(d.x instanceof Date ? d.x.getTime() : d.x))
          .y0(chartHeight)
          .y1((d) => yScale(d.y));

    const areaPath = areaGenerator(data);

    // Calculate grid lines
    const yTicks = yScale.ticks(5);
    const xTicks = xScale.ticks(5);

    // Map data points to screen coordinates
    const points = data.map((d) => ({
      x: xScale(d.x instanceof Date ? d.x.getTime() : d.x),
      y: yScale(d.y),
      value: d.y,
      label: d.label,
    }));

    return {
      linePath,
      areaPath,
      points,
      yTicks,
      xTicks,
      xScale,
      yScale,
      chartWidth,
      chartHeight,
    };
  }, [data, width, height, curved, paddingTop, paddingBottom, paddingLeft, paddingRight]);

  if (!chartData) {
    return <View style={[styles.container, { width, height, backgroundColor }]} />;
  }

  const { linePath, areaPath, points, yTicks, xTicks, xScale, yScale, chartWidth, chartHeight } = chartData;

  return (
    <View style={[styles.container, { width, height, backgroundColor }]}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={fillColor} stopOpacity="0.4" />
            <Stop offset="100%" stopColor={fillColor} stopOpacity="0.05" />
          </LinearGradient>
        </Defs>

        <G x={paddingLeft} y={paddingTop}>
          {/* Grid lines */}
          {showGrid && (
            <>
              {/* Horizontal grid lines */}
              {yTicks.map((tick, index) => (
                <Line
                  key={`h-grid-${index}`}
                  x1={0}
                  y1={yScale(tick)}
                  x2={chartWidth}
                  y2={yScale(tick)}
                  stroke={gridColor}
                  strokeWidth={1}
                  strokeDasharray="4,4"
                />
              ))}
              {/* Vertical grid lines */}
              {xTicks.map((tick, index) => (
                <Line
                  key={`v-grid-${index}`}
                  x1={xScale(tick)}
                  y1={0}
                  x2={xScale(tick)}
                  y2={chartHeight}
                  stroke={gridColor}
                  strokeWidth={1}
                  strokeDasharray="4,4"
                />
              ))}
            </>
          )}

          {/* Area fill with gradient */}
          {showGradient && areaPath && (
            <Path d={areaPath} fill="url(#lineGradient)" />
          )}

          {/* Line path */}
          {linePath && (
            <Path
              d={linePath}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data points */}
          {showPoints &&
            points.map((point, index) => (
              <Circle
                key={`point-${index}`}
                cx={point.x}
                cy={point.y}
                r={pointRadius}
                fill={pointColor}
                stroke="#ffffff"
                strokeWidth={2}
              />
            ))}

          {/* Y-axis labels */}
          {showLabels &&
            yTicks.map((tick, index) => (
              <SvgText
                key={`y-label-${index}`}
                x={-10}
                y={yScale(tick)}
                fontSize={12}
                fill={labelColor}
                textAnchor="end"
                alignmentBaseline="middle"
              >
                {tick.toFixed(0)}
              </SvgText>
            ))}

          {/* X-axis labels */}
          {showLabels &&
            xTicks.map((tick, index) => (
              <SvgText
                key={`x-label-${index}`}
                x={xScale(tick)}
                y={chartHeight + 20}
                fontSize={12}
                fill={labelColor}
                textAnchor="middle"
              >
                {tick.toFixed(0)}
              </SvgText>
            ))}
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LineChart;
