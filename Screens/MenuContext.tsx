import React, { createContext, useState } from 'react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
}

interface MenuContextProps {
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  removeMenuItem: (id: string) => void;
}

export const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: 'Tomato Soup', description: 'Fresh tomatoes, basil', course: 'Starters', price: 50 },
    { id: '2', name: 'Roast Chicken', description: 'Herb-seasoned, roasted', course: 'Mains', price: 100 },
    { id: '3', name: 'Cheesecake', description: 'Creamy vanilla with berry sauce', course: 'Dessert', price: 150 },
  ]);

  const addMenuItem = (item: MenuItem) => {
    setMenuItems(prevItems => [...prevItems, item]);
  };

  const removeMenuItem = (id: string) => {
    setMenuItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, removeMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};
