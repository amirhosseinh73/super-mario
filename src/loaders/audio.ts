export function createAudioLoader(context: AudioContext) {
    return function loadAudio(url: string) {
        return fetch(url)
            .then(response => response.arrayBuffer())
            .then(audioBuffer => context.decodeAudioData(audioBuffer));
    };
}
