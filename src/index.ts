import { Point, SRGPGloalContext } from "./interfaces";
import { getContext, invertCoords, point } from "./utils";

// Initialization stuff
const SRGP_out: HTMLCanvasElement = document.getElementById(
    "screen",
) as HTMLCanvasElement;

if (!SRGP_out) {
    throw Error("Couldn't find the main output");
}

const SRGP_context = SRGP_out.getContext("2d") as CanvasRenderingContext2D;
if (!SRGP_context) {
    throw Error("Couldn't find the context");
}

(window as any).SRGP_global = {
    out: SRGP_out,
    context: SRGP_context,
    width: SRGP_out.width,
    height: SRGP_out.height,
} as SRGPGloalContext;

// SRGP_line
function SRGP_lineCoord(x1: number, y1: number, x2: number, y2: number) {
    const { x: _x1, y: _y1 } = invertCoords(x1, y1);

    const { x: _x2, y: _y2 } = invertCoords(x2, y2);

    const { context } = getContext();

    context.moveTo(_x1, _y1);
    context.lineTo(_x2, _y2);

    context.stroke();
}

function SRGP_line(pt1: Point, pt2: Point) {
    SRGP_lineCoord(pt1.x, pt1.y, pt2.x, pt2.y);
}

function main() {
    SRGP_line(point(0, 0), point(100, 300));
}

main();
