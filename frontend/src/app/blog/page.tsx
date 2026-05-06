import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/lib/queries/posts";
import { getPageByUri } from "@/lib/queries/pages";
import { Card } from "@/components/ui/Card";
import { Calendar } from "lucide-react";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageByUri("/blog");

  if (!page || !page.seo) {
    return {
      title: "Blog & Nieuws | IPTV NL",
      description: "Lees het laatste nieuws en artikelen over IPTV, streaming en onze nieuwste features.",
    };
  }

  return {
    title: page.seo.title,
    description: page.seo.metaDesc,
    openGraph: {
      title: page.seo.opengraphTitle,
      description: page.seo.opengraphDescription,
      images: page.seo.opengraphImage ? [{ url: page.seo.opengraphImage.sourceUrl }] : [],
    },
  };
}

export default async function BlogPage() {
  // Try to fetch page data for title/description if it exists in WP
  const page = await getPageByUri("/blog");
  const posts = await getPosts(50); // Fetch up to 50 posts

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              {page?.title || "Blog & Nieuws"}
            </h1>
            <p className="text-lg text-foreground/70">
              {page?.content ? (
                <span dangerouslySetInnerHTML={{ __html: page.content }} />
              ) : (
                "Blijf op de hoogte van het laatste nieuws, tips en updates over onze IPTV diensten."
              )}
            </p>
          </div>

          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group h-full">
                  <Card variant="glass" className="h-full flex flex-col p-0 overflow-hidden hover:border-primary-500/50 transition-colors">
                    {post.featuredImage?.node && (
                      <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.featuredImage.node.altText || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-sm text-primary-400 mb-3">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString("nl-NL", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                      <h2 className="text-xl font-heading font-bold mb-3 group-hover:text-primary-400 transition-colors">
                        {post.title}
                      </h2>
                      <div 
                        className="text-foreground/70 line-clamp-3 mb-4 flex-1"
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                      />
                      <div className="text-primary-400 font-medium text-sm inline-flex items-center gap-1 mt-auto">
                        Lees verder <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-foreground/50 py-12 bg-surface/50 rounded-2xl border border-surface-border">
              Er zijn nog geen blog artikelen gepubliceerd.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
