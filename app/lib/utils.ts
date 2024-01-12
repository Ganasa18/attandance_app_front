/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { MenuItem } from "~/interface/menu_interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transformMenuStructure = (menuItems: MenuItem[]): MenuItem[] => {
  const menuMap: Record<string, MenuItem> = {};

  menuItems.forEach((menuItem) => {
    const { menu_name, ...rest } = menuItem;
    menuMap[menu_name!] = { ...rest, submenu: [] };
  });

  menuItems.forEach((menuItem) => {
    const { parent_name, ...rest } = menuItem;
    if (parent_name && menuMap[parent_name]) {
      menuMap[parent_name!].submenu!.push({ ...rest });
    }
  });

  const result: MenuItem[] = Object.values(menuMap)
    .filter(
      (menuItem) => !menuItem.parent_name || !menuMap[menuItem.parent_name]
    )
    .map((menuItem) => ({ ...menuItem }));

  return result;
};

type LocalStorageKey = string;

// Function to read a value from localStorage
export function getLocalStorage(key: LocalStorageKey): string | null {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error(`Error reading from localStorage for key ${key}:`, error);
    return null;
  }
}

// Function to set a value in localStorage
export function setLocalStorage(key: LocalStorageKey, value: any): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting localStorage for key ${key}:`, error);
  }
}
