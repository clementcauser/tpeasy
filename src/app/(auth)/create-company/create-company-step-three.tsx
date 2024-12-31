"use client";

import { useCreateCompany } from "./create-company-context";
import CreateCompanyFinalForm from "./create-company-final-form";

function CreateCompanyStepThree() {
  const { company } = useCreateCompany();

  return (
    <>
      <div className="mb-4">
        <p>Parfait !</p>
        <p>
          Nous avons maintenant simplement besoin de ces dernières informations.
        </p>
      </div>

      {company && <CreateCompanyFinalForm company={company} />}
    </>
  );
}

export default CreateCompanyStepThree;