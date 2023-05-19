import { ref, onUnmounted } from "vue";

export function getMatomo() {
  return window.Piwik.getAsyncTracker();
}

export function useMatomo() {
  const matomo = ref(null);

  if (window.Piwik) {
    matomo.value = getMatomo();
  } else {
    const interval = 50;
    const timeout = 3000;
    const start = Date.now();

    const timer = setInterval(() => {
      if (window.Piwik) {
        clearInterval(timer);
        matomo.value = getMatomo();
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
