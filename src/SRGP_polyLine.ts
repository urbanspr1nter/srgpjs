import { Point } from "./interfaces";
import { SRGP_lineCoord } from "./SRGP_line";

/**
 * Draws multiple lines using given x and y coordinates.
 * @param vertexCount number
 * @param xArray number[]
 * @param yArray number[]
 */
export function SRGP_polyLineCoord(
    vertexCount: number,
    xArray: number[],
    yArray: number[],
) {
    let prevX = xArray[0];
    let prevY = yArray[0];

    for (let i = 1; i < vertexCount; i++) {
        const _x = xArray[i];
        const _y = yArray[i];

        SRGP_lineCoord(prevX, prevY, _x, _y);

        prevX = _x;
        prevY = _y;
    }
}

/**
 * Draws multiple lines using given Point objects in an array.
 * @param vertexCount number
 * @param vertices Point[]
 */
export function SRGP_polyLine(vertexCount: number, vertices: Point[]) {
    const xArray = vertices.map((p) => p.x);
    const yArray = vertices.map((p) => p.y);

    SRGP_polyLineCoord(vertexCount, xArray, yArray);
}
