/* Keep the native details menu for touch and keyboard; add hover on mouse devices. */
for (const menu of document.querySelectorAll('.site-nav .nav-dropdown')) {
  const summary = menu.querySelector('summary');
  let openedByHover = false;

  menu.addEventListener('pointerenter', (event) => {
    if (event.pointerType !== 'mouse') return;
    if (!menu.open) {
      menu.open = true;
      openedByHover = true;
    }
  });

  menu.addEventListener('pointerleave', (event) => {
    if (event.pointerType !== 'mouse' || !openedByHover) return;
    if (!menu.contains(document.activeElement)) {
      menu.open = false;
      openedByHover = false;
    }
  });

  menu.addEventListener('focusout', () => {
    window.setTimeout(() => {
      if (openedByHover && !menu.matches(':hover') && !menu.contains(document.activeElement)) {
        menu.open = false;
        openedByHover = false;
      }
    }, 0);
  });

  summary.addEventListener('click', (event) => {
    if (event.detail > 0 && openedByHover && menu.open) event.preventDefault();
  });

  menu.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      openedByHover = false;
      summary.focus();
    }
  });
}
