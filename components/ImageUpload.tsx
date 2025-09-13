"use client";

import { UploadButton } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";
import toast from "react-hot-toast";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}



function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {

  if(value){
    return (
      <div className="relative size-40">
        <img src={value} 
        alt="Upload" 
        className="rounded-md w-full h-full object-cover"/>

        <button
        onClick={() => onChange("")}
        type="button">
          <XIcon className="w-4 h-4 cursor-pointer" />
        </button>
      </div>
    )
  }

 return (
    <div className="w-25 flex flex-col items-center bg-zinc-200 rounded-md cursor-pointer">
      <UploadButton
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          toast.success("Upload Completed");
          if(res && res[0]?.ufsUrl){
            onChange(res[0].ufsUrl);
          }
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          toast.error(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
export default ImageUpload;