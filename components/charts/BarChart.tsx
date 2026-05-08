import React, { useEffect, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Rect, Line, Text as SvgText, G } from "react-native-svg";
import { scaleLinear, scaleBand } from "d3-scale";
import Animated, { useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";

export interface BarChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartProps {
  data: BarChartDataPoint[];
  width?: number;
  height?: number;
  barColor?: string;
  barRadius?: number;
  showGradient?: boolean;
  gradientStartColor?: string;
  gradientEndColor?: string;
  showGrid?: boolean;
  gridColor?: string;
  showLabels?: boolean;
  labelColor?: string;
  valueColor?: string;
  horizontal?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  backgroundColor?: string;
  barSpacing?: number;
  animate?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  width = undefined,
  height = undefined,
  barColor = "#3b82f6",
  barRadius = 4,
  gridColor = "#e5e7eb",
  labelColor = "#000",
  valueColor = "#374151",
  horizontal = false,
  paddingTop = 0,
  paddingBottom = 0,
  paddingLeft = 0,
  paddingRight = 0,
  backgroundColor = "transparent",
  barSpacing = 0,
}) => {

  const labelOpacity = useSharedValue(1);
  const valueOpacity = useDerivedValue(() => Math.abs(labelOpacity.value - 1));

  useEffect(() => {
    let value = 1
    const timer = setInterval(() => {
      labelOpacity.value = withTiming(value, {duration: 500});
      value = value === 1 ? 0 : 1;
    }, 4000);
    return () => clearInterval(timer);
  },[])


  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null;
    if (horizontal) {
      // Horizontal bar chart
      // Return Null if width is undefined for horizontal charts
      if (width === undefined) return null
      let chartHeight=0;
      if (height !== undefined) {
        chartHeight = height - paddingTop - paddingBottom;
      } else {
        chartHeight = data.length * 40+20;
      }
      const chartWidth = width - paddingLeft - paddingRight;
   
      const yScale = scaleBand()
        .domain(data.map((d) => d.label))
        .range([0, chartHeight - 16])
        .padding(barSpacing);

      const xScale = scaleLinear()
        .domain([0, Math.max(...data.map((d) => d.value)) * 1.1]) 
        .range([0, chartWidth]);

      const bars = data.map((d) => ({
        x: 0,
        y: yScale(d.label) || 0,
        width: xScale(d.value),
        height: yScale.bandwidth(),
        value: d.value,
        label: d.label,
        color: d.color || barColor,
      }));

      const xTicks = xScale.ticks(5);

      return {
        bars,
        xScale,
        yScale,
        xTicks,
        yTicks: data.map((d) => d.label),
        chartWidth,
        chartHeight,
        isHorizontal: true,
      };
    } else {
      // Vertical bar chart
      const xScale = scaleBand()
        .domain(data.map((d) => d.label))
        .range([0, chartWidth])
        .padding(barSpacing);

      const yScale = scaleLinear()
        .domain([0, Math.max(...data.map((d) => d.value))])
        .range([chartHeight, 0])

      const bars = data.map((d) => ({
        x: xScale(d.label) || 0,
        y: yScale(d.value),
        width: xScale.bandwidth(),
        height: chartHeight - yScale(d.value),
        value: d.value,
        label: d.label,
        color: d.color || barColor,
      }));
      const yTicks = yScale.ticks(5);
      return {
        bars,
        xScale,
        yScale,
        xTicks: data.map((d) => d.label),
        yTicks,
        chartWidth,
        chartHeight,
        isHorizontal: false,
      };
    }
  }, [data, width, height, horizontal, barSpacing, paddingTop, paddingBottom, paddingLeft, paddingRight, barColor]);

  if (!chartData) {
    return <View style={[styles.container, { width, height, backgroundColor }]} />;
  }

  const { bars, xTicks, yTicks, xScale, yScale, chartWidth, chartHeight, isHorizontal } = chartData;

  return (
    <View style={[styles.container, { width, height, backgroundColor }]}>
      <Svg width={chartWidth} height={chartHeight}>
        <G>
              {isHorizontal ? (
                // Vertical grid lines for horizontal bars
                xTicks.map((tick, index) => (
                  <Line
                    key={`grid-${index}`}
                    x1={typeof xScale === 'function' ? xScale(tick) : 0}
                    y1={0}
                    x2={typeof xScale === 'function' ? xScale(tick) : 0}
                    y2={chartHeight}
                    stroke={"orange"}
                    strokeWidth={1}
                    strokeDasharray="4,4"
                  />
                ))
              ) : (
                // Horizontal grid lines for vertical bars
                yTicks.map((tick, index) => (
                  <Line
                    key={`grid-${index}`}
                    x1={0}
                    y1={typeof yScale === 'function' ? yScale(tick) : 0}
                    x2={chartWidth}
                    y2={typeof yScale === 'function' ? yScale(tick) : 0}
                    stroke={gridColor}
                    strokeWidth={1}
                    strokeDasharray="4,4"
                  />
                ))
              )}

          {/* Bars */}
          {bars.map((bar, index) => {
            return (
              <G key={`bar-${index}`}>
                 <Rect
                  x={bar.x}
                  y={bar.y}
                  width={bar.width > 0 ? bar.width : 10 }
                  height={bar.height}
                  fill={bar.color}
                  rx={barRadius}
                  ry={barRadius}
                  /> 

                  <AnimatedText
                    x={isHorizontal ? bar.x : bar.x + bar.width / 2}
                    y={isHorizontal ? bar.y + bar.height/2 : bar.y}
                    fontSize={16}
                    fill={valueColor}
                    textAnchor={isHorizontal ? "start" : "middle"}
                    alignmentBaseline={isHorizontal ? "middle" : "baseline"}
                    fontWeight="600"
                    opacity={labelOpacity}
                    disabled={true}>
                    {`${bar.label}`}
                  </AnimatedText>
                  <AnimatedText
                    x={isHorizontal ? bar.x : bar.x + bar.width / 2}
                    y={isHorizontal ? bar.y + bar.height/2 : bar.y}
                    fontSize={16}
                    fill={valueColor}
                    textAnchor={isHorizontal ? "start" : "middle"}
                    alignmentBaseline={isHorizontal ? "middle" : "baseline"}
                    fontWeight="600"
                    opacity={valueOpacity}
                    disabled={true}>
                    {`${bar.value.toFixed(2)}`}
                  </AnimatedText>
            </G>
            );
          })}

          {/* Axis labels */}
            <>
              {isHorizontal ? (
                <>
                  {/* X-axis labels (values) */}
                  {xTicks.map((tick, index) => (
                    <SvgText
                      key={`x-label-${index}`}
                      x={typeof xScale === 'function' ? xScale(tick) : 0}
                      y={chartHeight}
                      fontSize={12}
                      fill={labelColor}
                      textAnchor="middle"
                    >
                      {tick.toFixed(0)}
                    </SvgText>
                  ))}
                </>
              ) : (
                <>
                  {/* X-axis labels (categories) */}
                  {xTicks.map((tick, index) => {
                    const xPos = xScale(tick) ?? 0;
                    const bandwidth = 'bandwidth' in xScale ? xScale.bandwidth() : 0;
                    return (
                      <SvgText
                        key={`x-label-${index}`}
                        x={0}
                        y={chartHeight}
                        fontSize={12}
                        fill={labelColor}
                        textAnchor="middle"
                      >
                        {tick.length > 8 ? tick.substring(0, 8) + "..." : tick}
                      </SvgText>
                    );
                  })}
                  {/* Y-axis labels (values) */}
                  {yTicks.map((tick, index) => (
                    <SvgText
                      key={`y-label-${index}`}
                      x={-10}
                      y={typeof yScale === 'function' ? yScale(tick) : 0}
                      fontSize={12}
                      fill={labelColor}
                      textAnchor="end"
                      alignmentBaseline="middle"
                    >
                      {tick.toFixed(0)}
                    </SvgText>
                  ))}
                </>
              )}
            </>
          
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

export default BarChart;

const AnimatedText = Animated.createAnimatedComponent(SvgText);