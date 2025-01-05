import { Feature, PrismaClient, Role } from "@prisma/client";
const prisma = new PrismaClient();

// WARNING -> THIS ARRAY MUST BE UP TO DATE WITH @/lib/constants/features
export const FEATURES = [
  { name: "bills", authorizedRoles: [Role.EMPLOYEE, Role.OWNER] },
  { name: "quotes", authorizedRoles: [Role.EMPLOYEE, Role.OWNER] },
  { name: "clients", authorizedRoles: [Role.EMPLOYEE, Role.OWNER] },
  { name: "settings", authorizedRoles: [Role.OWNER] },
];

async function main() {
  // create features
  const generatedFeatures = await Promise.all(
    FEATURES.map((feat) => prisma.feature.create({ data: { name: feat.name } }))
  );

  // create test user
  const user = await prisma.user.create({
    data: { email: "test@mail.com", name: "Test User" },
  });

  // create test company
  const company = await prisma.company.create({
    data: {
      commercialName: "TEST COMPANY",
      companyPrefix: "TEC",
      siren: "792796459",
      siret: "79279645900016",
      category: "Formation",
      activityCode: "8729A",
      address: "55 RUE DE VINCENNES, 69001 LYON, France",
      mainPhone: "0123456789",
      secondaryPhone: "0123456789",
      currency: "EURO",
      capital: "448390,00",
      legalForm: "SARL",
      rcs: "Paris B 493467849",
      taxId: "FR35493467849",
      createdAt: "2025-01-01T18:53:58.159Z",
      updatedAt: "2025-01-01T18:53:58.159Z",
    },
  });

  // add company to test user
  await prisma.user.update({
    where: { id: user.id },
    data: { companyId: company.id },
  });

  const check = (feature: Feature) => {
    const found = FEATURES.find((f) => f.name === feature.name);

    return found?.authorizedRoles ?? [];
  };

  Promise.all(
    generatedFeatures.map((feat) =>
      prisma.companyFeature.create({
        data: {
          companyId: company.id,
          featureId: feat.id,
          isActive: true,
          authorizedRoles: check(feat),
        },
      })
    )
  );

  await prisma.client.createMany({
    data: [
      {
        companyId: company.id,
        address: "12 rue du test",
        createdById: user.id,
        name: "Client 1",
        email: "client1@mail.com",
        mainPhone: "0123456789",
        secondaryPhone: "0987654321",
      },
      {
        companyId: company.id,
        address: "87 rue du test",
        createdById: user.id,
        name: "Client 2",
        email: "client2@mail.com",
        mainPhone: "0123456789",
        secondaryPhone: "0987654321",
      },
      {
        companyId: company.id,
        address: "43 rue du test",
        createdById: user.id,
        name: "Client 3",
        email: "client3@mail.com",
        mainPhone: "0123456789",
        secondaryPhone: "0987654321",
      },
    ],
  });

  console.log("✅ Les fixtures ont été ajoutées avec succès.");
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
