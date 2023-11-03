import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/form-builder";
import VisitButton from "@/components/visit-button";
import React from "react";

async function FormDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const form = await GetFormById(id);
  if (!form) {
    throw new Error("Form not found");
  }

  const { visits, submissions } = form;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return (
    <>
      <div className="py-10 border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitButton shareUrl={form.shareURL} />
        </div>
        <div className="py-4 border-b border-muted">
          <div className="container flex gap-2 items-center justify-between"></div>
        </div>
      </div>
    </>
  );
}

export default FormDetailPage;
