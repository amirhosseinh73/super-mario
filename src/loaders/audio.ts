import { AudioFileNames, AudioInterface, AudioNames } from "../@types/audio";
import AudioBoard from "../AudioBoard";
import { loadJSON } from "../loaders";

export async function loadAudioBoard(name: AudioFileNames, audioContext: AudioContext) {
    const loadAudio = createAudioLoader(audioContext);

    const audioSheet = (await loadJSON(`/data/sounds/${name}.json`)) as AudioInterface;

    const audioBoard = new AudioBoard();
    const fx = audioSheet.fx;
    const jobs: Promise<void>[] = [];

    const audioNames = Object.keys(fx) as AudioNames[];

    audioNames.forEach(name => {
        const { url } = fx[name];

        const job = loadAudio(`/assets/audio/${url}`).then(buffer => {
            audioBoard.addAudio(name, buffer);
        });

        jobs.push(job);
    });

    return Promise.all(jobs).then(() => audioBoard);
}

export function createAudioLoader(context: AudioContext) {
    return async function loadAudio(url: string) {
        return fetch(url)
            .then(response => response.arrayBuffer())
            .then(audioBuffer => context.decodeAudioData(audioBuffer));
    };
}
