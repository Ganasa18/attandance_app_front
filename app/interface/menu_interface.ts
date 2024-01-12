/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MenuItem {
  id?: number;
  menu_name?: string;
  title_menu?: string;
  path?: string;
  is_submenu?: boolean;
  parent_name?: string;
  submenu?: SubMenuItem[];
  [key: string]: any;
}

export interface SubMenuItem {
  id?: number;
  menu_name?: string;
  title_menu?: string;
  path?: string;
  is_submenu?: boolean;
  parent_name?: string;
  [key: string]: any;
}
