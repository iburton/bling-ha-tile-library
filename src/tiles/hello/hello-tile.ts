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
    const entityId = this.config.entity;
    const entityState = entityId
      ? this.hass?.states[entityId]?.state ?? "unknown"
      : "no entity";
    const entityName =
      entityId && this.hass?.states[entityId]?.attributes?.friendly_name
        ? this.hass.states[entityId].attributes.friendly_name
        : entityId ?? "No entity selected";
    const icon = this.config.icon ?? "mdi:party-popper";
    const showEntityName = this.config.show_entity_name ?? true;

    return html`
      <ha-card>
        <div class="content">
          <div class="header">
            <ha-icon class="icon" .icon=${icon}></ha-icon>
            <div class="title">${title}</div>
          </div>
          <div class="greeting">${greeting}</div>
          ${showEntityName
            ? html`<div class="entity">${entityName}</div>`
            : html``}
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

    .header {
      align-items: center;
      display: flex;
      gap: 8px;
      margin-bottom: 8px;
    }

    .icon {
      color: var(--primary-text-color);
      height: 20px;
      width: 20px;
    }

    .title {
      font-size: 16px;
      font-weight: 600;
    }

    .greeting {
      font-size: 14px;
      margin-bottom: 8px;
    }

    .entity {
      color: var(--secondary-text-color);
      font-size: 12px;
      margin-bottom: 6px;
    }

    .state {
      color: var(--secondary-text-color);
      font-size: 12px;
    }
  `;
}
