'use strict';
(async () => {
  const id = new URLSearchParams(location.search).get('m');
  if (!id || !idPattern.test(id)) return;
  const item = (await catalog()).find(entry => entry.id === id);
  if (!item) return;
  const node = document.createElement(item.type === 'video' ? 'video' : 'img');
  node.style.opacity = '0';
  const show = () => { node.style.opacity = '1'; };
  node.addEventListener('error', () => { node.style.opacity = '0'; });
  if (item.type === 'video') {
    node.muted = true;
    node.autoplay = true;
    node.loop = true;
    node.playsInline = true;
    node.setAttribute('muted', '');
    node.defaultMuted = true;
    node.addEventListener('loadeddata', show);
    node.addEventListener('playing', show);
  } else {
    node.alt = item.title;
    node.addEventListener('load', show);
  }
  document.body.append(node);
  const asset = new URL(item.url);
  if (asset.origin === location.origin) asset.searchParams.set('v', '2');
  node.src = asset.href;
  if (item.type === 'video') node.play().catch(console.warn);
})().catch(console.warn);
