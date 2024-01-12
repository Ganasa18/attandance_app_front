/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LuArrowDownWideNarrow,
  LuArrowUpWideNarrow,
  LuArrowDownUp,
} from "react-icons/lu/index.js";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { TableHead, TableHeader, TableRow } from "~/components/ui/table";

const TableHeadCustom = (props: any) => {
  const {
    headers,
    className,
    hasCheckbox,
    onSelectAllClick,
    isLoading,
    hasCollapsibleTable,
  }: any = props;

  return (
    <TableHeader>
      <TableRow>
        {hasCollapsibleTable && <TableHead className="w-4" />}
        {hasCheckbox && (
          <TableHead>
            {!isLoading && (
              <Checkbox
                aria-label="Select all"
                className={`translate-y-[2px]`}
                onCheckedChange={(value) => onSelectAllClick(value)}
              />
            )}
          </TableHead>
        )}

        {headers.map((data: any, index: number) => {
          if (data.visible) {
            if (data.sortable) {
              return (
                <TableHead
                  key={index}
                  className={`${
                    data.align === "center"
                      ? "text-center"
                      : data.align === "left"
                      ? "text-left"
                      : data.align === "right"
                      ? "text-right"
                      : "text-right"
                  } ${className}`}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent">
                        <span>{data.label}</span>
                        {data.sort === "desc" ? (
                          <LuArrowDownWideNarrow className="ml-2 h-4 w-4" />
                        ) : data.sort === "asc" ? (
                          <LuArrowUpWideNarrow className="ml-2 h-4 w-4" />
                        ) : (
                          <LuArrowDownUp className="ml-2 h-4 w-4" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem
                        onClick={() => data.handleSort(data, true)}>
                        <LuArrowUpWideNarrow className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Asc
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => data.handleSort(data, false)}>
                        <LuArrowDownWideNarrow className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Desc
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
              );
            } else {
              return (
                <TableHead
                  key={index}
                  className={`${
                    data.align === "center"
                      ? "text-center"
                      : data.align === "left"
                      ? "text-left"
                      : data.align === "right"
                      ? "text-right"
                      : "text-right"
                  } ${className ?? ""} ${data?.className ?? ""}`}>
                  {data.label}
                </TableHead>
              );
            }
          }

          return null;
        })}
      </TableRow>
    </TableHeader>
  );
};

export default TableHeadCustom;
