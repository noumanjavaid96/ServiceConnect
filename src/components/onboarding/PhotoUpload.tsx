import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, AlertCircle, Camera, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

interface PhotoUploadProps {
  photo: string | null;
  onPhotoChange: (photo: File) => void;
  optional?: boolean;
  disabled?: boolean;
}

const PhotoUpload = ({
  photo,
  onPhotoChange,
  optional = false,
  disabled = false,
}: PhotoUploadProps) => {
  const [error, setError] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const validateImage = (file: File): boolean => {
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return false;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return false;
    }

    setError("");
    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (validateImage(file)) {
        setIsUploading(true);
        setUploadProgress(0);

        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 95) {
              clearInterval(interval);
              return prev;
            }
            return prev + 5;
          });
        }, 100);

        // Simulate upload completion
        setTimeout(() => {
          clearInterval(interval);
          setUploadProgress(100);
          setIsUploading(false);
          onPhotoChange(file);
        }, 2000);
      }
    }
  };

  return (
    <div className="space-y-4 text-center bg-white p-6 rounded-lg">
      <div
        className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center overflow-hidden relative group ${!photo ? "bg-gray-100" : ""}`}
      >
        {photo ? (
          <>
            <img
              src={photo}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </>
        ) : (
          <Upload className="w-8 h-8 text-gray-400" />
        )}
      </div>

      <div className="space-y-4">
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="photo-upload"
            disabled={disabled || isUploading}
          />
          <label htmlFor="photo-upload">
            <Button
              variant="outline"
              className="w-full"
              asChild
              disabled={disabled || isUploading}
            >
              <span>
                {isUploading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading...
                  </div>
                ) : photo ? (
                  "Change Photo"
                ) : (
                  "Choose Photo"
                )}
              </span>
            </Button>
          </label>
        </div>

        {isUploading && (
          <div className="space-y-2">
            <Progress value={uploadProgress} />
            <p className="text-xs text-gray-500">{uploadProgress}%</p>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <p className="text-sm text-gray-600">
          {optional
            ? "You can skip this step"
            : "Upload a clear, professional photo of yourself"}
        </p>
        <p className="text-xs text-gray-500">
          Recommended: A well-lit, front-facing headshot
        </p>
      </div>
    </div>
  );
};

export default PhotoUpload;
