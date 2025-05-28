"use client"
import React from 'react'
import { useState } from 'react';
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

type Categorie = {
  id: number,
  name: string,
  description: string
}

type Categories = Categorie[];


function CategoriesTable({ categories }: { categories: Categories }) {
  const router = useRouter();
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
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Nombre</TableHead>
                <TableHead className="text-left">Descripción</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell>{cat.name}</TableCell>
                  <TableCell className='text-start'>{cat.description}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(cat.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default CategoriesTable