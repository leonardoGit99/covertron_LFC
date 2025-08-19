"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosClose } from "react-icons/io";

type Props = {
  images: File[],
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  imageUrls: string[],
  id?: number | null,
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>
  setDeletedImages: React.Dispatch<React.SetStateAction<string[]>>
}

export default function Upload({ images, setImages, imageUrls, id, setImageUrls, setDeletedImages }: Props) {
  const visibleImages = [...imageUrls, ...images]; // Concat both arrays to show

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Añadimos las nuevas imágenes al estado
    setImages((curr) => [...curr, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    // accept: { "image/*": [] },
  });

  // Función para borrar una imagen seleccionada
  const removeFile = (file: File | string) => {
    // Si es una imagen que ya estaba en el servidor (string)
    if (typeof file === "string") {
      setImageUrls((curr) => curr.filter((f) => f !== file));
      setDeletedImages((curr) => [...curr, file]); 
    }

    // Si es una imagen nueva (File)
    if (file instanceof File) {
      setImages((curr) => curr.filter((f) => f !== file));
    }
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`p-6 border-2 border-dashed rounded-md cursor-pointer mb-4 ${isDragActive ? "border-blue-600 bg-blue-50 dark:bg-slate-700 dark:border-blue-500" : "border-gray-300 dark:border-gray-400"
          }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Arrastra tus imagenes aquí...</p>
        ) : (
          <p>Arrastra y suelta imágenes aquí, o haz clic para seleccionarlas</p>
        )}
      </div>

      {/* Images Preview  */}
      <div className="flex flex-wrap gap-3">
        {visibleImages.map((img, idx) => {
          const isFile = img instanceof File;
          const preview = isFile ? URL.createObjectURL(img) : img;

          return (
            <div
              key={isFile ? img.name + idx : img + idx}
              className="relative w-24 h-24 rounded overflow-hidden border"
            >
              <img
                src={preview}
                alt={`Image ${idx}`}
                className="w-full h-full object-cover"
                onLoad={() => {
                  if (isFile) URL.revokeObjectURL(preview);
                }}
              />
              <button
                type="button"
                onClick={() => removeFile(img)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs hover:bg-red-500 active:bg-red-400"
                aria-label={`Remove image`}
              >
                <IoIosClose />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
