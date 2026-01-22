import type { BlingTileConfig } from "../../shared/ha-types";

export interface BlingHelloTileConfig extends BlingTileConfig {
  type: "custom:bling-hello-tile";
  greeting?: string;
  icon?: string;
  show_entity_name?: boolean;
  show_last_changed?: boolean;
  state_prefix?: string;
  state_badge?: boolean;
}
