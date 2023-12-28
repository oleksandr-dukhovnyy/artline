export default function scrollToTop(behavior = 'smooth') {
  window.scrollTo({
    top: 0,
    behavior,
  });
}
