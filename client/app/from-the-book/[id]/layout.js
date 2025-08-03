export async function generateMetadata({ params }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${params.id}`);
    const blog = await res.json();
  
    return {
      title: blog.title,
      description: blog.summary || "Read this blog",
      openGraph: {
        title: blog.title,
        description: blog.description || "Read this interesting blog",
        url: `https://ideasbangladesh.com/from-the-book/${blog._id}`,
        siteName: "Idea's Bangladesh",
        type: "article",
      },
      twitter: {
        card: "summary",
        title: blog.title,
        description: blog.summary || "Read this interesting blog",
      },
    };
  }
  
  export default function BlogLayout({ children }) {
    return <>{children}</>;
  }
  