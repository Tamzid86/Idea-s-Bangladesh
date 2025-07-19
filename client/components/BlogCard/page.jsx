  "use client";
  export default function BlogCard({ blog, handleShowSummary }) {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
  
    // Button click handler
    const handleRead = () => {
      const subscriberEmail = typeof window !== "undefined" && localStorage.getItem("subscriberEmail");
      const subscriberName = typeof window !== "undefined" && localStorage.getItem("subscriberName");
      if (subscriberEmail && subscriberName) {
        router.push(`/from-the-book/${blog._id}`);
      } else {
        setShowModal(true);
      }
    };
  
    return (
      <>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } }
          }}
          whileHover={{ y: -3, boxShadow: "0 8px 32px rgba(30,100,60,0.09)" }}
          className={`flex ${blog.imageUrl ? "flex-col md:flex-row" : "flex-col"} items-stretch w-full bg-white rounded-xl overflow-hidden shadow-sm border transition-all duration-200 min-h-[200px] h-48`}
          style={{ minHeight: "12rem", height: "12rem" }}
        >
          {/* Only render image block if there is an imageUrl */}
          {blog.imageUrl && (
            <div className="w-full md:w-48 lg:w-56 h-48 flex-shrink-0">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-full object-cover object-center"
                style={{
                  minWidth: "12rem",
                  maxWidth: "12rem",
                  minHeight: "12rem",
                  maxHeight: "12rem",
                }}
              />
            </div>
          )}
          <div className="p-4 md:p-6 flex flex-col flex-1 min-w-0">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                  {blog.author || "Admin"}
                </span>
                {blog.read_time && (
                  <span className="text-gray-400 text-xs flex items-center gap-1">
                    <svg width="15" height="15" fill="none" className="inline">
                      <circle cx="7.5" cy="7.5" r="7.5" fill="#E5E7EB" />
                      <path
                        d="M7.5 3.5v4l2.5 1.5"
                        stroke="#6B7280"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    {blog.read_time}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-lg md:text-xl mb-1">{blog.title}</h3>
              <p className="text-gray-700 text-sm mb-4 line-clamp-2">{blog.summary}</p>
            </div>
            <div className="flex gap-2 mt-auto">
                    <button
        className="bg-green-100 text-green-800 px-5 py-2 rounded font-medium hover:bg-green-200 transition text-sm"
        onClick={() => handleShowSummary(blog.summary)}
      >
        Read Summary
      </button>
              <button
                className="bg-green-200 text-green-900 px-5 py-2 rounded font-semibold hover:bg-green-300 transition flex items-center gap-2 text-sm"
                onClick={handleRead}
              >
                Read Full Article
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
  
        {/* Subscribe Modal */}
        <AnimatePresence>
          {showModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
                onClick={() => setShowModal(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-green-700">Subscribe Required</h2>
                  <button onClick={() => setShowModal(false)}>
                    <X size={26} className="text-gray-400 hover:text-green-700" />
                  </button>
                </div>
                <p className="text-gray-700 mb-6">
                  You need to subscribe to read the full article. Please subscribe to get access to exclusive content!
                </p>
                <button
                  className="w-full bg-green-200 text-green-900 py-2 rounded font-bold hover:bg-green-300 transition"
                  onClick={() => {
                    // TODO: add subscribe logic or link
                    setShowModal(false);
                  }}
                >
                  Subscribe Now
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }