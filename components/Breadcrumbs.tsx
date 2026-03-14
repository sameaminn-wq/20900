import Link from 'next/link';

interface BreadcrumbProps {
  title: string;
}

export default function Breadcrumbs({ title }: BreadcrumbProps) {
  return (
    <nav className="flex mb-6 md:mb-10 text-sm md:text-base font-medium" dir="rtl">
      <ol className="flex items-center space-x-reverse space-x-2 text-slate-400">
        <li>
          <Link href="/" className="hover:text-orange-600 transition-colors flex items-center gap-1">
             <span>الرئيسية</span>
          </Link>
        </li>
        
        <li className="flex items-center gap-2">
          <span className="text-slate-300">/</span>
          <Link href="/recipes" className="hover:text-orange-600 transition-colors">
            الوصفات
          </Link>
        </li>

        <li className="flex items-center gap-2 text-slate-900 font-bold">
          <span className="text-slate-300">/</span>
          <span className="line-clamp-1">{title}</span>
        </li>
      </ol>
    </nav>
  );
}