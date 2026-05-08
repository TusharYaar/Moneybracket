# Installation Instructions

## Required Dependencies

To use these chart components, you need to install the following D3 libraries:

```bash
npm install d3-shape d3-scale
```

Or with yarn:

```bash
yarn add d3-shape d3-scale
```

## TypeScript Support (Optional)

For TypeScript users, install the type definitions:

```bash
npm install --save-dev @types/d3-shape @types/d3-scale
```

## Existing Dependencies

These components use `react-native-svg` which is already installed in your project.

## Quick Start

After installing the dependencies, you can import and use the charts:

```tsx
import { LineChart, BarChart, PieChart } from '@components/charts';

// Use in your component
<LineChart
  data={[
    { x: 1, y: 100 },
    { x: 2, y: 150 },
    { x: 3, y: 120 },
  ]}
  width={350}
  height={250}
/>
```

## Troubleshooting

### Module not found errors

If you see errors like "Cannot find module 'd3-shape'", make sure you've run the installation command and restarted your development server.

### TypeScript errors

If you're using TypeScript and see type errors, install the @types packages mentioned above.

### React Native SVG issues

The project already has `react-native-svg` installed. If you encounter any issues:

1. Clear your cache: `npx expo start -c`
2. Reinstall dependencies: `npm install`
3. Restart your development server

## Next Steps

Check out:
- `README.md` for component documentation
- `ChartExamples.tsx` for usage examples
- Individual component files for prop definitions
