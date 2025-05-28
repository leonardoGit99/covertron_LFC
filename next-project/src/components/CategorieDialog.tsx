"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from './ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCategorie } from '@/services/categories';
import { useRouter } from 'next/navigation';
// Types
type Categorie = {
  id: number,
  name: string,
  description: string
}

type Categories = Categorie[];


const categorySchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

function CategorieDialog({ categories }: { categories: Categories }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const AddCategory = async (body: CategoryFormData) => {
    console.log(body);
    const response = await createCategorie(body);
    setOpen(false);
    alert(response.message);
    router.refresh();
  };

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: ''
    }
  });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen || !isOpen) {
      form.reset(); // limpia inputs cuando se cierra el modal
    }
  };
  return (
    <div className="mt-8">
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button size="lg">Crear nueva categoría</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-center'>Nueva Categoría</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(AddCategory)} className="space-y-8" autoComplete='off'>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej. Fundas..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        className="resize-none"
                        placeholder="Ej. Vive la experiencia..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">Guardar</Button>
            </form>
          </Form>


        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CategorieDialog