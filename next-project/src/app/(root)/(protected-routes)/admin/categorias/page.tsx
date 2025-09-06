'use client';
import { getAllCategories } from '@/services/categories';
import { FolderPlus } from 'lucide-react';
import CategoryDialogButton from '@/components/root/categories/CategoryDialogButton';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeader from '@/components/root/common/SectionHeader';
import DataTable from '@/components/root/common/DataTable';
import Spinner from '@/components/shared/Spinner';
import { useEffect, useState } from 'react';
import type { Categories } from '@/types';

export default function Categories() {
  const [categories, setCategories] = useState<Categories>([]);
  const [loading, setLoading] = useState(true);
  const [isRefresh, setRefresh] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, success } = await getAllCategories();
      if (success && data) setCategories(data.categories);
      setLoading(false);
      setRefresh(false);
    };
    fetchCategories();
  }, [isRefresh]);

  if (loading)
    return (
      <Spinner text="Cargando categorias, espere un momento por favor..." />
    );
  return (
    <div>
      <Card className="w-full shadow-md p-6 dark:bg-slate-800 dark:border dark:border-gray-600">
        <CardContent className="flex flex-col gap-4 justify-between items-center sm:flex-row sm:gap-0">
          <SectionHeader
            title="Categorias"
            description="Organiza tus productos por tipo, marca o colección"
            icon={FolderPlus}
          />

          {/* Create || Update Category */}
          <CategoryDialogButton 
          setRefresh={setRefresh}
          btnLabel="Crear Categoría" 
          />
        </CardContent>
      </Card>

      {categories.length === 0 ? (
        <p className="text-muted-foreground mt-10 text-center">
          📭 No hay categorías aún. ¡Crea la primera!
        </p>
      ) : (
        <Card className="w-full shadow-md  mt-10">
          <CardContent>
            {/* Table */}
            <DataTable
              data={categories}
              type="categories"
              setRefresh= {setRefresh}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
