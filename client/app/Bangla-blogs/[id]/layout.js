export async function generateMetadata({ params }) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${params.id}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Blog fetch failed");
  
      const blog = await res.json();
  
      function stripHtml(html) {
        return html.replace(/<[^>]*>?/gm, ''); 
      }
  
      const cleanDescription = stripHtml(blog.summary || blog.description || "এই ব্লগটি পড়ুন");
      const imageUrl = blog.imageUrl || "https://ideasbangladesh.com/default-og-image.jpg";
  
      return {
        title: blog.title,
        description: cleanDescription,
        openGraph: {
          title: blog.title,
          description: cleanDescription,
          url: `https://ideasbangladesh.com/Bangla-blogs/${blog._id}`,
          siteName: "Idea's Bangladesh",
          type: "article",
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: blog.title,
          description: cleanDescription,
          images: [imageUrl],
        },
      };
    } catch (error) {
      console.error("Metadata generation failed:", error);
      return {
        title: "Idea's Bangladesh",
        description: "বাংলাদেশকে উদ্ভাবনের মাধ্যমে ক্ষমতায়ন করছি।",
        openGraph: {
          title: "Idea's Bangladesh",
          description: "বাংলাদেশকে উদ্ভাবনের মাধ্যমে ক্ষমতায়ন করছি।",
          url: `https://ideasbangladesh.com`,
          siteName: "Idea's Bangladesh",
          type: "website",
          images: [
            {
              url: "https://ideasbangladesh.com/default-og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Idea's Bangladesh",
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: "Idea's Bangladesh",
          description: "বাংলাদেশকে উদ্ভাবনের মাধ্যমে ক্ষমতায়ন করছি।",
          images: ["https://ideasbangladesh.com/default-og-image.jpg"],
        },
      };
    }
  }
  
  export default function BlogLayout({ children }) {
    return <>{children}</>;
  }
  