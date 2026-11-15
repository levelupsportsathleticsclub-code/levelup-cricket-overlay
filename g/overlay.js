'use strict';
(async () => {
  const id = new URLSearchParams(location.search).get('m');
  if (!id || !idPattern.test(id)) return;
  const item = (await catalog()).find(entry => entry.id === id);
  if (!item) return;
  const node = document.createElement(item.type === 'video' ? 'video' : 'img');
  node.hidden = true;
  node.addEventListener('error', () => { node.hidden = true; });
  if (item.type === 'video') {
    node.muted = true;
    node.autoplay = true;
    node.loop = true;
    node.playsInline = true;
    node.addEventListener('playing', () => { node.hidden = false; });
  } else {
    node.alt = item.title;
    node.addEventListener('load', () => { node.hidden = false; });
  }
  document.body.append(node);
  node.src = item.url;
})().catch(console.warn);
