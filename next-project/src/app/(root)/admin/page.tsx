import { DashboardCard } from '@/components/root/DashboardCard';
import DashboardHeader from '@/components/root/DashboardHeader';
import React from 'react';

const dashboardCardsData = [
  {
    id: 1,
    title: 'Categorías',
    value: 3,
    description:
      'Organiza tus productos con categorías claras y precisas. Agrega, edita o elimina categorías para mantener todo bajo control',
    href: '/admin/categorias',
  },
  {
    id: 2,
    title: 'Sub Categorías',
    value: 7,
    description:
      'Crea y gestiona subcategorías para facilitar la búsqueda de productos. Haz que tus clientes encuentren lo que buscan en segundos',
    href: '/admin/subcategorias',
  },
  {
    id: 3,
    title: 'Productos',
    value: 8,
    description:
      'Explora y administra todos los productos disponibles en tu inventario. Mantén tu catálogo siempre actualizado y listo para tus clientes',
    href: '/admin/productos',
  },
];

function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 xxl:grid-cols-3 gap-12 mb-12 justify-items-center w-full">
        {dashboardCardsData.map((dashBoardCard) => (
          <DashboardCard
            key={dashBoardCard.id}
            title={dashBoardCard.title}
            value={dashBoardCard.value}
            description={dashBoardCard.description}
            href={dashBoardCard.href}
          />
        ))}
      </div>
    </>
  );
}

export default Dashboard;
