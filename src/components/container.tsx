import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1100px] mx-auto min-h-screen bg-zinc-800 flex flex-col">
      {children}
    </div>
  );
}
