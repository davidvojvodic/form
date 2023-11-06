import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/form-builder";
import FormLinkShare from "@/components/form-link-share";
import VisitButton from "@/components/visit-button";
import React from "react";
import { StatsCard, StatsCards } from "../../page";
import { ViewGridIcon } from "@radix-ui/react-icons";

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
      </div>
      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between">
          <FormLinkShare shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
        <StatsCard
          title="Total visits"
          icon={<ViewGridIcon className="text-blue-600" />}
          helperText="All time form visits"
          value={visits.toLocaleString() || ""}
          className="shadow-md shadow-blue-600"
          loading={false}
        />
        <StatsCard
          title="Total submissions"
          icon={<ViewGridIcon className="text-yellow-600" />}
          helperText="All time submissions"
          value={submissions.toLocaleString() || ""}
          className="shadow-md shadow-yellow-600"
          loading={false}
        />
        <StatsCard
          title="Submission rate"
          icon={<ViewGridIcon className="text-green-600" />}
          helperText="Visits that result in form submission"
          value={submissionRate.toLocaleString() + "%" || ""}
          className="shadow-md shadow-green-600"
          loading={false}
        />
        <StatsCard
          title="Bounce rate"
          icon={<ViewGridIcon className="text-red-600" />}
          helperText="Visits that leave without interacting"
          value={bounceRate.toLocaleString() + "%" || ""}
          className="shadow-md shadow-red-600"
          loading={false}
        />
      </div>

      <div className="container pt-10">
        <SubmissionsTable id={form.id} />
      </div>
    </>
  );
}

export default FormDetailPage;

function SubmissionsTable({ id }: { id: number }) {
  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
    </>
  );
}
