import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // create features
  const billsFeature = await prisma.feature.create({ data: { name: "bills" } });
  const quotesFeature = await prisma.feature.create({
    data: { name: "quotes" },
  });
  const clientsFeature = await prisma.feature.create({
    data: { name: "clients" },
  });

  // create test user
  const user = await prisma.user.create({
    data: { email: "test@mail.com", name: "Test User" },
  });

  // create test company
  const company = await prisma.company.create({
    data: {
      commercialName: "TEST COMPANY",
      siren: "792796459",
      siret: "79279645900016",
      category: "Formation",
      activityCode: "8729A",
      address: "55 RUE DE VINCENNES, 69001 LYON, France",
      mainPhone: "0123456789",
      secondaryPhone: "0123456789",
      currency: "EURO",
      capital: "448390,00",
      createdAt: "2025-01-01T18:53:58.159Z",
      updatedAt: "2025-01-01T18:53:58.159Z",
    },
  });

  // add company to test user
  await prisma.user.update({
    where: { id: user.id },
    data: { companyId: company.id },
  });

  // zc bills feature
  await prisma.companyFeature.create({
    data: { companyId: company.id, featureId: billsFeature.id, isActive: true },
  });

  // authorize quotes features
  await prisma.companyFeature.create({
    data: {
      companyId: company.id,
      featureId: quotesFeature.id,
      isActive: true,
    },
  });

  // deny clients features
  await prisma.companyFeature.create({
    data: {
      companyId: company.id,
      featureId: clientsFeature.id,
      isActive: false,
    },
  });

  console.log("Les fixtures ont été ajoutées avec succès.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
