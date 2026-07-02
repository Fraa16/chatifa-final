# Phase 2 — UX/UI-Redesign Startseite: Change-Log

Branch: `claude/md-file-pdf-refs-wkerwu` · Datum: 2026-07-02
Scope: nur `index.html` (plus generiertes `dist/`). Richtung B ("Bento als Systemsprache"), von Francesco freigegeben. Farb-Tokens, Typografie, CTAs und bestätigte Copy unverändert.

Referenzen: Infranex und Goldify (Webflow-Templates), analysiert auf Muster, nicht auf Optik übernommen.

## Änderungen

### 1. Pill-Badges für Sektions-Kicker
`.sec-head .kicker` und `.cta-kicker` erhalten die Pill-Behandlung der bestehenden `.hero-badge` (Border, `--r-pill`, Punkt, `--accent-soft`-Hintergrund), ohne Puls-Animation. Betrifft alle sechs Sektions-Labels. Nur CSS, kein Markup geändert.

### 2. Atmosphärischer Hero
Drei großflächige Radial-Gradient-Layer (`.smoke-1/-2/-3`) hinter Orb und Ringen, dazu subtile Körnung (`.grain`, SVG-feTurbulence-Data-URI, Opacity .12). Langsame Drift-Animationen (26–34s, alternierend), abgeschaltet bei `prefers-reduced-motion`. Ausschließlich aus `--glow-rgb` und Weiß-Anteilen unter 3 % aufgebaut, keine neuen Farben.

### 3. `#problem` als asymmetrisches Bento
Zelle 01 ("Besucher müssen suchen") spannt 2×2 und erhält ein statisches Inline-SVG in der Diagramm-Sprache der `#core`-Karten (umherirrender gestrichelter Pfad durch verstreute Inhaltsblöcke, endend an einem Fragezeichen-Knoten mit Pill "Wo ist der nächste Schritt?"). Zellen 02/03 bleiben minimal und stapeln rechts. Das Callout-Band ist jetzt volle Breite Teil des Grids statt separatem Element. Kartensprache (`.card`, `.grid-bg`, `.card-glow`) unverändert.

### 4. `#why` als Bento mit Quote-Hero-Zelle
Die Quote-Karte (Zitat + "Projekt anfragen") ist jetzt die 2×2-Hero-Zelle oben links, Zitat auf `clamp(24px, 2.6vw, 32px)` vergrößert. Zellen 01/02 stapeln rechts, 03–05 bilden die untere Reihe. Zelle 01 ("Struktur vor Design") erhält als Gewichtung einen leicht akzentuierten Rahmen (`.diff-card-feature`). Alle `#why`-Karten haben jetzt `.card-glow` (Maus-Tracking greift automatisch, das JS selektiert generisch `.card`). Copy der fünf Punkte unverändert; DOM-Reihenfolge geändert (Quote zuerst), Lesereihenfolge bleibt sinnvoll.

### 5. Vergleichsblock "Der Unterschied in der Praxis"
Neu am Ende von `#why`, nach Infranex-Muster: zwei Karten nebeneinander, links "Mit Chatifa" (Pfeil-Zeilen, Akzent-Label), rechts "Klassische Webprojekte" (×-Zeilen, gedämpft in `--t4`). Semantisch zwei Listen, kein `<table>`. Bricht unter 940px auf eine Spalte um.

### 6. `#process` vertikal mit Visual pro Schritt
Die vier Schritte laufen jetzt untereinander (Goldify-Muster): Nummern-Spur links mit vertikaler Verbindungslinie, Text mittig, kleines Visual rechts (280px). Die vier Visuals sind statische Inline-SVGs in der bestehenden Diagramm-Sprache: Bestandsaufnahme (Zeilen-Skelett mit Fokus-Ring), Richtungswahl (Verzweigung mit gewähltem Akzent-Pfad), Umsetzung (abstraktes Seiten-Gerüst), Ausbau (wachsende Balken mit Plus-Knoten). Keine Produkt-/Dashboard-Mockups. Schritt-Copy und `.process-cta` unverändert. Unter 940px rückt das Visual unter den Text, unter 600px verkleinert sich die Nummern-Spur.

### 7. `#cta`-Feinschliff
Ein zusätzlicher Smoke-Layer (`.smoke-cta`) gleicht die Atmosphäre an den Hero an. CTAs und Copy unverändert.

### Responsive
940px: Bento-Hero-Zellen werden full-width, Grids 2-spaltig, Vergleich 1-spaltig. 600px: alles 1-spaltig. Alte `.steps`-Breakpoint-Regeln entfernt.

## Verifikation

- `npm run build` fehlerfrei; Screenshots (Chromium) bei 1440px, 1024px und 390px über die gesamte Seite geprüft: Bento-Spans, Grid-Kollaps, Pill-Badges, Hero-Atmosphäre, Prozess-Visuals, FAQ und Footer intakt.
- Keine Änderungen an Partials oder anderen Seiten. `fonts.css`, Tokens und Copy der bestätigten Startseite unangetastet.
- Reveal-Animationen und Karten-Maus-Glow laufen unverändert (bestehendes JS, keine Änderung nötig).

## Zum Review: Vergleichstabellen-Copy (ENTWURF)

Die zehn Zeilen des Vergleichsblocks und die Zwischenüberschrift "Der Unterschied in der Praxis" sind **neue Positionierungs-Copy** und nicht Teil der bestätigten Startseiten-Copy. Sie sind aus bereits bestätigten Aussagen abgeleitet (Struktur vor Design, Klartext statt Buzzwords, Website + Abläufe zusammendenken, Automatisierung nur mit Nutzen); keine erfundenen Zahlen, Kunden oder Ergebnisse. Im Markup mit `<!-- ENTWURF … -->` gekennzeichnet. Bitte vor Livegang prüfen:

| Mit Chatifa | Klassische Webprojekte |
|---|---|
| Struktur zuerst. Design folgt aus Inhalt und Nutzerführung. | Design zuerst. Die Struktur entsteht nebenbei. |
| Klartext, den Besucher beim ersten Lesen verstehen. | Texte, die gut klingen, aber wenig erklären. |
| Website und interne Abläufe werden zusammen gedacht. | Das Projekt endet mit dem Livegang der Website. |
| Automatisierung nur dort, wo sie Arbeit reduziert. | Tools und Funktionen ohne klaren Nutzen im Alltag. |
| Ein klarer nächster Schritt auf jeder Seite. | Besucher müssen den nächsten Schritt selbst finden. |
