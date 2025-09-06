'use client';
import DataTable from '@/components/root/common/DataTable';
import SectionHeader from '@/components/root/common/SectionHeader';
import SubCategoryDialogButton from '@/components/root/subcategories/SubCategoryDialogBtn';
import Spinner from '@/components/shared/Spinner';
import { Card, CardContent } from '@/components/ui/card';
import { getAllSubCategories } from '@/services/subCategories';
import type { SubCategories } from '@/types';
import React, { useEffect, useState } from 'react';
import { RiFolderOpenLine } from 'react-icons/ri';

function SubCategories() {
  const [subCategories, setSubCategories] = useState<SubCategories>([]);
  const [loading, setLoading] = useState(true);
  const [isRefresh, setRefresh] = useState(true);
  useEffect(() => {
    const fetchSubCategories = async () => {
      const { data, success } = await getAllSubCategories();
      if (success && data) setSubCategories(data.subCategories);
      setLoading(false);
      setRefresh(false);
    };
    fetchSubCategories();
  }, [isRefresh]);

  if (loading)
    return (
      <Spinner text="Cargando Sub-categorías, espere un momento por favor..." />
    );

  return (
    <div>
      <Card className="w-full shadow-md p-6 dark:bg-slate-800 dark:border dark:border-gray-600">
        <CardContent className="flex flex-col gap-4 justify-between items-center sm:flex-row sm:gap-0">
          <SectionHeader
            title="Sub-Categorías"
            description="Dale profundidad a tus categorías con subgrupos únicos y personalizados"
            icon={RiFolderOpenLine}
          />

          {/* Create || Update Category */}
          <SubCategoryDialogButton 
          setRefresh = {setRefresh}
          btnLabel="Crear Sub-categoría" 
          />
        </CardContent>
      </Card>

      {subCategories.length === 0 ? (
        <p className="text-muted-foreground mt-10 text-center">
          📭 No hay sub-categorías aún. ¡Crea la primera!
        </p>
      ) : (
        <Card className="w-full shadow-md  mt-10">
          <CardContent>
            {/* Table */}
            <DataTable
              data={subCategories}
              type="subcategories"
              setRefresh={setRefresh}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default SubCategories;
