import React, { useCallback, useEffect, useState, ChangeEvent } from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';
import {
  getAllAvailableProducts,
  getFilteredAvailableProducts,
} from '@/services/product';
import { ProductSummary } from '@/types/product';
import CustomPagination from '../shared/CustomPagination';
import { debounce } from 'lodash';
import SearchInput from '../shared/SearchInput';
import Spinner from '../shared/Spinnet';

function ProductsList() {
  const [loading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // Search bar state
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 12;
  const totalPages = Math.ceil(totalProducts / limit);

  // Get all products
  const fetchAvailableProducts = async () => {
    const { success, data } = await getAllAvailableProducts(currentPage, limit);
    if (success && data) {
      setProducts(data.products);
      setTotalProducts(data.total);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAvailableProducts();
  }, [currentPage, limit]);

  // get all filtered products with debounce
  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      const { data, success } = await getFilteredAvailableProducts(
        value,
        limit,
        currentPage
      );
      if (success && data) {
        setProducts(data.products);
        setTotalProducts(data.total);
      }
      setIsLoading(false);
    }, 500),
    []
  );

  // Onchange for search bar
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    setCurrentPage(1);
    if (value.trim() === '') {
      debouncedSearch.cancel(); // Cancel  any todo execution
      // Si se borra la búsqueda, volver al listado completo
      fetchAvailableProducts();
    } else {
      debouncedSearch(value);
    }
  };
  console.log(searchTerm);
  return (
    <>
      <div className="flex justify-start mt-10 w-full">
        <SearchInput handleChange={handleChange} />
      </div>
      {loading ? (
        <Spinner
          size={50}
          text="Cargando productos, espere un momento por favor..."
          centered
        />
      ) : products.length === 0 ? (
        <p className="text-muted-foreground mt-10 text-center">
          {searchTerm
            ? '🔍 No se encontraron productos que coincidan con la búsqueda.'
            : '📭 No hay productos disponibles aún. ¡Pronto tendremos las últimas novedades para ti!'}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xxl:grid-cols-4 gap-12">
            {products.map((product) => (
              <Link
                href={`/productos/${product.id}`}
                key={product.id}
              >
                <ProductCard
                  img={product.image}
                  name={product.name}
                  originalPrice={product.originalPrice}
                  discountedPrice={product.discountedPrice}
                  discount={product.discount}
                />
              </Link>
            ))}
          </div>

          <CustomPagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
            limit={limit}
          />
        </>
      )}
    </>
  );
}

export default ProductsList;
