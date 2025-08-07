'use client';
import React, { ChangeEvent } from 'react';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { CgSearch } from 'react-icons/cg';
type Props = {
  handleChange: (search: ChangeEvent<HTMLInputElement>) => void;
};

function SearchInput({ handleChange }: Props) {
  return (
    <Card className="w-full max-w-md shadow-sm">
      <div className="relative">
        <CgSearch className="absolute left-3 top-5 -translate-y-1/2 text-gray-400 text-sm" />
        <Input
          placeholder="¿Qué estás buscando?"
          onChange={handleChange}
          className="pl-9"
        />
      </div>
    </Card>
  );
}

export default React.memo(SearchInput);
