type AudioNames = "jump" | "coin" | "stomp" | "shoot";

type AudioFileNames = "mario" | "cannon";

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
