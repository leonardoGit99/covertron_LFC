import CategoriesTable from '@/components/root/CategoriesTable';
import { getAllCategories } from '@/services/categories';
import { FolderPlus } from 'lucide-react';
import CategoryDialogButton from '@/components/root/CategoryDialogButton';

export default async function Categories() {
  const categories = await getAllCategories();
  return (
    <div className=" py-16 px-4 text-center">
      {/* Header */}
      <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
        <FolderPlus className="w-8 h-8 text-primary" />
        Categorías
      </h1>
      <p className="text-muted-foreground mt-2 mb-8">
        Organiza tus productos por tipo, marca o colección.
      </p>

      {/* Create || Update Category */}
      <CategoryDialogButton btnLabel='Crear Categoría' />

      {/* Table */}
      <CategoriesTable categories={categories} />
    </div>
  );
}
