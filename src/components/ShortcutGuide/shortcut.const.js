const is_mac = process.platform === "darwin";
const modifier = is_mac ? "meta" : "ctrl";
export const SHORTCUT_PROMPT_TEXTAREA = {
  elementId: "prompt-textarea",
  key: [modifier, "k"],
  offset: {
    top: 15,
  },
  alignHorizontallyCenter: true,
};

export const SHORTCUT_PROMPT_PRE_NEXT = {
  elementId: "prompt-textarea",
  key: [modifier, "up/down"],
  offset: {
    top: 15,
    left: 100,
  },
  alignHorizontallyCenter: true,
};

export const SHORTCUT_FIND = {
  elementId: "find-btn",
  key: [modifier, "f"],
  offset: {
    top: 40,
  },
  flexDirection: "column",
};

export const SHORTCUT_CLEAR_MESSAGES = {
  elementId: "clear-messages-btn",
  key: [modifier, "e"],
  offset: {
    top: 40,
  },
  flexDirection: "column",
};

export const SHORTCUT_SETTINGS = {
  elementId: "settings-btn",
  key: [modifier, ","],
  offset: {
    top: 40,
  },
  flexDirection: "column",
};

export const SHORTCUT_SHORTCUT_GUIDE = {
  elementId: "shortcut-guide-btn",
  key: [modifier, "/"],
  offset: {
    top: 40,
  },
  flexDirection: "column",
};

export const SHORTCUT_BOTS_MENU = {
  elementId: "bots-menu-btn",
  key: ["ctrl", "tab"],
  offset: {
    top: -70,
  },
  flexDirection: "column",
};

export const SHORTCUT_CHAT_DRAWER = {
  elementId: "chat-drawer-btn",
  key: [modifier, "d"],
  offset: {
    top: 40,
  },
  flexDirection: "column",
};

export const SHORTCUT_NEW_CHAT = {
  elementId: "new-chat-list-item",
  key: [modifier, "n"],
  offset: {
    top: 12,
    left: 20,
  },
  alignHorizontallyCenter: true,
};

export const SHORTCUT_PROMPT_MANAGEMENT = {
  elementId: "prompt-btn",
  key: [modifier, "p"],
  offset: {
    top: -65,
    left: 5,
  },
  flexDirection: "column",
};

export const SHORTCUT_APP_BAR = {
  elementId: "app-bar",
  key: [modifier, "f11"],
  offset: {
    top: 20,
    left: -200,
  },
  alignHorizontallyCenter: true,
};

export const SHORTCUT_LIST = [
  SHORTCUT_FIND,
  SHORTCUT_SETTINGS,
  SHORTCUT_BOTS_MENU,
  SHORTCUT_SHORTCUT_GUIDE,
  SHORTCUT_CLEAR_MESSAGES,
  SHORTCUT_PROMPT_TEXTAREA,
  SHORTCUT_CHAT_DRAWER,
  SHORTCUT_NEW_CHAT,
  SHORTCUT_PROMPT_MANAGEMENT,
  SHORTCUT_PROMPT_PRE_NEXT,
  SHORTCUT_APP_BAR,
  {
    elementId: "column-1",
    key: ["f1"],
    offset: {
      top: 30,
    },
  },
  {
    elementId: "column-2",
    key: ["f2"],
    offset: {
      top: 30,
    },
  },
  {
    elementId: "column-3",
    key: ["f3"],
    offset: {
      top: 30,
    },
  },
  {
    elementId: "fav-bot-1",
    key: [modifier, "1"],
    offset: {
      top: -70,
    },
    flexDirection: "column",
  },
  {
    elementId: "fav-bot-2",
    key: [modifier, "2"],
    offset: {
      top: -70,
    },
    flexDirection: "column",
  },
  {
    elementId: "fav-bot-3",
    key: [modifier, "3"],
    offset: {
      top: -70,
    },
    flexDirection: "column",
  },
  {
    elementId: "fav-bot-4",
    key: [modifier, "4"],
    offset: {
      top: -70,
    },
    flexDirection: "column",
  },
  {
    elementId: "fav-bot-5",
    key: [modifier, "5"],
    offset: {
      top: -70,
    },
    flexDirection: "column",
  },
  {
    elementId: "fav-bot-6",
    key: [modifier, "6"],
    offset: {
      top: -70,
    },
    flexDirection: "column",
  },
  {
    elementId: "fav-bot-7",
    key: [modifier, "7"],
    offset: {
      top: -70,
    },
    flexDirection: "column",
  },
  {
    elementId: "fav-bot-8",
    key: [modifier, "8"],
    offset: {
      top: -70,
    },
    flexDirection: "column",
  },
  {
    elementId: "fav-bot-9",
    key: [modifier, "9"],
    offset: {
      top: -70,
    },
    flexDirection: "column",
  },
];
