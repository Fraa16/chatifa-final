# Phase 1 — Code-Audit: Findings & Change-Log

Branch: `claude/phase-1-scope-1w7yfe` · Datum: 2026-07-02
Scope: rein technisch. Keine visuellen Änderungen, keine Copy-Änderungen (pixelgenau verifiziert, siehe unten).

## Findings (nach Schwere)

### Hoch — behoben
1. **Fonts kamen weiterhin von Google.** `fonts.css` war nie auf Self-Hosting migriert (Kommentar im File: "temporary"). Folgen: render-blockierende 3-Sprung-Kette (HTML → fonts.css → googleapis → gstatic), kein Preload möglich, DSGVO-Risiko (Abmahnfähigkeit bei Google-Fonts-Remote-Einbindung).
2. **714 interne Links mit `.html`-Endung.** Bei `cleanUrls: true` löste jeder interne Klick einen 301-Redirect aus. Canonicals, Sitemap und og:url nutzten bereits Clean URLs.
3. **Tote Footer-Links auf mehreren Seiten.** `href="#"`-Platzhalter für Websites, Automatisierung, Prozess, Kontakt, Glossar, Website-Preiskalkulator, Projekt anfragen sowie die Impressum-/Datenschutz-Selbstverlinkung. Betroffen u. a. index, websites, automatisierung, kontakt, projekt-anfragen, preiskalkulator, beide Rechtsseiten.

### Mittel — behoben
4. Rechtsseiten ohne Meta-Description (Seiten sind bewusst `noindex, nofollow`, daher kein OG/Schema ergänzt — nur Description für Link-Shares).
5. `chatifa-ueber-uns.html` als einzige indexierte Seite ohne Organization-JSON-LD.
6. Kein HowTo-Schema trotz Prozess-Sektionen (in `chatifa-copy` spezifiziert).
7. Keine Twitter-Card-Tags auf keiner Seite.
8. Heading-Hierarchie: Die Desktop-Nav-Panels nutzten `<h3>` für Karten-Labels — fünf Headings vor dem `<h1>` jeder Seite; `chatifa-glossar.html` hatte dadurch als einzige Struktur h1→h3-Sprünge.
9. Build-Skript fragil: kein Clean von `dist/`, `llms.txt` wurde nicht kopiert (lag nur manuell in dist), keine Font-Behandlung. Quelle und Deploy-Output konnten still auseinanderlaufen.

### Niedrig — behoben
10. `og-image_copy.png` → `og-image.png` umbenannt, alle Referenzen aktualisiert.
11. `X-Frame-Options: DENY` und HSTS in `vercel.json` ergänzt.
12. README: Dateiname `chatifa-ueberuns.html` → `chatifa-ueber-uns.html` korrigiert.

