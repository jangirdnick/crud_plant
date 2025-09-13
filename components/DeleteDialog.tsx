
import { deletePlant } from "@/actions/plant.action";
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
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { OctagonAlert, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

interface DeleteDialogProps {
    plant: {
        id: string
    }
}

export default function DeleteDialog({plant}: DeleteDialogProps) {



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        await deletePlant(plant.id)
        toast.success("Plant edited successfully")
    } catch (error) {
        console.error("Error edit plant:", error);
        toast.error("Failed to edit plant" + (error instanceof Error ? `: ${error.message}` : ""));
    }
  }



    return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className=" cursor-pointer" variant="destructive"><Trash2/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
              <div className=" flex items-center gap-3 ">
                    <div className="mx-auto sm:mx-0 flex items-center justify-center w-9 h-9 bg-destructive/10 rounded-full">
                    <OctagonAlert className="h-5 w-5 text-destructive" />
                    </div>
                     Are you absolutely sure?
              </div>

            </AlertDialogTitle>
        <AlertDialogDescription className="text-[15px]">
            Kya aap sure hain ki aap plant ko delete karna chahte hain?
        </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit}>  
          <AlertDialogFooter>
            <AlertDialogCancel className=" cursor-pointer"><X /> Cancel</AlertDialogCancel>
            <AlertDialogAction 
            className={`${buttonVariants({ variant: "destructive" })} cursor-pointer hover:opacity-[.95]`}
            type="submit"><Trash2 /> Conform Delete</AlertDialogAction>
          </AlertDialogFooter>
        </form>

      </AlertDialogContent>
    </AlertDialog>
  );
}
