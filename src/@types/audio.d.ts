type AudioFileNames = "mario" | "cannon";
type AudioNames = "jump" | "coin" | "stomp" | "shoot" | "1up";

type AudioType = {
    fx: SoundsFormatType<AudioNames>;
};

type MusicFileNames = "overworld";
type MusicNames = "main" | "hurry";

type MusicType = SoundsFormatType<MusicNames>;

type SoundsFormatType<T> = {
    [key in T]: {
        url: string;
    };
};
