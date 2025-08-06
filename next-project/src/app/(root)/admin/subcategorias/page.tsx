
import DataTable from '@/components/root/DataTable';
import SectionHeader from '@/components/root/SectionHeader'
import SubCategoryDialogButton from '@/components/root/SubCategoryDialogBtn';
import { Card, CardContent } from '@/components/ui/card';
import { getAllSubCategories } from '@/services/subCategories';
import React from 'react'
import { RiFolderOpenLine } from "react-icons/ri";


async function SubCategories() {
  const { data, success } = await getAllSubCategories();
  const subCategories = (success && data) ? data.subCategories : [];


  return (
    <div>
      <Card className='w-full shadow-md p-6'>
        <CardContent className='flex flex-col gap-4 justify-between items-center sm:flex-row sm:gap-0'>
          <SectionHeader
            title='Sub-Categorías'
            description='Dale profundidad a tus categorías con subgrupos únicos y personalizados'
            icon={RiFolderOpenLine}
          />

          {/* Create || Update Category */}
          <SubCategoryDialogButton
            btnLabel='Crear Sub-categoría'
          />
        </CardContent>
      </Card>

      {subCategories.length === 0
        ? (
          <p className="text-muted-foreground mt-10 text-center">
            📭 No hay sub-categorías aún. ¡Crea la primera!
          </p>
        )
        : (
          <Card className='w-full shadow-md  mt-10'>
            <CardContent>
              {/* Table */}
              <DataTable
                data={subCategories}
                type='subcategories'
              />
            </CardContent>
          </Card>
        )
      }
    </div>
  )
}

export default SubCategories