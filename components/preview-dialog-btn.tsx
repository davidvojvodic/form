import React from "react";
import { Button } from "./ui/button";
import { View } from "lucide-react";

const PreviewDialogBtn = () => {
  return (
    <Button variant="outline" className="gap-2">
      Preview
      <View className="h-4 w-4" />
    </Button>
  );
};

export default PreviewDialogBtn;
