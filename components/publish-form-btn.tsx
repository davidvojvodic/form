import React, { startTransition, useTransition } from "react";
import { Button } from "./ui/button";
import { BookOpenCheck, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { toast } from "./ui/use-toast";
import { PublishForm } from "@/actions/form";
import { useRouter } from "next/navigation";

const PublishFormBtn = ({ id }: { id: string }) => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  async function publishForm() {
    try {
      await PublishForm(id);
      toast({
        title: "Form published",
        description: "Your form has been published",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again",
        variant: "destructive",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 text-white bg-gradient-to-r from-indigo-500 to-green-500"
        >
          Publish
          <BookOpenCheck className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able
            to edit this form. <br />
            <br />
            <span className="font-medium">
              By publishing this form you will make it available to the public
              and you will be able to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            Proceed {loading && <Loader2 className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishFormBtn;
