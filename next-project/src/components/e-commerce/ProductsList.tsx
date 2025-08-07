import React, { useCallback, useEffect, useState, ChangeEvent } from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { getAllProducts, getFilteredProducts } from '@/services/product';
import { Products } from '@/types/product';
import CustomPagination from '../shared/CustomPagination';
import { debounce } from 'lodash';
import SearchInput from '../root/SearchInput';

function ProductsList() {
  const [loading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Products>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 12;
  const totalPages = Math.ceil(totalProducts / limit);

  // Get all products
  const fetchProducts = async () => {
    setIsLoading(true);
    const { success, data } = await getAllProducts(currentPage, limit);
    if (success && data) {
      setProducts(data.products);
      setTotalProducts(data.total);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, limit]);

  // get all filtered products with debounce
  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      setIsLoading(true);
      const { data, success } = await getFilteredProducts(
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
    setCurrentPage(1);
    if (value.trim() === '') {
      // Si se borra la búsqueda, volver al listado completo
      fetchProducts();
    } else {
      debouncedSearch(value);
    }
  };
  return (
    <>
      <div className="flex justify-start mt-10 w-full">
        <SearchInput handleChange={handleChange} />
      </div>

      {loading ? (
        <p className="text-center my-4 text-sm text-gray-500">
          Buscando productos...
        </p>
      ) : products.length === 0 ? (
        <p className="text-muted-foreground mt-10 text-center">
          🔍 No se encontraron productos que coincidan con la búsqueda
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xxl:grid-cols-4  gap-12">
            {products.map((item) => (
              <Link
                href={`/productos/fundas/${item.id}`}
                key={item.id}
              >
                <ProductCard
                  id={item.id}
                  img={item.images[0]}
                  name={item.name}
                  price={item.price}
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
