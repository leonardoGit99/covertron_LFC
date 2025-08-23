// import React from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Categories } from '@/types';
import React from 'react';

import { BsFilter } from 'react-icons/bs';

type Props = {
  categories: Categories;
  handleFilterClick: (categoryId: number) => void;
  handleClearFilterClick: () => void;
};

function Filter({
  categories,
  handleFilterClick,
  handleClearFilterClick
}: Props) {
  // const handleFilterClick = async () => {
  //   const { data } = await getUserPosts(Number(userId))
  //   console.log(data)
  //   onFilterPosts(data);
  // }

  return (
    <Menubar className="bg-white shadow-sm dark:bg-gray-800 dark:border dark:border-gray-700 dark:hover:bg-gray-700 dark:active:bg-gray-600">
      <MenubarMenu>
        <MenubarTrigger
          className="hover:cursor-pointer dark:hover:bg-gray-700 dark:active:bg-gray-600"
        >
          {/* Icon */}
          <BsFilter className="text-lg md:text-xl" />
        </MenubarTrigger>
        <MenubarContent align="end" className='dark:bg-slate-900'>
          <MenubarItem
            className="hover:cursor-pointer"
            onClick={() => handleClearFilterClick()}
          >
            Todos los productos
          </MenubarItem>
          <MenubarSeparator />
          {categories.map((category, index) => (
            <React.Fragment key={category.id}>
              <MenubarItem
                className="hover:cursor-pointer"
                onClick={() => handleFilterClick(category.id)}
              >
                {category.name}
              </MenubarItem>
              {index < categories.length - 1 && <MenubarSeparator />}
            </React.Fragment>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export default Filter;
