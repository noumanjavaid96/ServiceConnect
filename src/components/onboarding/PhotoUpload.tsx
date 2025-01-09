import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface PhotoUploadProps {
  photo: string | null;
  onPhotoChange: (photo: File) => void;
  optional?: boolean;
}

const PhotoUpload = ({
  photo,
  onPhotoChange,
  optional = false,
}: PhotoUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoChange(file);
    }
  };

  return (
    <div className="space-y-4 text-center bg-white p-6 rounded-lg">
      <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
        {photo ? (
          <img
            src={photo}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <Upload className="w-8 h-8 text-gray-400" />
        )}
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="photo-upload"
        />
        <label htmlFor="photo-upload">
          <Button variant="outline" className="w-full" asChild>
            <span>Choose Photo</span>
          </Button>
        </label>
      </div>
      {optional && (
        <p className="text-sm text-gray-500">You can skip this step</p>
      )}
    </div>
  );
};

export default PhotoUpload;
