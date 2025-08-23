import { DashboardCard } from '@/components/root/dashboard/DashboardCard';
import DashboardHeader from '@/components/root/dashboard/DashboardHeader';
import { getAllDashboardData } from '@/services/dashboard';
import React from 'react';

async function Dashboard() {
  const { success, data } = await getAllDashboardData();
  if (!success || !data) {
    return <p>Error cargando el dashboard</p>;
  }

  const dashboardCardsData = [
    {
      id: 1,
      title: 'Categorías',
      value: data.categories,
      description:
        'Organiza tus productos con categorías claras y precisas. Agrega, edita o elimina categorías para mantener todo bajo control',
      href: '/admin/categorias',
    },
    {
      id: 2,
      title: 'Sub Categorías',
      value: data.subCategories,
      description:
        'Crea y gestiona subcategorías para facilitar la búsqueda de productos. Haz que tus clientes encuentren lo que buscan en segundos',
      href: '/admin/subcategorias',
    },
    {
      id: 3,
      title: 'Productos',
      value: data.products,
      description:
        'Explora y administra todos los productos disponibles en tu inventario. Mantén tu catálogo siempre actualizado y listo para tus clientes',
      href: '/admin/productos',
    },
  ];
  return (
    <>
      <DashboardHeader />
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 xxl:grid-cols-3 gap-12 mb-12 justify-items-center w-full auto-rows-fr">
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
