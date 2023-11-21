import { FONT_CHARS_ENUM } from "../defines";

type StringValues<T> = {
    [K in keyof T]: T[K] extends string ? T[K] : never;
}[keyof T];
type EnumAsUnion<T> = `${StringValues<T>}`;

export type FontCharacters = EnumAsUnion<typeof FONT_CHARS_ENUM>;

// const regex = new RegExp(`^[${FONT_CHARS}]$`);
