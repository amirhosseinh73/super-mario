import { EntityWithTraits } from "./@types/traits";
import InputRouter from "./InputRouter";

export const jumpAction = function (keyState: boolean, router: InputRouter) {
    if (keyState) router.route((entity: EntityWithTraits) => entity.jump.start());
    else router.route((entity: EntityWithTraits) => entity.jump.cancel());
};

export const speedAction = function (keyState: boolean, router: InputRouter) {
    router.route((entity: EntityWithTraits) => entity.turbo && entity.turbo(keyState));
};

export const moveRightAction = function (keyState: boolean, router: InputRouter) {
    router.route((entity: EntityWithTraits) => (entity.go.dir += keyState ? 1 : -1));
};

export const moveLeftAction = function (keyState: boolean, router: InputRouter) {
    router.route((entity: EntityWithTraits) => (entity.go.dir += keyState ? -1 : 1));
};
