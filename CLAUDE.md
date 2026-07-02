# Chatifa — Projektregeln für Claude

Diese Datei fasst die verbindlichen Vorgaben aus `chatifa-brand` und `chatifa-copy` zusammen. Sie gilt für jede Session in diesem Repo.

## Gesperrt — visuelle Identität (nie ohne explizite Freigabe ändern)

- Farb-Tokens exakt wie definiert: `--bg #050405`, `--surface #0B080A`, `--accent #ED5A26` (Ember-Orange), Textstufen `--t1` bis `--t4`. Kein Purple, Blau, Teal, keine Light-Mode-Sektionen.
- Typografie: `Bricolage Grotesque` (Display) + `Instrument Sans` (Body/UI). Keine dritte Schrift, kein Austausch gegen Inter/DM Sans/Space Grotesk/Systemschriften.
- Keine Emoji in Copy oder UI.

## Gesperrt — Copy-Stimme

- Formelles *Sie*, Deutsch, kurze Sätze (max. zwei Teilsätze vor dem Punkt).
- Verbotene Buzzwords: *innovativ, ganzheitlich, zukunftssicher, maßgeschneidert, state-of-the-art, Synergien, Mehrwert*.
- Keine KI-Prosa-Muster: "In der heutigen digitalen Welt…", "Entdecken Sie…", "Wir begleiten Sie auf Ihrem Weg", dramatische Doppelpunkte, leere Dreierketten wie "schnell, einfach und effektiv".
- Keine Gedankenstriche im Em-Dash-Stil. Punkte oder echte Bindestriche mit Abstand nach bestehendem Muster.
- CTAs sind bestätigt und bleiben: primär "Projekt anfragen", sekundär "Einschätzung einholen →". Nie generisch "Mehr erfahren" / "Jetzt loslegen".
- Bestätigte Startseiten-Copy (`chatifa_startseiten_copy_bestaetigt.txt`) nicht still umschreiben. Änderungsvorschläge separat kennzeichnen.

## Offen für Redesign (Projekt-Scope)

Sektionskomposition, Layout-Rhythmus, Kartensystem, Hero-Muster, Sektionsreihenfolge, Micro-Interactions, Illustration, Motion, visuelle Differenzierung pro Seite. Alles innerhalb des gesperrten Farb-/Typo-Systems. Abweichungen von der "What NOT To Do"-Liste des Brand-Skills vor Umsetzung anmelden.

## Workflow

1. Branch, nie `main`. Review über Vercel-Preview.
2. Phasenweise arbeiten (1: Code-Audit, 2: UX/UI, 3: Sales/Marketing), keine vermischten Sweeps.
3. Vorschlag vor Umsetzung bei allem, was Layout oder Copy berührt. Rein technische Fixes ohne visuelle/Copy-Wirkung dürfen direkt umgesetzt werden, werden aber geloggt.
4. Change-Log pro Session: welche Dateien, was, warum.
5. Scope pro Session eng halten. Nichts außerhalb des vereinbarten Umfangs anfassen.

## Technischer Kontext

- Statische, in sich geschlossene HTML-Seiten (inline CSS/JS pro Datei). Einziges geteiltes Asset: `fonts.css` (+ `/fonts/`).
- Deployment: Vercel serviert das committete `dist/`-Verzeichnis (`vercel.json`: `outputDirectory: "dist"`, `cleanUrls: true`). Nach Quelländerungen `npm run build` ausführen und `dist/` mitcommitten.
- Interne Links: root-absolut und ohne `.html`-Endung (Clean URLs), z. B. `/chatifa-websites`.
- Lokale Entwicklung: `npm run dev` (Port 5173).
