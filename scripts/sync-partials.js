#!/usr/bin/env node
/*
 * Schreibt partials/navbar.html und partials/footer.html in alle Quellseiten.
 * Die Partials sind die einzige Quelle für Navbar- und Footer-Markup;
 * dieses Skript läuft vor jedem Build (npm run sync / npm run build).
 *
 * Ersetzt pro Seite:
 *  - den Header-Block: <nav class="nav" …> bis einschließlich des
 *    zugehörigen Mobile-Menüs (liegt je nach Seite im oder hinter dem nav)
 *  - den <footer>…</footer>-Block
 * und setzt aria-current="page" auf jeden Nav-/Footer-Link, dessen href
 * der Clean URL der Seite entspricht.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SKIP = new Set(['chatifa-homepage.html', 'chatifa-navbar.html']);

const navbar = fs.readFileSync(path.join(ROOT, 'partials/navbar.html'), 'utf8').trimEnd();
const footer = fs.readFileSync(path.join(ROOT, 'partials/footer.html'), 'utf8').trimEnd();

// Findet das Ende des Header-Blocks ab Position `start` (Beginn von <nav class="nav").
// Verfolgt die Verschachtelungstiefe von nav/div. Der Block endet, wenn die Tiefe
// wieder 0 ist UND das Mobile-Menü enthalten war; folgt das Mobile-Menü als
// Geschwister-Element direkt auf </nav>, wird es mit eingeschlossen.
function findHeaderEnd(html, start) {
  const tagRe = /<\/?(nav|div)\b[^>]*>/g;
  tagRe.lastIndex = start;
  let depth = 0;
  let sawMobile = false;
  let m;
  while ((m = tagRe.exec(html)) !== null) {
    const tag = m[0];
    if (tag[1] === '/') depth--; else depth++;
    if (tag.includes('id="mobile-menu"')) sawMobile = true;
    if (depth === 0) {
      let end = tagRe.lastIndex;
      // Kommentar direkt hinter dem schließenden Tag (z. B. <!-- /nav -->, <!-- /mobile-menu -->) mitnehmen
      const trail = /^[ \t]*<!--[^>]*-->/.exec(html.slice(end));
      if (trail) end += trail[0].length;
      if (sawMobile) return end;
      // nav geschlossen, Mobile-Menü noch nicht gesehen: folgt es als Geschwister?
      const rest = html.slice(end);
      const next = /^\s*(<!--[^>]*-->\s*)*<div\s+[^>]*class="mobile-menu"/.exec(rest);
      if (!next) return end; // kein Mobile-Menü als Geschwister — Block endet hier
      // weiterparsen, Schleife läuft in den Geschwister-<div> hinein
    }
  }
  return -1;
}

function findFooterEnd(html, start) {
  const end = html.indexOf('</footer>', start);
  return end === -1 ? -1 : end + '</footer>'.length;
}

function markCurrent(block, cleanUrl) {
  // aria-current="page" auf Links zur eigenen Seite (nur exakte href-Treffer)
  return block
    .replace(/ aria-current="page"/g, '')
    .replace(new RegExp('(<a\\s+href="' + cleanUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '")', 'g'), '$1 aria-current="page"');
}

let changed = 0;
for (const file of fs.readdirSync(ROOT).filter(f => f.endsWith('.html') && !SKIP.has(f))) {
  const full = path.join(ROOT, file);
  let html = fs.readFileSync(full, 'utf8');
  const cleanUrl = file === 'index.html' ? '/' : '/' + file.replace(/\.html$/, '');

  const navStart = html.indexOf('<nav class="nav"');
  if (navStart === -1) throw new Error(file + ': <nav class="nav"> nicht gefunden');
  const navEnd = findHeaderEnd(html, navStart);
  if (navEnd === -1) throw new Error(file + ': Ende des Header-Blocks nicht gefunden');
  html = html.slice(0, navStart) + markCurrent(navbar, cleanUrl) + html.slice(navEnd);

  const footStart = html.indexOf('<footer');
  if (footStart === -1) throw new Error(file + ': <footer> nicht gefunden');
  const footEnd = findFooterEnd(html, footStart);
  if (footEnd === -1) throw new Error(file + ': </footer> nicht gefunden');
  html = html.slice(0, footStart) + markCurrent(footer, cleanUrl) + html.slice(footEnd);

  const prev = fs.readFileSync(full, 'utf8');
  if (html !== prev) {
    fs.writeFileSync(full, html);
    changed++;
    console.log('sync: ' + file);
  }
}
console.log('sync-partials: ' + changed + ' Datei(en) aktualisiert');
