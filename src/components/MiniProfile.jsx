"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function MiniProfile() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        src={session?.user?.image || "/instagram-logo.webp"}
        alt="user-image"
        className="w-16 h-16 p-[2px] rounded-full border"
      />
      <div className="flex-1 ml-4">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>
      {session ? (
        <button className="text-blue-500 font-semibold" onClick={signOut}>
          Sign Out
        </button>
      ) : (
        <button className="text-blue-500 font-semibold" onClick={signIn}>
          Sign In
        </button>
      )}
    </div>
  );
}
