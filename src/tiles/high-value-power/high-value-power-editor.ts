import { css, html, LitElement, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { LovelaceCardEditor } from "custom-card-helpers";
import type { HomeAssistant } from "../../shared/ha-types";
import type { BlingHighValuePowerTileConfig } from "./types";

@customElement("bling-high-value-power-tile-editor")
export class BlingHighValuePowerTileEditor
  extends LitElement
  implements LovelaceCardEditor
{
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private config?: BlingHighValuePowerTileConfig;

  public setConfig(config: BlingHighValuePowerTileConfig): void {
    this.config = { ...config };
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html``;
    }

    return html`
      <div class="form">
        <ha-textfield
          label="Name"
          .value=${this.config.name ?? ""}
          @input=${this.handleTextInput("name")}
        ></ha-textfield>
        <ha-textfield
          label="Icon (MDI)"
          .value=${this.config.icon ?? ""}
          @input=${this.handleTextInput("icon")}
        ></ha-textfield>
        <ha-textfield
          label="On threshold"
          type="number"
          .value=${this.config.threshold ?? ""}
          @input=${this.handleThresholdInput}
        ></ha-textfield>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config.current_entity ?? ""}
          .label=${"Current power entity"}
          .includeDomains=${["sensor"]}
          @value-changed=${this.handleEntityChanged("current_entity")}
        ></ha-entity-picker>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config.week_entity ?? ""}
          .label=${"Week total entity"}
          .includeDomains=${["sensor"]}
          @value-changed=${this.handleEntityChanged("week_entity")}
        ></ha-entity-picker>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config.month_entity ?? ""}
          .label=${"Month total entity"}
          .includeDomains=${["sensor"]}
          @value-changed=${this.handleEntityChanged("month_entity")}
        ></ha-entity-picker>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config.year_entity ?? ""}
          .label=${"Year total entity"}
          .includeDomains=${["sensor"]}
          @value-changed=${this.handleEntityChanged("year_entity")}
        ></ha-entity-picker>
      </div>
    `;
  }

  private handleTextInput(
    key: "name" | "icon",
  ): (event: Event) => void {
    return (event: Event) => {
      const target = event.target as HTMLInputElement;
      const value = target.value.trim();
      this.updateConfig(key, value ? value : undefined);
    };
  }

  private handleThresholdInput = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    const rawValue = target.value;
    if (!rawValue) {
      this.updateConfig("threshold", undefined);
      return;
    }
    const parsed = Number.parseFloat(rawValue);
    this.updateConfig("threshold", Number.isFinite(parsed) ? parsed : undefined);
  };

  private handleEntityChanged(
    key: "current_entity" | "week_entity" | "month_entity" | "year_entity",
  ): (event: CustomEvent<{ value: string }>) => void {
    return (event: CustomEvent<{ value: string }>) => {
      this.updateConfig(key, event.detail.value || undefined);
    };
  }

  private updateConfig(
    key: keyof BlingHighValuePowerTileConfig,
    value: BlingHighValuePowerTileConfig[keyof BlingHighValuePowerTileConfig],
  ): void {
    if (!this.config) {
      return;
    }
    const nextConfig = {
      ...this.config,
      [key]: value,
    };
    this.config = nextConfig;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: nextConfig },
      }),
    );
  }

  static styles = css`
    :host {
      display: block;
    }

    .form {
      display: grid;
      gap: 12px;
    }

    ha-textfield,
    ha-entity-picker {
      width: 100%;
    }
  `;
}
