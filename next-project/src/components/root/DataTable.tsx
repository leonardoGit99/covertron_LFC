"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi2";
import { deleteCategory } from '@/services/categories';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import CategoryDialog from './CategoryDialog';
import { SubCategories } from '@/types/subcategory';
import { deleteSubCategory } from '@/services/subCategories';
import { Categories } from '@/types';
import SubCategoryDialog from './SubCategoryDialog';
import { toast } from 'sonner';



function DataTable({ data, type }: { data: Categories | SubCategories, type: 'categories' | 'subcategories' }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<number | null>(null);
  const handleDelete = async (id: number) => {
    if (type === 'categories') {
      const { message } = await deleteCategory(id)
      toast(message, {
        description: "Se ha eliminado la categoría",
        action: {
          label: "OK",
          onClick: () => console.log("OK"),
        },
      });
    } else {
      const { message } = await deleteSubCategory(id);
      console.log(message)
      toast(message, {
        description: "Se ha eliminado la sub-categoría",
        action: {
          label: "OK",
          onClick: () => console.log("OK"),
        },
      });
    }
    router.refresh();
  };

  return (
    <div>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className='bg-blue-50'>
            <TableRow>
              <TableHead className="text-left">Nombre</TableHead>
              <TableHead className="text-left">Descripción</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 && data.map(({ id, name, description }) => (
              <TableRow key={id}>
                <TableCell className='text-start'>{name}</TableCell>
                <TableCell className='text-start'>{description}</TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" >...</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='min-w-0'>
                      <DropdownMenuGroup >
                        <DropdownMenuItem
                          className='p-0'
                        >
                          <Button variant={'ghost'} onClick={() => setEditingId(id)}>
                            <HiOutlinePencilAlt className='p-0 text-blue-600' />
                          </Button>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='p-0'>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(id)}
                            className='w-full'
                          >
                            <HiOutlineTrash className='p-0 text-destructive' />
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingId !== null && type == 'categories' ? (
        <CategoryDialog
          id={editingId}
          open={editingId !== null}
          onOpenChange={(isOpen) => {
            if (!isOpen) setEditingId(null);
          }}
        />) : (
        <SubCategoryDialog
          id={editingId}
          open={editingId !== null}
          onOpenChange={(isOpen) => {
            if (!isOpen) setEditingId(null);
          }}
        />
      )
      }
    </div >
  )
}

export default DataTable