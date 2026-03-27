import React from "react";

export default function DangerZone() {
  const handleDeleteAll = () => {
    const confirmDelete = window.confirm("Delete all applications?");
    if (confirmDelete) {
      console.log("All data deleted");
    }
  };

  return (
    <div className="border border-red-500 p-4 rounded-2xl">
      <h2 className="text-xl font-semibold text-red-600 mb-4">Danger Zone</h2>

      <button
        onClick={handleDeleteAll}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Delete All Applications
      </button>
    </div>
  );
}
