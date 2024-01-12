/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi/index.js";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { TableCell, TableFooter, TableRow } from "~/components/ui/table";
import { useStore } from "~/store/use-store/use_store";
const TableFooterCustom = (props: any) => {
  const [state] = useStore();

  const { selectedValue, rowPerPage, pageTable } = state.tableReducer;
  const {
    headers,
    rowsPerPageOptions,
    onRowsPerPageChange,
    onPageChange,
    hasCheckbox,
    hasCollapsibleTable,
    count,
  }: any = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 1);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, pageTable - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, pageTable + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.ceil(count / rowPerPage));
  };

  return (
    <>
      <TableFooter>
        <TableRow>
          <TableCell
            colSpan={
              hasCheckbox & hasCollapsibleTable
                ? headers.length + 2
                : hasCollapsibleTable | hasCheckbox
                ? headers.length + 1
                : headers.length
            }>
            <div className="flex items-center justify-between px-2">
              {selectedValue.length > 0 && (
                <div className="flex text-sm text-muted-foreground mx-2">
                  {selectedValue.length} of {count} row(s) selected.
                </div>
              )}

              <div className="flex flex-1 items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select
                  value={rowPerPage.toString()}
                  onValueChange={(value) => onRowsPerPageChange(value)}>
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue placeholder={rowPerPage.toString()} />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {rowsPerPageOptions.map((pageSize: number) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Page {pageTable} of {Math.ceil(count / rowPerPage)}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleFirstPageButtonClick}
                  disabled={pageTable === 1}
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex">
                  <span className="sr-only">Go to first page</span>
                  <FiChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleBackButtonClick}
                  disabled={pageTable === 1}
                  variant="outline"
                  className="h-8 w-8 p-0">
                  <span className="sr-only">Go to previous page</span>
                  <FiChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleNextButtonClick}
                  disabled={pageTable >= Math.ceil(count / rowPerPage)}
                  variant="outline"
                  className="h-8 w-8 p-0">
                  <span className="sr-only">Go to next page</span>
                  <FiChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleLastPageButtonClick}
                  disabled={pageTable >= Math.ceil(count / rowPerPage)}
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex">
                  <span className="sr-only">Go to last page</span>
                  <FiChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </>
  );
};

export default TableFooterCustom;
