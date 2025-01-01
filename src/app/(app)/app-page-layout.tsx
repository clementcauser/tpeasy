import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment, PropsWithChildren, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ROUTES from "@/lib/constants/routes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ValueOf<T> = T[keyof T];

type BreadcrumbItem = {
  href: string;
  name: string;
};

interface Props {
  title: string;
  action?: { href: ValueOf<typeof ROUTES>; label: string; icon: ReactNode };
  breadcrumb: BreadcrumbItem[];
}

export default function AppPageLayout({
  breadcrumb,
  action,
  title,
  children,
}: PropsWithChildren<Props>) {
  return (
    <>
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild>
                  <Link href={action.href}>
                    {action?.icon}{" "}
                    <span className="hidden md:block">{action.label}</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {children}
    </>
  );
}
