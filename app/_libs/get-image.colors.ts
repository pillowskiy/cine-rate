export function getBrightness(hex: string) {
  const red = parseInt(hex.slice(1, 3), 16);
  const green = parseInt(hex.slice(3, 5), 16);
  const blue = parseInt(hex.slice(5, 7), 16);
  return (red * 299 + green * 587 + blue * 114) / 1000;
}

export function getDarkestColor(colors: chroma.Color[]) {
    let [color, brightness] = [colors[0], getBrightness(colors[0].hex())];

    for (let i = 1; i < colors.length; i++) {
        const currentBrightness = getBrightness(colors[i].hex());
        if (currentBrightness < brightness) {
            color = colors[i];
            brightness = brightness;
        }
    }

    return { color, brightness };
}


