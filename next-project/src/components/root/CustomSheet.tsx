"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import Product from '@/app/(e-commerce)/productos/fundas/[id]/page'
import ProductForm from './ProductForm'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Separator } from '../ui/separator'
import { Categories } from '@/types'
import { getAllCategories } from '@/services/categories'
import { SubCategories } from '@/types/subcategory'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'

// Validations Form
const productSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  category: z.string({
    required_error: "Selecciona una categoria",
  }),
  subCategory: z.string({
    required_error: "Selecciona una sub-categoria",
  }),
  prize: z.number({
    message: "El precio debe ser un valor numérico",
    required_error: "El precio es obligatorio"
  }),
  stock: z.number({
    message: "El stock debe ser un valor numérico",
    required_error: "El stock es obligatorio"
  }),
  brand: z.string({
    message: "La marca es obligatoria",
    required_error: "La marca es obligatoria"
  }).min(2, "La marca debe contener más de 2 caracteres"),
  discount: z.number({
    message: "El descuento debe ser un valor numérico"
  })
});

// Types

type SheetProps = {
  triggerBtnLabel: string
  sheetTitle: string
  id?: number
  // open: boolean,
  // onOpenChange: (open: boolean) => void
}

export type ProductFormData = z.infer<typeof productSchema>;


type Product = {
  name: string,
  description: string
  categories: Categories,
  subCategories: SubCategories,
  prize: number,
  stock: number,
  brand: string
  discount: number
}


function CustomSheet({ triggerBtnLabel, sheetTitle, id }: SheetProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false); // State for sheet
  const [categories, setCategories] = useState<Categories>([]);
  const [subCategories, setSubCategories] = useState<SubCategories>([]);
  const [product, setProduct] = useState<Product>({
    name: '',
    description: '',
    categories: [],
    subCategories: [],
    prize: 0,
    stock: 0,
    brand: '',
    discount: 0
  }); // State to store category data from back
  // Resolve and default values
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      subCategory: '',
      prize: 0,
      stock: 0,
      brand: '',
      discount: 0
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
  const onSubmit = async (body: ProductFormData) => {
    console.log(body);
    if (id) {
      // const response = await updateCategorie(body, id);
      // alert(response.message);
      console.log("Actualizando Producto")
    } else {
      // const response = await createCategorie(body);
      // alert(response.message);
      console.log("Creando Producto")
    }
    // onOpenChange(false);
    router.refresh();
  };



  // Function to observe the modal behavior
  const handleOpenChange = (isOpen: boolean) => {
    // onOpenChange(isOpen);
    if (isOpen || !isOpen) {
      form.reset(); // Clean inputs when modal is opened or closed
    }
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>{triggerBtnLabel}</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{sheetTitle}</SheetTitle>
          <div className='flex items-center space-x-2 '>
            <Switch checked={true} /* onCheckedChange={} */ />
            <Label className='text-green-600 font-normal'>Activo</Label>
          </div>
        </SheetHeader>
        <Separator className='mt-2 mb-4' />
        <ProductForm
          form={form}
          product={product}
          categories={categories}
          onSubmit={onSubmit}
        />
        {/* <SheetFooter>
          <Button>Cerrar</Button>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  )
}

export default CustomSheet