  import SubscribeButton from "../../components/SubscribeButton/page"
  
  export default function Navbar() {
    return (
      <nav className="flex justify-between items-center py-4 px-40 bg-white shadow-sm sticky top-0 z-50">
        <div className="bg-gradient-to-r from-[#7eaa92] to-[#a7f6ad] bg-clip-text text-transparent text-2xl font-extrabold">
          Idea&apos;s Bangladesh
        </div>
        <div className="space-x-8 hidden md:flex">
          <a href="/home" className="hover:text-[#95C9AC] font-medium transition">Home</a>
          <a href="/about" className="hover:text-[#95C9AC] font-medium transition">About</a>
          <a href="/contact" className="hover:text-[#95C9AC] font-medium transition">Contact</a>
        </div>
        <SubscribeButton />
      </nav>
    );
  }

