import { Point } from "./interfaces";
import { SRGP_line } from "./SRGP_line";
import { SRGP_polyLine } from "./SRGP_polyLine";

export function SRGP_polygon(vertexCount: number, vertices: Point[]) {
    SRGP_polyLine(vertexCount, vertices);
    SRGP_line(vertices[vertices.length - 1], vertices[0]);
}
