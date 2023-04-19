import { Result, Ok, Err } from "ts-features";

export function initWebGL(canvas: HTMLCanvasElement): Result<WebGL2RenderingContext, string> {
    const gl = canvas.getContext('webgl2');
    if (!gl) {
        return Err('Unable to initialize WebGL. Your browser or machine may not support it.');
    }
    
    return Ok(gl);
}