"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CategoryDialog from "./CategoryDialog";
import CustomSheet from "./CustomSheet";

// Types
type Props = {
  btnLabel: string
  sheetLabel: string
}

function ProductSheetButton({ btnLabel, sheetLabel }: Props) {
  const [open, setOpen] = useState(false); // State for sheet

  return (
    <>
      <Button onClick={() => setOpen(true)}>{btnLabel}</Button>
      <CustomSheet
        triggerBtnLabel={btnLabel}
        sheetTitle={sheetLabel}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}

export default ProductSheetButton