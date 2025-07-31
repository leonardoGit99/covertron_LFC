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
import { NewCategory } from '@/types';


type Props = {
  form: UseFormReturn<NewCategory>;
  onSubmit: (body: NewCategory) => void;
  id?: number
  category: NewCategory
};

function CategoryForm({ form, onSubmit, id, category }: Props) {
  const isFormFilled =
    form.getValues("name").trim() !== "" &&
    form.getValues("description").trim() !== ""

  const isFormChanged = category
    ? (
      form.getValues("name") !== category.name ||
      form.getValues("description") !== category.description
    )
    : true;

  const isSubmitDisabled = !isFormFilled || (category ? !isFormChanged : false);
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
          disabled={isSubmitDisabled}
        >
          <IoIosSave /> Guardar
        </Button>
      </form>
    </Form>
  )
}

export default CategoryForm