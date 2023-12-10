import { tileCollisionContextType } from "../TileCollider";

function handle({ entity, match, resolver }: tileCollisionContextType) {
    console.log("Coin Collected");

    if (entity.player) {
        entity.player.addCoins(1);
        const grid = resolver.matrix;
        grid.delete(match.indexX, match.indexY);
    }
}

const coin = [handle, handle];

export default coin;
