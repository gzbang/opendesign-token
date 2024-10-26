export function normalizeTokens(tokens: any) {
  const rlt: any = {};

  Object.keys(tokens).forEach((key) => {
    const item = tokens[key];
    if (key === 'palette') {
    } else {
      if (!rlt[item.type]) {
        rlt[item.type] = {
          name: item.typeName,
          type: item.type,
          value: []
        };
      }
      rlt[item.type].value.push({
        catg: key,
        ...item
      });
    }
  });

  const fontOrder = ['font_size', 'line_height'];
  rlt.font.value.sort(
    (a: string, b: string) => fontOrder.indexOf(a) - fontOrder.indexOf(b)
  );

  const order = [
    'palette',
    'color',
    'shadow',
    'font',
    'size',
    'gap',
    'animation'
  ];
  return Object.keys(rlt)
    .sort((a, b) => order.indexOf(a) - order.indexOf(b))
    .map((key) => rlt[key]);
}

export function getVars(tokens: any, theme: string, prefix = '--o-') {
  const vars: Array<Record<string, string>> = [];

  Object.keys(tokens).forEach((key) => {
    const item = tokens[key];

    item.value.forEach((i: any) => {
      vars.push({
        [prefix + i.key]: i.value[theme]
      });
    });
  });
  return vars;
}
export function getVarsByType(
  tokens: any,
  theme: string,
  type: string,
  prefix = '--o-'
) {
  const vars: Array<Record<string, string>> = [];

  Object.keys(tokens).forEach((key) => {
    const item = tokens[key];
    if (item.type === type) {
      item.value.forEach((i: any) => {
        vars.push({
          [prefix + i.key]: i.value[theme]
        });
      });
    }
  });
  return vars;
}
