import { Point, SRGPGlobalContext } from "./interfaces";

export function getContext(): SRGPGlobalContext {
    return (window as any).SRGP_global;
}

export function updateContext(overrides: any) {
    const currentContext = (window as any).SRGP_global;

    console.log(
        "Current context:",
        currentContext,
        "Update portion:",
        overrides,
    );

    (window as any).SRGP_global = {
        ...currentContext,
        ...overrides,
    };

    const newContext = (window as any).SRGP_global;

    console.log("Updated context:", newContext);
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
