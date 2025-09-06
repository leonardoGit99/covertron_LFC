'use client';
import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import ProductForm from '@/components/root/products/ProductForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
import { Categories } from '@/types';
import { getAllCategories } from '@/services/categories';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { CreateProductDTO, ProductDetailAdminDTO } from '@/types/product';
import { productSchema } from '@/schemas/product.schema';
import {
  createProduct,
  getOneProductAdmin,
  updateProduct,
} from '@/services/product';
import { toast } from 'sonner';
import { getSubCategoriesByCategory } from '@/services/subCategories';
import { SubCategories } from '@/types/subcategory';
import Spinner from '@/components/shared/Spinner';

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
  const [initialProductState, setInitialProductState] = useState<string>('available');
  const [productState, setProductState] = useState<string>('available');
  const [isLoading, setIsLoading] = useState(true);
  const [subCategoriesByCategory, setSubCategoriesByCategory] =
    useState<SubCategories>([]);
  const [isSending, setIsSending] = useState(false);

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
      discount: 0,
    },
  });
  const categoryId = form.watch('categoryId');

  // Fetch inicial de categorías y producto
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Fetch categories
      const categoriesRes = await getAllCategories();
      if (categoriesRes.success && categoriesRes.data) {
        setCategories(categoriesRes.data.categories);
      }

      if (id) {
        // Fetch product
        const productRes = await getOneProductAdmin(id);
        if (productRes.success && productRes.data) {
          setProduct(productRes.data);
          setImageUrls(productRes.data.images);
          setInitialProductState(productRes.data.state);
          setProductState(productRes.data.state);

          // Fetch subcategories del producto
          const subRes = await getSubCategoriesByCategory(
            productRes.data.categoryId
          );
          if (subRes.success && subRes.data)
            setSubCategoriesByCategory(subRes.data.subCategories);

          // Reset form con datos
          form.reset({
            name: productRes.data.name,
            description: productRes.data.description ?? '',
            categoryId: productRes.data.categoryId,
            subCategoryId: productRes.data.subCategoryId,
            originalPrice: productRes.data.originalPrice,
            discount: productRes.data.discount ?? 0,
            brand: productRes.data.brand,
            images: productRes.data.images ?? [],
          });
        }
      }

      setIsLoading(false);
    };

    fetchData();
  }, [id, form]);

  // Fetch subcategories cuando cambia categoryId
  useEffect(() => {
    if (!categoryId) return;

    const fetchSubCategories = async () => {
      const res = await getSubCategoriesByCategory(Number(categoryId));
      if (res.success && res.data)
        setSubCategoriesByCategory(res.data.subCategories);

      // Reset subCategoryId si la categoría cambia
      form.resetField('subCategoryId', { defaultValue: undefined });
    };

    fetchSubCategories();
  }, [categoryId, form]);

  // Function to observe the sheet behavior
  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (isOpen || !isOpen) {
      form.reset(); // Clean inputs when sheet is opened or closed
      setImages([]);
      setImageUrls([]);
      setDeletedImages([]);
    }
  };

  // Function to submit body to backend depending whether there's an id or not
  const onSubmit = async (body: CreateProductDTO | ProductDetailAdminDTO) => {
    setIsSending(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        form.reset();
      } else {
        if (message === 'Product name already exists') {
          form.setError('name', {
            type: 'manual',
            message: 'Ya existe un producto con este nombre',
          });
        }
      }
      setIsSending(false);
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
        form.reset();
      } else {
        if (message === 'Product name already exists') {
          form.setError('name', {
            type: 'manual',
            message: 'Ya existe un producto con este nombre',
          });
        }
      }
      setIsSending(false);
    }
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
        <SheetTitle>{sheetTitle}</SheetTitle>
        {isLoading ? (
          <Spinner
            centered
            text="Cargando el producto, espere un momento por favor..."
          />
        ) : (
          <>
            <SheetHeader>
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
              form={form}
              product={product}
              categories={categories}
              subCategories={subCategoriesByCategory}
              onSubmit={onSubmit}
              images={images}
              setImages={setImages}
              imageUrls={imageUrls}
              setDeletedImages={setDeletedImages}
              deletedImages={deletedImages}
              setImageUrls={setImageUrls}
              setProduct={setProduct}
              productState={productState}
              initialProductState={initialProductState}
              setProductState={setProductState}
              setCategories={setCategories}
              isSending={isSending}
            />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default CustomSheet;
