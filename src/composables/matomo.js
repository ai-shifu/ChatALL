import { ref, onUnmounted } from "vue";

export function getMatomo() {
  return window.Piwik?.getAsyncTracker();
}

export function useMatomo() {
  const matomo = ref(null);

  const instance = getMatomo();
  if (instance) {
    matomo.value = instance;
  } else {
    const interval = 50;
    const timeout = 10000;
    const start = Date.now();

    const timer = setInterval(() => {
      const instance = getMatomo();
      if (instance) {
        clearInterval(timer);
        matomo.value = instance;
        return;
      }

      if (Date.now() - start > timeout) {
        clearInterval(timer);
        console.warn(`Matomo not loaded after waiting for ${timeout}ms`);
      }
    }, interval);

    onUnmounted(() => {
      clearInterval(timer);
    });
  }

  return matomo;
}
