/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Collapsible } from "~/components/ui/collapsible";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { formatDateString } from "~/lib/table_formater";
import { IoIosArrowDown } from "react-icons/io/index.js";
import { Badge } from "~/components/ui/badge";

const TableBodyCustom = (props: any) => {
  const {
    data,
    headers,
    hasCheckbox,
    isSelected,
    handleClickSelected,
    handleClickRow,
    isLoading,
    hasCollapsibleTable,
    collapsibleColumn,
    collapsibleColumnValue,
  }: any = props;

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggleOpen = (index: number | null) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <TableBody>
      {isLoading ? (
        <TableRow>
          <TableCell
            colSpan={hasCheckbox ? headers.length + 1 : headers.length}
            className="h-60 text-center">
            Loading...
          </TableCell>
        </TableRow>
      ) : data?.length > 0 ? (
        data.map((row: any, indexData: number) => {
          const isItemSelected = isSelected(row);
          const labelId = `enhanced-table-checkbox-${indexData}`;
          return (
            <React.Fragment key={indexData}>
              <TableRow onDoubleClick={() => handleClickRow(row)}>
                {hasCollapsibleTable && (
                  <TableCell className="w-4">
                    <Button
                      variant={"ghost"}
                      size="sm"
                      onClick={() => handleToggleOpen(indexData)}>
                      <IoIosArrowDown
                        className={`h-4 w-4 transition-all transform ${
                          openIndex === indexData ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  </TableCell>
                )}
                {hasCheckbox && (
                  <TableCell>
                    <Checkbox
                      checked={isItemSelected}
                      aria-label={labelId}
                      className="translate-y-[2px]"
                      onCheckedChange={(event) =>
                        handleClickSelected(event, row)
                      }
                    />
                  </TableCell>
                )}

                {headers.map((header: any, index: number) => {
                  const cellAlignment: string = getCellAlignment(header.align);
                  const cellContent: React.ReactNode = getCellContent(
                    header,
                    row
                  );

                  if (header.visible) {
                    return (
                      <TableCell
                        key={index}
                        className={`${cellAlignment} ${
                          header?.className ?? ""
                        }`}>
                        {cellContent}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>

              {openIndex === indexData && (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={
                      hasCheckbox ? headers.length + 2 : headers.length + 1
                    }>
                    <Collapsible>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {collapsibleColumn.map(
                              (headCollab: any, indexHead: number) => {
                                const cellAlignment: string = getCellAlignment(
                                  headCollab.align
                                );
                                return (
                                  <TableHead
                                    key={indexHead}
                                    className={`${cellAlignment}`}>
                                    {headCollab.label}
                                  </TableHead>
                                );
                              }
                            )}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {row[collapsibleColumnValue] &&
                          row[collapsibleColumnValue].length > 0 ? (
                            row[collapsibleColumnValue].map(
                              (collapData: any, indexCollapData: number) => (
                                <TableRow key={indexCollapData}>
                                  {collapsibleColumn.map(
                                    (column: any, columnIndex: number) => {
                                      const cellAlignment: string =
                                        getCellAlignment(column.align);
                                      const cellContent: React.ReactNode =
                                        getCellContent(column, collapData);
                                      return (
                                        <TableCell
                                          className={`border-b-[1px] border-t-[1px] text-sm whitespace-nowrap px-4 py-1 ${cellAlignment}`}
                                          key={columnIndex}>
                                          {cellContent}
                                        </TableCell>
                                      );
                                    }
                                  )}
                                </TableRow>
                              )
                            )
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={collapsibleColumn.length}
                                className="text-center">
                                {row[collapsibleColumnValue]
                                  ? "Empty Data"
                                  : "Column Not Found or Undefined"}
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </Collapsible>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          );
        })
      ) : (
        <TableRow>
          <TableCell
            colSpan={hasCheckbox ? headers.length + 1 : headers.length}
            className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default TableBodyCustom;

const handleClickLink = (row: string) => {
  window.open(row, "_blank");
};

const getCellContent = (header: any, row: any): React.ReactNode => {
  if (!header.valueFormatter) {
    if (header.type === "custom" && header.reactComponent) {
      return React.cloneElement(header.reactComponent, row);
    } else {
      switch (header.type) {
        case "date":
          return formatDateString(row[header.value]);
        case "datetime":
          return formatDateString(row[header.value], "datetime");
        case "internal-link":
          return <Button variant={"link"}>{row[header.value]}</Button>;
        case "external-link":
          return (
            <Button
              variant={"link"}
              onClick={() =>
                handleClickLink(
                  row[header.valueLink] !== undefined
                    ? row[header.valueLink]
                    : row[header.value]
                )
              }>
              {row[header.value]}
            </Button>
          );
        case "profile":
          return (
            <div className={`flex ${getCellAlignmentFlex(header.align)}`}>
              <div className={`w-12 h-12 rounded-full`}>
                <img
                  className="rounded-full object-cover w-full h-full"
                  src={`${row[header.value]}`}
                  alt={row[header.value]}
                />
              </div>
            </div>
          );
        case "boolean":
          return <Badge>{row[header.value] == true ? "True" : "False"}</Badge>;

        default:
          return row[header.value];
      }
    }
  } else {
    return header.valueFormatter(row[header.value]);
  }
};

const getCellAlignment = (align: string): string => {
  switch (align) {
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "text-left";
  }
};

const getCellAlignmentFlex = (align: string): string => {
  switch (align) {
    case "center":
      return "items-center justify-center";
    case "right":
      return "items-center justify-end";
    default:
      return "items-center justify-start";
  }
};
