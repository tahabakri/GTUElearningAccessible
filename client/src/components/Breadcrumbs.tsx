import { Link, useLocation } from "wouter";
import { ChevronRight, Home } from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { t } from "@/lib/translations";

interface BreadcrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { language } = useAccessibility();

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-sm text-muted-foreground mb-4"
    >
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/dashboard">
            <a
              className="flex items-center hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm p-1"
              aria-label={t("dashboard", language)}
            >
              <Home className="h-4 w-4" />
            </a>
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            {item.href ? (
              <Link href={item.href}>
                <a className="hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm p-1">
                  {item.label}
                </a>
              </Link>
            ) : (
              <span className="font-medium text-foreground" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
