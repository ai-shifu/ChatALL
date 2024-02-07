export const scrollToBottom = ({ immediately = false }) => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: immediately ? "instant" : "smooth",
  });
};

export const autoScrollToBottom = () => {
  if (autoScroll) {
    scrollToBottom({ immediately: true });
  }
};

export const onScroll = () => {
  const scrollPosition = window.pageYOffset + window.innerHeight;
  autoScroll = scrollPosition >= document.documentElement.scrollHeight - 40;
};

export let autoScroll = false;
