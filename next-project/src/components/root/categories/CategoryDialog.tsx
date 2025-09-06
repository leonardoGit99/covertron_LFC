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
import CategoryForm from '@/components/root/categories/CategoryForm';
import { Separator } from '../../ui/separator';
import { toast } from 'sonner';
import { CreateCategoryDTO, UpdateCategoryDTO } from '@/types';
import { createCategorySchema } from '@/schemas/category.schema';
import Spinner from '../../shared/Spinner';

type Props = {
  id?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setRefresh: (isRefresh: boolean) => void;
};

function CategoryDialog({ id, open, onOpenChange, setRefresh }: Props) {
  const [isSending, setIsSending] = useState(false); // State to manage the sending state of the form
  const [isLoading, setIsLoading] = useState(false); // State to manage the loading state of the category data
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
      console.log("flag")
      if (id) {
        setIsLoading(true);
        const { success, data } = await getOneCategory(id);
        if (success && data) {
          setCategory(data);
          form.reset(data);
        }
      }
      setIsLoading(false);
    };
    getCategory();
  }, [id, form]);

  // Function to submit body to backend depending whether there's an id or not
  const onSubmit = async (body: CreateCategoryDTO | UpdateCategoryDTO) => {
    setIsSending(true);
    if (id) {
      const { success, message } = await updateCategory(
        body as UpdateCategoryDTO,
        id
      );
      if (success) {
        toast(message);
        form.reset();
        onOpenChange(false);
        setRefresh(true);
      } else {
        if (message === 'Category name already exists') {
          form.setError('name', {
            type: 'manual',
            message: 'Ya existe una categoría con ese nombre',
          });
        }
      }
      setIsSending(false);
    } else {
      const { success, message } = await createCategory(
        body as CreateCategoryDTO
      );
      if (success) {
        toast(message);
        form.reset();
        onOpenChange(false);
        setRefresh(true);
      } else {
        if (message === 'Category name already exists') {
          form.setError('name', {
            type: 'manual',
            message: 'Ya existe una categoría con ese nombre',
          });
        }
      }
      setIsSending(false);
    }
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
        {isLoading ? (
          <Spinner text="Cargando categoría, espere un momento por favor..." />
        ) : (
          <CategoryForm
            form={form}
            onSubmit={onSubmit}
            category={category}
            isSending={isSending}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CategoryDialog;
