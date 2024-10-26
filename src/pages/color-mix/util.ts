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
