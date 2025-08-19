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
import { CreateCategoryDTO } from '@/types';


type Props = {
  form: UseFormReturn<CreateCategoryDTO>,
  onSubmit: (body: CreateCategoryDTO) => void,
  category: CreateCategoryDTO
};

function CategoryForm({ form, onSubmit, category }: Props) {
  // Constraints for create category form
  const isFormFilled = form.getValues("name").trim() !== "" && form.getValues("description").trim() !== ""


  // Constraints for edit category form
  const isFormChanged = category
    ? (
      form.getValues("name") !== category.name ||
      form.getValues("description") !== category.description
    )
    : true;

  // SaveBtn disabled constraints 
  const isSubmitDisabled = !isFormFilled || (category ? !isFormChanged : false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" autoComplete='off'>
        {/* Name input */}
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

        {/* Description text area */}
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


        {/* Save button */}
        <Button
          type="submit"
          className="w-full bg-slate-900 hover:bg-slate-800 active:bg-slate-700 dark:bg-sky-900 dark:hover:bg-sky-800 dark:active:bg-sky-700 dark:text-white dark:border dark:border-gray-500"
          disabled={isSubmitDisabled}
        >
          <IoIosSave /> Guardar
        </Button>
      </form>
    </Form>
  )
}

export default CategoryForm