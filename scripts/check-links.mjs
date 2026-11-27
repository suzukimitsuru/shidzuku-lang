// 文書のリンクを確かめる。
//
// - Markdown(.md)のリンクと <a href>: リンク先のファイルかフォルダが在るか。空白が %20 になっているか
// - docs/roadmap.html と docs/areas/**/roadmap.js の href・src: docs/roadmap.html から見た相対パスで在るか
// - roadmap.js の断片: id を作らない。本文に逆引用符と、ドル記号と波括弧の組を書かない
//
// 外のサイト(http・https・mailto)と、ページの中の見出し(#…)は確かめない。
// 使い方: node scripts/check-links.mjs(問題が無ければ終了コード 0)

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, relative, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const docs = join(root, "docs");

// 確かめないもの。docs/dev-memo.md は書き手の覚え書きなので外す(.markdownlint-cli2.jsonc と揃える)
const skipDirs = new Set(["node_modules", ".git", ".claude", "target"]);
const skipFiles = new Set([join(docs, "dev-memo.md")]);

const problems = [];
const report = (file, line, message) =>
  problems.push(`${relative(root, file)}:${line}: ${message}`);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (skipDirs.has(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (!skipFiles.has(path)) out.push(path);
  }
  return out;
}

const lineOf = (text, index) => text.slice(0, index).split("\n").length;

// コードの中の文字は、同じ長さの空白に置き換える(行の番号を変えないため、改行は残す)
const blank = (s) => s.replace(/[^\n]/g, " ");
function stripMarkdownCode(text) {
  return text
    .replace(/^( {0,3})(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\2[ \t]*$/gm, blank)
    .replace(/(`+)[^`\n][\s\S]*?\1/g, blank);
}

function isExternal(target) {
  return /^(https?:|mailto:)/.test(target) || target.startsWith("#");
}

function checkTarget(file, line, target, baseDir) {
  if (isExternal(target)) return;
  const path = target.split("#")[0];
  if (path === "") return;
  if (/\s/.test(path)) {
    report(file, line, `リンク先に空白がある(%20 に置き換える): ${target}`);
    return;
  }
  let decoded;
  try {
    decoded = decodeURIComponent(path);
  } catch {
    report(file, line, `リンク先を読めない: ${target}`);
    return;
  }
  const resolved = normalize(join(baseDir, decoded));
  if (!existsSync(resolved)) report(file, line, `リンク切れ: ${target}`);
}

const files = walk(root);

// Markdown
for (const file of files.filter((f) => f.endsWith(".md"))) {
  const text = stripMarkdownCode(readFileSync(file, "utf8"));
  const base = dirname(file);
  // [文字](リンク先) と [文字](<リンク先>)。リンク先の後ろの "題" は除く
  for (const m of text.matchAll(/\]\(\s*(<[^>]*>|[^()\s]*(?:\([^()]*\)[^()\s]*)*(?:\s[^)"']*)?)(?:\s+["'][^"']*["'])?\s*\)/g)) {
    let target = m[1].trim();
    if (target.startsWith("<")) target = target.slice(1, -1);
    checkTarget(file, lineOf(text, m.index), target, base);
  }
  for (const m of text.matchAll(/<a\s[^>]*href="([^"]*)"/g)) {
    checkTarget(file, lineOf(text, m.index), m[1], base);
  }
}

// 道のりの図と、そこへ差し込む断片。どちらも docs/roadmap.html から見た相対パス
const roadmapFiles = files.filter(
  (f) => f === join(docs, "roadmap.html") || (f.startsWith(join(docs, "areas")) && f.endsWith("roadmap.js")),
);
for (const file of roadmapFiles) {
  const text = readFileSync(file, "utf8");
  for (const m of text.matchAll(/\b(?:href|src)="([^"]*)"/g)) {
    // 本体のスクリプトが組み立てるリンク(' + esc(path) + ' の形)は確かめない
    if (/['+]/.test(m[1])) continue;
    checkTarget(file, lineOf(text, m.index), m[1], docs);
  }
  if (!file.endsWith("roadmap.js")) continue;
  // children に並べた下位の領域が、README.md と roadmap.js を持って在るか
  const children = text.match(/children:\s*\[([\s\S]*?)\]/);
  for (const name of children ? children[1].matchAll(/"([^"]+)"/g) : []) {
    for (const part of ["README.md", "roadmap.js"]) {
      if (!existsSync(join(dirname(file), name[1], part))) {
        report(file, lineOf(text, text.indexOf(`"${name[1]}"`)), `下位の領域に ${part} が無い: ${name[1]}`);
      }
    }
  }
  if (/html:\s*""/.test(text)) continue;
  const html = text.match(/html:\s*`([\s\S]*?)`\s*,?\s*\}\s*\)\s*;?\s*$/);
  if (!html) {
    report(file, 1, "html の断片が見つからない(本文に逆引用符を書いていないか確かめる)");
    continue;
  }
  const start = text.indexOf(html[1]);
  for (const m of html[1].matchAll(/\sid="/g)) {
    report(file, lineOf(text, start + m.index), "断片の中で id を作っている");
  }
  for (const m of html[1].matchAll(/\$\{/g)) {
    report(file, lineOf(text, start + m.index), "本文にドル記号と波括弧の組がある");
  }
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  console.error(`\n${problems.length} 件の問題がある`);
  process.exit(1);
}
const count = files.filter((f) => f.endsWith(".md")).length + roadmapFiles.length;
console.log(`リンクの問題は無い(${count} ファイル)`);
