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
import { useRouter } from 'next/navigation';
import { Separator } from '../ui/separator';
import { SubCategoryWithCategoryName, SubCategoryWithoutID } from '@/types/subcategory';
import SubCategoryForm from './SubcategoryForm';
import { createSubCategory, getOneSubCategory, updateSubCategory } from '@/services/subCategories';
import { Categories } from '@/types';
import { getAllCategories } from '@/services/categories';
import { toast } from "sonner"

// Validations Form
const subCategorySchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  category: z.string({
    required_error: "Selecciona una categoría"
  })
});

// Types
export type SubCategoryFormData = z.infer<typeof subCategorySchema>;

type DialogProps = {
  id?: number | null
  open: boolean,
  onOpenChange: (open: boolean) => void
}


function SubCategoryDialog({ id, open, onOpenChange }: DialogProps) {
  const router = useRouter();
  const [subCategory, setSubCategory] = useState<SubCategoryWithCategoryName>({
    id: 0,
    name: '',
    description: '',
    category_id: 0,
    category_name: ''
  }); // State to store category data from back
  const [categories, setCategories] = useState<Categories>([]); // State to store subcategories data from back

  // Resolve and default values
  const form = useForm<SubCategoryFormData>({
    resolver: zodResolver(subCategorySchema),
    defaultValues: {
      name: '',
      description: '',
      category: ''
    }
  });

  // Getting category from backend only if there is an id
  useEffect(() => {
    const fetchSubCategory = async () => {
      if (id) {
        const { data } = await getOneSubCategory(id);
        setSubCategory(data);
        // form.reset({
        //   name: data.name,
        //   description: data.description,
        //   category: String(data.category_id)
        // });
      }
    }
    fetchSubCategory();
  }, [id]);

  // Getting categories from backend only if theres a subcategory info
  useEffect(() => {
    if (subCategory) {
      const fetchCategories = async () => {
        const { data } = await getAllCategories();
        setCategories(data);
        form.reset({
          name: subCategory.name,
          description: subCategory.description,
          category: String(subCategory.category_id)
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
        category_id: 0,
        category_name: ''
      });
    }
  };

  // Function to submit body to backend depending whether there's an id or not
  const onSubmit = async (body: SubCategoryFormData) => {
    const newBody: SubCategoryWithoutID = {
      ...body,
      category_id: parseInt(body.category, 10)
    }
    if (id) {
      const response = await updateSubCategory(newBody, id);
      toast(response.message);
      form.reset();
    } else {
      const response = await createSubCategory(newBody);
      toast(response.message);
      form.reset();
    }
    onOpenChange(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center mb-3'>
            {!id ? "Nueva Sub-Categoría" : "Actualizar Sub-Categoría"}
          </DialogTitle>
          <Separator />
        </DialogHeader>
        {/* Create or Update Form*/}
        <SubCategoryForm
          id={id}
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