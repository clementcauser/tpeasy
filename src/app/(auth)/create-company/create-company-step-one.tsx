"use client";

import CreateCompanySIRENForm from "./create-company-siren-form";

function CreateCompanyStepOne() {
  return (
    <>
      <div className="mb-4">
        <p>
          Vous n&apos;êtes rattaché.e à aucune entreprise dans
          l&apos;application pour le moment.
        </p>
        <p>
          <span className="font-bold">Pas de panique</span>, nous allons
          remédier à cela en commençant par rechercher votre entreprise. Pour
          cela, entrez son numéro de SIREN.
        </p>
      </div>

      <CreateCompanySIRENForm />
    </>
  );
}

export default CreateCompanyStepOne;
