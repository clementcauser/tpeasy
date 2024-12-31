"use client";

import CreateCompanyProvider from "./create-company-context";
import CreateCompanyStepOne from "./create-company-step-one";
import CreateCompanyStepThree from "./create-company-step-three";
import CreateCompanyStepTwo from "./create-company-step-two";

function CreateCompanyPageContent() {
  return (
    <CreateCompanyProvider>
      {(step) => {
        if (step === 0) {
          return <CreateCompanyStepOne />;
        }
        if (step === 1) {
          return <CreateCompanyStepTwo />;
        }
        if (step === 2) {
          return <CreateCompanyStepThree />;
        }
      }}
    </CreateCompanyProvider>
  );
}

export default CreateCompanyPageContent;
