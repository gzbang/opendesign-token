//16进制颜色转RGB颜色
export function hexToRGB(hex: string) {
  //若有#，去除#
  let h = hex.replace("#", "");
  return {
    r: Number("0x" + h[0] + h[1]),
    g: Number("0x" + h[2] + h[3]),
    b: Number("0x" + h[4] + h[5]),
  }
}
// TODO 处理十六进制透明度
export function rgbaToHex(rgba: string) {
  const bg = rgba.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d?(\d|(\.[1-9]{1,2})))\)$/);
  function hex(x: string) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  if (bg) {
    return ("#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3])).toUpperCase();
  }
  return ''
}

export function getContrastYIQ(hexcolor: string) {
  let h = hexcolor.replace("#", "");
  var r = parseInt(h.substring(0, 2), 16);
  var g = parseInt(h.substring(2, 4), 16);
  var b = parseInt(h.substring(4, 6), 16);
  var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}

function luminance(r: number, g: number, b: number) {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getColorContrast(c1: { r: number, g: number, b: number }, c2: { r: number, g: number, b: number }) {
  const lum1 = luminance(c1.r, c1.g, c1.b);
  const lum2 = luminance(c2.r, c2.g, c2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}