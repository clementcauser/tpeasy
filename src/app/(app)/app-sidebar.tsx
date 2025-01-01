"use client";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { APP_NAME } from "@/lib/constants/app";
import ROUTES from "@/lib/constants/routes";
import { cn } from "@/lib/utils";
import {
  IconFileBarcode,
  IconFileSpreadsheet,
  IconLayoutDashboard,
  IconSettings,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";

const iconClassName =
  "text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0";

const links = [
  {
    label: "Tableau de bord",
    href: ROUTES.dashboard,
    icon: <IconLayoutDashboard className={iconClassName} />,
  },
  {
    label: "Devis",
    href: ROUTES.quotes,
    icon: <IconFileSpreadsheet className={iconClassName} />,
  },
  {
    label: "Factures",
    href: ROUTES.bills,
    icon: <IconFileBarcode className={iconClassName} />,
  },
  {
    label: "Clients",
    href: ROUTES.clients,
    icon: <IconUsers className={iconClassName} />,
  },
];

export function AppSidebar({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto  overflow-hidden h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                href: ROUTES.settings,
                label: "Configuration",
                icon: <IconSettings className={iconClassName} />,
              }}
            />
            {user?.name && user?.email && (
              <SidebarLink
                link={{
                  label: user?.name,
                  href: "/api/auth/signout",
                  icon: user?.image ? (
                    <Image
                      alt=""
                      src={user.image}
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                    />
                  ) : (
                    <IconUser />
                  ),
                }}
              />
            )}
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-black font-bold dark:text-white whitespace-pre"
      >
        {APP_NAME}
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
