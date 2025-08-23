'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SubCategoryDialog from './SubCategoryDialog';

// Types
type Props = {
  btnLabel: string;
};

function SubCategoryDialogButton({ btnLabel /* id */ }: Props) {
  const [open, setOpen] = useState(false); // State for modal

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-slate-900 hover:bg-slate-800 active:bg-slate-700 dark:bg-sky-900 dark:hover:bg-sky-800 dark:active:bg-sky-700 dark:text-white dark:border dark:border-gray-500"
      >
        {btnLabel}
      </Button>
      <SubCategoryDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}

export default SubCategoryDialogButton;
