'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import CategoryDialog from './CategoryDialog';
import CustomSheet from './CustomSheet';

// Types
type Props = {
  btnLabel: string;
  sheetLabel: string;
  isRefresh: boolean;
  setRefresh: (isRefresh: boolean) => void;
};

function ProductSheetButton({
  btnLabel,
  sheetLabel,
  isRefresh,
  setRefresh,
}: Props) {
  const [open, setOpen] = useState(false); // State for sheet

  return (
    <>
      <Button onClick={() => setOpen(true)}>{btnLabel}</Button>
      <CustomSheet
        isRefresh={isRefresh}
        setRefresh={setRefresh}
        triggerBtnLabel={btnLabel}
        sheetTitle={sheetLabel}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}

export default ProductSheetButton;
