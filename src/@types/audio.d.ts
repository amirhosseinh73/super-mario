import AudioBoard from "../AudioBoard";

export type AudioNames = "jump" | "coin" | "stomp";

export type AudioFileNames = "mario";

interface GameContext {
    audioContext: AudioContext;
    deltaTime: number;
}

interface AudioInterface {
    fx: {
        [key in AudioNames]: {
            url: string;
        };
    };
}
