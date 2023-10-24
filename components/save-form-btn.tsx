import React from "react";
import { Button } from "./ui/button";
import { Save } from "lucide-react";

const SaveFormBtn = () => {
  return (
    <Button variant="outline" className="gap-2">
      Save
      <Save className="h-4 w-4" />
    </Button>
  );
};

export default SaveFormBtn;
