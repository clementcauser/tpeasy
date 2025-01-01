import { PropsWithChildren } from "react";
import { AppSidebar } from "./app-sidebar";

async function Layout({ children }: PropsWithChildren) {
  return (
    <AppSidebar>
      <main className="bg-white w-full h-screen pl-4 md:pl-8 px-4 py-2 md:py-6">
        {children}
      </main>
    </AppSidebar>
  );
}

export default Layout;
