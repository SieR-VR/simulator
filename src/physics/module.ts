import { Force, Particle, ParticleBase, Vector } from ".";

export interface Module<Key extends string, Prop> {
    name: string;
    init(target: ParticleBase): Particle<Key, Prop>;
    after(particles: Particle<Key, Prop>[], deltaTime: number): Force[];
}

export class PhysicsSystem {
    particles: ParticleBase[] = [];
    constructor(public modules: Module<string, any>[]) {}

    addParticle(position: Vector, velocity: Vector, mass: number): PhysicsSystem {
        const particle = this.modules.reduce((acc, module) => module.init(acc), { 
            id: this.particles.length,
            mass,
            position,
            velocity
        });

        this.particles.push(particle);
        return this;
    }

    after(deltaTime: number): PhysicsSystem {
        const forces = this.modules.reduce((acc, module) => acc.concat(module.after(this.particles, deltaTime)), [] as Force[]);
        
        for (const force of forces) {
            const particle = this.particles[force.target];
            particle.velocity.x += force.x * deltaTime / particle.mass;
            particle.velocity.y += force.y * deltaTime / particle.mass;
        }

        for (const particle of this.particles) {
            particle.position.x += particle.velocity.x * deltaTime;
            particle.position.y += particle.velocity.y * deltaTime;
        }
        
        return this;
    }

    getParticles(): ParticleBase[] {
        return this.particles;
    }
}

export function createPhysicsSystem(modules: Module<string, any>[]) {
    return new PhysicsSystem(modules);
} 