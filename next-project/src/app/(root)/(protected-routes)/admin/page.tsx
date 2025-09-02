'use client';
import { DashboardCard } from '@/components/root/dashboard/DashboardCard';
import DashboardHeader from '@/components/root/dashboard/DashboardHeader';
import Spinner from '@/components/shared/Spinner';
import { getAllDashboardData } from '@/services/dashboard';
import type { Dashboard } from '@/types';
import React, { useEffect, useState } from 'react';



function Dashboard() {
  const [dashboardData, setSashboardData] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDashboardData = async () => {
      const { data, success } = await getAllDashboardData();
      if (success && data) setSashboardData(data);
      setLoading(false);
    };
    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <Spinner text="Cargando Dashboard, espere un momento por favor..." />
    );

  const dashboardCardsData = [
    {
      id: 1,
      title: 'Categorías',
      value: dashboardData?.categories ?? 0,
      description:
        'Organiza tus productos con categorías claras y precisas. Agrega, edita o elimina categorías para mantener todo bajo control',
      href: '/admin/categorias',
    },
    {
      id: 2,
      title: 'Sub Categorías',
      value: dashboardData?.subCategories ?? 0,
      description:
        'Crea y gestiona subcategorías para facilitar la búsqueda de productos. Haz que tus clientes encuentren lo que buscan en segundos',
      href: '/admin/subcategorias',
    },
    {
      id: 3,
      title: 'Productos',
      value: dashboardData?.products ?? 0,
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
