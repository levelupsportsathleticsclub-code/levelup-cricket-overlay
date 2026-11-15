'use strict';
(async () => {
  const items = await catalog();
  const filter = document.getElementById('filter');
  const status = document.getElementById('status');
  const cards = document.getElementById('cards');
  const category = item => item.category || (item.type === 'video' ? 'Video' : 'Photo');
  for (const label of [...new Set(items.map(category))].sort())
    filter.add(new Option(label, label));
  const make = (tag, txt) => { const node = document.createElement(tag); if (txt) node.textContent = txt; return node; };
  function render() {
    cards.replaceChildren();
    status.textContent = '';
    for (const item of items.filter(entry => !filter.value || filter.value === category(entry))) {
      const card = make('article'); card.className = 'card';
      const preview = make('div'); preview.className = 'preview';
      const media = make(item.type === 'video' ? 'video' : 'img');
      if (item.type === 'video') {
        media.controls = true;
        media.preload = 'metadata';
        media.muted = true;
        media.playsInline = true;
      } else { media.alt = item.title; media.loading = 'lazy'; }
      media.addEventListener('error', () => preview.replaceChildren(make('span','Asset not uploaded or unavailable')));
      media.src = item.url;
      preview.append(media);
      const details = make('div'); details.className = 'details';
      const url = make('input'); url.readOnly = true; url.value = overlayLink(item.id);
      url.setAttribute('aria-label', 'OBS URL for ' + item.title);
      url.addEventListener('focus', () => url.select());
      const copy = make('button', 'Copy OBS URL');
      copy.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(url.value);
          status.textContent = 'Copied the OBS URL for ' + item.title + '.';
        } catch { url.focus(); status.textContent = 'Press Ctrl+C or Cmd+C to copy the selected URL.'; }
      });
      const open = make('a','Preview overlay'); open.href = url.value; open.target = '_blank'; open.rel = 'noopener';
      details.append(make('h3',item.title),make('p',category(item)),url,copy,document.createTextNode(' · '),open);
      card.append(preview, details); cards.append(card);
    }
    if (!cards.children.length) status.textContent = 'No assets in this category yet.';
  }
  filter.addEventListener('change', render);
  render();
})().catch(() => { document.getElementById('status').textContent = 'The media catalog could not load. Check g/catalog.json.'; });
