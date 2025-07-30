"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import SubCategoryDialog from "./SubCategoryDialog";

// Types
type Props = {
  btnLabel: string
}

function SubCategoryDialogButton({ btnLabel, /* id */ }: Props) {
  const [open, setOpen] = useState(false); // State for modal

  return (
    <>
      <Button onClick={() => setOpen(true)}>{btnLabel}</Button>
      <SubCategoryDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}

export default SubCategoryDialogButton