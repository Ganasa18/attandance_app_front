/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { useSearchParams } from "@remix-run/react";
import * as React from "react";
import { Table, TableCaption } from "~/components/ui/table";
import { MainTableProps } from "~/interface";
import {
  actionCheckedAllTable,
  actionCheckedRowTable,
} from "~/store/action/table-action";
import { useCombinedStore } from "~/store/use-store/combine-store";
import TableBodyCustom from "./table_body";
import TableFooterCustom from "./table_footer";
import TableHeadCustom from "./table_header";
import CustomTableTools from "./table_tools";
const MainTable = (props: MainTableProps) => {
  const {
    titleTable,
    tableCaption,
    column,
    data,
    hasCheckbox,
    isLoading,
    hasDoubleClick,
    count,
    isClientPaginate,
    setTableColumn,
    hasShowColumn,
    hasCollapsibleTable,
    collapsibleColumn,
    collapsibleColumnValue = "collapsibleColumnValue",
    hasCreateButton,
    hasTableFooter = true,
  }: MainTableProps = props;
  const hasEffectRun = React.useRef(false);
  const { selectedValue, rowPerPage, pageTable, setRowPerPage, setPageTable } =
    useCombinedStore();

  const [searchParams] = useSearchParams();

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    actionCheckedAllTable(event, data);
  };

  const handleClickSelected = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: never
  ) => {
    actionCheckedRowTable(row, selectedValue);
  };

  const isSelected = (row: any) =>
    selectedValue.some((selectedRow: any) => selectedRow === row);

  const startIndex = (pageTable - 1) * rowPerPage;
  const endIndex = startIndex + rowPerPage;
  const slicedData = data.slice(startIndex, endIndex);

  const handleChangePage = (event: any, newPage: any) => {
    setPageTable(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowPerPage(parseInt(event));
    setPageTable(1);
  };

  React.useEffect(() => {
    if (!hasEffectRun.current) {
      if (searchParams.size > 0) {
        const pageParams = searchParams.get("page");
        const perPageParams = searchParams.get("per_page");

        setRowPerPage(parseInt(perPageParams!));
        setPageTable(parseInt(pageParams!));
      } else {
        setRowPerPage(10);
        setPageTable(1);
      }

      hasEffectRun.current = true;
    }
  }, [searchParams, setPageTable, setRowPerPage]);

  return (
    <div className="shadow-sm mt-2 bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 rounded-lg">
      <CustomTableTools
        column={column}
        setTableColumn={setTableColumn}
        hasShowColumn={hasShowColumn}
        titleTable={titleTable}
        hasCreateButton={hasCreateButton}
      />
      <div className="max-w-full overflow-auto whitespace-nowrap">
        <Table>
          {tableCaption && <TableCaption>{tableCaption}</TableCaption>}
          <TableHeadCustom
            headers={column}
            hasCheckbox={hasCheckbox}
            onSelectAllClick={handleSelectAllClick}
            isLoading={isLoading}
            hasCollapsibleTable={hasCollapsibleTable}
          />
          <TableBodyCustom
            headers={column}
            data={isClientPaginate ? slicedData : data}
            hasCheckbox={hasCheckbox}
            isSelected={isSelected}
            handleClickSelected={handleClickSelected}
            handleClickRow={hasDoubleClick}
            isLoading={isLoading}
            hasCollapsibleTable={hasCollapsibleTable}
            collapsibleColumn={collapsibleColumn}
            collapsibleColumnValue={collapsibleColumnValue}
          />

          {hasTableFooter && (
            <TableFooterCustom
              headers={column}
              hasCheckbox={hasCheckbox}
              count={count ? count : data.length}
              rowsPerPageOptions={[5, 10, 25, 50]}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              isClientPaginate={isClientPaginate}
              hasCollapsibleTable={hasCollapsibleTable}
            />
          )}
        </Table>
      </div>
    </div>
  );
};

export default MainTable;
