'use client';
import React, { ChangeEvent } from 'react';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { CgSearch } from 'react-icons/cg';
type Props = {
  handleChange: (search: ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
};

function SearchInput({ handleChange, searchTerm }: Props) {
  return (
    <Card className="w-[70vw] md:w-[350px] shadow-sm dark:bg-slate-800 dark:border dark:border-slate-700">
      <div className="relative">
        <CgSearch className="absolute left-3 top-5 -translate-y-1/2 text-gray-400 text-xl" />
        <Input
          type='search'
          placeholder="¿Qué estás buscando?"
          onChange={handleChange}
          className="pl-9 dark:bg-gray-800 dark:border dark:border-gray-700 text-sm md:text-base"
          value={searchTerm}
        />
      </div>
    </Card>
  );
}

export default React.memo(SearchInput);
