import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronLeft } from "lucide-react";
import { getPostBySlug, getPosts } from "@/lib/queries/posts";

export const revalidate = 60; // ISR revalidation

export async function generateStaticParams() {
  const posts = await getPosts(100);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Blog Post Niet Gevonden",
    };
  }

  const seo = post.seo;
  const fallbackDescription = post.excerpt ? post.excerpt.replace(/<[^>]+>/g, '') : "";

  return {
    title: seo?.title || `${post.title} | IPTV NL Blog`,
    description: seo?.metaDesc || fallbackDescription,
    openGraph: {
      title: seo?.title || post.title,
      description: seo?.metaDesc || fallbackDescription,
      images: post.featuredImage?.node ? [{ url: post.featuredImage.node.sourceUrl }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-12 lg:py-24">
        <article className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-8 font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Terug naar overzicht
            </Link>

            <div className="flex items-center gap-2 text-foreground/60 mb-4">
              <Calendar className="w-5 h-5" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("nl-NL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-8"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
          </div>

          {post.featuredImage?.node && (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-2xl">
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div 
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-primary-400 hover:prose-a:text-primary-300 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </div>
  );
}
