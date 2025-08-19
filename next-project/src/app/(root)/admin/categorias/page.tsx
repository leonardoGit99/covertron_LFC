import { getAllCategories } from '@/services/categories';
import { FolderPlus } from 'lucide-react';
import CategoryDialogButton from '@/components/root/CategoryDialogButton';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeader from '@/components/root/SectionHeader';
import DataTable from '@/components/root/DataTable';

export default async function Categories() {
  const { data, success } = await getAllCategories();
  const categories = (success && data) ? data.categories : [];

  return (
    <div>
      <Card className='w-full shadow-md p-6 dark:bg-slate-800 dark:border dark:border-gray-600'>
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


      {categories.length === 0
        ? (
          <p className="text-muted-foreground mt-10 text-center">
            📭 No hay categorías aún. ¡Crea la primera!
          </p>
        )
        : (
          <Card className='w-full shadow-md  mt-10'>
            <CardContent>
              {/* Table */}
              <DataTable
                data={categories}
                type='categories'
              />
            </CardContent>
          </Card>
        )
      }
    </div>
  );
}
