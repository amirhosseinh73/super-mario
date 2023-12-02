import MusicPlayer from "./MusicPlayer";

export default class MusicController {
    player: MusicPlayer | null;

    constructor() {
        this.player = null;
    }

    public setPlayer(player: MusicPlayer) {
        this.player = player;
    }
}
