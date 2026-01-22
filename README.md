## Bling HA Tile Library

Bling HA Tile Library is a Home Assistant Lovelace custom tile set. It ships as a single JS file containing multiple tiles.

### Installation (HACS)
- Add this repository to HACS as a custom frontend repository.
- Install "Bling HA Tile Library".
- Add the resource:
  - URL: `/hacsfiles/bling-ha-tile-library/bling-ha-tile-library.js`
  - Type: `module`

### Installation (Manual)
1. Copy `bling-ha-tile-library.js` into `/config/www/`.
2. In Home Assistant, add a resource:
   - URL: `/local/bling-ha-tile-library.js`
   - Type: `module`

### Available tiles
#### Bling Hello Tile
```
type: custom:bling-hello-tile
name: Welcome
entity: sensor.living_room_temperature
greeting: Hello from Bling!
```

#### Bling High Value Power Tile
Configure this tile using the UI editor (recommended). Optional YAML:
```
type: custom:bling-high-value-power-tile
name: High Value Consumer
current_entity: sensor.panel_power
week_entity: sensor.panel_energy_week
month_entity: sensor.panel_energy_month
year_entity: sensor.panel_energy_year
threshold: 500
icon: mdi:flash
```

### Development
```
npm install
npm run build
```
