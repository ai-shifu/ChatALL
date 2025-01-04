import { Menu, MenuItem, shell } from "electron";

export const setMenuItems = () => {
  const menu = Menu.getApplicationMenu();
  menu.items.forEach((m) => {
    if (m.role === "help") {
      const submenu = m.submenu;
      submenu.append(
        new MenuItem({
          label: "View on GitHub",
          click: () => {
            shell.openExternal("https://github.com/ai-shifu/ChatALL");
          },
        }),
      );
    }
  });
  Menu.setApplicationMenu(menu);
};