### Geprüft — kein Fehler
- **Design-Tokens sind byte-identisch über alle 26 Dateien** (scheinbare Drift war nur Whitespace/Kommentare). Farben und Typo entsprechen exakt der Vorgabe.
- Navbar-Markup semantisch konsistent über alle Seiten (Unterschiede nur Formatierung, `aria-current` und Glossar-Breadcrumbs).
- Alle 51 `<img>`-Tags haben alt-Texte. Keine console.log-Reste. Alle Link-Ziele existieren.
- `ProfessionalService` (Startseite) ist ein Subtyp von `LocalBusiness` — Anforderung erfüllt, keine Änderung nötig.
- `--t3` (#8F827B) auf `--bg`: ~5,6:1 — besteht WCAG AA für Fließtext.

## Nur geflaggt — Entscheidung bei Francesco

- **`--t4` (#6D625D) auf `--bg` ≈ 3,5:1 Kontrast.** Besteht WCAG AA nur für großen/dekorativen Text, nicht für Fließtext (4,5:1 nötig). Aktuelle Nutzung ist überwiegend Captions/Footer/Labels (in Ordnung). Token ist gesperrt — keine Änderung ohne Freigabe.
- **Portfolio-Links auf `chatifa-websites.html`**: "Projekt ansehen →" (2×) und "Alle Projekte ansehen →" zeigen auf `#` — es gibt keine Zielseite. Unverändert gelassen.
- **"Ratgeber"-Links** bleiben absichtlich `#` ("Bald verfügbar").
- **`google-site-verification`** auf der Startseite enthält noch den Platzhalter `REPLACE_WITH_YOUR_VERIFICATION_CODE`.
- **Impressum zitiert "§ 5 TMG"** — das TMG wurde 2024 durch das DDG ersetzt (§ 5 DDG). Copy-Änderung, daher nicht angefasst.
- **README ist insgesamt veraltet** (beschreibt Drag-and-drop-Upload statt Git-Deploy, listet index.html nicht). Nur der Dateinamen-Tippfehler wurde korrigiert.
- **Empfehlung Deploy-Workflow:** `vercel.json` auf `"buildCommand": "npm run build"` umstellen und `dist/` gitignoren — eliminiert das Divergenz-Risiko dauerhaft. Nicht umgesetzt, da es den Deploy-Workflow ändert.
- **Navbar-Formatierungsdrift** (nur Whitespace) wird in Phase 2 normalisiert, wenn die Navbar ohnehin angefasst wird.

## Änderungen pro Commit

| Commit | Inhalt | Dateien |
|---|---|---|
| `d5c87b4` | CLAUDE.md mit gesperrten Brand-/Copy-Regeln | CLAUDE.md |
| `0325592` | Fonts self-hosted: 6 variable woff2 (latin/latin-ext) in `/fonts/`, `fonts.css` auf `@font-face` mit `font-display: swap`, Preload der 2 kritischen Fonts auf jeder Seite | fonts.css, fonts/*, alle 25 Seiten, package.json |
| `0ac7031` | 714 interne Links auf Clean URLs, tote Footer-Links verdrahtet | alle 26 HTML-Dateien |
| `ccd10b6` | Twitter-Cards, HowTo-Schema (index, websites, automatisierung), Organization-JSON-LD auf ueber-uns, Meta-Descriptions Rechtsseiten, og-image umbenannt | 26 Dateien |
| `b3f85f7` | Nav-Panel-`<h3>` → `<p class="t-h3">` (identisches Rendering durch globalen Reset; mobile nutzte bereits `<span>`) | alle 26 HTML-Dateien |
| `e7ad94c` | Build-Skript (clean + llms.txt + fonts), Security-Header, README-Fix, dist neu gebaut | package.json, vercel.json, README.md, dist/* |

## Verifikation

- **Alle 26 Seiten headless geladen (Chromium):** 0 Konsolen-Fehler, 0 Page-Errors, 0 fehlgeschlagene Requests, 0 Requests an googleapis/gstatic. Beide Schriftfamilien laden auf jeder Seite aus `/fonts/`.
- **Interaktionen:** Mega-Menü öffnet/schließt (Hover + Escape), Hamburger-Menü mobil öffnet/schließt, Scroll-Reveal feuert (30/30 Elemente), Preiskalkulator-Kacheln registrieren Auswahl (`aria-pressed`).
- **Headings:** jede Seite exakt ein `<h1>`, keine Ebenen-Sprünge, `<h1>` ist erstes Heading.
- **JSON-LD:** alle Blöcke aller Seiten parsen fehlerfrei.
- **Links:** alle internen Clean-URL-Ziele existieren, keine `.html`-Hrefs mehr.
- **Visueller No-Drift-Beweis:** Vorher/Nachher-Screenshots (1440px, volle Seitenhöhe) von index, chatifa-glossar und chatifa-glossar-cms. Glossar-Seiten byte-identisch; index-Differenz 0,097 % der Pixel, ausschließlich ein JS-animiertes Diagramm, das in unterschiedlichen Animationsframes erwischt wurde.
- **Build:** `npm run build` erzeugt ein dist/, das 1:1 der Quelle entspricht.
