import { Link } from "wouter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ArrowRight } from "lucide-react";
import AdBanner from "@/components/AdBanner";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  imageClass: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "managing-teams-across-time-zones",
    title: "How to Effectively Manage Teams Across Different Time Zones",
    description: "Discover proven strategies for leading globally distributed teams, maintaining productivity, and fostering collaboration despite time zone challenges.",
    date: "March 27, 2025",
    imageClass: "bg-gradient-to-r from-blue-500 to-purple-500"
  },
  {
    slug: "psychology-of-time-zones",
    title: "The Psychology of Time Zones: How Global Time Differences Affect Productivity",
    description: "Explore the psychological impact of working across time zones, and learn techniques to mitigate fatigue and maintain work-life balance.",
    date: "March 26, 2025",
    imageClass: "bg-gradient-to-r from-green-500 to-teal-500"
  },
  {
    slug: "scheduling-international-meetings",
    title: "Best Practices for Scheduling International Meetings",
    description: "Master the art of finding optimal meeting times that respect everyone's working hours and maximize team participation.",
    date: "March 25, 2025",
    imageClass: "bg-gradient-to-r from-amber-500 to-red-500"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-12 md:py-20 bg-primary/5">
          <div className="container px-4 md:px-6 mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">World Time Explorer Blog</h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Insights, tips, and strategies for navigating global collaboration and making the most of international time differences.
            </p>
          </div>
        </section>
        
        {/* Ad Banner */}
        <div className="container px-4 md:px-6 mx-auto py-6">
          <AdBanner slot="5903232971" format="horizontal" className="mx-auto" />
        </div>
        
        <section className="py-12">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <div className="group h-full border rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                    <div className={`${post.imageClass} h-48 flex items-center justify-center`}>
                      <div className="text-white text-xl font-bold text-center px-4">
                        {post.title.split(':')[0]}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 flex-1">{post.description}</p>
                      <div className="flex items-center text-primary font-medium">
                        Read more <ArrowRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* SEO-focused section */}
        <section className="py-12 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Popular Time Zone Resources</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 border rounded-lg bg-white">
                <h3 className="font-semibold text-lg mb-2">Understanding World Time Zones</h3>
                <p className="text-gray-600 mb-4">Learn about the history and organization of global time zones and how they impact international business.</p>
              </div>
              <div className="p-6 border rounded-lg bg-white">
                <h3 className="font-semibold text-lg mb-2">Remote Work Across Time Zones</h3>
                <p className="text-gray-600 mb-4">Explore strategies for building effective async workflows that accommodate team members in different time zones.</p>
              </div>
              <div className="p-6 border rounded-lg bg-white">
                <h3 className="font-semibold text-lg mb-2">Time Zone Conversion Tools</h3>
                <p className="text-gray-600 mb-4">Discover why interactive tools like World Time Explorer are essential for global teams and international collaboration.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter signup - good for SEO */}
        <section className="py-12 bg-primary/10">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Subscribe to Time Zone Tips</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get the latest articles, tools and resources for managing global teams and navigating time zone challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
              />
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}