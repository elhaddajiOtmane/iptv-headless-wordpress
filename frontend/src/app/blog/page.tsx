import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/lib/queries/posts";
import { getPageByUri } from "@/lib/queries/pages";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { Calendar } from "lucide-react";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageByUri("/blog");
  return buildMetadata({
    seo: page?.seo,
    fallbackTitle: "Blog & Nieuws",
    fallbackDescription:
      "Lees het laatste nieuws en artikelen over IPTV, streaming en onze nieuwste features.",
    path: "/blog",
  });
}

export default async function BlogPage() {
  const page = await getPageByUri("/blog");
  const posts = await getPosts(50);

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={webPageJsonLd({
        title: page?.seo?.title || "Blog & Nieuws",
        description: page?.seo?.metaDesc || "IPTV nieuws en artikelen",
        path: "/blog",
      })} />
      <main className="flex-1 bg-ink py-20 lg:py-28">
        <div className="container-x max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="eyebrow justify-center inline-flex">Blog</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
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
