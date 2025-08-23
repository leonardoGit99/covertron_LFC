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
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import {
  CreateSubCategory,
  SubCategory,
  UpdateSubCategory,
} from '@/types/subcategory';
import SubCategoryForm from '@/components/root/subcategories/SubcategoryForm';
import {
  createSubCategory,
  getOneSubCategory,
  updateSubCategory,
} from '@/services/subCategories';
import { Categories } from '@/types';
import { getAllCategories } from '@/services/categories';
import { toast } from 'sonner';
import { createSubCategorySchema } from '@/schemas/subCategory.schema';
import Spinner from '@/components/shared/Spinner';

type DialogProps = {
  subCategoryId?: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function SubCategoryDialog({ subCategoryId, open, onOpenChange }: DialogProps) {
  const [isSending, setIsSending] = useState(false); // State to manage the sending state of the form
  const [isLoading, setIsLoading] = useState(false); // State to manage the loading state of the form
  const router = useRouter();
  const [subCategory, setSubCategory] = useState<SubCategory>({
    id: 0,
    name: '',
    description: '',
    categoryId: 0,
    categoryName: '',
  }); // State to store sub category data from back
  const [categories, setCategories] = useState<Categories>([]); // State to store categories data from back

  // Resolve and default values
  const form = useForm<CreateSubCategory>({
    resolver: zodResolver(createSubCategorySchema),
    defaultValues: {
      name: '',
      description: '',
      categoryId: 0,
    },
  });

  // Getting subcategory and categories from backend 
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      let subCat = subCategory;

      if (subCategoryId) {
        const { data, success } = await getOneSubCategory(subCategoryId);
        if (success && data) subCat = data;
      }

      const { data: catData, success: catSuccess } = await getAllCategories();
      const categories = catSuccess && catData ? catData.categories : [];

      setSubCategory(subCat);
      setCategories(categories);

      form.reset({
        name: subCat.name,
        description: subCat.description,
        categoryId: subCat.categoryId,
      });

      setIsLoading(false);
    };

    fetchData();
  }, [subCategoryId]);

  // Function to observe the modal behavior
  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      form.reset(); // Clean inputs when modal is opened or closed
      setSubCategory({
        id: 0,
        name: '',
        description: '',
        categoryId: 0,
        categoryName: '',
      });
    }
  };

  // Function to submit body to backend depending whether there's an id or not
  const onSubmit = async (body: CreateSubCategory | UpdateSubCategory) => {
    setIsSending(true);
    if (subCategoryId) {
      const { categoryId } = body as UpdateSubCategory;
      const { success, message } = await updateSubCategory(
        body,
        subCategoryId,
        categoryId as number
      );
      if (success) {
        toast(message);
        form.reset();
        onOpenChange(false);
        router.refresh();
      } else {
        if (message === 'Sub Category name already exists') {
          form.setError('name', {
            type: 'manual',
            message: 'Ya existe una sub-categoría con ese nombre',
          });
        }
      }
      setIsSending(false);
    } else {
      const { categoryId } = body as CreateSubCategory;
      const { success, message } = await createSubCategory(
        body as CreateSubCategory,
        categoryId
      );
      if (success) {
        toast(message);
        form.reset();
        onOpenChange(false);
        router.refresh();
      } else {
        if (message === 'Sub Category name already exists') {
          form.setError('name', {
            type: 'manual',
            message: 'Ya existe una sub-categoría con ese nombre',
          });
        }
      }
      setIsSending(false);
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
            {subCategoryId ? 'Actualizar Sub-Categoría' : 'Nueva Sub-Categoría'}
          </DialogTitle>
          <Separator />
        </DialogHeader>
        {isLoading ? (
          <Spinner text="Cargando sub categoría, espere un momento por favor..." />
        ) : (
          <SubCategoryForm
            form={form}
            onSubmit={onSubmit}
            categories={categories}
            subCategory={subCategory}
            isSending={isSending}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SubCategoryDialog;
