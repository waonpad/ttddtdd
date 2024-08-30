// biome-ignore format:
export const letters = [
  "あ", "い", "う", "え", "お",
  "か", "き", "く", "け", "こ",
  "さ", "し", "す", "せ", "そ",
  "た", "ち", "つ", "て", "と",
  "な", "に", "ぬ", "ね", "の",
  "は", "ひ", "ふ", "へ", "ほ",
  "ま", "み", "む", "め", "も",
  "や",       "ゆ",      "よ",
  "ら", "り", "る", "れ", "ろ",
  "わ",
  "が", "ぎ", "ぐ", "げ", "ご",
  "ざ", "じ", "ず", "ぜ", "ぞ",
  "だ", "ぢ", "づ", "で", "ど",
  "ば", "び", "ぶ", "べ", "ぼ",
  "ぱ", "ぴ", "ぷ", "ぺ", "ぽ"
] as const satisfies string[]

export type TendonRhythmString = `${string}ん${string}ん${string}ん${string}ん ${string}ん${string}ん${string}ん`;

export type TendonString = "てんてんどんどん てんどんどん";

export const createTendonRhythmString = (): TendonRhythmString => {
  const pickerLetters: string[] = new Array(4);
  for (let i = 0; i < 4; i++) {
    pickerLetters[i] = letters[Math.floor(Math.random() * letters.length)];
  }

  const tendonRhythmString =
    `${pickerLetters[0]}ん${pickerLetters[0]}ん${pickerLetters[1]}ん${pickerLetters[1]}ん ${pickerLetters[2]}ん${pickerLetters[3]}ん${pickerLetters[3]}ん` as TendonRhythmString;

  return tendonRhythmString;
};

export const isTendonString = (str: string): str is TendonString => {
  return str === "てんてんどんどん てんどんどん";
};
