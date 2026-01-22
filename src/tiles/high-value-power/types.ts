import type { BlingTileConfig } from "../../shared/ha-types";

export interface BlingHighValuePowerTileConfig extends BlingTileConfig {
  type: "custom:bling-high-value-power-tile";
  current_entity?: string;
  week_entity?: string;
  month_entity?: string;
  year_entity?: string;
  threshold?: number;
  icon?: string;
}
