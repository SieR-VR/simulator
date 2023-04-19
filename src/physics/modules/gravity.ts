import { Module } from "../module";
import { Force } from "..";

export const gravity: Module<"gravity", {}> = {
    name: "gravity",
    init(target) {
        return {
            ...target,
            gravity: {},
        };
    },
    after(particles, deltaTime) {
        const forces: Force[] = [];

        particles.forEach(particleFirst => {
            particles.forEach(particleSecond => {
                if (particleFirst.id === particleSecond.id)
                    return;

                const distance = Math.sqrt(
                    Math.pow(particleFirst.position.x - particleSecond.position.x, 2) +
                    Math.pow(particleFirst.position.y - particleSecond.position.y, 2)
                );

                const force = particleFirst.mass * particleSecond.mass / Math.pow(distance, 2);
                
                forces.push({
                    target: particleFirst.id,
                    x: force * (particleSecond.position.x - particleFirst.position.x) / distance,
                    y: force * (particleSecond.position.y - particleFirst.position.y) / distance,
                });
            });
        });

        return forces; 
    }
}