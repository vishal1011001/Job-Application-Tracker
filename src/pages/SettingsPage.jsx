import React from "react";
import ProfileSettings from "../components/settings-components/ProfileSettings";
import NotificationSettings from "../components/settings-components/NotificationSettings";
import DangerZone from "../components/settings-components/DangerZone";

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <ProfileSettings />
      <NotificationSettings />
      <DangerZone />
    </div>
  );
}