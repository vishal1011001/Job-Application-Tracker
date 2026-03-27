import React, { useState } from "react";

export default function NotificationSettings() {
  const [emailNotif, setEmailNotif] = useState(true);

  return (
    <div className="border p-4 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={emailNotif}
          onChange={() => setEmailNotif(!emailNotif)}
        />
        Email Notifications
      </label>
    </div>
  );
}