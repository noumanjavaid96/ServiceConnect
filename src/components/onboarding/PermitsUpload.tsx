import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Shield, FileCheck, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface PermitsUploadProps {
  permits: File[];
  onPermitsChange: (permits: File[]) => void;
  disabled?: boolean;
}

interface UploadingFile {
  file: File;
  progress: number;
}

const PermitsUpload = ({
  permits,
  onPermitsChange,
  disabled,
}: PermitsUploadProps) => {
  const [identityVerified, setIdentityVerified] = useState(false);
  const [backgroundCheckStarted, setBackgroundCheckStarted] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [idUploadProgress, setIdUploadProgress] = useState(0);
  const [isUploadingId, setIsUploadingId] = useState(false);
  const [backgroundCheckProgress, setBackgroundCheckProgress] = useState(0);

  const simulateFileUpload = (file: File) => {
    const uploadingFile = { file, progress: 0 };
    setUploadingFiles((prev) => [...prev, uploadingFile]);

    const interval = setInterval(() => {
      setUploadingFiles((prev) =>
        prev.map((f) =>
          f.file === file
            ? { ...f, progress: Math.min(f.progress + 10, 95) }
            : f,
        ),
      );
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setUploadingFiles((prev) => prev.filter((f) => f.file !== file));
      onPermitsChange([...permits, file]);
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(simulateFileUpload);
  };

  const handleIdUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingId(true);
      setIdUploadProgress(0);

      const interval = setInterval(() => {
        setIdUploadProgress((prev) => Math.min(prev + 10, 95));
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        setIdUploadProgress(100);
        setIdentityVerified(true);
        setIsUploadingId(false);
      }, 2000);
    }
  };

  const startBackgroundCheck = () => {
    setBackgroundCheckStarted(true);
    setBackgroundCheckProgress(0);

    const interval = setInterval(() => {
      setBackgroundCheckProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 100);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg">
      <Card className="p-4">
        <Label className="text-sm font-medium mb-4 block">
          Permits & Certifications
        </Label>
        <div className="p-4 border-2 border-dashed rounded-lg text-center">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">
            Upload any relevant permits or certifications
          </p>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="permits-upload"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            disabled={disabled}
          />
          <label htmlFor="permits-upload">
            <Button
              variant="outline"
              className="w-full"
              asChild
              disabled={disabled}
            >
              <span>Choose Files</span>
            </Button>
          </label>
        </div>

        {uploadingFiles.length > 0 && (
          <div className="mt-4 space-y-4">
            {uploadingFiles.map((file, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 truncate">
                    {file.file.name}
                  </span>
                  <span className="text-gray-500">{file.progress}%</span>
                </div>
                <Progress value={file.progress} />
              </div>
            ))}
          </div>
        )}

        {permits.length > 0 && (
          <div className="space-y-2 mt-4">
            <h4 className="font-medium flex items-center gap-2">
              <FileCheck className="w-4 h-4" />
              Uploaded Files
            </h4>
            <ul className="space-y-2">
              {permits.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <span className="text-sm text-gray-600">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      onPermitsChange(permits.filter((_, i) => i !== index))
                    }
                    disabled={disabled}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      <Card className="p-4">
        <Label className="text-sm font-medium mb-4 block">
          Identity Verification
        </Label>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <p className="text-sm text-gray-600">
              Please upload a government-issued ID for verification
            </p>
          </div>
          <input
            type="file"
            onChange={handleIdUpload}
            className="hidden"
            id="id-upload"
            accept=".jpg,.jpeg,.png,.pdf"
            disabled={disabled || identityVerified || isUploadingId}
          />
          <label htmlFor="id-upload">
            <Button
              variant="outline"
              className="w-full"
              asChild
              disabled={disabled || identityVerified || isUploadingId}
            >
              <span>
                {isUploadingId ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading ID...
                  </div>
                ) : identityVerified ? (
                  <div className="flex items-center gap-2">
                    <FileCheck className="h-4 w-4" />
                    ID Verified
                  </div>
                ) : (
                  "Upload ID"
                )}
              </span>
            </Button>
          </label>
          {isUploadingId && (
            <div className="space-y-2">
              <Progress value={idUploadProgress} />
              <p className="text-xs text-gray-500 text-center">
                {idUploadProgress}%
              </p>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-4">
        <Label className="text-sm font-medium mb-4 block">
          Background Check
        </Label>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            We'll run a background check to ensure platform safety
          </p>
          <Button
            variant="outline"
            className="w-full"
            onClick={startBackgroundCheck}
            disabled={disabled || !identityVerified || backgroundCheckStarted}
          >
            {backgroundCheckStarted ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Background Check in Progress ({backgroundCheckProgress}%)
              </div>
            ) : (
              "Start Background Check"
            )}
          </Button>
          {backgroundCheckStarted && (
            <div className="space-y-2">
              <Progress value={backgroundCheckProgress} />
              <p className="text-xs text-gray-500 text-center">
                Estimated time:{" "}
                {Math.ceil((100 - backgroundCheckProgress) / 10)} minutes
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PermitsUpload;
