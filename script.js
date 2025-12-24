// Smooth reveal on scroll, parallax background, small avatar parallax
document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // IntersectionObserver for reveals
  const reveals = document.querySelectorAll('.reveal');
  const obsOptions = { root: null, rootMargin: '0px', threshold: 0.12 };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, obsOptions);
  reveals.forEach(r => revealObserver.observe(r));

  // Parallax decorative layers
  const bgLayers = document.querySelectorAll('.bg-layer');
  function handleScrollParallax(){
    const sc = window.scrollY || window.pageYOffset;
    bgLayers.forEach((layer, i) => {
      const depth = (i + 1) * 0.015;
      layer.style.transform = `translate3d(${sc * depth}px, ${-sc * depth}px, 0) rotate(${sc * depth * 0.02}deg)`;
    });
  }
  handleScrollParallax();
  window.addEventListener('scroll', handleScrollParallax, { passive: true });

  // Very slow-moving blurred background image parallax
  const bgImage = document.getElementById('bgImage');
  function handleBgImage(){
    if (!bgImage) return;
    const sc = window.scrollY || window.pageYOffset;
    const factor = 0.01; // much slower (almost static)
    bgImage.style.transform = `translate3d(0, ${sc * factor}px, 0) scale(1.18)`;
  }
  handleBgImage();
  window.addEventListener('scroll', handleBgImage, { passive: true });

  // Avatar mouse parallax
  const avatarWrap = document.querySelector('.avatar-wrap');
  const avatar = document.getElementById('avatar');
  if (avatarWrap && avatar) {
    avatarWrap.addEventListener('mousemove', (e) => {
      const r = avatarWrap.getBoundingClientRect();
      const cx = r.left + r.width/2;
      const cy = r.top + r.height/2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      avatar.style.transform = `translate(${dx * 6}px, ${dy * 6}px) rotate(${dx * 2}deg)`;
    });
    avatarWrap.addEventListener('mouseleave', () => {
      avatar.style.transform = '';
    });
  }

  // Respect prefers-reduced-motion
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq.matches) {
    window.removeEventListener('scroll', handleScrollParallax);
    window.removeEventListener('scroll', handleBgImage);
    bgLayers.forEach(layer => layer.style.transform = '');
    if (bgImage) bgImage.style.transform = 'scale(1.18)';
  }
});
