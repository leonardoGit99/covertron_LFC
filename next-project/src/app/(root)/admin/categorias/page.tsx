import CategoriesTable from '@/components/root/CategoriesTable';
import { getAllCategories } from '@/services/categories';
import { FolderPlus } from 'lucide-react';
import CategoryDialogButton from '@/components/root/CategoryDialogButton';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeader from '@/components/root/SectionHeader';

export default async function Categories() {
  const { data: categories } = await getAllCategories();
  return (
    <div>
      <Card className='w-full shadow-md p-6'>
        <CardContent className='flex flex-col gap-4 justify-between items-center sm:flex-row sm:gap-0'>
          <SectionHeader
            title='Categorias'
            description='Organiza tus productos por tipo, marca o colección'
            icon={FolderPlus}
          />

          {/* Create || Update Category */}
          <CategoryDialogButton
            btnLabel='Crear Categoría'
          />

        </CardContent>
      </Card>

      <Card className='w-full shadow-md  mt-10'>
        <CardContent>
          {/* Table */}
          <CategoriesTable categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
}
