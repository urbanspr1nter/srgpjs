import { Point, SRGPGloalContext } from "./interfaces";

export function getContext(): SRGPGloalContext {
    return (window as any).SRGP_global;
}

export function invertCoords(x: number, y: number) {
    const context = getContext();
    return {
        x: context.width - (context.width - x),
        y: context.height - y,
    };
}

export function invertPoint(pt: Point) {
    return invertCoords(pt.x, pt.y);
}

export function point(x: number, y: number): Point {
    return { x, y };
}
