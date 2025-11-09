import { useState, useRef } from "react";
import { Upload, X, Camera } from "lucide-react";
import { Button } from "./ui/button";

interface TicketUploadProps {
  onFileSelect: (file: File | null) => void;
  error?: string;
}

export function TicketUpload({ onFileSelect, error }: TicketUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    // Validate file type - accept all image formats
    if (!file.type.startsWith("image/")) {
      onFileSelect(null);
      alert("Por favor, sube solo archivos de imagen");
      return;
    }

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      onFileSelect(null);
      alert("El archivo no debe superar los 10MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setFileName(file.name);
    onFileSelect(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFileName("");
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-all bg-zinc-900/50 ${
          isDragging
            ? "border-red-500 bg-red-950/30"
            : error
            ? "border-red-500 bg-red-950/20"
            : "border-red-900/20 hover:border-red-700/40"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          id="ticket-upload"
        />

        {!preview ? (
          <label
            htmlFor="ticket-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="w-16 h-16 mb-4 rounded-full bg-red-950/50 border border-red-900/30 flex items-center justify-center">
              <Camera className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-center mb-2 text-gray-300">
              Sube una foto de tu ticket de compra para validar tu voto
            </p>
            <div className="flex items-center gap-2 text-gray-500">
              <Upload className="w-4 h-4" />
              <span>Máximo 10MB</span>
            </div>
          </label>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={preview}
                alt="Vista previa del ticket"
                className="w-full max-h-64 object-contain rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700"
                onClick={handleRemove}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-center text-gray-400">{fileName}</p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500">{error}</p>
      )}
    </div>
  );
}
