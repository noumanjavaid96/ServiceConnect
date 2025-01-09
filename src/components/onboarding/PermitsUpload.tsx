import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface PermitsUploadProps {
  permits: File[];
  onPermitsChange: (permits: File[]) => void;
}

const PermitsUpload = ({ permits, onPermitsChange }: PermitsUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onPermitsChange([...permits, ...files]);
  };

  const removePermit = (index: number) => {
    const newPermits = permits.filter((_, i) => i !== index);
    onPermitsChange(newPermits);
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg">
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
        />
        <label htmlFor="permits-upload">
          <Button variant="outline" className="w-full" asChild>
            <span>Choose Files</span>
          </Button>
        </label>
      </div>

      {permits.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Uploaded Files</h4>
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
                  onClick={() => removePermit(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PermitsUpload;
