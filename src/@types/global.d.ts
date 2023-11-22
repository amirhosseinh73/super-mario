import { AudioBoard } from "../main";

export type Position = {
    x: number;
    y: number;
};

export type ButtonActions = "left" | "right" | "jump" | "speed";

interface GameContext {
    audioBoard: AudioBoard;
    deltaTime: number;
}
