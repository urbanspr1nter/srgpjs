import { Point } from "./interfaces";
import { getContext, invertCoords } from "./utils";

/**
 * Draws a line from one point to another.
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 */
export function SRGP_lineCoord(x1: number, y1: number, x2: number, y2: number) {
    const { x: _x1, y: _y1 } = invertCoords(x1, y1);
    const { x: _x2, y: _y2 } = invertCoords(x2, y2);

    const { context } = getContext();

    context.beginPath();
    context.moveTo(_x1, _y1);
    context.lineTo(_x2, _y2);

    context.stroke();
}

/**
 * Draws a line from one point to another using Point objects.
 * @param pt1
 * @param pt2
 */
export function SRGP_line(pt1: Point, pt2: Point) {
    SRGP_lineCoord(pt1.x, pt1.y, pt2.x, pt2.y);
}
