import { EntityWithTraits } from "./@types/traits";

export const jumpAction = function (mario: EntityWithTraits, keyState: boolean) {
    if (keyState) mario.jump.start();
    else mario.jump.cancel();
};

export const speedAction = function (mario: EntityWithTraits, keyState: boolean) {
    if (mario.turbo) mario.turbo(keyState);
};

export const moveRightAction = function (mario: EntityWithTraits, keyState: boolean) {
    mario.go.dir += keyState ? 1 : -1;
};

export const moveLeftAction = function (mario: EntityWithTraits, keyState: boolean) {
    mario.go.dir += keyState ? -1 : 1;
};
