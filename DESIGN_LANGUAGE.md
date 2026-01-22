# Bling HA Tile Library Design Language

## Vision
- Sleek, modern, minimalist, spacious.
- Sharp corners with layered elevation.
- Subtle contrast, clean iconography, and calm surfaces.

## Color System
### Accents (from provided palette)
- Primary accent (teal): `#3A7173`
- Secondary accent (mint): `#C3DFD8`
- Warm accent (orange): `#F05F30`
- Alert accent (brick): `#6B210E`
- Soft accent (sand): `#F6DC91`

### Light palette (air greys + accents)
- Background: `#F6F7F9`
- Surface: `#FFFFFF`
- Surface alt: `#F1F3F5`
- Border: `#E3E6EA`
- Text primary: `#1C1F23`
- Text secondary: `#5A6169`
- Text muted: `#8B949E`

### Dark palette (derived, neutral)
- Background: `#111315`
- Surface: `#171A1D`
- Surface alt: `#1E2226`
- Border: `#2A2F35`
- Text primary: `#F3F5F7`
- Text secondary: `#C5CBD1`
- Text muted: `#9AA3AC`

### Accent usage rules
- Use teal as the default highlight for interactive and primary states.
- Use mint as subtle backgrounds, chips, or secondary highlights.
- Use orange for active states, warnings, and emphasis.
- Use brick sparingly for critical alerts.
- Use sand for soft badges or warm highlights.
- Do not use more than two accent colors in a single tile.

## Typography
- Title: 16px, weight 600
- Body: 14px, weight 400
- Caption: 12px, weight 400
- Labels: 11px, weight 500

## Spacing
Spacing scale (px): 4, 8, 12, 16, 20, 24, 32
- Card padding: 16
- Section gaps: 12 to 16
- Inline gaps: 6 to 8

## Radius (sharp)
Radius scale (px): 2, 4, 6
- Cards: 6
- Chips and badges: 4
- Buttons and toggles: 4

## Elevation (layered)
- Level 1: `0 1px 2px rgba(16, 20, 24, 0.06)`
- Level 2: `0 6px 16px rgba(16, 20, 24, 0.08)`
- Level 3: `0 12px 24px rgba(16, 20, 24, 0.12)`
- Cards default to Level 2; small elements use Level 1.

## Components
### Card
- Background uses Surface.
- Border: 1px solid Border.
- Shadow: Level 2.
- Padding: 16px.

### Header
- Left aligned icon + title.
- Gap 8px between icon and title.

### Icons
- Use a single accent color per tile.
- Size: 18 to 20px.

### Badges and chips
- Use Surface alt for background.
- Use Text secondary for labels.
- Radius: 4px.

### State text
- Primary values use Text primary.
- Secondary states use Text secondary or muted.
- Optional prefix should use muted to avoid competing with the state.

## Accessibility
- Minimum contrast ratio: 4.5:1 for text.
- Avoid accent text on Surface alt unless contrast is validated.
- Use icon + text for status, not color alone.

