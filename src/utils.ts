import { Point, SRGPGlobalContext } from "./interfaces";

export function getContext(): SRGPGlobalContext {
    return (window as any).SRGP_global;
}

export function updateContext(overrides: any) {
    (window as any).SRGP_global = {
        ...(window as any).SRGP_global,
        ...overrides,
    };
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
