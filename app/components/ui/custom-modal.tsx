/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

type ModalCompProps = {
  title?: string;
  discription?: string;
  modalOpen: boolean;
  onClose?: () => void; // Change any to () => void for better type safety
  children?: React.ReactNode;
  body?: React.ReactNode;
};

const ModalComp = ({
  title = "Title",
  discription = "",
  children,
  modalOpen = false,
  onClose,
  body,
}: ModalCompProps) => {
  return (
    <Dialog open={modalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{discription}</DialogDescription>
        </DialogHeader>
        {children}
        {body}
      </DialogContent>
    </Dialog>
  );
};

export default ModalComp;
