interface SRGPDrawingContext {
    markerStyle: MarkerStyle;
    markerSize: number;
}

export interface SRGPGlobalContext {
    out: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    drawing: SRGPDrawingContext;
}

export interface Point {
    x: number;
    y: number;
}

export interface Rectangle {
    bottomLeft: Point;
    topRight: Point;
}

export enum LineStyle {
    CONTINUOUS,
    DASHED,
    DOTTED,
}

export enum MarkerStyle {
    CIRCLE,
    SQUARE,
    CROSS,
}

export enum ColorIndex {
    White = 0,
    Black,
    Grey,
    Red,
    Orange,
    Yellow,
    Green,
    Blue,
    Purple,
    Brown,
    Pink,
    YellowGreen,
    BlueGreen,
    RedOrange,
    YellowOrange,
    RedViolet,
}
