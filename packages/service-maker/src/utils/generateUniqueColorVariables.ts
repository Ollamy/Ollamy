const colorsName = [
  'gray',
  'mauve',
  'slate',
  'sage',
  'olive',
  'sand',
  'tomato',
  'red',
  'ruby',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'iris',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'jade',
  'green',
  'grass',
  'bronze',
  'gold',
  'brown',
  'orange',
  'amber',
  'yellow',
  'lime',
  'mint',
  'sky',
] as const;

function generateUniqueColorVariables(input: string): string[] {
  const minNumber = 3;
  const maxNumber = 7;

  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + input.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash |= 0;
  }

  const colorIndex = Math.abs(hash) % colorsName.length;
  const number = minNumber + (Math.abs(hash) % (maxNumber - minNumber + 1));

  return [
    `--${colorsName[colorIndex]}-${number}`,
    `--${colorsName[colorIndex]}-${number - 1}`,
  ];
}

export default generateUniqueColorVariables;
