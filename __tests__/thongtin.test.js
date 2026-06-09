const fs = require('fs');
const path = require('path');

describe('Thông tin.html – Target page', () => {
  const filePath = path.resolve(__dirname, '..', 'Thông tin.html');

  test('file exists in the project root', () => {
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test('file is currently empty (placeholder)', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content.trim()).toBe('');
  });

  test('index.html forms reference this file as their action target', () => {
    const indexPath = path.resolve(__dirname, '..', 'index.html');
    const indexHTML = fs.readFileSync(indexPath, 'utf-8');
    expect(indexHTML).toContain('action="Thông tin.html"');
  });
});
