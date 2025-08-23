'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import MobileNavBar from './MobileNavBar';
import { CiMenuFries } from 'react-icons/ci';

type Props = {
  type?: 'default' | 'transparent';
};

function BurguerBtn({type = 'default'}: Props) {
  const [open, setOpen] = useState(false); // State for sheet
  return (
    <>
      <Button
        aria-label="Abrir menú de navegación"
        size="icon"
        variant="ghost"
        onClick={() => setOpen(true)}
      >
        <CiMenuFries />
      </Button>
      <MobileNavBar
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}

export default BurguerBtn;
