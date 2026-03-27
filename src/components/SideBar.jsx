import { useNavigate } from "react-router-dom";

export function SideBar() {
  const navigate = useNavigate();

  const changePage = (val) => {
    navigate(val);
  }

  return (
    <div className="flex flex-col p-4 pl-0 text-2xl **:rounded-r-3xl **:p-3 **:pl-5 **:text-left gap-1 **:hover:bg-gray-700">
      <button onClick={() => changePage("/")}>Applications</button>
      <button onClick={() => changePage("/Settings")}>Settings</button>
      <button onClick={() => changePage("/Page3")}>Page 3</button>
      <button onClick={() => changePage("/Page4")}>Page 4</button>
      <button onClick={() => changePage("/Page5")}>Page 5</button>
    </div>
  );
}