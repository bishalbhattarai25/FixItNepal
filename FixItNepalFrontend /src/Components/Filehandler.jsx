import React, { useState } from "react";
import instance from "../Server/Axios";

const FileUploadField = ({ label, type, fieldName, formik }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.currentTarget.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // 1. Upload to media API with the specified type (Logo/Document)
      const response = await instance.post(`/api/mediafile?type=${type}`, formData);
      
      // 2. Update Formik with the returned UUID
      formik.setFieldValue(fieldName, response.data.id);
    } catch (error) {
      console.error(`${label} upload failed:`, error);
      alert(`${label} upload failed.`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-zinc-600">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
      />
      {isUploading && <p className="text-blue-500 text-xs animate-pulse">Uploading...</p>}
      {formik.values[fieldName] && !isUploading && <p className="text-green-600 text-xs font-medium">✓ {label} Ready</p>}
      {formik.touched[fieldName] && formik.errors[fieldName] && (
        <p className="text-red-500 text-xs mt-1">{formik.errors[fieldName]}</p>
      )}
    </div>
  );
};

export default FileUploadField;