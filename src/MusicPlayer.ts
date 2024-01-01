export default class MusicPlayer {
    tracks: Map<MusicNames, HTMLAudioElement>;

    constructor() {
        this.tracks = new Map();
    }

    public addTrack(name: MusicNames, url: string) {
        const audio = new Audio();
        audio.loop = true;
        audio.src = url;
        this.tracks.set(name, audio);
    }

    public playTrack(name: MusicNames) {
        this.pauseAll();
        const audio = this.tracks.get(name) as HTMLAudioElement;
        audio.play();
        return audio;
    }

    public pauseAll() {
        for (const audio of this.tracks.values()) {
            audio.pause();
        }
    }
}
