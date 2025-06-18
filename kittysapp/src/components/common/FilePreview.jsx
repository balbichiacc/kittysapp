import React from "react";

const FilePreview = ({ file, onRemove }) => {
  if (!file) return null;

  const isImage = file.type.startsWith("image/");
  const url = URL.createObjectURL(file);

  return (
    <div className="relative w-fit border p-2 rounded mt-2">
      {isImage ? (
        <img src={url} alt="Preview" className="max-w-[200px] rounded" />
      ) : (
        <p className="text-sm text-gray-700 dark:text-gray-300">{file.name}</p>
      )}
      <button
        onClick={onRemove}
        className="absolute top-0 right-0 text-red-500 text-sm"
      >
        ✕
      </button>
    </div>
  );
};

export default FilePreview;