export default function bindDirective(Vue) {
  Vue.directive('click-outside', {
    bind(el, binding, vnode) {
      const handler = (e) => {
        if (!el.contains(e.target) && el !== e.target) {
          vnode.context[binding.expression](e);
        }
      };

      document.addEventListener('click', handler);
      el._clickOutsideHandler = handler;
    },
    unbind(el) {
      document.removeEventListener('click', el._clickOutsideHandler);
    },
  });
}
