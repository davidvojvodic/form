"use client";

import { Form } from "@prisma/client";
import React from "react";
import PreviewDialogBtn from "./preview-dialog-btn";
import PublishFormBtn from "./publish-form-btn";
import SaveFormBtn from "./save-form-btn";

const FormBuilder = ({ form }: { form: Form }) => {
  return (
    <main className="flex flex-col w-full">
      <nav className="flex justify-between border-b-2 p-4 gap-4 items-center">
        <h2 className="truncate font-medium">
          <span className="text-muted-foreground mr-2">Form:</span>
          {form.name}
        </h2>
        <div className="flex items-center gap-2">
          <PreviewDialogBtn />
          {!form.published && (
            <>
              <SaveFormBtn />
              <PublishFormBtn />
            </>
          )}
        </div>
      </nav>
      <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/graph-paper.svg)] dark:bg-[url(/graph-paper-dark.svg)]"></div>
    </main>
  );
};

export default FormBuilder;
