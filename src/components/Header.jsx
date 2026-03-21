import { useState } from "react";
import { Search } from "./Search";
import { UserProfile } from "./UserProfile";

export function Header({ handleSidebarToggle, searchText, setSearchText }) {
  //user profile
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const handleUserProfile = () => {
    setIsUserProfileOpen(!isUserProfileOpen);
  }

  return (
    <>
      <header className="flex justify-between items-center h-16 p-4 bg-gray-900 fixed z-2 text-white text-3xl text-center w-screen">
        <button
          className=""
          onClick={handleSidebarToggle}
        ><img src='/hamburger-menu.png' className="h-8 self-center invert-100" /></button>
        <Search searchText={searchText} setSearchText={setSearchText} />
        <button
          onClick={handleUserProfile}
        ><img src="/user.png" className="h-8" /></button>
      </header>
      
      {isUserProfileOpen && (
        <UserProfile />
      )}
    </>
  );
}