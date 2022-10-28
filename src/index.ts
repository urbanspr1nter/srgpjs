import { ColorTable } from "./constants";
import {
    ColorIndex,
    DrawStyle,
    LineStyle,
    MarkerStyle,
    SRGPGlobalContext,
} from "./interfaces";
import { SRGP_ellipseArc } from "./SRGP_ellipse";
import { SRGP_line, SRGP_lineCoord } from "./SRGP_line";
import {
    SRGP_markerCoord,
    SRGP_setMarkerSize,
    SRGP_setMarkerStyle,
} from "./SRGP_marker";
import { SRGP_defPoint } from "./SRGP_point";
import { SRGP_polygon } from "./SRGP_polygon";
import { SRGP_polyLineCoord } from "./SRGP_polyLine";
import { SRGP_polyMarkerCoord } from "./SRGP_polyMarker";
import { SRGP_defRectangle, SRGP_rectangle } from "./SRGP_rectangle";
import { getContext, updateContext } from "./utils";

// Initialization
const SRGP_out: HTMLCanvasElement = document.getElementById(
    "screen",
) as HTMLCanvasElement;

SRGP_out.width = 512;
SRGP_out.height = 384;

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
} as SRGPGlobalContext;

function clearScreen() {
    const { out, context } = getContext();
    const fillStyle = context.fillStyle;
    context.fillStyle = ColorTable[ColorIndex.White];
    context.fillRect(0, 0, out.width, out.height);
    context.fillStyle = fillStyle;
}

function reset() {
    clearScreen();
    SRGP_setLineStyle(LineStyle.CONTINUOUS);
    SRGP_setColor(ColorIndex.Black);
    SRGP_setLineWidth(1);
}

function SRGP_setLineStyle(style: LineStyle) {
    const { context, drawing } = getContext();
    switch (style) {
        case LineStyle.DASHED:
            updateContext({
                drawing: { ...drawing, lineStyle: LineStyle.DASHED },
            });
            context.setLineDash([4, 4]);
            break;
        case LineStyle.DOTTED:
            updateContext({
                drawing: { ...drawing, lineStyle: LineStyle.DOTTED },
            });
            context.setLineDash([2, 2]);
            break;
        case LineStyle.CONTINUOUS:
        default:
            updateContext({
                drawing: { ...drawing, lineStyle: LineStyle.CONTINUOUS },
            });
            context.setLineDash([]);
            break;
    }
}

function SRGP_setLineWidth(width: number) {
    const { context } = getContext();
    context.lineWidth = width;
}

function SRGP_setColor(colorIndex: ColorIndex) {
    const { context } = getContext();
    context.strokeStyle = ColorTable[colorIndex];
}

function SRGP_setFillBitmapPattern(pattern: DrawStyle) {
    const { context, drawing } = getContext();
    switch (pattern) {
        case DrawStyle.BitmapPatternOpaque:
            updateContext({
                drawing: {
                    ...drawing,
                    drawStyle: DrawStyle.BitmapPatternOpaque,
                },
            });
            break;
        case DrawStyle.BitmapPatternTransparent:
            updateContext({
                drawing: {
                    ...drawing,
                    drawStyle: DrawStyle.BitmapPatternTransparent,
                },
            });
            break;
        case DrawStyle.PixmapPattern:
            updateContext({
                drawing: {
                    ...drawing,
                    drawStyle: DrawStyle.PixmapPattern,
                },
            });
            break;
        case DrawStyle.Solid:
        default:
            updateContext({
                drawing: {
                    ...drawing,
                    drawStyle: DrawStyle.Solid,
                },
            });
    }
}

function SRGP_setBackgroundColor(colorIndex: ColorIndex) {
    const { context, out } = getContext();
    context.fillStyle = `${ColorTable[colorIndex]}`;
    context.fillRect(0, 0, out.width, out.height);
}

function SRGP_fillRectangle() {}

// demo programs
function drawChart() {
    const xArray = [200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310];
    const yArray = [145, 160, 270, 150, 145, 250, 260, 130, 145, 210, 230, 220];
    SRGP_setMarkerSize(4);
    SRGP_setMarkerStyle(MarkerStyle.CIRCLE);
    SRGP_line(SRGP_defPoint(175, 200), SRGP_defPoint(320, 200));
    SRGP_line(SRGP_defPoint(200, 140), SRGP_defPoint(200, 280));
    SRGP_polyLineCoord(12, xArray, yArray);
    SRGP_polyMarkerCoord(12, xArray, yArray);
}

function drawBowtie() {
    const vertices = [
        SRGP_defPoint(100, 100),
        SRGP_defPoint(100, 60),
        SRGP_defPoint(120, 76),
        SRGP_defPoint(140, 60),
        SRGP_defPoint(140, 100),
        SRGP_defPoint(120, 84),
        SRGP_defPoint(100, 100),
    ];
    SRGP_polygon(vertices.length, vertices);
}

function drawRectangle() {
    SRGP_rectangle(SRGP_defRectangle(50, 25, 225, 125));
}

function drawEllipse() {
    SRGP_rectangle(SRGP_defRectangle(50, 25, 225, 125));
    SRGP_ellipseArc(
        SRGP_defRectangle(50, 25, 225, 125),
        Math.PI / 4,
        1.5 * Math.PI,
    );
}

function drawLines() {
    SRGP_setLineWidth(5);
    SRGP_setLineStyle(LineStyle.CONTINUOUS);
    SRGP_lineCoord(55, 5, 55, 295);

    SRGP_setLineStyle(LineStyle.DASHED);
    SRGP_setLineWidth(10);
    SRGP_lineCoord(105, 5, 155, 295);

    SRGP_setLineStyle(LineStyle.DOTTED);
    SRGP_setLineWidth(15);
    SRGP_lineCoord(155, 5, 285, 255);
}

function onDemoClicked(e: Event) {
    reset();

    const target = e.target as HTMLButtonElement;
    const demoName = target.dataset["demoname"];
    switch (demoName) {
        case "drawChart":
            drawChart();
            break;
        case "drawBowtie":
            drawBowtie();
            break;
        case "drawRectangle":
            drawRectangle();
            break;
        case "drawEllipse":
            drawEllipse();
            break;
        case "drawLines":
            drawLines();
            break;
        case "setBackgroundRed":
            SRGP_setBackgroundColor(ColorIndex.Red);
            break;
        case "setBackgroundGreen":
            SRGP_setBackgroundColor(ColorIndex.Green);
            break;
        default:
            break;
    }
}

const buttons = document.querySelectorAll("div[class='toolbar'] .button");
buttons.forEach((b: HTMLButtonElement) =>
    b.addEventListener("click", onDemoClicked),
);
