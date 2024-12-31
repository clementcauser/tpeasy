import { auth } from "@/lib/auth";
import React from "react";

async function Page() {
  const session = await auth();
  console.log("🚀 ~ Page ~ session:", session);

  return <div>Page</div>;
}

export default Page;
