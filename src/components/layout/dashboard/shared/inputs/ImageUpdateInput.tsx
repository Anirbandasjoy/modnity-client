"use client";

import { TrashIcon, UploadCloudIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageUploaderProps {
  images: File[];
  setImages: (images: File[]) => void;
  mode: "add" | "update";
  defaultImages?: string[];
  multiple?: boolean;
  onRemoveDefaultImage?: (url: string) => void; // Changed to accept URL
}

export function ImageUpdateUploader({
  images,
  setImages,
  mode,
  defaultImages = [],
  multiple = false,
  onRemoveDefaultImage,
}: ImageUploaderProps) {
  const [removedDefaultImages, setRemovedDefaultImages] = useState<string[]>(
    []
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      if (!multiple && files.length > 1) {
        alert("Only one image can be uploaded at a time.");
        return;
      }
      setImages(multiple ? [...images, ...files] : [files[0]]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const removeDefaultImage = (url: string) => {
    setRemovedDefaultImages((prev) => [...prev, url]);
    if (onRemoveDefaultImage) {
      onRemoveDefaultImage(url);
    }
  };

  // Filter out removed default images from display
  const normalizedDefaultImages = Array.isArray(defaultImages)
    ? defaultImages
    : defaultImages
    ? [defaultImages]
    : [];

  const visibleDefaultImages = normalizedDefaultImages.filter(
    (url) => !removedDefaultImages.includes(url)
  );
  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {/* Upload Box */}
        <div className="h-40 w-full border-2 border-dashed cursor-pointer flex justify-center items-center text-black text-center relative">
          <div className="flex flex-col items-center text-black">
            <UploadCloudIcon className="text-3xl text-black mb-1" />
            <span className="text-sm text-black">Choose files to upload</span>
            <span className="text-black text-xs">PNG, JPG, or JPEG files</span>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer rounded-lg"
          />
        </div>

        {/* Default Images (Update Mode) */}
        {mode === "update" &&
          visibleDefaultImages.map((url, index) => (
            <div key={`default-${index}`} className="relative w-fit">
              <Image
                src={url}
                alt={`Existing Image ${index + 1}`}
                width={100}
                height={100}
                className="h-24 w-24 object-cover"
              />
              <TrashIcon
                onClick={() => removeDefaultImage(url)}
                className="absolute -top-[10px] -right-[10px] rounded-full bg-red-500 text-2xl text-black cursor-pointer p-1"
              />
            </div>
          ))}

        {/* Uploaded Images */}
        {images.map((image, index) => (
          <div key={index} className="relative w-fit">
            <Image
              src={URL.createObjectURL(image)}
              alt={`Preview ${index + 1}`}
              width={100}
              height={100}
              className="h-24 w-24 object-cover"
            />
            <TrashIcon
              onClick={() => removeImage(index)}
              className="absolute -top-[10px] -right-[10px] rounded-full bg-red-500 text-2xl text-black cursor-pointer p-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
