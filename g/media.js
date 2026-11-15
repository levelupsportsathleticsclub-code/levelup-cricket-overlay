'use strict';
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
async function catalog() {
  const res = await fetch('catalog.json', {cache:'no-cache'});
  if (!res.ok) throw Error('Could not load the media catalog');
  const items = await res.json();
  if (!Array.isArray(items)) throw Error('Catalog must be an array');
  const used = new Set();
  return items.filter(item => {
    if (!item || !idPattern.test(item.id || '') || used.has(item.id) ||
        typeof item.title !== 'string' || typeof item.src !== 'string' ||
        !['image','video'].includes(item.type)) return false;
    try {
      const url = new URL(item.src, location.href);
      const localFolder = new URL('assets/', location.href).href;
      if (!url.href.startsWith(localFolder) && !(url.protocol === 'https:' && /^https:\/\//i.test(item.src))) return false;
      item.url = url.href;
    } catch { return false; }
    used.add(item.id);
    return true;
  });
}
function overlayLink(id) {
  return new URL('o.html?m=' + encodeURIComponent(id), location.href).href;
}
