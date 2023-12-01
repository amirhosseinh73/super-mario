type AudioNames = "jump" | "coin" | "stomp" | "shoot";

type AudioFileNames = "mario" | "cannon";

interface AudioInterface {
    fx: {
        [key in AudioNames]: {
            url: string;
        };
    };
}
