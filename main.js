const filters = document.querySelectorAll('[data-filter]');
const project = document.querySelector('.project');
const emptyState = document.querySelector('.empty');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle('active', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  const visible = button.dataset.filter === 'all' || button.dataset.filter === project.dataset.category;
  project.hidden = !visible;
  emptyState.hidden = visible;
}));
const projectDialog = document.querySelector('#project-dialog');
document.querySelector('#open-project').addEventListener('click', () => projectDialog.showModal());
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
});
const messageDialog = document.querySelector('#message-dialog');
const preview = document.querySelector('#message-preview');
const copyStatus = document.querySelector('#copy-status');
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = data.get('name').trim();
  const message = data.get('message').trim();
  if (!name || !message) {
    document.querySelector('#form-status').textContent = 'Please add your name and a message before continuing.';
    return;
  }
  preview.value = `Hi Khalid,\n\n${message}\n\n${name}\n${data.get('email').trim()}`;
  document.querySelector('#form-status').textContent = '';
  copyStatus.textContent = '';
  messageDialog.showModal();
});
document.querySelector('#copy-message').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(preview.value);
    copyStatus.textContent = 'Copied. Your message is ready to paste and share.';
  } catch {
    preview.focus();
    preview.select();
    copyStatus.textContent = 'Select and copy the message above using your device’s copy command.';
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window) {
  const links = document.querySelectorAll('header nav a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) links.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
