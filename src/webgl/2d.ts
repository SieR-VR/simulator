import { Result, Ok, Err } from "ts-features";

export function initWebGL2D(canvas: HTMLCanvasElement): Result<CanvasRenderingContext2D, string> {
    const gl = canvas.getContext('2d');
    if (!gl) {
        return Err('Unable to initialize WebGL. Your browser or machine may not support it.');
    }
    
    return Ok(gl);
}
