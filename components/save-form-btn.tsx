import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2, Save } from "lucide-react";
import useDesigner from "@/hooks/use-designer";
import { UpdateFormContent } from "@/actions/form";
import { toast } from "./ui/use-toast";

const SaveFormBtn = ({ id }: { id: string }) => {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const JsonElements = JSON.stringify(elements);

      await UpdateFormContent(id, JsonElements);

      toast({
        title: "Form saved",
        description: "Your form has been saved",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      variant="outline"
      className="gap-2"
      disabled={loading}
      onClick={() => startTransition(updateFormContent)}
    >
      Save
      <Save className="h-4 w-4" />
      {loading && <Loader2 className="animate-spin" />}
    </Button>
  );
};

export default SaveFormBtn;
