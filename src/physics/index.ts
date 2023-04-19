export interface Vector {
    x: number;
    y: number;
}

export interface ParticleBase { 
    id: number;
    mass: number;
    position: Vector;
    velocity: Vector;
};

export type Particle<Key extends string, Prop> = ParticleBase & { [K in Key]: Prop; };
export interface Force {
    target: number;
    x: number;
    y: number;
}