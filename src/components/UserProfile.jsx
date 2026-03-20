export const UserProfile = () => {
  return (
    <div className="w-[20vw] h-[25vh] flex flex-col z-20 shadow shadow-slate-950 border border-amber-700 border-double border-t-0 p-4 gap-2 absolute right-2 top-16 bg-slate-800 text-white text-xl rounded-b-2xl">
      <img src='/user.png' className="h-20 w-20"></img>
      <h4 className="font-bold">User Name: Vishal</h4>
      <p>Email: vishal@gmail.com</p>
    </div>
  );
}