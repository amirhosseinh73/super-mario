import MusicPlayer from "./MusicPlayer";

export default class MusicController {
    player: MusicPlayer | null;

    constructor() {
        this.player = null;
    }

    public setPlayer(player: MusicPlayer) {
        this.player = player;
    }

    public playTheme(speed = 1) {
        const audio = this.player?.playTrack("main") as HTMLAudioElement;
        audio.playbackRate = speed;
    }

    public playHurryTheme() {
        const audio = this.player?.playTrack("hurry") as HTMLAudioElement;
        audio.loop = false;
        audio.addEventListener(
            "ended",
            () => {
                this.playTheme(1.5);
            },
            { once: true }
        );
    }
}
