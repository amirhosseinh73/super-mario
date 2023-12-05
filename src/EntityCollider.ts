import Entity from "./Entity";

export default class EntityCollider {
    entities: Set<Entity>;

    constructor(entities: Set<Entity>) {
        this.entities = entities;
    }

    public check(subject: Entity) {
        this.entities.forEach(candidate => {
            if (subject === candidate) return;

            if (!subject.bounds.overlaps(candidate.bounds)) return;

            subject.collides(candidate);
        });
    }
}
