import { MarkerStyle, Point } from "./interfaces";
import { SRGP_lineCoord } from "./SRGP_line";
import { getContext, invertCoords, updateContext } from "./utils";

export function SRGP_setMarkerSize(markerSize: number) {
    const { drawing } = getContext();
    updateContext({ drawing: { ...drawing, markerSize } });
}

export function SRGP_setMarkerStyle(style: MarkerStyle) {
    const { drawing } = getContext();
    updateContext({ drawing: { ...drawing, markerStyle: style } });
}

export function SRGP_markerCoord(x: number, y: number) {
    const { x: _x, y: _y } = invertCoords(x, y);

    const { context, drawing } = getContext();

    const markerStyle = drawing.markerStyle;
    const markerSize = drawing.markerSize;

    switch (markerStyle) {
        case MarkerStyle.SQUARE:
            context.beginPath();
            context.fillRect(
                _x - Math.trunc(markerSize / 2),
                _y,
                markerSize,
                markerSize,
            );
            break;
        case MarkerStyle.CROSS:
            context.beginPath();
            SRGP_lineCoord(
                x - markerSize,
                y + markerSize,
                x + markerSize,
                y - markerSize,
            );
            SRGP_lineCoord(
                x + markerSize,
                y + markerSize,
                x - markerSize,
                y - markerSize,
            );
            break;
        case MarkerStyle.CIRCLE:
        default:
            context.beginPath();
            context.ellipse(_x, _y, markerSize, markerSize, 0, 0, 2 * Math.PI);
            context.fill();
            break;
    }
}

export function SRGP_marker(pt: Point) {
    SRGP_markerCoord(pt.x, pt.y);
}
