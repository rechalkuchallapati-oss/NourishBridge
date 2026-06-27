export default function Logo() {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">

      {/* Left Hand */}
      <div className="absolute bottom-1 left-1 w-7 h-8 bg-green-900 rounded-t-full rounded-bl-full rotate-[28deg]" />

      {/* Right Hand */}
      <div className="absolute bottom-1 right-1 w-7 h-8 bg-green-900 rounded-t-full rounded-br-full -rotate-[28deg]" />

      {/* Bowl */}
      <div className="absolute bottom-4 w-9 h-5 bg-gradient-to-r from-green-500 to-green-700 rounded-b-full" />

      {/* Leaf Left */}
      <div className="absolute top-4 left-5 w-2 h-5 bg-green-500 rounded-full rotate-[-30deg]" />

      {/* Leaf Right */}
      <div className="absolute top-4 right-5 w-2 h-5 bg-green-500 rounded-full rotate-[30deg]" />

      {/* Heart */}
      <div className="absolute top-1 text-green-600 text-xl">
        ❤
      </div>

    </div>
  );
}