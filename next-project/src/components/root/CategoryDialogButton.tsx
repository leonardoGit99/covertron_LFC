"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CategoryDialog from "./CategoryDialog";

// Types
type Props = {
  btnLabel: string
  id?: number
}

function CategoryDialogButton({ btnLabel, id }: Props) {
  const [open, setOpen] = useState(false); // State for modal

  return (
    <>
      <Button onClick={() => setOpen(true)}>{btnLabel}</Button>
      <CategoryDialog
        id={id}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}

export default CategoryDialogButton