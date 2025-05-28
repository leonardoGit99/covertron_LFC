import CategorieDialog from '@/components/CategorieDialog';
import CategoriesTable from '@/components/CategoriesTable';
import { getAllCategories } from '@/services/categories';
import { FolderPlus } from 'lucide-react';

export default async function Categories() {
  const categories = await getAllCategories();
  return (
    <div className=" py-16 px-4 text-center">
      {/* Header */}
      <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
        <FolderPlus className="w-8 h-8 text-primary" />
        Categorías
      </h1>
      <p className="text-muted-foreground mt-2">
        Organiza tus productos por tipo, marca o colección.
      </p>

      {/* Crear Categoria */}
      <CategorieDialog categories={categories} />

      {/* Tabla */}
      <CategoriesTable categories={categories} />
    </div>
  );
}
