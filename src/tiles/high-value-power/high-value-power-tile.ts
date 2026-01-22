import { css, html, LitElement, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "../../shared/ha-types";
import type { BlingHighValuePowerTileConfig } from "./types";

@customElement("bling-high-value-power-tile")
export class BlingHighValuePowerTile extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private config?: BlingHighValuePowerTileConfig;

  public static getStubConfig(): BlingHighValuePowerTileConfig {
    return {
      type: "custom:bling-high-value-power-tile",
      name: "High Value Consumer",
      icon: "mdi:flash",
      threshold: 0,
    };
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("bling-high-value-power-tile-editor");
  }

  public setConfig(config: BlingHighValuePowerTileConfig): void {
    if (!config) {
      throw new Error("Invalid configuration.");
    }
    this.config = config;
  }

  public getCardSize(): number {
    return 3;
  }

  protected render(): TemplateResult {
    if (!this.config) {
      return html``;
    }

    const currentEntityId = this.config.current_entity;
    const currentEntity = currentEntityId
      ? this.hass?.states[currentEntityId]
      : undefined;
    const title =
      this.config.name ??
      currentEntity?.attributes?.friendly_name ??
      "High Value Consumer";
    const icon = this.config.icon ?? "mdi:flash";
    const threshold = this.config.threshold ?? 0;
    const currentValue = this.getNumericState(currentEntityId);
    const isOn = Number.isFinite(currentValue) && currentValue > threshold;

    return html`
      <ha-card>
        <div class="content">
          <div class="header">
            <ha-icon
              class=${isOn ? "icon icon--on" : "icon icon--off"}
              .icon=${icon}
            ></ha-icon>
            <div class="title">${title}</div>
          </div>
          <div class="stats">
            ${this.renderStat("Power", this.formatEntityState(currentEntityId))}
            ${this.renderStat(
              "Week",
              this.formatEntityState(this.config.week_entity),
            )}
            ${this.renderStat(
              "Month",
              this.formatEntityState(this.config.month_entity),
            )}
            ${this.renderStat(
              "Year",
              this.formatEntityState(this.config.year_entity),
            )}
          </div>
        </div>
      </ha-card>
    `;
  }

  private renderStat(label: string, value: string): TemplateResult {
    return html`
      <div class="stat">
        <div class="stat__label">${label}</div>
        <div class="stat__value">${value}</div>
      </div>
    `;
  }

  private getNumericState(entityId?: string): number {
    const entity = entityId ? this.hass?.states[entityId] : undefined;
    if (!entity) {
      return Number.NaN;
    }
    const value = Number.parseFloat(entity.state);
    return Number.isFinite(value) ? value : Number.NaN;
  }

  private formatEntityState(entityId?: string): string {
    const entity = entityId ? this.hass?.states[entityId] : undefined;
    if (!entity) {
      return "Not configured";
    }
    const unit = entity.attributes?.unit_of_measurement;
    return unit ? `${entity.state} ${unit}` : entity.state;
  }

  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      border: 1px solid var(--divider-color, #e3e6ea);
      border-radius: 6px;
      box-shadow: var(--ha-card-box-shadow, 0 6px 16px rgba(16, 20, 24, 0.08));
      padding: 16px;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .header {
      align-items: center;
      display: flex;
      gap: 8px;
    }

    .icon {
      height: 20px;
      width: 20px;
    }

    .icon--on {
      color: var(--primary-color, #3a7173);
    }

    .icon--off {
      color: var(--secondary-text-color, #8b949e);
    }

    .title {
      color: var(--primary-text-color, #1c1f23);
      font-size: 16px;
      font-weight: 600;
    }

    .stats {
      display: grid;
      gap: 12px;
    }

    .stat {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .stat__label {
      color: var(--secondary-text-color, #5a6169);
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    .stat__value {
      color: var(--primary-text-color, #1c1f23);
      font-size: 14px;
      font-weight: 400;
    }
  `;
}
