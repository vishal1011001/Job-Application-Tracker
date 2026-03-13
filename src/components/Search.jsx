// import { useState } from "react";

export function Search({ searchText, setSearchText }) {
  // const [searchBarText, setSearchBarText] = useState('');

  const changeSearchBarText = (event) => {
    setSearchText(event.target.value);
  }

  return (
    <div className="h-10">
      <input
        className="bg-gray-800 p-0.5 pl-2 rounded text-xl"
        placeholder="Search Application"
        value={searchText}
        onChange={changeSearchBarText}
      />
    </div>
  );
}