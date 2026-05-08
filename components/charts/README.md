# D3 Chart Components

Beautiful, customizable chart components built with D3.js and React Native SVG.

## Components

### LineChart
A smooth, animated line chart with gradient fills and customizable styling.

**Features:**
- Curved or straight lines
- Gradient fill under the line
- Data point markers
- Grid lines
- Axis labels
- Fully customizable colors and styling

**Example:**
```tsx
import { LineChart } from '@components/charts';

const data = [
  { x: 1, y: 100 },
  { x: 2, y: 150 },
  { x: 3, y: 120 },
  { x: 4, y: 180 },
  { x: 5, y: 200 },
];

<LineChart
  data={data}
  width={350}
  height={250}
  strokeColor="#3b82f6"
  strokeWidth={3}
  showGradient={true}
  showPoints={true}
  curved={true}
/>
```

### BarChart
A flexible bar chart supporting both vertical and horizontal orientations.

**Features:**
- Vertical or horizontal bars
- Individual bar colors
- Gradient fills
- Grid lines
- Value labels on bars
- Category labels
- Customizable spacing and styling

**Example:**
```tsx
import { BarChart } from '@components/charts';

const data = [
  { label: 'Jan', value: 100, color: '#3b82f6' },
  { label: 'Feb', value: 150, color: '#10b981' },
  { label: 'Mar', value: 120, color: '#f59e0b' },
  { label: 'Apr', value: 180, color: '#ef4444' },
];

<BarChart
  data={data}
  width={350}
  height={250}
  horizontal={false}
  showGradient={true}
  showValues={true}
  barRadius={4}
/>
```

### PieChart
A beautiful pie/donut chart with legend support.

**Features:**
- Pie or donut chart (configurable inner radius)
- Gradient fills
- Percentage or value labels
- Legend (right or bottom position)
- Individual slice colors
- Customizable styling

**Example:**
```tsx
import { PieChart } from '@components/charts';

const data = [
  { label: 'Food', value: 300, color: '#3b82f6' },
  { label: 'Transport', value: 150, color: '#10b981' },
  { label: 'Shopping', value: 200, color: '#f59e0b' },
  { label: 'Bills', value: 250, color: '#ef4444' },
];

<PieChart
  data={data}
  width={350}
  height={350}
  innerRadius={60} // Set to 0 for pie chart, >0 for donut
  showGradient={true}
  showLegend={true}
  showPercentage={true}
  legendPosition="right"
/>
```

## Common Props

All charts support these common props:

- `width`: Chart width (default: 350)
- `height`: Chart height (default: 250 for Line/Bar, 350 for Pie)
- `backgroundColor`: Background color (default: 'transparent')
- `showLabels`: Show axis/legend labels (default: true)
- `labelColor`: Color for labels (default: '#6b7280')
- `showGrid`: Show grid lines (default: true, not applicable to PieChart)
- `gridColor`: Color for grid lines (default: '#e5e7eb')

## Customization

Each chart is highly customizable with props for:
- Colors (stroke, fill, gradient)
- Dimensions and padding
- Labels and values
- Grid lines
- Animations (coming soon)
- Styling options

## Dependencies

These components require:
- `react-native-svg` (already in your project)
- `d3-shape` (for path generation)
- `d3-scale` (for data scaling)

Install with:
```bash
npm install d3-shape d3-scale
```

## TypeScript Support

All components are fully typed with TypeScript interfaces exported for your convenience.

## Performance

These charts are optimized for React Native and use `useMemo` to prevent unnecessary recalculations. They work smoothly with reasonable amounts of data (< 100 data points recommended for best performance).
