import React, { createContext, useContext, useState } from "react";

const APPCONTEXT = createContext(null);
const AppProvider = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [templateId, setTemplateId] = useState(null);
  const [isTagUpdated, setIsTagUpdated] = useState(false);
  console.log("context", selectedFile, templateId);
  return (
    <APPCONTEXT.Provider
      value={{
        selectedFile,
        setSelectedFile,
        templateId,
        setTemplateId,
        isTagUpdated,
        setIsTagUpdated,
      }}
    >
      {children}
    </APPCONTEXT.Provider>
  );
};

export default AppProvider;
export const context = () => useContext(APPCONTEXT);
