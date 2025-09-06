'use client';
import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { IoIosSave } from 'react-icons/io';
import { UseFormReturn } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Categories } from '@/types';
import {
  CreateProductDTO,
  Product,
  ProductDetailAdminDTO,
} from '@/types/product';
import { SubCategories } from '@/types/subcategory';
import Upload from '@/components/root/products/Upload';

// Types
type Props = {
  product: Omit<
    Product,
    | 'categoryName'
    | 'subCategoryName'
    | 'discountedPrice'
    | 'createdAt'
    | 'updatedAt'
  >;
  categories: Categories;
  subCategories: SubCategories;
  form: UseFormReturn<CreateProductDTO>;
  onSubmit: (body: CreateProductDTO) => void;
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  deletedImages: string[];
  setDeletedImages: React.Dispatch<React.SetStateAction<string[]>>;
  setProduct: React.Dispatch<React.SetStateAction<ProductDetailAdminDTO>>;
  initialProductState: string;
  productState: string;
  setProductState: React.Dispatch<React.SetStateAction<string>>;
  setCategories: React.Dispatch<React.SetStateAction<Categories>>;
  isSending: boolean;
};

function ProductForm({
  form,
  onSubmit,
  product,
  categories,
  subCategories,
  images,
  setImages,
  imageUrls,
  setImageUrls,
  deletedImages,
  setDeletedImages,
  isSending,
  initialProductState,
  productState
}: Props) {
  useEffect(() => {
    form.setValue('images', [...images, ...imageUrls]);
  }, [images, imageUrls, form]);

  const name = form.watch('name');
  const description = form.watch('description');
  const categoryId = form.watch('categoryId');
  const subCategoryId = form.watch('subCategoryId');
  const originalPrice = form.watch('originalPrice');
  const brand = form.watch('brand');
  const discount = form.watch('discount');

  // Constraints for create product form
  const isFormFilled =
    name.trim() !== '' &&
    categoryId !== 0 &&
    subCategoryId !== 0 &&
    originalPrice !== 0 &&
    brand.trim() !== '' &&
    form.watch('images').length !== 0;


  // Constraints for edit product form
  // Check if the form values have changed compared to the initial product data
  const isFormChanged = product
    ? name.trim() !== product.name ||
      description?.trim() !== product.description ||
      Number(categoryId) !== Number(product.categoryId) ||
      Number(subCategoryId) !== Number(product.subCategoryId) ||
      originalPrice !== product.originalPrice ||
      String(discount) !== String(product.discount) ||
      brand.trim() !== product.brand ||
      deletedImages.length !== 0 ||
      images.length !== 0 ||
      productState !== initialProductState
    : true;

  const isSubmitDisabled =
    !isFormFilled || (product ? !isFormChanged : false) || isSending;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        autoComplete="off"
      >
        {/* Name Input */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nombre<span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej. Polo, Polera overize..."
                  {...field}
                  disabled={isSending}
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
                  disabled={isSending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          {/* Category Select */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Categoría<span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value ? String(field.value) : ''}
                    disabled={categories.length === 0 || isSending}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categorías</SelectLabel>
                        {categories.length > 0 &&
                          categories.map(({ id, name }) => (
                            <SelectItem
                              value={id.toString()}
                              key={id}
                            >
                              {name}
                            </SelectItem>
                          ))}
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
                <FormLabel>
                  Sub-categoría<span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value ? String(field.value) : ''}
                    disabled={subCategories.length === 0 || isSending}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona una sub-cat..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Sub-categorías</SelectLabel>
                        {subCategories.length > 0 &&
                          subCategories.map(({ id, name }) => (
                            <SelectItem
                              value={id.toString()}
                              key={id}
                            >
                              {name}
                            </SelectItem>
                          ))}
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
            name="originalPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Precio (Bs.)<span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10000"
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
                    disabled={isSending}
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
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    placeholder="Ej. 15"
                    {...field}
                    value={field.value ?? ''}
                    onBlur={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (!isNaN(value)) {
                        field.onChange(value);
                      } else {
                        field.onChange(0);
                      }
                    }}
                    disabled={isSending}
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
              <FormLabel>
                Marca<span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej. Covertron"
                  {...field}
                  disabled={isSending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={() => (
            <FormItem>
              <FormLabel>
                Imagen(s)<span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <Upload
                images={images}
                setImages={setImages}
                imageUrls={imageUrls}
                setImageUrls={setImageUrls}
                setDeletedImages={setDeletedImages}
                form={form}
                isSending={isSending}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-slate-900 hover:bg-slate-800 active:bg-slate-700 dark:bg-sky-900 dark:hover:bg-sky-800 dark:active:bg-sky-700 dark:text-white dark:border dark:border-gray-500"
          disabled={isSubmitDisabled}
        >
          <IoIosSave /> {isSending ? 'Guardando...' : 'Guardar'}
        </Button>
      </form>
    </Form>
  );
}

export default ProductForm;
