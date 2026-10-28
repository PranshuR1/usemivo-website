// Draws the session receipt to a canvas and returns a PNG blob. Browser only.

export type Receipt = {
  task: string;
  minutes: string;
  date: string;
};

const W = 1080;
const H = 1350;

function fontFamily(cssVar: string, fallback: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
  return v ? `${v}, ${fallback}` : fallback;
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth || !line) {
      line = test;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines);
  let last = kept[maxLines - 1];
  while (last.length > 1 && ctx.measureText(`${last}…`).width > maxWidth) last = last.slice(0, -1);
  kept[maxLines - 1] = `${last}…`;
  return kept;
}

export async function renderReceiptPng(receipt: Receipt): Promise<Blob> {
  const sans = fontFamily("--font-inter", "system-ui, sans-serif");
  const display = fontFamily("--font-instrument-serif", "Georgia, serif");
  try {
    await Promise.all([
      document.fonts.load(`800 40px ${sans}`),
      document.fonts.load(`400 40px ${sans}`),
      document.fonts.load(`italic 40px ${display}`),
    ]);
  } catch {
    // Fall back to the system fonts already in the stacks above.
  }

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");

  ctx.fillStyle = "#161008";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#2a1d14";
  ctx.beginPath();
  ctx.roundRect(90, 150, W - 180, H - 300, 36);
  ctx.fill();

  const x = 170;
  const maxWidth = W - 340;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";

  ctx.fillStyle = "#e29a50";
  ctx.font = `800 40px ${sans}`;
  ctx.fillText("mivo", x, 260);

  ctx.fillStyle = "#a8896f";
  ctx.font = `400 34px ${sans}`;
  ctx.fillText("Study session", x, 360);

  ctx.fillStyle = "#faf3e8";
  ctx.font = `italic 76px ${display}`;
  const taskLines = wrap(ctx, receipt.task, maxWidth, 3);
  taskLines.forEach((l, i) => ctx.fillText(l, x, 460 + i * 92));

  const y = 460 + taskLines.length * 92 + 70;
  ctx.fillStyle = "#faf3e8";
  ctx.font = `800 120px ${sans}`;
  ctx.fillText(receipt.minutes, x, y + 60);

  ctx.fillStyle = "#c8b39b";
  ctx.font = `400 38px ${sans}`;
  ctx.fillText(receipt.date, x, y + 140);

  ctx.fillStyle = "#a8896f";
  ctx.font = `400 34px ${sans}`;
  ctx.fillText("Timer time, not verified", x, y + 215);

  ctx.fillStyle = "#a8896f";
  ctx.font = `400 30px ${sans}`;
  ctx.textAlign = "center";
  ctx.fillText("usemivo.app", W / 2, H - 190);

  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("PNG failed"))), "image/png");
  });
}
