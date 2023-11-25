export default class AudioBoard {
    buffers: Map<AudioNames, AudioBuffer>;

    constructor() {
        this.buffers = new Map();
    }

    public addAudio(name: AudioNames, buffer: AudioBuffer) {
        this.buffers.set(name, buffer);
    }

    public playAudio(name: AudioNames, audioContext: AudioContext) {
        const source = audioContext.createBufferSource();
        source.connect(audioContext.destination);
        source.buffer = this.buffers.get(name) || null;
        source.start(0);
    }
}
