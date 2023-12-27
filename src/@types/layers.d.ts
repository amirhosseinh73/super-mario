// type LengthOfString<
//   S extends string,
//   Acc extends 0[] = []
// > = S extends `${string}${infer $Rest}`
//   ? LengthOfString<$Rest, [...Acc, 0]>
//   : Acc["length"];

// type IsStringOfLength<S extends string, Length extends number> = LengthOfString<S> extends Length ? true : false

// type ValidExample = IsStringOfLength<'json', 4>
// type InvalidExapmple = IsStringOfLength<'xml', 4>

// type ColorHex = IsStringOfLength<"000000", 6>

// type FixedString<N extends number> = { 0: string, length: N } & string;

// type ColorHex = FixedString<6>

// type Hex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | "a" | "b" | "c" | "d" | "e" | "f";

// type ColorHex = `${Hex}${Hex}${Hex}${Hex}${Hex}${Hex}`;

type Hex =
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "a"
    | "b"
    | "c"
    | "d"
    | "e"
    | "f";

type ColorHex = `#${Hex}${Hex}${Hex}`;

function setColor(hx: ColorHex) {
    return hx;
}
