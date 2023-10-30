import React from "react";
import SidebarButtonElement from "./sidebar-button-element";
import { FormElements } from "./form-elements";

const FormElementsSidebar = () => {
  return (
    <div>
      Elements
      <SidebarButtonElement formElement={FormElements.TextField} />
    </div>
  );
};

export default FormElementsSidebar;
