import React from "react";
import { Button } from "./ui/button";
import { BookOpenCheck } from "lucide-react";

const PublishFormBtn = () => {
  return (
    <Button
      variant="outline"
      className="gap-2 text-white bg-gradient-to-r from-indigo-500 to-green-500"
    >
      Publish
      <BookOpenCheck className="h-4 w-4" />
    </Button>
  );
};

export default PublishFormBtn;
