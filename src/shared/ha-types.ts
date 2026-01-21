import type { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";

export type { HomeAssistant };

export interface BlingTileConfig extends LovelaceCardConfig {
  name?: string;
  entity?: string;
}
