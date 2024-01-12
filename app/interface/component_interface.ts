import { ReactNode } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BreadCrumbInterface {
  name_nav: string;
  link: string;
}

export interface BreadCrumbProps {
  navigation: BreadCrumbInterface[];
}

export interface MainTableColumnInterface {
  label?: string;
  value?: string;
  sortable?: boolean;
  sort?: "asc" | "desc" | null;
  valueFormatter?: ((row?: any) => any) | ((value?: boolean, row?: any) => any);
  align?: "left" | "center" | "right";
  type?:
    | "date"
    | "datetime"
    | "string"
    | "link"
    | "button"
    | "internal-link"
    | "external-link"
    | "profile"
    | "boolean"
    | "custom";
  reactComponent?: ReactNode;
  visible?: boolean;
  valueLink?: string;
  handleSort?: (row?: any, value?: any) => any;
  collapsibleColumn?: any;
  className?: string;
}

export interface CollapseTableColumnInterface {
  label?: string;
  value?: string;
  valueFormatter?: ((row?: any) => any) | ((value?: boolean, row?: any) => any);
  align?: "left" | "center" | "right";
  type?:
    | "date"
    | "datetime"
    | "string"
    | "link"
    | "button"
    | "internal-link"
    | "external-link"
    | "profile";
  valueLink?: string;
}

export interface MainTableProps {
  titleTable?: string;
  tableCaption?: string;
  column: MainTableColumnInterface[];
  collapsibleColumn?: MainTableColumnInterface[];
  data: any;
  count?: number;
  className?: string;
  isClientPaginate?: boolean;
  isLoading?: boolean;
  hasCheckbox?: boolean;
  hasDoubleClick?: (row?: any) => any;
  setTableColumn?: any;
  hasShowColumn?: boolean;
  hasCollapsibleTable?: boolean;
  hasTableFooter?: boolean;
  collapsibleColumnValue?: string;
  rowPerPage?: number;
  pageTable?: number;
  hasCreateButton?: () => void;
}
