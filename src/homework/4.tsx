import React, { createContext, useMemo, useState, useContext } from "react";
import noop from "lodash/noop";

type MenuIds = "first" | "second" | "last";
type Menu = { id: MenuIds; title: string };


type SelectedMenu = {
  id:MenuIds
}
// Add the Menu Selected type
type MenuSelected = {
   selectedMenu:SelectedMenu
}
// Add the MenuAction type
type MenuAction = {
  onSelectedMenu:(menu: SelectedMenu) =>void
}
// Add the children type
type PropsProvider = {
  children: React.ReactNode;
};
// Add a valid type for the menu
type PropsMenu = {
  menus:Menu[] 
};

const MenuSelectedContext = createContext<MenuSelected>({
  selectedMenu: {} as SelectedMenu ,
});

const MenuActionContext = createContext<MenuAction>({
  onSelectedMenu: noop,
});

function MenuProvider({ children }: PropsProvider) {
  // Add type for SelectedMenu it should contain { id }
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu >({} as SelectedMenu);

  const menuContextAction = useMemo(
    () => ({
      onSelectedMenu: setSelectedMenu,
    }),
    []
  );

  const menuContextSelected = useMemo(
    () => ({
      selectedMenu,
    }),
    [selectedMenu]
  );

  return (
    <MenuActionContext.Provider value={menuContextAction}>
      <MenuSelectedContext.Provider value={menuContextSelected}>
        {children}
      </MenuSelectedContext.Provider>
    </MenuActionContext.Provider>
  );
}

function MenuComponent({ menus }: PropsMenu) {
  const { onSelectedMenu } = useContext(MenuActionContext);
  const { selectedMenu } = useContext(MenuSelectedContext);

  return (
    <>
      {menus.map((menu) => (
        <div key={menu.id} onClick={() => onSelectedMenu({ id: menu.id })}>
          {menu.title}{" "}
          {selectedMenu.id === menu.id ? "Selected" : "Not selected"}
        </div>
      ))}
    </>
  );
}

export function ComponentApp() {
  const menus: Menu[] = [
    {
      id: "first",
      title: "first",
    },
    {
      id: "second",
      title: "second",
    },
    {
      id: "last",
      title: "last",
    },
  ];

  return (
    <MenuProvider>
      <MenuComponent menus={menus} />
    </MenuProvider>
  );
}
