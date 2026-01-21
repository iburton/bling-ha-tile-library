import type { BlingTileConfig } from "../../shared/ha-types";

export interface BlingHelloTileConfig extends BlingTileConfig {
  type: "custom:bling-hello-tile";
  greeting?: string;
}
