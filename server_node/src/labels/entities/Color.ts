export const RGB_COLOR_REGEX = /\((\d+),\s*(\d+),\s*(\d+)(,\s*(\d*.\d*))?\)/;

export class Color {
  public r: number;
  public g: number;
  public b: number;
  public a: number;

  constructor(color: string) {
    if (color) {
      if (color.indexOf('#') === 0) {
        color = color.substr(color.indexOf('#') + 1);
        this.r = parseInt(color.substr(0, 2), 16);
        this.g = parseInt(color.substr(2, 2), 16);
        this.b = parseInt(color.substr(4, 2), 16);
        this.a = 1;
      } else if (color.indexOf('rgb') === 0) {
        const res = RGB_COLOR_REGEX.exec(color.substr(color.indexOf('(')));
        this.r = parseInt(res[1], 10);
        this.g = parseInt(res[2], 10);
        this.b = parseInt(res[3], 10);
        this.a = res[5] ? parseFloat(res[5]) : 1;
      }
    }
  }

  toRgba() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }
}
