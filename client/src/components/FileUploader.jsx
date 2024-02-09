import React, { useState } from "react";
import { context } from "../context";

const FileUploader = () => {
  const { selectedFile, setSelectedFile, setTemplateId, templateId } =
    context();
  console.log(selectedFile);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:3000/file", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.template_id) setTemplateId(data.template_id);
      console.log(data);
      console.log(response);
      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      console.log("Error uploading file:", error);
      // alert("Error uploading file. Please try again later.");
    }
  };

  return (
    <div>
      <h2>File Uploader</h2>
      <input type="file" onChange={handleFileChange} disabled={!!templateId} />
      <button onClick={handleSubmit} disabled={!!templateId}>
        Upload
      </button>
      {!!templateId && <p>File is already uploaded!</p>}
    </div>
  );
};

export default FileUploader;
