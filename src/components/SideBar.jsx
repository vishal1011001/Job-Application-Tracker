export function SideBar({ setCurrPage }) {
  const changePage = (val) => {
    setCurrPage(val);
    console.log(val);
  }

  return (
    <div className="flex flex-col p-4 pl-0 text-2xl **:rounded-r-3xl **:p-3 **:pl-5 **:text-left gap-1 **:hover:bg-gray-700">
      <button onClick={() => changePage("Applications")}>Applications</button>
      <button onClick={() => changePage("Page2")}>Page 2</button>
      <button onClick={() => changePage("Page3")}>Page 3</button>
      <button onClick={() => changePage("Page4")}>Page 4</button>
      <button onClick={() => changePage("Page5")}>Page 5</button>
    </div>
  );
}