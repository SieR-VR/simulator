import { initWebGL2D } from "./webgl/2d";

import { createPhysicsSystem } from "./physics/module";
import { gravity } from "./physics/modules/gravity";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const gl = initWebGL2D(canvas).unwrap();

export function updateViewport(width: number, height: number) {
    gl.setTransform(1, 0, 0, 1, 0, 0);
    gl.translate(width / 2, height / 2);
}

// const physics = createPhysicsSystem([]);
const physics = createPhysicsSystem([gravity]);

function render() {
    gl.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    physics.after(1).getParticles().forEach(particle => {
        particle._renderData = particle._renderData || [];
        particle._renderData.push({ ...particle.position });

        if (particle._renderData.length > 100) {
            particle._renderData.shift();
        }

        gl.fillStyle = 'black';

        particle._renderData.forEach((point, index) => {
            gl.fillStyle = `rgba(0, 0, 0, ${index / 10})`;

            gl.beginPath();
            gl.arc(point.x, point.y, (index) / 10, 0, Math.PI * 2);
            gl.fill()
        })

    });

    requestAnimationFrame(render);
}

physics.addParticle(
    { x: -200, y: 0 },
    { x: 0, y: 10 },
    60000
);

physics.addParticle(
    { x: 100, y: Math.sqrt(3) * 100 },
    { x: Math.sqrt(3) * 5, y: -5 },
    60000
);

physics.addParticle(
    { x: 100, y: -Math.sqrt(3) * 100 },
    { x: -Math.sqrt(3) * 5, y: -5 },
    60000
);


render();