"use client"
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCategory, getOneCategory, updateCategory } from '@/services/categories';
import { useRouter } from 'next/navigation';
import CategoryForm from './CategoryForm';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';

// Validations Form
const categorySchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
});

// Types
export type CategoryFormData = z.infer<typeof categorySchema>;

type DialogProps = {
  id?: number
  open: boolean,
  onOpenChange: (open: boolean) => void
}

type Category = {
  name: string,
  description: string
}

function CategoryDialog({ id, open, onOpenChange }: DialogProps) {
  const router = useRouter();
  const [category, setCategory] = useState<Category>({
    name: '',
    description: '',
  }); // State to store category data from back

  // Resolve and default values
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: ''
    }
  });

  // Getting category from backend only if there is an id
  useEffect(() => {
    const getCategory = async () => {
      if (id) {
        const {data} = await getOneCategory(id);
        setCategory(data);
        form.reset(data);
      }
    }
    getCategory();
  }, [id, form]);



  // Function to submit body to backend depending whether there's an id or not
  const onSubmit = async (body: CategoryFormData) => {
    console.log(body);
    if (id) {
      const { message } = await updateCategory(body, id);
      toast(message);
      form.reset();
    } else {
      const { message } = await createCategory(body);
      toast(message);
      form.reset();
    }
    onOpenChange(false);
    router.refresh();
  };



  // Function to observe the modal behavior
  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (isOpen || !isOpen) {
      form.reset(); // Clean inputs when modal is opened or closed
    }
  };


  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center mb-3'>
            {!id ? "Nueva Categoría" : "Actualizar Categoría"}
          </DialogTitle>
          <Separator />
        </DialogHeader>
        {/* Create or Update Form*/}
        <CategoryForm
          form={form}
          onSubmit={onSubmit}
          id={id}
          category={category}
        />
      </DialogContent>
    </Dialog>
  )
}

export default CategoryDialog