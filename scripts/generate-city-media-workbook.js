// Builds a single-sheet content/image list for each city, ordered by app screen flow.
// Image Path is relative to BLOB_BASE_URL so the sheet stays valid across environments.
// Source: scripts/city-source-content/<city>.js
// Usage: node scripts/generate-city-media-workbook.js [cityCode ...]   (defaults to blr)
const path = require('path');
const fs = require('fs');
const ExcelJS = require('exceljs');

const OUTPUT_FILE = path.join(__dirname, '..', 'docs', 'FlavoursOfGDS-City-Content.xlsx');

const YELLOW = 'FFFFE600';
const DARK = 'FF2E2E38';
const ZEBRA = 'FFF7F7F8';
const RED = 'FFC62828';
const GREEN = 'FF1B7F3B';
const FONT = 'Segoe UI';

// Order the app presents screens in.
const SCREEN_ORDER = ['City Intro', 'City Dashboard', 'Street Food', 'Landmarks', 'Fine Dine', 'Recipe'];

function buildRows(source) {
  const rows = [];
  source.spreads.forEach((spread) => {
    spread.items.forEach((item) => {
      item.images.forEach((img) => {
        rows.push({
          cityCode: source.cityCode.toUpperCase(),
          cityName: source.cityName,
          screen: spread.screen,
          itemName: item.name,
          description: item.description,
          imagePath: img.file,
          status: img.status === 'In PDF' ? 'Ready' : 'Missing',
        });
      });
    });
  });
  rows.sort((a, b) => SCREEN_ORDER.indexOf(a.screen) - SCREEN_ORDER.indexOf(b.screen));
  return rows;
}

async function main() {
  const codes = process.argv.slice(2).length ? process.argv.slice(2) : ['blr'];
  const rows = codes.flatMap((code) => {
    const file = path.join(__dirname, 'city-source-content', `${code.toLowerCase()}.js`);
    if (!fs.existsSync(file)) throw new Error(`No content file for "${code}". Expected ${file}`);
    return buildRows(require(file));
  });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('City Content', {
    views: [{ state: 'frozen', ySplit: 1 }],
  });

  sheet.columns = [
    { header: 'City Code', key: 'cityCode', width: 11 },
    { header: 'City Name', key: 'cityName', width: 14 },
    { header: 'Screen', key: 'screen', width: 16 },
    { header: 'Item Name', key: 'itemName', width: 32 },
    { header: 'Description', key: 'description', width: 70 },
    { header: 'Image Path', key: 'imagePath', width: 46 },
    { header: 'Status', key: 'status', width: 11 },
  ];

  rows.forEach((r) => {
    const row = sheet.addRow(r);
    row.getCell('status').font = {
      bold: true,
      size: 10,
      name: FONT,
      color: { argb: r.status === 'Ready' ? GREEN : RED },
    };
  });

  const header = sheet.getRow(1);
  header.height = 24;
  header.eachCell((cell) => {
    cell.font = { bold: true, size: 11, name: FONT, color: { argb: DARK } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: YELLOW } };
    cell.alignment = { vertical: 'middle' };
  });

  for (let r = 2; r <= sheet.rowCount; r += 1) {
    sheet.getRow(r).eachCell({ includeEmpty: true }, (cell) => {
      if (!cell.font) cell.font = { size: 10, name: FONT, color: { argb: DARK } };
      cell.alignment = { vertical: 'top', wrapText: true };
      if (r % 2 === 0) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: ZEBRA } };
    });
  }

  sheet.autoFilter = { from: 'A1', to: 'G1' };

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  await workbook.xlsx.writeFile(OUTPUT_FILE);
  console.log(`${rows.length} rows -> ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
