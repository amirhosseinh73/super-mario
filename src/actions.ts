import Entity from "./Entity";
import InputRouter from "./InputRouter";

export const jumpAction = function (keyState: boolean, router: InputRouter) {
    if (keyState) router.route((entity: Entity) => entity.getTrait("jump").start());
    else router.route((entity: Entity) => entity.getTrait("jump").cancel());
};

export const speedAction = function (keyState: boolean, router: InputRouter) {
    router.route((entity: Entity) => entity.turbo && entity.turbo(keyState));
};

export const moveRightAction = function (keyState: boolean, router: InputRouter) {
    router.route((entity: Entity) => (entity.getTrait("go").dir += keyState ? 1 : -1));
};

export const moveLeftAction = function (keyState: boolean, router: InputRouter) {
    router.route((entity: Entity) => (entity.getTrait("go").dir += keyState ? -1 : 1));
};
