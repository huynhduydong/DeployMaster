"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export function CustomViewDialog({ itemTrigger, title, itemContent }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{itemTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[1200px] w-2/3 bg-gray-100">
        <DialogHeader>
          <DialogTitle>
            <div className="text-xl mb-[8px]">{title}</div>
          </DialogTitle>
          <DialogDescription>{itemContent}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            className="text-white text-[16px] bg-blue-600 px-[16px] py-[8px] rounded-[6px] hover:opacity-80 mt-[8px]"
            onClick={() => {
              setOpen(false);
            }}
          >
            Đóng
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}