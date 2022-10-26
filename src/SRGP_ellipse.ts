import { Rectangle } from "./interfaces";
import { getContext, invertCoords } from "./utils";

export function SRGP_ellipseArc(
    extentRect: Rectangle,
    startAngle: number,
    endAngle: number,
) {
    const { context } = getContext();
    const { bottomLeft, topRight } = extentRect;

    const radiusX = Math.trunc(Math.abs(topRight.x - bottomLeft.x) / 2);
    const radiusY = Math.trunc(Math.abs(topRight.y - bottomLeft.y) / 2);

    const centerX =
        bottomLeft.x + Math.trunc(Math.abs(bottomLeft.x - topRight.x) / 2);
    const centerY =
        bottomLeft.y + Math.trunc(Math.abs(topRight.y - bottomLeft.y) / 2);

    const { x: _x, y: _y } = invertCoords(centerX, centerY);

    context.beginPath();
    context.ellipse(_x, _y, radiusX, radiusY, 0, -startAngle, -endAngle, true);
    context.stroke();
}
