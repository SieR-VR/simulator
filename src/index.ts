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
    gl.fillStyle = 'black';
    
    physics.after(1).getParticles().forEach(particle => {
        gl.beginPath();
        gl.arc(particle.position.x, particle.position.y, particle.mass, 0, 2 * Math.PI);
        gl.fill();
    });

    requestAnimationFrame(render);
}

for (let i = 0; i < 50; i++) {
    physics.addParticle({ 
        x: (Math.random() - 0.5) * 1000, 
        y: (Math.random() - 0.5) * 1000 
    }, { 
        x: 0, 
        y: 0 
    }, Math.random() * 100);
}

render();