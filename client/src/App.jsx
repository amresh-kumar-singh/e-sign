import { createContext, useState } from "react";
import "./App.css";
import FileUploader from "./components/FileUploader.jsx";
import { context } from "./context/index.jsx";
import AddTag from "./components/AddTag.jsx";
import SubmitSign from "./components/SubmitSign.jsx";
import Downloader from "./components/Downloader.jsx";

function App() {
  const { templateId, isTagUpdated } = context();
  return (
    <>
      <div>
        <h1>Zoho Esign</h1>
      </div>
      {/* <FileUploader /> */}
      {!templateId ? <FileUploader /> : <Downloader />}
      {!!templateId && <AddTag />}
      {!!isTagUpdated && <SubmitSign />}
    </>
  );
}

export default App;
