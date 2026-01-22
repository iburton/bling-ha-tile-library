import "./tiles/hello/hello-tile";
import "./tiles/high-value-power/high-value-power-editor";
import "./tiles/high-value-power/high-value-power-tile";
import { CARD_VERSION } from "./shared/version";

interface CustomCardEntry {
  type: string;
  name: string;
  description: string;
}

declare global {
  interface Window {
    customCards?: CustomCardEntry[];
  }
}

const cards: CustomCardEntry[] = [
  {
    type: "bling-hello-tile",
    name: "Bling Hello Tile",
    description: "A simple starter tile from the Bling HA Tile Library.",
  },
  {
    type: "bling-high-value-power-tile",
    name: "Bling High Value Power Tile",
    description: "Track high power consumers with week, month, and year totals.",
  },
];

window.customCards = window.customCards ?? [];
window.customCards.push(...cards);

console.info(`Bling HA Tile Library ${CARD_VERSION}`);
