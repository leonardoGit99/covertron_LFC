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
  id?: number
  // product: NewProduct
  categories: Categories
  form: UseFormReturn<NewProduct>;
  onSubmit: (body: NewProduct) => void;
  images: File[],
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
};



function ProductForm({ form, onSubmit, id, /* product, */ categories, images, setImages }: Props) {
  const values = form.watch();
  const [category, setCategory] = useState<number | null>(null);
  const [subCategoriesByCategory, setSubCategoriesByCategory] = useState<SubCategories>([]);

  useEffect(() => {
    if (category) {
      const fetchSubcategories = async () => {
        const { data, success } = await getSubCategoriesByCategory(category);
        const subCategories = (success) ? data.subCategories : [];
        console.log(data);
        setSubCategoriesByCategory(subCategories);
      }
      fetchSubcategories();
    }
  }, [category])

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
                      setCategory(Number(value));
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
                    onValueChange={field.onChange}
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
                    placeholder="Ej. 120"
                    {...field}
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