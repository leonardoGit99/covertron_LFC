'use client';
import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import ProductForm from './ProductForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '../ui/separator';
import { Categories } from '@/types';
import { getAllCategories } from '@/services/categories';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { CreateProductDTO, ProductDetailAdminDTO } from '@/types/product';
import { productSchema } from '@/schemas/product.schema';
import {
  createProduct,
  getOneProductAdmin,
  updateProduct,
} from '@/services/product';
import { toast } from 'sonner';

type Props = {
  triggerBtnLabel?: string;
  sheetTitle?: string;
  id?: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isRefresh: boolean;
  setRefresh: (isRefresh: boolean) => void;
};

function CustomSheet({
  sheetTitle,
  id,
  open,
  onOpenChange,
  setRefresh,
}: Props) {
  const [categories, setCategories] = useState<Categories>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [productState, setProductState] = useState<string>('available');
  const [isLoading, setIsLoading] = useState(true);
  // State to store product data from back
  const [product, setProduct] = useState<ProductDetailAdminDTO>({
    id: 0,
    name: '',
    description: '',
    categoryId: 0,
    subCategoryId: 0,
    originalPrice: 0,
    brand: '',
    discount: 0,
    state: '',
    images: [],
  });

  // Resolve and default values
  const form = useForm<CreateProductDTO>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      categoryId: undefined,
      subCategoryId: undefined,
      originalPrice: undefined,
      brand: '',
      discount: undefined,
    },
  });

  /* useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);

      const productPromise = id
        ? getOneProductAdmin(id)
        : Promise.resolve({ success: false, data: null });
      const categoriesPromise = getAllCategories();

      const [productRes, categoriesRes] = await Promise.all([
        productPromise,
        categoriesPromise,
      ]);

      if (productRes.success && productRes.data) {
        setProduct(productRes.data);
        setImageUrls(productRes.data.images);
        setProductState(productRes.data.state);
      }

      if (categoriesRes.success && categoriesRes.data) {
        setCategories(categoriesRes.data.categories);
      }

      setIsLoading(false);
    };

    fetchProduct();
  }, [id, form]); */

  // Function to observe the sheet behavior
  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (isOpen || !isOpen) {
      form.reset(); // Clean inputs when sheet is opened or closed
      setImages([]);
      setImageUrls([]);
    }
  };

  // Function to submit body to backend depending whether there's an id or not
  const onSubmit = async (body: CreateProductDTO | ProductDetailAdminDTO) => {
    const { categoryId, ...newBody } = body;

    const formData = new FormData();
    if (id) {
      /* const isDifferentBody = product.name !== newBody.name || product.description !== newBody.description || product.subCategoryId != newBody.subCategoryId || product.price !== newBody.price || product.discount !== newBody.discount || product.brand !== newBody.brand */

      Object.entries(newBody).forEach(([key, value]) => {
        if (key === 'originalPrice') {
          const numberValue =
            typeof value === 'number' ? value : parseFloat(String(value));
          formData.append(key, numberValue.toFixed(2)); // Fuerza "120.00"
        } else {
          formData.append(key, String(value));
        }
      });

      deletedImages.forEach((url) => {
        formData.append('deletedImages', url);
      });

      formData.append('state', productState);

      // If there's new images, we upload it
      images?.forEach((image) => {
        formData.append('imgs', image);
      });

      const { success, message } = await updateProduct(id, formData);
      if (success) {
        onOpenChange(false);
        setImages([]);
        setRefresh(true); // Refresh padre component state
        toast(message);
      }
      form.reset();
    } else {
      const formData = new FormData();
      Object.entries(newBody).forEach(([key, value]) => {
        // .entries Convierte un objeto en un array de pares clave-valor, pasamos como parametro una asignacion dinamica: Ej.
        // const product = {
        //   name: "Polera",
        //   price: 120,
        //   discount: 10
        // };

        // Resultado:
        // [
        //   ["name", "Polera"],
        //   ["price", 120],
        //   ["discount", 10]
        // ]

        if (key === 'price') {
          const numberValue =
            typeof value === 'number' ? value : parseFloat(String(value));
          formData.append(key, numberValue.toFixed(2)); // Fuerza "120.00"
        } else {
          formData.append(key, String(value));
        } // Si el valor es un número (como price), lo convertimos a string
      });

      images?.forEach((image) => {
        formData.append('imgs', image);
      });

      /* formData.append('name', body.name);
      formData.append('description', body.description);
      formData.append('categoryId', String(body.categoryId));
      formData.append('subCategoryId', String(body.subCategoryId));
      formData.append('price', String(body.price));
      formData.append('discount', String(body.discount));
      formData.append('brand', body.brand);
      images.forEach((image) => {
        formData.append('imgs', image);
      }) */

      const { message, success } = await createProduct(formData);
      if (success) {
        onOpenChange(false);
        setImages([]);
        setRefresh(true); // Refresh padre component state
        toast(message);
      }
      console.log('Creando Producto');
    }
    // onOpenChange(false);
    form.reset();
  };

  return (
    <Sheet
      open={open}
      onOpenChange={handleOpenChange}
    >
      <SheetContent
        side="right"
        className="dark:bg-backgroundDark"
      >
        {isLoading ? <>Loading..</> : <>Datos cargados</>}
        <SheetHeader>
          <SheetTitle>{sheetTitle}</SheetTitle>
          {id && (
            <div className="flex items-center space-x-2 ">
              <Switch
                checked={productState === 'available'}
                onCheckedChange={(checked) => {
                  setProductState(checked ? 'available' : 'sold out');
                }}
              />
              <Label
                className={`${
                  productState === 'available'
                    ? 'text-green-600'
                    : 'text-red-600'
                } font-normal transition-colors duration-200`}
              >
                {productState === 'available' ? 'Disponible' : 'Agotado'}
              </Label>
            </div>
          )}
        </SheetHeader>
        <Separator className="mt-2 mb-4" />
        <ProductForm
          id={id}
          form={form}
          product={product}
          categories={categories}
          onSubmit={onSubmit}
          images={images}
          setImages={setImages}
          imageUrls={imageUrls}
          setDeletedImages={setDeletedImages}
          deletedImages={deletedImages}
          setImageUrls={setImageUrls}
          setIsLoading={setIsLoading}
          setProduct={setProduct}
          setProductState={setProductState}
          setCategories={setCategories}
        />
      </SheetContent>
    </Sheet>
  );
}

export default CustomSheet;
