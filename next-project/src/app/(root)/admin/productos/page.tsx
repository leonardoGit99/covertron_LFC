import React from 'react'
import SectionHeader from '@/components/root/SectionHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Boxes } from 'lucide-react'
import CustomSheet from '@/components/root/CustomSheet'
import { getAllProducts } from '@/services/product'
import ProductsTable from '@/components/root/ProductsTable'

async function Products() {
  const { data, success } = await getAllProducts();
  const products = (success) ? data.products : [];
  console.log(products)
  return (
    <div>
      <Card className='w-full shadow-md p-6'>
        <CardContent className='flex flex-col gap-4 justify-between items-center sm:flex-row sm:gap-0'>
          <SectionHeader
            title='Productos'
            description='Tu catálogo empieza aquí: crea, edita y muestra lo mejor que tienes'
            icon={Boxes}
          />

          {/* Create || Update Product */}
          {/* <ProductDrawerButton
            btnLabel='Crear Producto'
          /> */}
          <CustomSheet
            triggerBtnLabel="Crear Producto"
            sheetTitle='Nuevo Producto'
          />

        </CardContent>
      </Card>

      {products.length === 0
        ? (
          <p className="text-muted-foreground mt-10 text-center">
            📭 No hay productos aún. ¡Crea el primero!
          </p>
        )
        : (
          <Card className='w-full shadow-md  mt-10 mb-6'>
            <CardContent>
              {/* Table */}
              <ProductsTable
                data={products}
              />
            </CardContent>
          </Card>
        )
      }
    </div>
  )
}

export default Products