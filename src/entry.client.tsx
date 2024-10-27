import { RemixBrowser } from '@remix-run/react';
import { startTransition, useEffect } from 'react';
import { hydrateRoot } from 'react-dom/client';

const Mount: React.FC<React.PropsWithChildren<{ onMount: () => void }>> = (
  props,
) => {
  useEffect(props.onMount, []);
  return props.children;
};

function hydrate() {
  let recoverMethods: (() => void)[] = [];
  function remove(elem: HTMLElement) {
    elem.parentElement?.removeChild(elem);
    return elem;
  }
  function keepClean(
    container: HTMLElement,
    detectKeep: (node: HTMLElement) => boolean,
  ) {
    let temp: HTMLElement[] = [];
    container.childNodes.forEach((elem) => {
      const _elem = elem as HTMLElement;
      if (!detectKeep(_elem)) {
        temp.push(remove(_elem));
      }
    });
    return () => {
      if (!temp.length) return;
      temp.forEach((elem) => container.appendChild(elem));
      temp = [];
    };
  }
  function recover() {
    recoverMethods.forEach((method) => method());
    recoverMethods = [];
  }
  recoverMethods.push(
    keepClean(document.body.parentElement!, (node) => {
      return ['HEAD', 'BODY'].includes(node.tagName);
    }),
    keepClean(document.body, (node) => {
      return node.getAttribute('id') === 'root';
    }),
  );
  startTransition(() => {
    hydrateRoot(
      document,
      <Mount onMount={recover}>
        <RemixBrowser />
      </Mount>,
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  window.setTimeout(hydrate, 1);
}
