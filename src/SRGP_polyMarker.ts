import { Point } from "./interfaces";
import { SRGP_markerCoord } from "./SRGP_marker";

export function SRGP_polyMarkerCoord(
    vertexCount: number,
    xArray: number[],
    yArray: number[],
) {
    for (let i = 0; i < vertexCount; i++) {
        SRGP_markerCoord(xArray[i], yArray[i]);
    }
}

export function SRGP_polyMarker(vertexCount: number, vertices: Point[]) {
    const xArray = vertices.map((p) => p.x);
    const yArray = vertices.map((p) => p.y);

    SRGP_polyMarkerCoord(vertexCount, xArray, yArray);
}
