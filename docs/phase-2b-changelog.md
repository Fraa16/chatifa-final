# Phase 2b — Bento-System auf Leistungsseiten: Change-Log

Branch: `claude/phase-2b-bento-subpages` · Datum: 2026-07-02
Scope: `chatifa-websites.html` und `chatifa-automatisierung.html` (plus generiertes `dist/`). Übertragung des in Phase 2 auf der Homepage etablierten Systems, 1:1 mit identischen Klassennamen und CSS-Werten. Keine Copy-Änderungen, nur strukturelle Neuanordnung. `index.html`, Partials und alle anderen Seiten unangetastet.

## Änderungen — beide Seiten identisch

### 1. Pill-Badges für Sektions-Kicker
Der Pill-Kicker-Block aus `index.html` (Selektor `.sec-head .kicker, .cta-kicker` + `::before`-Punkt) wurde byte-identisch übernommen. Betrifft alle Sektions-Labels sowie den CTA-Kicker. `.bridge-kicker` (Automatisierung, sitzt in der Karte) bleibt bewusst ohne Pill — analog zum `core-card-kicker` der Homepage.

### 2. Atmosphäre für Sub-Hero und CTA
Der Smoke/Grain-Block aus `index.html` (`.smoke-1/-2/-3/-cta`, Drift-Keyframes, `.grain`, `prefers-reduced-motion`) wurde byte-identisch übernommen. Die kompakten Sub-Heroes nutzen `.smoke-1` + `.smoke-2` + `.grain` (ohne `.smoke-3`, da kein Full-Height-Hero); `#cta` erhält `.smoke-cta` wie auf der Homepage. Orb-Aufbau unverändert darunter.

### 3. `#problem` als asymmetrisches Bento
Exakt die Homepage-Geometrie (`.prob-card-lg` 2×2, `.prob-card-inner`, `.prob-visual`, Callout als Full-Span-Zelle im Grid). Karte 01 erhält je Seite ein eigenes statisches Inline-SVG in der bestehenden Diagramm-Sprache (aria-hidden, keine Text-Claims):
- websites: Angebots-Block ohne Verbindung zum Besucher-Knoten, Pill "Passt das zu mir?"
- automatisierung: Anfrage-Knoten, danach abreißende gestrichelte Kette zu drei Zielen, Pill "Manuell weiterleiten?"

### 4. Responsive
940px: große Bento-Zellen werden full-width, Grids 2-spaltig. 600px: 1 Spalte. Werte identisch zur Homepage.

## Nur chatifa-websites.html

### 5. `#ablauf` vertikal mit Visual pro Schritt
Das horizontale 5-Spalten-`.steps` wurde durch den vertikalen Homepage-Block ersetzt (CSS byte-identisch zu `index.html`: `.steps`, `.step`, vertikale Verbindungslinie, `.step-dot`, `.step-body`, `.step-visual`). Fünf neue dekorative SVGs (Motiv-Varianten in der bestehenden Sprache): Kennenlernen (zwei Knoten im Dialog), Strategie & Struktur (Seitenbaum), Design & Umsetzung (Seiten-Gerüst mit Akzent), Launch (Haken-Knoten), Was danach kommt (wachsende Balken mit Trendlinie). Schritt-Copy und `.process-cta` unverändert. Alte Steps-Breakpoints (940: 3 Spalten, 600: 2, 420: 1) durch die Homepage-Regeln ersetzt.

### 6. `#nach-dem-launch` als Bento
`.post-grid` von uniform 2×2 auf 3 Spalten mit alternierenden Spans: Zeile 1 breit + schmal (Inhalte & SEO / UX & Nutzerführung), Zeile 2 schmal + breit (Technik & Performance / Neue Seiten & Erweiterungen). Neue Klasse `.post-card-wide` (nur Span). Kartensprache und Copy unverändert.

## Nur chatifa-automatisierung.html

### 7. `#einsatz` als Bento mit Hero-Zelle
Erste Use-Case-Karte ("Anfragen qualifizieren") als `.usecase-card-lg` 2×2 (exakte #why-Geometrie der Homepage, 6 Karten = 9 Slots). Padding der Hero-Zelle auf 2.75rem wie die Homepage-Hero-Zellen; Icon und Copy unverändert. Karten 2/3 stapeln rechts, 4–6 bilden die untere Reihe.

## Verifikation

- `npm run build` fehlerfrei.
- Drift-Check per md5 über die kopierten Blöcke (Pill-Kicker, Smoke/Grain, prob-Bento, Steps-CSS): **byte-identisch** über `index.html`, `chatifa-websites.html`, `chatifa-automatisierung.html`.
- Playwright-Screenshots beider Seiten bei 1440/1024/390px: Bento-Spans, Grid-Kollaps, Pill-Badges, Hero-Atmosphäre, vertikaler Ablauf, FAQ und Footer geprüft.
- Bestehendes JS (Reveal, Karten-Maus-Glow, FAQ) unverändert; neue Karten werden vom generischen `.card`-Selektor automatisch erfasst.

## Nur geflaggt — Entscheidung bei Francesco

- **Vergleichstabelle nicht dupliziert** (bleibt Homepage-exklusiv, wie im Brief). Idee für später: auf `chatifa-automatisierung` könnte ein Vergleich "Automatisiert vs. manuell" im selben Layout funktionieren — wäre Phase-3-Copy, nicht umgesetzt.
- Review-Hinweis: alle drei Seiten nebeneinander im Vercel-Preview öffnen — der Test ist, ob es sich wie eine Seite anfühlt.
