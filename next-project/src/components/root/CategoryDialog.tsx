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
import { createCategorie, getOneCategorie, updateCategorie } from '@/services/categories';
import { useRouter } from 'next/navigation';
import CategorieForm from './CategoryForm';
import { Separator } from '../ui/separator';

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
  // const [open, setOpen] = useState(false); // State for modal
  const [categorie, setCategorie] = useState<Category>({
    name: '',
    description: '',
  }); // State to store categorie data from back

  // Resolver and default values
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: ''
    }
  });

  // Getting categorie from backend only if there is an id
  useEffect(() => {
    const getCategorie = async () => {
      if (id) {
        const categorie = await getOneCategorie(id);
        setCategorie(categorie);
        form.reset(categorie);
      }
    }
    getCategorie();
  }, [id, form]);



  // Function to submit body to backend depending whether there's an id or not
  const onSubmit = async (body: CategoryFormData) => {
    console.log(body);
    if (id) {
      const response = await updateCategorie(body, id);
      alert(response.message);
    } else {
      const response = await createCategorie(body);
      alert(response.message);
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
        {/* Create or Update */}
        <CategorieForm
          form={form}
          onSubmit={onSubmit}
          id={id}
          categorie={categorie}
        />
      </DialogContent>
    </Dialog>
  )
}

export default CategoryDialog