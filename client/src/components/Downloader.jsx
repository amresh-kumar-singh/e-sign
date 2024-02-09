import React from "react";
import { context } from "../context";

function Downloader() {
  const { templateId } = context();
  const downloadPDF = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/file?template_id=${templateId}`
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${templateId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return <button onClick={downloadPDF}>Download File</button>;
}

export default Downloader;
