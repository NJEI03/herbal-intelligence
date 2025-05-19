
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X, Image, ImagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function UploadSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{
    file: File;
    previewUrl: string;
    id: string;
  }[]>([]);
  const { toast } = useToast();

  const MAX_FILES = 5;
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  
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
    processFiles(files);
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      processFiles(files);
    }
    // Reset the input value so the same file can be uploaded again if removed
    e.target.value = '';
  };
  
  const processFiles = (files: FileList) => {
    if (uploadedFiles.length + files.length > MAX_FILES) {
      toast({
        title: "Too many files",
        description: `You can upload a maximum of ${MAX_FILES} images at once.`,
        variant: "destructive",
      });
      return;
    }
    
    const newFiles = Array.from(files).map(file => {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image. Please upload only images.`,
          variant: "destructive",
        });
        return null;
      }
      
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 10MB limit.`,
          variant: "destructive",
        });
        return null;
      }
      
      return {
        file,
        previewUrl: URL.createObjectURL(file),
        id: crypto.randomUUID(),
      };
    }).filter(Boolean);
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };
  
  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const newFiles = prev.filter(file => file.id !== id);
      // Release the object URL to free memory
      const fileToRemove = prev.find(file => file.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      return newFiles;
    });
  };

  const identifyPlants = () => {
    // This would be connected to the backend API in a real implementation
    toast({
      title: "Processing images",
      description: `Identifying ${uploadedFiles.length} plant image${uploadedFiles.length > 1 ? 's' : ''}.`,
    });
  };

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-md">
      <div className="text-center mb-6">
        <h2 className="font-montserrat font-semibold text-xl mb-2">Plant Identification</h2>
        <p className="text-herbal-text-secondary">
          Upload clear photos to identify plants and learn about their medicinal properties
        </p>
      </div>
      
      {uploadedFiles.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {uploadedFiles.map((uploadedFile) => (
              <div key={uploadedFile.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                  <img 
                    src={uploadedFile.previewUrl} 
                    alt="Uploaded plant" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <button 
                  className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full hover:bg-white transition-colors shadow-sm opacity-0 group-hover:opacity-100"
                  onClick={() => removeFile(uploadedFile.id)}
                  aria-label="Remove image"
                >
                  <X size={16} />
                </button>
                <p className="mt-1 text-sm text-gray-600 truncate">{uploadedFile.file.name}</p>
              </div>
            ))}
            
            {/* Add more images button */}
            {uploadedFiles.length < MAX_FILES && (
              <label htmlFor="add-more-files" className="cursor-pointer">
                <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-herbal-primary hover:bg-herbal-primary/5 transition-colors">
                  <ImagePlus size={24} className="mb-2 text-herbal-primary" />
                  <span className="text-sm text-herbal-primary font-medium">Add more</span>
                </div>
                <input
                  id="add-more-files"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  multiple
                  onChange={handleFileInput}
                />
              </label>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={() => setUploadedFiles([])}
              className="text-sm"
            >
              Clear all
            </Button>
            <Button 
              className="bg-herbal-primary hover:bg-herbal-primary/90" 
              onClick={identifyPlants}
            >
              Identify Plants
            </Button>
          </div>
          
          <p className="text-xs text-herbal-text-secondary text-center">
            For best results, ensure plants are well-lit and the image focuses on distinguishing features like leaves, flowers, or fruit.
          </p>
        </div>
      ) : (
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
              <Upload className="text-herbal-primary" size={32} />
            </div>
          </div>
          <p className="font-medium mb-1">
            Drag & drop plant images here
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
              multiple
              onChange={handleFileInput}
            />
          </label>
          <p className="mt-4 text-xs text-herbal-text-secondary">
            Upload up to {MAX_FILES} images (JPG, PNG, GIF - max 10MB each)
          </p>
        </div>
      )}
    </Card>
  );
}
