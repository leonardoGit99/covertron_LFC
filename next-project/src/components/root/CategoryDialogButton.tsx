"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CategoryDialog from "./CategoryDialog";

// Types
type Props = {
  btnLabel: string
}

function CategoryDialogButton({ btnLabel }: Props) {
  const [open, setOpen] = useState(false); // State for modal

  return (
    <>
      <Button onClick={() => setOpen(true)}>{btnLabel}</Button>
      <CategoryDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}

export default CategoryDialogButton