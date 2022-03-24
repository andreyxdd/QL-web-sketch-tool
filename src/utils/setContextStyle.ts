interface IContextStyle{
  lineWidth: number;
  strokeStyle: string;
  [key: string]: number | string;
}

interface IContextExtension extends CanvasRenderingContext2D{
  [key: string]: any;
}

const setContextStyle = (
  context: IContextExtension,
  style: IContextStyle,
): void => {
  Object.keys(style).forEach((key: string) => {
    context[key] = style[key];
  });
};

export default setContextStyle;
