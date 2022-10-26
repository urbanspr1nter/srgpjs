import { Point, Rectangle } from "./interfaces";
import { SRGP_lineCoord } from "./SRGP_line";
import { SRGP_defPoint } from "./SRGP_point";

export function SRGP_defRectangle(
    leftX: number,
    bottomY: number,
    rightX: number,
    topY: number,
): Rectangle {
    return {
        bottomLeft: SRGP_defPoint(leftX, bottomY),
        topRight: SRGP_defPoint(rightX, topY),
    };
}

export function SRGP_rectangleCoord(
    leftX: number,
    bottomY: number,
    rightX: number,
    topY: number,
) {
    SRGP_lineCoord(leftX, bottomY, leftX, topY);
    SRGP_lineCoord(leftX, topY, rightX, topY);
    SRGP_lineCoord(rightX, topY, rightX, bottomY);
    SRGP_lineCoord(rightX, bottomY, leftX, bottomY);
}

export function SRGP_rectanglePt(bottomLeft: Point, topRight: Point) {
    SRGP_rectangleCoord(bottomLeft.x, bottomLeft.y, topRight.x, topRight.y);
}

export function SRGP_rectangle(rect: Rectangle) {
    SRGP_rectanglePt(rect.bottomLeft, rect.topRight);
}
