"use client";

import { TextIcon } from "lucide-react";
import { ElementsType, FormElement } from "../form-elements";

const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text field",
      helperText: "Helper text",
      requred: false,
      placeholder: "value here...",
    },
  }),
  designerBtnElement: {
    icon: TextIcon,
    label: "Text field",
  },
  designerComponent: () => <div>Designer component</div>,
  formComponent: () => <div>Form component</div>,
  propertiesComponent: () => <div>Properties component</div>,
};
