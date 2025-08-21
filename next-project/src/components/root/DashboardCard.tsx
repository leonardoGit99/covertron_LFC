import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Tags, Layers } from 'lucide-react';
import Link from 'next/link';

type DashboardCardProps = {
  title: string;
  value: number | string;
  description: string;
  icon?: 'products' | 'categories' | 'subcategories';
  href: string;
};

const icons = {
  products: <Package className="w-6 h-6 text-primary" />,
  categories: <Tags className="w-6 h-6 text-primary" />,
  subcategories: <Layers className="w-6 h-6 text-primary" />,
};

export function DashboardCard({ title, value, description, icon, href }: DashboardCardProps) {
  return (
    <Link
      href={href}
      className="w-full rounded-2xl"
    >
       <Card className='p-6 bg-gradient-to-br from-slate-50 via-slate-100 to-sky-100 shadow-lg hover:shadow-xl  transform transition-all duration-500 ease-in-out hover:-translate-y-1 border border-slate-200 mx-2 md:mx-12 lg:mx-0 dark:from-slate-900 dark:via-slate-950 dark:to-sky-950 dark:border-slate-600 dark:hover:shadow-lg dark:hover:shadow-slate-500 dark:shadow-md dark:shadow-slate-400'>
      <CardHeader className="flex items-center justify-between pb-3">
        <CardTitle className="text-3xl font-medium">{title}</CardTitle>
        {icon && icons[icon]}
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold text-center">{value}</p>
        {description && (
          <CardDescription className="mt-2 text-sm text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardContent>
    </Card>
    </Link>
  );
}
