'use client';
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createCategory,
  getOneCategory,
  updateCategory,
} from '@/services/categories';
import { useRouter } from 'next/navigation';
import CategoryForm from './CategoryForm';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';
import { CreateCategoryDTO, UpdateCategoryDTO } from '@/types';
import { createCategorySchema } from '@/schemas/category.schema';
import { type } from 'node:os';
import { useFetch } from '@/hooks/useFetch';

type Props = {
  id?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function CategoryDialog({ id, open, onOpenChange }: Props) {
  const router = useRouter();
  const [category, setCategory] = useState<CreateCategoryDTO>({
    name: '',
    description: '',
  }); // State to store category data from back

  // Resolve and default values
  const form = useForm<CreateCategoryDTO>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  // Getting category from backend only if there is an id
  useEffect(() => {
    const getCategory = async () => {
      if (id) {
        const { success, data } = await getOneCategory(id);
        if (success && data) {
          setCategory(data);
        }
        form.reset(data);
      }
    };
    getCategory();
  }, [id, form]);

  // Function to submit body to backend depending whether there's an id or not
  const onSubmit = async (body: CreateCategoryDTO | UpdateCategoryDTO) => {
    if (id) {
      const { message } = await updateCategory(body as UpdateCategoryDTO, id);
      toast(message);
      form.reset();
    } else {
      const { message } = await createCategory(body as CreateCategoryDTO);
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
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-3">
            {id ? 'Actualizar Categoría' : 'Nueva Categoría'}
          </DialogTitle>
          <Separator />
        </DialogHeader>
        {/* Create or Update Form*/}
        <CategoryForm
          form={form}
          onSubmit={onSubmit}
          category={category}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CategoryDialog;
