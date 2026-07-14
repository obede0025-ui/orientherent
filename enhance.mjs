import sharp from 'sharp';
import fs from 'fs';

// Per-photo tuning: dim indoor food shots get a stronger lift than daylight shots.
const plan = {
  'hero-facade.webp':    { brightness: 1.04, saturation: 1.10, sharpen: 1.0 },  // daylight facade
  'bar-neon.webp':       { brightness: 1.08, saturation: 1.12, sharpen: 1.0 },  // indoor bar
  'bar-neon-2.webp':     { brightness: 1.14, saturation: 1.12, sharpen: 1.0 },  // dark lounge
  'interior-lounge.webp':{ brightness: 1.08, saturation: 1.10, sharpen: 1.0 },
  'logo-menu.webp':      { brightness: 1.06, saturation: 1.08, sharpen: 1.2 },  // logo detail: crisp
  'food-durum.webp':     { brightness: 1.12, saturation: 1.16, sharpen: 1.4 },  // dim food shots
  'food-kebabplate.webp':{ brightness: 1.12, saturation: 1.16, sharpen: 1.4 },
  'food-pizza.webp':     { brightness: 1.10, saturation: 1.14, sharpen: 1.4 },
  'food-mojito.webp':    { brightness: 1.05, saturation: 1.10, sharpen: 1.2 },  // already daylight
};

for (const [file, p] of Object.entries(plan)) {
  const src = 'assets/' + file;
  if (!fs.existsSync(src)) { console.log('SKIP (missing):', file); continue; }
  const buf = await sharp(src)
    .modulate({ brightness: p.brightness, saturation: p.saturation })
    .linear(1.06, -6)                       // gentle contrast: lift mids, deepen blacks slightly
    .sharpen({ sigma: p.sharpen })
    .webp({ quality: 85 })
    .toBuffer();
  fs.writeFileSync(src, buf);
  console.log('enhanced:', file, Math.round(buf.length / 1024) + 'KB');
}
