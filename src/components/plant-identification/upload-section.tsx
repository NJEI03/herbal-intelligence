
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function UploadSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    handleFiles(files);
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  };
  
  const handleFiles = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  
  const clearSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="font-montserrat font-semibold text-xl mb-2">Plant Identification</h2>
        <p className="text-herbal-text-secondary">
          Upload a clear photo of a plant to identify it and learn about its medicinal properties
        </p>
      </div>
      
      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            isDragging ? "border-herbal-primary bg-herbal-primary/5" : "border-gray-300 hover:border-herbal-primary"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="mb-4">
            <div className="w-16 h-16 bg-herbal-primary/10 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-herbal-primary">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <circle cx="10" cy="13" r="2"></circle>
                <path d="m20 17-1.09-1.09a2 2 0 0 0-2.82 0L10 22"></path>
              </svg>
            </div>
          </div>
          <p className="font-medium mb-1">
            Drag & drop your plant image here
          </p>
          <p className="text-sm text-herbal-text-secondary mb-4">
            or click to browse from your device
          </p>
          <label htmlFor="file-upload">
            <Button variant="outline" className="cursor-pointer">
              Browse Files
            </Button>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInput}
            />
          </label>
          <p className="mt-4 text-xs text-herbal-text-secondary">
            Supported formats: JPG, PNG, GIF (max 10MB)
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden border border-gray-200">
            <img 
              src={previewUrl || ""} 
              alt="Selected plant" 
              className="w-full object-cover aspect-[4/3]" 
            />
            <button 
              className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:bg-white transition-colors"
              onClick={clearSelectedFile}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={clearSelectedFile}>
              Change Image
            </Button>
            <Button className="bg-herbal-primary hover:bg-herbal-primary/90">
              Identify Plant
            </Button>
          </div>
          <p className="text-xs text-herbal-text-secondary text-center">
            For best results, ensure the plant is well-lit and the image focuses on distinguishing features like leaves, flowers, or fruit.
          </p>
        </div>
      )}
    </Card>
  );
}
