import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { Products } from '@/types/product'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"

type Props = {
  data: Products
}

function ProductsTable({ data }: Props) {
  return (
    <div>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className='bg-blue-50'>
            <TableRow>
              <TableHead className="text-left">Categoría</TableHead>
              <TableHead className="text-left">Sub Categoría</TableHead>
              <TableHead className="text-left">Nombre</TableHead>
              <TableHead className="text-left">Marca</TableHead>
              <TableHead className="text-left">Descripción</TableHead>
              <TableHead className="text-left">Precio</TableHead>
              <TableHead className="text-left">Imagen</TableHead>
              <TableHead className="text-left">Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 && (data as Products).map((item) => (
              <TableRow key={item.id}>
                <TableCell className='text-start'>{item.categoryId}</TableCell>
                <TableCell className='text-start'>{item.subCategoryId}</TableCell>
                <TableCell className='text-start'>{item.name}</TableCell>
                <TableCell className='text-start'>{item.brand}</TableCell>
                <TableCell className='text-start'>{item.description}</TableCell>
                <TableCell className='text-start'>{item.price}</TableCell>
                <TableCell className='text-start'>
                  <div className='relative w-full aspect-[4/3] overflow-hidden rounded-sm'>
                    {item.images && item.images.length > 0 && item.images[0] ? (
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
                <TableCell className='text-start'>
                  {item.state === 'available'
                    ?
                    <Badge variant="outline" className='bg-green-100 px-1'>
                      <span className='text-xs '>Disponible</span>
                    </Badge>
                    :
                    item.state === 'sold out' &&
                    <Badge variant="outline" className='bg-red-100'>
                      Agotado
                    </Badge>
                  }
                </TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">...</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='min-w-0'>
                      <DropdownMenuGroup>
                        <DropdownMenuItem className='p-0'>
                          <Button variant='ghost' /* onClick={() => setEditingId(item.id)} */>
                            <HiOutlinePencilAlt className='text-blue-600' />
                          </Button>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='p-0'>
                          <Button
                            size="sm"
                            variant="ghost"
                            // onClick={() => handleDelete(item.id, item.name)}
                            className='w-full'
                          >
                            <HiOutlineTrash className='text-destructive' />
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

      {/* {editingId !== null && type == 'categories' ? (
        <CategoryDialog
          id={editingId}
          open={editingId !== null}
          onOpenChange={(isOpen) => {
            if (!isOpen) setEditingId(null);
          }}
        />) : (
        <SubCategoryDialog
          subCategoryId={editingId}
          open={editingId !== null}
          onOpenChange={(isOpen) => {
            if (!isOpen) setEditingId(null);
          }}
        />
      )
      } */}
    </div >
  )
}

export default ProductsTable