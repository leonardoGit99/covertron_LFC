"use client"
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Separator } from '../ui/separator';
import { NewSubCategory, SubCategoryWithCategoryName } from '@/types/subcategory';
import SubCategoryForm from './SubcategoryForm';
import { createSubCategory, getOneSubCategory, updateSubCategory } from '@/services/subCategories';
import { Categories } from '@/types';
import { getAllCategories } from '@/services/categories';
import { toast } from "sonner"
import { subCategorySchema } from '@/schemas/subCategory.schema';


type DialogProps = {
  subCategoryId?: number | null
  open: boolean,
  onOpenChange: (open: boolean) => void
}

function SubCategoryDialog({ subCategoryId, open, onOpenChange }: DialogProps) {
  const router = useRouter();
  const [subCategory, setSubCategory] = useState<SubCategoryWithCategoryName>({
    id: 0,
    name: '',
    description: '',
    categoryId: 0,
    categoryName: ''
  }); // State to store sub category data from back
  const [categories, setCategories] = useState<Categories>([]); // State to store categories data from back

  // Resolve and default values
  const form = useForm<NewSubCategory>({
    resolver: zodResolver(subCategorySchema),
    defaultValues: {
      name: '',
      description: '',
      categoryId: 0
    }
  });

  // Getting category from backend only if there is an id
  useEffect(() => {
    const fetchSubCategory = async () => {
      if (subCategoryId) {
        const { data } = await getOneSubCategory(subCategoryId)
        setSubCategory(data);
      }
    }
    fetchSubCategory();
  }, [subCategoryId]);

  // Getting categories from backend only if theres a subcategory info
  useEffect(() => {
    if (subCategory) {
      const fetchCategories = async () => {
        const { data, success } = await getAllCategories();
        const categories = (success) ? data.categories : [];
        setCategories(categories);
        form.reset({
          name: subCategory.name,
          description: subCategory.description,
          categoryId: subCategory.categoryId
        });
      }
      fetchCategories();
    }
  }, [subCategory]);


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
        categoryName: ''
      });
    }
  };

  // Function to submit body to backend depending whether there's an id or not
  const onSubmit = async (body: NewSubCategory) => {
    const { categoryId, ...rest } = body;
    const newBody: NewSubCategory = {
      ...rest,
      categoryId,
    };
    if (subCategoryId) {
      const response = await updateSubCategory(newBody, subCategoryId, categoryId);
      toast(response.message);
      form.reset();
    } else {
      const response = await createSubCategory(newBody, categoryId);
      toast(response.message);
      form.reset();
    }
    onOpenChange(false);
    router.refresh();
  };

  console.log(subCategory)
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center mb-3'>
            {!subCategoryId ? "Nueva Sub-Categoría" : "Actualizar Sub-Categoría"}
          </DialogTitle>
          <Separator />
        </DialogHeader>
        {/* Create or Update Form*/}
        <SubCategoryForm
          form={form}
          onSubmit={onSubmit}
          categories={categories}
          subCategory={subCategory}
        />
      </DialogContent>
    </Dialog>
  )
}

export default SubCategoryDialog