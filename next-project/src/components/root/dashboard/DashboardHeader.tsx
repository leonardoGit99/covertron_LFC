'use client';
import { useAuthStore } from '@/store/useAuthStore';
import React from 'react';
import { MdDashboard } from 'react-icons/md';

function DashboardHeader() {
  const userName = useAuthStore((state) => state.user?.name);
  const title = `${userName}, Bienvenido(a) a tu panel de control`;
  const subtitle =
    'Monitorea, organiza y optimiza tu catálogo en un solo lugar.';
  return (
    <div className="mb-8 px-2 md:px-12 lg:px-0">
      <h1 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-sky-500">
        <span className="flex flex-col  items-center md:flex-row">
          <MdDashboard className="text-4xl mr-3 dark:text-sky-400" /> {title}
        </span>
      </h1>
      <p className="mt-2 text-sm md:text-lg text-center md:text-start  text-gray-600 dark:text-gray-300">
        {subtitle}
      </p>
    </div>
  );
}

export default DashboardHeader;
