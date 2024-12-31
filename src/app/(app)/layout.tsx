import { PropsWithChildren } from "react";
import { AppSidebar } from "./app-sidebar";

async function Layout({ children }: PropsWithChildren) {
  return <AppSidebar>{children}</AppSidebar>;
}

export default Layout;
