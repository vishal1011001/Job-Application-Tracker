import React, { useState } from "react";

export default function ProfileSettings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = () => {
    console.log({ name, email });
  };

  return (
    <div className="border p-4 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handleSave}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
