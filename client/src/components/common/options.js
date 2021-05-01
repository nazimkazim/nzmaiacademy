import { v4 as uuidv4 } from 'uuid';

export const langPairOptions = [
  { label: "Choose a language pair", value: 0, id: uuidv4() },
  { label: "English-Russian", value: "English-Russian", id: uuidv4() }
];

export const speakersOptions = [
  { label: "Choose a speaker", value: "" },
  { label: "Speaker 1", value: "Speaker 1" },
  { label: "Speaker 2", value: "Speaker 2" }
];

