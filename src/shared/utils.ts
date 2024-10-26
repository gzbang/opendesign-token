export const rgbToHex = (str: string) => {
  const arr = str.split(',');

  let res = '#';

  for (let i = 0, len = arr.length; i < len; i++) {
    let temp = Number(arr[i]).toString(16).toUpperCase();
    if (Number(arr[i]) < 16) {
      temp = '0' + temp;
    }
    res += temp;
  }
  return res;
};
