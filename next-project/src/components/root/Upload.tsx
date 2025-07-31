"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosClose } from "react-icons/io";

type Props = {
  images: File[],
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function Upload({ images, setImages }: Props) {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Añadimos las nuevas imágenes al estado
    setImages((curr) => [...curr, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    // accept: { "image/*": [] },
  });

  // Función para borrar una imagen seleccionada
  const removeFile = (file: File) => {
    setImages((curr) => curr.filter((f) => f !== file));
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`p-6 border-2 border-dashed rounded-md cursor-pointer mb-4 ${isDragActive ? "border-blue-600 bg-blue-50" : "border-gray-300"
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
        {images.map((file, idx) => {
          const preview = URL.createObjectURL(file);
          return (
            <div
              key={file.name + idx}
              className="relative w-24 h-24 rounded overflow-hidden border"
            >
              <img
                src={preview}
                alt={file.name}
                className="w-full h-full object-cover"
                onLoad={() => URL.revokeObjectURL(preview)} // Clean memory
              />
              <button
                type="button"
                onClick={() => removeFile(file)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs hover:bg-red-500 active:bg-red-400"
                aria-label={`Remove ${file.name}`}
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
