function hexToRgb(hex: string) {
  hex = hex.toLowerCase();
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result)
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  else
    return {
      r: 12,
      g: 34,
      b: 66,
    };
}

function luminance(r: number, g: number, b: number) {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function chooseBetterContrast(
  primary: string,
  options = ["#393939", "#ffffff"],
): string {
  const {r, g, b} = hexToRgb(primary);
  const lumPrimary = luminance(r, g, b);

  let max: [number, string] = [10, "#757575"];
  options.forEach(color => {
    let colorHex = hexToRgb(color);
    let colLum = luminance(colorHex.r, colorHex.g, colorHex.b);
    const ratio =
      lumPrimary > colLum
        ? (colLum + 0.05) / (lumPrimary + 0.05)
        : (lumPrimary + 0.05) / (colLum + 0.05);
    max = ratio < max[0] ? [ratio, color] : max;
  });

  return max[1];
}
