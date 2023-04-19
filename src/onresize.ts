import { updateViewport } from ".";

const onresize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.width = width;
    canvas.height = height;

    updateViewport(width, height);
}

window.addEventListener('resize', onresize);
onresize();