const fs = require('fs');
const path = require('path');

/**
 * Load an HTML file into the jsdom document.
 * @param {string} filename - Name of the HTML file relative to the project root.
 * @returns {Document} The parsed document.
 */
function loadHTML(filename) {
  const filePath = path.resolve(__dirname, '..', filename);
  const html = fs.readFileSync(filePath, 'utf-8');
  document.open();
  document.write(html);
  document.close();
  return document;
}

module.exports = { loadHTML };
