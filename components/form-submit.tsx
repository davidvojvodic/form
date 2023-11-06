"use client";

import { TextCursor } from "lucide-react";
import { FormElementInstance, FormElements } from "./form-elements";
import { Button } from "./ui/button";
import { CursorArrowIcon } from "@radix-ui/react-icons";
import { useRef } from "react";

const FormSubmit = ({
  formUrl,
  content,
}: {
  content: FormElementInstance[];
  formUrl: string;
}) => {
  const formValues = useRef<{ [key: string]: string }>({});

  const submitValue = (key: string, value: string) => {
    formValues.current[key] = value;
  };

  const submitForm = () => {
    console.log("FORM VALUE", formValues.current);
  };

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-green-700 rounded">
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
            />
          );
        })}
        <Button
          className="mt-8"
          onClick={() => {
            submitForm();
          }}
        >
          <CursorArrowIcon className="mr-2" />
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FormSubmit;
