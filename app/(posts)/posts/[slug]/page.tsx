import type { Post } from "@/types";

import { Layout } from "@/components/screens/posts";
import { getPosts } from "@/lib/mdx";
import { OpenGraph } from "@/lib/og";

import { notFound } from "next/navigation";

const route = "posts";

const Posts = getPosts(route);

interface PageProps {
  params: Promise<Pick<Post, "slug">>;
}

export async function generateStaticParams() {
  return Posts.map((post) => ({
    slug: `${post.slug}`,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = Posts.find(
    (post: { slug: string }) => post.slug === slug,
  );
  const title = post ? post.title : "";
  const image = `${process.env.NEXT_PUBLIC_SITE_URL}api/og?title=${encodeURIComponent(title)}`;

  return {
    ...OpenGraph,
    title,
    openGraph: {
      title,
      images: [image],
    },
    twitter: {
      images: [image],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = Posts.find(
    (post: { slug: string }) => post.slug === slug,
  );

  if (!post) {
    notFound();
  }

  return <Layout post={post} route={route} />;
}
