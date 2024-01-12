/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import * as React from "react";
import { MainTableColumnInterface } from "~/interface/component_interface";
import { BiHide, BiShow, BiCheckCircle } from "react-icons/bi/index.js";
import { RxMixerHorizontal } from "react-icons/rx/index.js";
import { IoReorderThreeOutline, IoAdd } from "react-icons/io5/index.js";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useStore } from "~/store/use-store/use_store";
import { Label } from "~/components/ui/label";

type CustomTableProps = {
  column: MainTableColumnInterface[];
  setTableColumn: any;
  titleTable?: string;
  hasShowColumn?: boolean;
  hasCreateButton?: () => void;
};

const CustomTableTools = ({
  column,
  setTableColumn,
  titleTable,
  hasShowColumn,
  hasCreateButton,
}: CustomTableProps) => {
  const [state] = useStore();
  const { selectedValue } = state.tableReducer;
  const [isDragging, setIsDragging] = React.useState(false);
  const [temporaryOrder, setTemporaryOrder] =
    React.useState<MainTableColumnInterface[]>(column);
  const [openDialog, setOpenDialog] = React.useState(false);
  const draggedIndex = React.useRef<number | null>(null);
  const startY = React.useRef<number | null>(null);
  const [dragItemIndex, setDragItemIndex] = React.useState<number | null>(null);
  const [dragOverItemIndex, setDragOverItemIndex] = React.useState<
    number | null
  >(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.dataTransfer.setData("text/plain", index.toString());
    setDragItemIndex(index);
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (index: number) => {
    setDragOverItemIndex(index);
  };
  const handleDragLeave = () => {
    setDragOverItemIndex(null);
  };

  const handleDrop = (index: number) => {
    const updatedOrder = [...temporaryOrder];
    const [draggedItem] = updatedOrder.splice(dragItemIndex!, 1);
    updatedOrder.splice(index, 0, draggedItem);
    setIsDragging(false);
    setTemporaryOrder(updatedOrder);
  };

  const toggleVisibility = (index: number) => {
    const updatedOrder = [...temporaryOrder];
    updatedOrder[index].visible = !updatedOrder[index].visible;
    setTemporaryOrder(updatedOrder);
  };

  const handleSaveOrder = () => {
    setTableColumn(temporaryOrder);
    setIsDragging(false);
    setOpenDialog(false);
  };

  const dragEnd = () => {
    // Clear the timer when the drag ends
    draggedIndex.current = null;
    startY.current = null;
    setDragItemIndex(null);
    setDragOverItemIndex(null);
  };

  return (
    <>
      {(titleTable || hasShowColumn || selectedValue.length > 0) && (
        <div className="flex mb-2 bg-slate-50 shadow-sm rounded-sm px-2 py-4 justify-between">
          <h4 className="px-2 ">{titleTable}</h4>

          <div className="flex space-x-2">
            {hasCreateButton && (
              <Button
                size="sm"
                className="ml-auto hidden h-8 lg:flex"
                onClick={hasCreateButton}>
                <IoAdd className="mr-2 h-4 w-4" />
                Create
              </Button>
            )}

            {selectedValue.length > 0 && (
              <Button size="sm" className="ml-auto hidden h-8 lg:flex">
                <BiCheckCircle className="mr-2 h-4 w-4" />
                Selected
              </Button>
            )}
            {hasShowColumn && (
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto hidden h-8 lg:flex">
                    <RxMixerHorizontal className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] max-h-[700px] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Table Column</DialogTitle>
                    <DialogDescription>
                      Show columns table management
                    </DialogDescription>
                  </DialogHeader>
                  {temporaryOrder.map((item, index: number) => {
                    return (
                      <div
                        key={index}
                        className={`flex py-2 items-center justify-between ${
                          dragOverItemIndex === index ? "shadow-sm p-2" : ""
                        } 
                    transition-transform duration-300 ease-in-out`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => dragOver(e)}
                        onDragEnter={() => handleDragEnter(index)}
                        onDragLeave={handleDragLeave}
                        onDrop={() => handleDrop(index)}
                        onDragEnd={dragEnd}>
                        <Label htmlFor="name" className="text-right">
                          {item.label}
                        </Label>
                        <div className="flex space-x-2">
                          <Button
                            variant={"ghost"}
                            className="h-8"
                            onClick={() => toggleVisibility(index)}>
                            {item.visible ? (
                              <BiShow className="h-4 w-4" />
                            ) : (
                              <BiHide className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant={"outline"}
                            className={`h-8 ${
                              isDragging ? "cursor-grabbing" : "cursor-grab"
                            }`}
                            draggable
                            onMouseDown={() => setIsDragging(true)}
                            onMouseUp={() => setIsDragging(false)}>
                            <IoReorderThreeOutline className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  <DialogFooter className="mt-4">
                    <Button onClick={() => handleSaveOrder()}>
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CustomTableTools;
