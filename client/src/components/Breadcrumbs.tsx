import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center gap-1.5 text-sm flex-wrap">
        <li className="flex items-center gap-1.5">
          <Link
            to="/"
            className="text-text-muted hover:text-primary transition-colors flex items-center gap-1"
          >
            <Home size={14} />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <ChevronRight size={14} className="text-text-muted" />
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            {item.href ? (
              <>
                <Link
                  to={item.href}
                  className="text-text-muted hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
                <ChevronRight size={14} className="text-text-muted" />
              </>
            ) : (
              <span className="text-text-primary font-medium truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
