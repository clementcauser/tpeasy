import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import ROUTES from "@/lib/constants/routes";
import Link from "next/link";
import { Fragment, PropsWithChildren, ReactNode } from "react";

type ValueOf<T> = T[keyof T];

type BreadcrumbItem = {
  href: string;
  name: string;
};

type Action =
  | {
      type: "link";
      href: ValueOf<typeof ROUTES>;
      label: string;
      icon: ReactNode;
    }
  | { type: "component"; component: ReactNode };

interface Props {
  title: string;
  action?: Action;
  breadcrumb: BreadcrumbItem[];
}

export default function AppPageLayout({
  breadcrumb,
  action,
  title,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {breadcrumb.length > 0 && (
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumb.map((item) => (
                  <Fragment key={item.href}>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={item.href}>
                        {item.name}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </Fragment>
                ))}
                <BreadcrumbItem>
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </div>
        {action && (
          <div>
            {action.type === "link" && (
              <Button asChild>
                <Link href={action.href}>
                  {action?.icon}{" "}
                  <span className="hidden md:block">{action.label}</span>
                </Link>
              </Button>
            )}
            {action.type === "component" && action.component}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
