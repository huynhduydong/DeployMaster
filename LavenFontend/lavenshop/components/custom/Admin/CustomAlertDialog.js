import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { Button } from "@/components/ui/button";
  import { useState } from "react";
  
  export function CustomAlertDialog({
    itemTrigger,
    title,
    content,
    confirmContent,
  cancelContent,
    onConfirm,
    onCancel,
  }) {
    const [open, setOpen] = useState(false);
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>{itemTrigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{content}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <button
              className="bg-blue-50 py-[8px] px-[16px] border-blue-600 border-[1.5px] hover:opacity-80 rounded-[6px]"
              onClick={() => {
                setOpen(false);
                onCancel && onCancel();
              }}
            >
            <div className="text-blue-600">{cancelContent}</div>
                        </button>
            <button
              className="bg-blue-600 py-[8px] px-[16px] hover:opacity-80 rounded-[6px]"
              onClick={() => {
                setOpen(false);
                onConfirm && onConfirm();
              }}
            >
            <div className="text-white">{confirmContent}</div>
                        </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }