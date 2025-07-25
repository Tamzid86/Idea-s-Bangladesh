export default function Footer() {
    return (
    <footer className="bg-[#0c1424] text-gray-100 pt-16 pb-6 mt-5">
        <div className="max-w-7xl mx-auto px-6 md:px-0 grid md:grid-cols-4 gap-8">
          <div>
            <div className="font-bold text-xl text-[#91C5A9] mb-2">Idea&apos;s Bangladesh</div>
            <p className="text-gray-400">
              Empowering minds, inspiring innovation, and building a better Bangladesh through the power of ideas.
            </p>
          </div>
          <div>
            <div className="font-semibold mb-2">Quick Links</div>
            <ul className="space-y-1 text-gray-300">
              <li><a href="/" className="hover:text-green-400">Home</a></li>
              <li><a href="/about" className="hover:text-green-400">About</a></li>
              {/* <li><a href="/contact" className="hover:text-green-400">Contact</a></li> */}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Categories</div>
            <ul className="space-y-1 text-gray-300">
              <li><a href="/from-the-book" className="hover:text-green-400">From the Book</a></li>
              <li><a href="/idea" className="hover:text-green-400">Reader's Innovations</a></li>
              <li><a href="/idea-submission" className="hover:text-green-400">Submit Ideas</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Support</div>
            <ul className="space-y-1 text-gray-300">
              {/* <li><a href="#" className="hover:text-green-400">Help Center</a></li> */}
              <li><a href="/privacy-policy" className="hover:text-green-400">Privacy Policy</a></li>
              <li><a href="/termsofservice" className="hover:text-green-400">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Idea&apos;s Bangladesh. All rights reserved.
        </div>
      </footer>
    );
}