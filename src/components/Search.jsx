export function Search({ searchText, setSearchText }) {
  const changeSearchBarText = (event) => {
    setSearchText(event.target.value);
  }

  return (
    <div className="h-10">
      <input
        className="bg-gray-800 p-0.5 pl-2 rounded text-xl w-[30vw]"  
        placeholder="Search Application"
        value={searchText}
        onChange={changeSearchBarText}
      />
    </div>
  );
}