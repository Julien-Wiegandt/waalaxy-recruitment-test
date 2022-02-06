// Convert hex to rgb (https://www.tutorialspoint.com/hexadecimal-color-to-rgb-color-javascript)
export const hexToRGB = (hex: string) => {
  let r = "0",
    g = "0",
    b = "0";
  // handling 3 digit hex
  if (hex.length === 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
    // handling 6 digit hex
  } else if (hex.length === 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }
  return { r, g, b };
};

export function randomString(length: number): string {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function randomColor(): string {
  var result = "";
  var characters = "ABCDEF0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return "#" + result;
}

export function randomNumber(min: number, max: number): number {
  return max < min ? -1 : min + Math.round(Math.random() * (max - min));
}
