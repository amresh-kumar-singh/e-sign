import React, { useState } from "react";
import { context } from "../context";

const SubmitSign = () => {
  const { templateId } = context();
  const [message, setMessage] = useState("");
  const handleClick = async () => {
    if (message) return;
    try {
      const response = await fetch(
        `http://localhost:3000/file/sign?template_id=${templateId}`,
        {
          method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
        }
      );
      const data = await response.json();
      if (data) setMessage(data.message);
      if (response.ok) {
        console.log("Post request successful");
      } else {
        console.error("Post request failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button
        className="poping-button"
        onClick={handleClick}
        disabled={!!message}
      >
        {message ? message : "Submit document for Sign"}
      </button>
      <style jsx>{`
        .poping-button {
          background-color: #4caf50; /* Green */
          border: none;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          transition-duration: 0.4s;
          cursor: pointer;
          border-radius: 8px;
        }

        .poping-button:hover {
          background-color: #45a049; /* Darker Green */
          box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
            0 17px 50px 0 rgba(0, 0, 0, 0.19);
        }
      `}</style>
    </div>
  );
};

export default SubmitSign;
