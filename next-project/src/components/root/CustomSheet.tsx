"use client"
import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '../ui/sheet'
import ProductForm from './ProductForm'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Separator } from '../ui/separator'
import { Categories } from '@/types'
import { getAllCategories } from '@/services/categories'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import { NewProduct, Product } from '@/types/product'
import { productSchema } from '@/schemas/product.schema'
import { createProduct, getOneProduct } from '@/services/product'
import { toast } from 'sonner'
import { Button } from '../ui/button'



type Props = {
  triggerBtnLabel?: string
  sheetTitle?: string
  id?: number | null
  open: boolean,
  onOpenChange: (open: boolean) => void
}

function CustomSheet({ sheetTitle, id, open, onOpenChange }: Props) {
  const router = useRouter();
  const [categories, setCategories] = useState<Categories>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [productState, setProductState] = useState<string>("available");
  // State to store product data from back
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: '',
    description: '',
    categoryId: 0,
    subCategoryId: 0,
    price: 0,
    brand: '',
    discount: 0,
    state: '',
    images: []
  });

  // Resolve and default values
  const form = useForm<NewProduct>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      categoryId: null,
      subCategoryId: null,
      price: null,
      brand: '',
      discount: null
    }
  });


  // Getting product from backend only if there is an id
  useEffect(() => {
    const getProduct = async () => {
      if (id) {
        const { data: product, success } = await getOneProduct(id);
        if (success) {
          setProduct(product);
          setImageUrls(product.images);
          setProductState(product.state);
          // form.reset(product);
        }
      }
    }
    getProduct();
  }, [id, form]);


  useEffect(() => {
    const getCategories = async () => {
      const { data } = await getAllCategories();
      setCategories(data.categories);
    }
    getCategories();
  }, []);


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
  const onSubmit = async (body: NewProduct) => {
    const { categoryId, ...newBody } = body;
    const formData = new FormData();
    if (id) {
      const isDifferentBody = product.name !== newBody.name || product.description !== newBody.description || product.subCategoryId != newBody.subCategoryId || product.price !== newBody.price || product.discount !== newBody.discount || product.brand !== newBody.brand



      // If we have diferent state
      if (product.state !== productState) {
        console.log("Llamar endpoint para actualizar estado del producto");
      }

      // If we have images to delete
      if (product.images.length !== imageUrls.length) {
        console.log(console.log("Llamar endpoint para eliminar imagenes en la bd y cloudinary"))
      }

      // If we have different body that getOneProduct, so we call to endpoint to update product
      if(isDifferentBody){
        Object.entries(newBody).forEach(([key, value]) => {
          formData.append(key, String(value));
        });
      }

      //------------Ver de crear un endpoint para llamar a /productos/:id/imagenes, ver si habra problemas con la transaccion --------------------

      // If there's new images, we upload it
      images?.forEach((image) => {
        formData.append("imgs", image);
      });

      // const response = await updateCategorie(formData, id);
      // alert(response.message);
      console.log("Actualizando Producto")
    } else {
      const formData = new FormData();
      Object.entries(newBody).forEach(([key, value]) => { // .entries Convierte un objeto en un array de pares clave-valor, pasamos como parametro una asignacion dinamica: Ej.
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

        formData.append(key, String(value)); // Si el valor es un número (como price o discount), lo convertimos a string
      });

      images?.forEach((image) => {
        formData.append("imgs", image);
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
        toast(message);
      }
      console.log("Creando Producto")
    }
    // onOpenChange(false);
    router.refresh();
  };


  console.log(imageUrls);
  console.log(images);
  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{sheetTitle}</SheetTitle>
          {
            id && (
              <div className='flex items-center space-x-2 '>
                <Switch
                  checked={productState === 'available'}
                  onCheckedChange={(checked) => {
                    setProductState(checked ? 'available' : 'sold out');
                  }}
                />
                <Label className={`${productState === 'available' ? 'text-green-600' : 'text-red-600'} font-normal`}>
                  {productState === 'available' ? 'Disponible' : 'Agotado'}
                </Label>
              </div>
            )
          }
        </SheetHeader>
        <Separator className='mt-2 mb-4' />
        <ProductForm
          id={id}
          form={form}
          product={product}
          categories={categories}
          onSubmit={onSubmit}
          images={images}
          setImages={setImages}
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
        />
      </SheetContent>
    </Sheet>
  )
}

export default CustomSheet