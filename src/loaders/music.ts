import MusicPlayer from "../MusicPlayer";
import { loadJSON } from "../loaders";

export async function loadMusicSheet(name: MusicFileNames) {
    const musicSheet = (await loadJSON(`/data/music/${name}.json`)) as MusicType;

    const musicPlayer = new MusicPlayer();
    for (const [name, track] of Object.entries(musicSheet)) {
        musicPlayer.addTrack(name as MusicNames, track.url);
    }

    return musicPlayer;
}
