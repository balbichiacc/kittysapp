import React from "react";
import { useAuth } from "../../context/AuthContext";
import { LogOut } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="w-full flex justify-between items-center p-4 shadow-md bg-white dark:bg-zinc-900">
      <h1 className="text-xl font-bold text-blue-500">Kittysapp</h1>
      <div className="flex items-center gap-4">
        <span className="hidden sm:block font-medium">{user?.username}</span>
        <ThemeToggle />
        <button
          onClick={logout}
          className="p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export default Topbar;