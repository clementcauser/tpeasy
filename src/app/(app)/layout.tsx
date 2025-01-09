import { PropsWithChildren } from "react";
import { AppSidebar } from "./app-sidebar";
import { auth } from "@/lib/auth";

async function Layout({ children }: PropsWithChildren) {
  const session = await auth();

  return (
    <AppSidebar session={session}>
      <main className="bg-white w-full h-screen pl-4 md:pl-8 px-4 py-2 md:py-6 overflow-auto">
        {children}
      </main>
    </AppSidebar>
  );
}

export default Layout;
