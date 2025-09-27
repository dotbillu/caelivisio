"use client";

function InfoBar() {
  return (
    <div className="flex w-full h-screen">
      {/* Left half - solid */}
      <div className="w-1/2 bg-gray-900 flex items-center justify-center text-gray-300">
        Left Side
      </div>

      {/* Right half - transparent */}
      <div className="w-1/2 flex flex-col bg-transparent">
        <div className="flex-1 flex items-center justify-center border border-blue-500">
          Hello
        </div>
        <div className="flex-1 flex items-center justify-center">
          World
        </div>
      </div>
    </div>
  );
}

export default InfoBar;

