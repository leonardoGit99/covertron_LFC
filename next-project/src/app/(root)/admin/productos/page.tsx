import React from 'react'
import SectionHeader from '@/components/root/SectionHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Boxes  } from 'lucide-react'
import CustomSheet from '@/components/root/CustomSheet'

function Productos() {
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
    </div>
  )
}

export default Productos