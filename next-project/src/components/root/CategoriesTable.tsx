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
import { Pencil, Trash2 } from 'lucide-react';
import { deleteCategorie } from '@/services/categories';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import CategoryDialog from './CategoryDialog';


type Categorie = {
  id: number,
  name: string,
  description: string
}

type Categories = Categorie[];


function CategoriesTable({ categories }: { categories: Categories }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<number | null>(null);

  // const [categories, setCategories] = useState<()=>{}>;
  const handleDelete = (id: number) => {
    deleteCategorie(id)
    alert("Categoria eliminada!");
    router.refresh();
  };

  return (
    <div className="mt-10">
      {categories.length === 0 ? (
        <p className="text-muted-foreground mt-8">📭 No hay categorías aún. ¡Crea la primera!</p>
      ) : (
        <div className="rounded-md border mt-4 overflow-hidden">
          <Table>
            <TableHeader className='bg-slate-200'>
              <TableRow>
                <TableHead className="text-left">Nombre</TableHead>
                <TableHead className="text-left">Descripción</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell className='text-start'>{cat.name}</TableCell>
                  <TableCell className='text-start'>{cat.description}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" >...</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='min-w-0'>
                        <DropdownMenuGroup >
                          <DropdownMenuItem
                            className='p-0'
                          >
                            <Button variant={'ghost'} onClick={() => setEditingId(cat.id)}>
                              <Pencil className='p-0'/>
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className='p-0'>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(cat.id)}
                              className='w-full'
                            >
                              <Trash2 className='p-0'/>
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
      )
      }
      {editingId !== null && (
        <CategoryDialog
          id={editingId}
          open={editingId !== null}
          onOpenChange={(isOpen) => {
            if (!isOpen) setEditingId(null);
          }}
        />
      )}
    </div >
  )
}

export default CategoriesTable