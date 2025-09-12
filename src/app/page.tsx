"use client"
import Sidebar from "./components/sidebar";
import dynamic from 'next/dynamic';
const Earth = dynamic(() => import("./components/earth"), { ssr: false });

export default function Home() {

  return (
  <div >
       <div className="fixed w-[25%] h-[40%]">
          <Sidebar />

        </div>
    <Earth/>
    </div>
);
}
