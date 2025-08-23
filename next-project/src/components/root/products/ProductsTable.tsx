'use client';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Button } from '../../ui/button';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import CustomSheet from './CustomSheet';
import { toast } from 'sonner';
import {
  deleteProduct,
  getAllProductsAdmin,
  getFilteredProducts,
} from '@/services/product';
import { Card, CardContent } from '../../ui/card';
import SearchInput from '../../shared/SearchInput';
import { debounce } from 'lodash';
import CustomPagination from '../../shared/CustomPagination';
import { Product } from '@/types/product';
import Spinner from '../../shared/Spinner';

type Props = {
  isRefresh: boolean;
  setRefresh: (isRefresh: boolean) => void;
};

function ProductsTable({ isRefresh, setRefresh }: Props) {
  const [products, setProducts] = useState<Product[]>([]); // Get all and get filtered products state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); // Search bar state

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 10;
  const totalPages = Math.ceil(totalProducts / limit);

  // Get all products
  const fetchProducts = async () => {
    const { success, data } = await getAllProductsAdmin(currentPage, limit);
    if (success && data) {
      setProducts(data.products);
      setTotalProducts(data.total);
    }
    setRefresh(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, limit, isRefresh]); // Refeching when isRefresh change, and it changes before creating or updating product (Custom Sheet)

  // get all filtered products with debounce
  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      const { data, success } = await getFilteredProducts(
        value,
        limit,
        currentPage
      );
      if (success && data) {
        setProducts(data.products);
        setTotalProducts(data.total);
      }
      setRefresh(false);
    }, 500),
    []
  );

  // Onchange for search bar
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    setCurrentPage(1);
    if (value.trim() === '') {
      debouncedSearch.cancel();
      // Si se borra la búsqueda, volver al listado completo
      fetchProducts();
    } else {
      debouncedSearch(value);
    }
  };

  // OnClick for delete btn
  const handleDelete = async (productId: number, productName: string) => {
    toast(`¿Estás seguro de eliminar el Producto '${productName}'?`, {
      action: {
        label: 'OK',
        onClick: async () => {
          const { success, message } = await deleteProduct(productId);
          if (success) {
            setRefresh(true);
            toast(message, {
              description: `Se ha eliminado el producto '${productName}'`,
            });
          }
        },
      },
    });
  };

  return (
    <>
      <div className="flex justify-start mt-10 w-full">
        <SearchInput
          searchTerm={searchTerm}
          handleChange={handleChange}
        />
      </div>
      {isRefresh ? (
        <Spinner
          size={50}
          text="Cargando productos, espere un momento por favor..."
          centered
        />
      ) : products.length === 0 ? (
        <p className="text-muted-foreground mt-10 text-center">
          {searchTerm
            ? '🔍 No se encontraron productos que coincidan con la búsqueda.'
            : '📭 No hay productos aún. ¡Crea el primero!'}
        </p>
      ) : (
        <>
          <Card className="w-full shadow-md  mt-5 mb-6 dark:border dark:border-gray-600">
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table className='table-fixed'>
                  <colgroup>
                    <col className="w-[140px]" />
                    <col className="w-[140px]" />
                    <col className="w-[100px]" />
                    <col className="w-[200px]" />
                    <col className="w-[90px]" />
                    <col className="w-[90px]" />
                    <col className="w-[90px]" />
                    <col className="w-[80px]" />
                    <col className="w-[100px]" />
                    <col className="w-[160px]" />
                    <col className="w-[80px]" />
                  </colgroup>
                  <TableHeader className="bg-blue-50 ">
                    <TableRow
                      /* className='divide-x divide-gray-200' */ className="dark:hover:bg-sky-800"
                    >
                      <TableHead className="text-left">Categoría</TableHead>
                      <TableHead className="text-left">Sub Categoría</TableHead>
                      <TableHead className="text-left">Marca</TableHead>
                      <TableHead className="text-left">Producto</TableHead>
                      <TableHead className="text-left">
                        Precio Original (Bs.)
                      </TableHead>
                      <TableHead className="text-left">Descuento (%)</TableHead>
                      <TableHead className="text-left">
                        Precio con Descuento (Bs.)
                      </TableHead>
                      <TableHead className="text-center">Imagen</TableHead>
                      <TableHead className="text-left ">Estado</TableHead>
                      <TableHead className="text-left ">
                        Ultima fecha de actualización
                      </TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.length > 0 &&
                      (products as Product[]).map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="text-start break-words max-w-[140px]">
                            {item.categoryName}
                          </TableCell>
                          <TableCell className="text-start break-words max-w-[140px]">
                            {item.subCategoryName}
                          </TableCell>
                          <TableCell className="text-start break-words max-w-[100px]">
                            {item.brand}
                          </TableCell>
                          <TableCell className="text-start break-words max-w-[200px]">
                            {item.name}
                          </TableCell>
                          <TableCell className="text-start break-words max-w-[90px]">
                            {item.originalPrice}
                          </TableCell>
                          <TableCell className="text-start break-words max-w-[90px]">
                            {item.discount}
                          </TableCell>
                          <TableCell className="text-start break-words max-w-[90px]">
                            {item.discountedPrice}
                          </TableCell>
                          <TableCell className="text-start break-words max-w-[80px]">
                            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm">
                              {item.images &&
                              item.images.length > 0 &&
                              item.images[0] ? (
                                <Image
                                  src={item.images[0]}
                                  alt="Imagen del Producto"
                                  fill
                                  className="transition-transform duration-500 group-hover:scale-125 object-cover"
                                  sizes="(max-width: 640px) 90vw, 400px"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs text-center">
                                  Sin imagen
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-start break-words max-w-[100px]">
                            {item.state === 'available' ? (
                              <Badge
                                variant="outline"
                                className="bg-green-100 px-1 dark:bg-green-700"
                              >
                                <span className="text-xs text-green-600 transition-colors duration-300 dark:text-green-100">
                                  Disponible
                                </span>
                              </Badge>
                            ) : (
                              item.state === 'sold out' && (
                                <Badge
                                  variant="outline"
                                  className="bg-red-100 dark:bg-red-700"
                                >
                                  <span className="text-xs text-red-600 dark:text-red-100">
                                    Agotado
                                  </span>
                                </Badge>
                              )
                            )}
                          </TableCell>
                          <TableCell className="text-start whitespace-pre-line break-words max-w-[160px]">
                            {item.updatedAt}
                          </TableCell>
                          <TableCell className="text-right break-words max-w-[80px]">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className=""
                                >
                                  ...
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="min-w-0">
                                <DropdownMenuGroup>
                                  <DropdownMenuItem className="p-0">
                                    <Button
                                      variant="ghost"
                                      onClick={() => setEditingId(item.id)}
                                    >
                                      <HiOutlinePencilAlt className="text-blue-600 dark:text-blue-400" />
                                    </Button>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="p-0">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() =>
                                        handleDelete(item.id, item.name)
                                      }
                                      className="w-full"
                                    >
                                      <HiOutlineTrash className="text-destructive dark:text-red-500" />
                                    </Button>
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Pagination */}
          <CustomPagination
            totalPages={totalPages}
            limit={limit}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {editingId !== null && (
        <CustomSheet
          id={editingId}
          open={editingId !== null}
          onOpenChange={(isOpen) => {
            if (!isOpen) setEditingId(null);
          }}
          isRefresh={isRefresh}
          setRefresh={setRefresh}
          sheetTitle=''
        />
      )}
    </>
  );
}
export default ProductsTable;
