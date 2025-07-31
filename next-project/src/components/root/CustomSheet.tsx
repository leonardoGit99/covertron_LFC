"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import ProductForm from './ProductForm'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Separator } from '../ui/separator'
import { Categories } from '@/types'
import { getAllCategories } from '@/services/categories'
import { SubCategories } from '@/types/subcategory'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import { NewProduct } from '@/types/product'
import { productSchema } from '@/schemas/product.schema'
import { createProduct } from '@/services/product'
import { toast } from 'sonner'



type Props = {
  triggerBtnLabel: string
  sheetTitle: string
  id?: number
  // open: boolean,
  // onOpenChange: (open: boolean) => void
}

function CustomSheet({ triggerBtnLabel, sheetTitle, id }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false); // State for sheet
  const [categories, setCategories] = useState<Categories>([]);
  const [images, setImages] = useState<File[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategories>([]);
  // const [product, setProduct] = useState<NewProduct>({
  //   name: '',
  //   description: '',
  //   categories: [],
  //   subCategories: [],
  //   prize: 0,
  //   stock: 0,
  //   brand: '',
  //   discount: 0
  // }); // State to store category data from back
  // Resolve and default values
  const form = useForm<NewProduct>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      categoryId: undefined,
      subCategoryId: undefined,
      price: undefined,
      brand: '',
      discount: undefined
    }
  });

  // Getting product from backend only if there is an id
  // useEffect(() => {
  //   const getProduct = async () => {
  //     if (id) {
  //       // const product = await getOneProduct(id);
  //       setProduct(product);
  //       form.reset(product);
  //     }
  //   }
  //   getProduct();
  // }, [id, form]);


  useEffect(() => {
    const getCategories = async () => {
      const { data } = await getAllCategories();
      setCategories(data.categories);
    }
    getCategories();
  }, [])




  // Function to submit body to backend depending whether there's an id or not
  const onSubmit = async (body: NewProduct) => {
    const { categoryId, ...newBody } = body;
    if (id) {
      // const response = await updateCategorie(body, id);
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

      images.forEach((image) => {
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
        setOpen(false);
        setImages([]);
        toast(message);
      }
      console.log("Creando Producto")
    }
    // onOpenChange(false);
    router.refresh();
  };



  // Function to observe the sheet behavior
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen || !isOpen) {
      form.reset(); // Clean inputs when sheet is opened or closed
      setImages([]);
    }
  };


  console.log(images)
  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button>{triggerBtnLabel}</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{sheetTitle}</SheetTitle>
          <div className='flex items-center space-x-2 '>
            <Switch checked={true} /* onCheckedChange={} */ />
            <Label className='text-green-600 font-normal'>Disponible</Label>
          </div>
        </SheetHeader>
        <Separator className='mt-2 mb-4' />
        <ProductForm
          form={form}
          // product={product}
          categories={categories}
          onSubmit={onSubmit}
          images={images}
          setImages={setImages}
        />
        {/* <SheetFooter>
          <Button>Cerrar</Button>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  )
}

export default CustomSheet