import React from 'react'
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { NewSubCategory, SubCategory } from '@/types/subcategory';
import { Categories } from '@/types';


// Types
type Props = {
  form: UseFormReturn<NewSubCategory>;
  onSubmit: (body: NewSubCategory) => void;
  categories: Categories,
  subCategory: SubCategory;
};

function SubCategoryForm({ form, onSubmit, categories, subCategory }: Props) {
  const isFormFilled =
    form.getValues("name").trim() !== "" &&
    form.getValues("description").trim() !== "" &&
    form.getValues("categoryId") !== 0;

  const isFormChanged = subCategory
    ? (
      form.getValues("name") !== subCategory.name ||
      form.getValues("description") !== subCategory.description ||
      form.getValues("categoryId") !== subCategory.categoryId
    )
    : true;

  const isSubmitDisabled = !isFormFilled || (subCategory ? !isFormChanged : false);
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" autoComplete='off'>
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

        {/* Category Select */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
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
                            value={String(id)}
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

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitDisabled}
        >
          <IoIosSave /> Guardar
        </Button>
      </form>
    </Form>
  )
}

export default SubCategoryForm