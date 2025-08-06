"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button';
import { IoIosSave } from "react-icons/io";
import { UseFormReturn } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Categories } from '@/types';
import { NewProduct, Product } from '@/types/product';
import { SubCategories } from '@/types/subcategory';
import Upload from './Upload';
import { getSubCategoriesByCategory } from '@/services/subCategories';

// Types
type Props = {
  id?: number | null
  product: Omit<Product, 'categoryName' | 'subCategoryName'>
  categories: Categories
  form: UseFormReturn<NewProduct>;
  onSubmit: (body: NewProduct) => void;
  images: File[],
  setImages: React.Dispatch<React.SetStateAction<File[]>>,
  imageUrls: string[],
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>
  setDeletedImages: React.Dispatch<React.SetStateAction<string[]>>
};



function ProductForm({ form, onSubmit, id, product, categories, images, setImages, imageUrls, setImageUrls, setDeletedImages }: Props) {
  const [subCategoriesByCategory, setSubCategoriesByCategory] = useState<SubCategories>([])
  const categoryId = form.watch("categoryId");

  useEffect(() => {
    if (id && product) {
      form.reset({
        name: product.name,
        description: product.description,
        categoryId: product.categoryId,
        subCategoryId: product.subCategoryId,
        price: product.price,
        discount: product.discount,
        brand: product.brand
      })
    }
  }, [id, product])


  useEffect(() => {
    if (categoryId) {
      // Reset subCategoryId to prevent mismatch when selected category differs from the original product's category (to prevent blank subcategory select when user changes to another category that is not the current category in db)
      if (categoryId === product.categoryId) {
        form.resetField("subCategoryId", { defaultValue: product.subCategoryId });
      } else {
        form.resetField("subCategoryId", { defaultValue: null });
      }

      const fetchSubCategoriesByCategory = async () => {
        const { data, success } = await getSubCategoriesByCategory(Number(categoryId));
        if (success && data) {
          setSubCategoriesByCategory(data.subCategories);
        }
      };
      fetchSubCategoriesByCategory();
    }
  }, [categoryId]);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" autoComplete='off'>

        {/* Name Input */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej. Polo, Polera overize..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description TextArea */}
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
                  placeholder="Ej. Polera oversize de algodón..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <div className='grid grid-cols-2 grid-rows-2 gap-4'>
          {/* Category Select */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value ? String(field.value) : ""}
                    disabled={categories.length === 0}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categorías</SelectLabel>
                        {
                          categories.length > 0 && categories.map(({ id, name }) => (
                            <SelectItem
                              value={id.toString()}
                              key={id}
                            >
                              {name}
                            </SelectItem>
                          ))
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sub-category Select */}
          <FormField
            control={form.control}
            name="subCategoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub-categoría</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value ? String(field.value) : ""}
                    disabled={subCategoriesByCategory.length === 0}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona una sub-cat..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Sub-categorías</SelectLabel>
                        {
                          subCategoriesByCategory.length > 0 && subCategoriesByCategory.map(({ id, name }) => (
                            <SelectItem
                              value={id.toString()}
                              key={id}
                            >
                              {name}
                            </SelectItem>
                          ))
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Price Input */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio (Bs.)</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    step='0.01'
                    placeholder="Ej. 120"
                    {...field}
                    value={field.value ?? ''}
                    onBlur={(e) => {
                      // Convierte a número y luego a string con dos decimales
                      const value = parseFloat(e.target.value);
                      if (!isNaN(value)) {
                        field.onChange(value.toFixed(2)); // convierte a string tipo "120.00"
                      } else {
                        field.onChange(''); // opcional: limpiar si no es válido
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          {/* Discount Input */}
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descuento (%)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. 15"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Brand Input */}
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marca</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej. Covertron"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Upload
          images={images}
          setImages={setImages}
          imageUrls={imageUrls}
          id={id}
          setImageUrls={setImageUrls}
          setDeletedImages={setDeletedImages}
        />
        <Button
          type="submit"
          className="w-full"
        // disabled={
        //   product.name === values.name && product.description === values.description
        // }
        >
          <IoIosSave /> Guardar
        </Button>
      </form>
    </Form>
  )
}

export default ProductForm