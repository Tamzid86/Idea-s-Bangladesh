import SubscribeButton from "../../components/SubscribeButton/page"

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 px-40 bg-white shadow-sm sticky top-0 z-50">
      <a href="/" className="flex items-center gap-3">
        <img
          src="/images/logo.jpeg"
          alt="Ideas Bangladesh Logo"
          className="h-10 w-15 object-contain"
          style={{ borderRadius: "8px" }} 
        />
        <span className="bg-gradient-to-r from-[#7eaa92] to-[#a7f6ad] bg-clip-text text-transparent text-2xl font-extrabold">
          Idea&apos;s Bangladesh
        </span>
      </a>
      <div className="space-x-8 hidden md:flex">
        <a href="/home" className="hover:text-[#95C9AC] font-medium transition">Home</a>
        <a href="/about" className="hover:text-[#95C9AC] font-medium transition">About</a>
        {/* <a href="/contact" className="hover:text-[#95C9AC] font-medium transition">Contact</a> */}
      </div>
      <SubscribeButton />
    </nav>
  );
}
