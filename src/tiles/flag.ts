import { tileCollisionContextType } from "../TileCollider";
// import { Sides } from "../defines";

function handleX({ entity }: tileCollisionContextType) {
    if (entity.vel.x > 0) {
        // if (entity.bounds.right > match.x1) {
        //     entity.obstruct(Sides.RIGHT, match);
        // }
        console.log("touched");
    }
}

const flag = [handleX, handleX];

export default flag;
