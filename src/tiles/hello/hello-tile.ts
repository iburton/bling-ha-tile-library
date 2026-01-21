import { css, html, LitElement, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "../../shared/ha-types";
import type { BlingHelloTileConfig } from "./types";

@customElement("bling-hello-tile")
export class BlingHelloTile extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private config?: BlingHelloTileConfig;

  public setConfig(config: BlingHelloTileConfig): void {
    if (!config) {
      throw new Error("Invalid configuration.");
    }
    this.config = config;
  }

  public getCardSize(): number {
    return 2;
  }

  protected render(): TemplateResult {
    if (!this.config) {
      return html``;
    }

    const title = this.config.name ?? "Bling Hello";
    const greeting = this.config.greeting ?? "Hello";
    const entityState = this.config.entity
      ? this.hass?.states[this.config.entity]?.state ?? "unknown"
      : "no entity";

    return html`
      <ha-card>
        <div class="content">
          <div class="title">${title}</div>
          <div class="greeting">${greeting}</div>
          <div class="state">${entityState}</div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      padding: 16px;
    }

    .title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .greeting {
      font-size: 14px;
      margin-bottom: 8px;
    }

    .state {
      color: var(--secondary-text-color);
      font-size: 12px;
    }
  `;
}
