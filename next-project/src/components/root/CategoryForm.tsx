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
import { CategoryFormData } from './CategoryDialog';
import { UseFormReturn } from 'react-hook-form';

// Types
type Category = {
  name: string,
  description: string
}

type Props = {
  form: UseFormReturn<CategoryFormData>;
  onSubmit: (body: CategoryFormData) => void;
  id?: number
  category: Category
};

function CategoryForm({ form, onSubmit, id, category }: Props) {
  const values = form.watch();
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

        <Button
          type="submit"
          className="w-full"
          disabled={
            category.name === values.name && category.description === values.description
          }
        >
          <IoIosSave /> Guardar
        </Button>
      </form>
    </Form>
  )
}

export default CategoryForm