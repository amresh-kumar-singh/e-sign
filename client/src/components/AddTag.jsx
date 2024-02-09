import React, { useState } from "react";
import { context } from "../context";

const AddTag = () => {
  const { templateId, isTagUpdated, setIsTagUpdated } = context();
  const [role1, setRole1] = useState({
    name: "",
    email: "",
  });
  const [role2, setRole2] = useState({
    name: "",
    email: "",
  });
  const [role3, setRole3] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e, role) => {
    const { name, value } = e.target;
    switch (role) {
      case "role1":
        setRole1({ ...role1, [name]: value });
        break;
      case "role2":
        setRole2({ ...role2, [name]: value });
        break;
      case "role3":
        setRole3({ ...role3, [name]: value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/file", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template_id: templateId,
          role1,
          role2,
          role3,
        }),
      });
      const data = await response.json();
      console.log(response, data);
      if (response.ok) {
        console.log("Data sent successfully");
        setIsTagUpdated(true);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Please fill all details an email tag will be added to all roles!</h2>
      <div>
        <h3>Role 1</h3>
        <input
          type="text"
          name="name"
          value={role1.name}
          onChange={(e) => handleChange(e, "role1")}
          placeholder="Recipient Name"
          required
          disabled={isTagUpdated}
        />
        <input
          type="email"
          name="email"
          value={role1.email}
          onChange={(e) => handleChange(e, "role1")}
          placeholder="Recipient Email"
          required
          disabled={isTagUpdated}
        />
      </div>
      <div>
        <h3>Role 2</h3>
        <input
          type="text"
          disabled={isTagUpdated}
          name="name"
          value={role2.name}
          onChange={(e) => handleChange(e, "role2")}
          placeholder="Recipient Name"
          required
        />
        <input
          type="email"
          name="email"
          disabled={isTagUpdated}
          value={role2.email}
          onChange={(e) => handleChange(e, "role2")}
          placeholder="Recipient Email"
          required
        />
      </div>
      <div>
        <h3>Role 3</h3>
        <input
          type="text"
          name="name"
          disabled={isTagUpdated}
          value={role3.name}
          onChange={(e) => handleChange(e, "role3")}
          placeholder="Recipient Name"
          required
        />
        <input
          type="email"
          name="email"
          disabled={isTagUpdated}
          value={role3.email}
          onChange={(e) => handleChange(e, "role3")}
          placeholder="Recipient Email"
          required
        />
      </div>
      <button onClick={handleSubmit} disabled={isTagUpdated}>
        Submit
      </button>
    </div>
  );
};

export default AddTag;
