'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import CategoryDialog from '../categories/CategoryDialog';
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
      <Button
        onClick={() => setOpen(true)}
        className="bg-slate-950 hover:bg-slate-800 active:bg-slate-700 dark:bg-sky-900 dark:hover:bg-sky-800 dark:active:bg-sky-700 dark:text-white dark:border dark:border-gray-500"
      >
        {btnLabel}
      </Button>
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
