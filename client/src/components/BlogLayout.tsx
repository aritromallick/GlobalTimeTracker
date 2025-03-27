import { Link } from "wouter";
import Footer from "./Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AdBanner from "./AdBanner";

interface BlogLayoutProps {
  children: React.ReactNode;
  title: string;
  date?: string;
  author?: string;
}

export default function BlogLayout({ children, title, date, author = "World Time Explorer Team" }: BlogLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary/5 border-b">
        <div className="container py-4 px-4 md:px-6 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft size={18} />
              Back to World Time Explorer
            </Button>
          </Link>
          <Link href="/blog">
            <span className="font-semibold text-primary hover:underline">World Time Explorer Blog</span>
          </Link>
        </div>
      </header>
      
      <main className="flex-1 container px-4 md:px-6 py-8 mx-auto max-w-4xl">
        <article className="prose prose-blue lg:prose-xl max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          {date && (
            <div className="text-sm text-gray-500 mb-8">
              Published on {date} by {author}
            </div>
          )}
          
          {/* Ad Banner at the top of the blog post */}
          <div className="my-6">
            <AdBanner slot="5903232971" format="auto" className="mx-auto" />
          </div>
          
          {children}
          
          {/* Ad Banner at the bottom of the blog post */}
          <div className="my-8">
            <AdBanner slot="5903232971" format="auto" className="mx-auto" />
          </div>
        </article>
        
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-xl font-semibold mb-4">Explore More Articles</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/blog/managing-teams-across-time-zones">
              <div className="p-4 border rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                <h4 className="font-medium text-primary">Managing Teams Across Different Time Zones</h4>
                <p className="text-sm text-gray-600 mt-1">Strategies for effective collaboration with globally distributed teams</p>
              </div>
            </Link>
            <Link href="/blog/psychology-of-time-zones">
              <div className="p-4 border rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                <h4 className="font-medium text-primary">The Psychology of Time Zones</h4>
                <p className="text-sm text-gray-600 mt-1">How global time differences affect productivity and well-being</p>
              </div>
            </Link>
            <Link href="/blog/scheduling-international-meetings">
              <div className="p-4 border rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                <h4 className="font-medium text-primary">Best Practices for Scheduling International Meetings</h4>
                <p className="text-sm text-gray-600 mt-1">Tips and tools for finding optimal meeting times across time zones</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}