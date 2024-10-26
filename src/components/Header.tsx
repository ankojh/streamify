import userAvatar from "../assets/DP.jpg";

export default function Header() {
  return (
    <div className="min-h-16 px-6 bg-white shadow-sm flex justify-between items-center border-b border-gray-200">
      <div className="font-bold text-2xl text-black">streamify</div>
      <div className="flex gap-4 items-center">
        <div className="flex flex-col">
          <span className="font-semibold">Ankit Ojha</span>
          <span className="text-sm">Administrator</span>
        </div>
        <img src={userAvatar} alt="user" className="w-10 h-10 rounded-full" />
      </div>
    </div>
  );
}
