import useDesigner from "@/hooks/use-designer";
import React from "react";
import { FormElements } from "./form-elements";
import { Button } from "./ui/button";
import { DoorClosedIcon } from "lucide-react";
import { ExitIcon } from "@radix-ui/react-icons";

const PropertiesFormSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;

  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element properties</p>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSelectedElement(null)}
        >
          <ExitIcon />
        </Button>
      </div>
      <PropertiesForm elementInstance={selectedElement} />;
    </div>
  );
};

export default PropertiesFormSidebar;
