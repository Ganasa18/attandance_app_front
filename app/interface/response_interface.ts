export interface ResponseDataTable<T> {
  code?: number;
  status?: string;
  listData?: T;
  pageInfo?: {
    total?: number;
    per_page?: number;
    current_page?: number;
    total_page?: number;
  };
}

export interface ResponseData<T> {
  code?: number;
  status?: string;
  data?: T;
}

export type UserDummyResponseType = {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
};

export type RoleResponseType = {
  id?: number;
  role_name?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type MenuResponseType = {
  id?: number;
  menu_name?: string;
  title_menu?: string;
  path?: string;
  is_submenu?: boolean;
  parent_name?: string;
  created_at?: string;
  updated_at?: string;
};

export type UserDatabaseResponseType = {
  id?: number;
  user_unique_id?: string;
  name?: string;
  email?: string;
  token?: string | null;
  isActive?: boolean;
  role_name?: string | null;
  created_at?: string;
  updated_at?: string;
  deletedAt?: string | null;
};
