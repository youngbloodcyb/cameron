import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";

interface PostProps {
  params: {
    slug: string[];
  };
}

export const generateStaticParams = async () =>
  allPosts.map((post: any) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: any) => {
  const post = allPosts.find(
    (post: any) => post._raw.flattenedPath === params.slug
  );
  return { title: post?.title, description: post?.description };
};

export default async function PostPage({ params }: PostProps) {
  const post = allPosts.find(
    (post: any) => post._raw.flattenedPath === params.slug
  );

  if (!post) {
    notFound();
  }

  return (
    <>
      <section className="lg:container flex justify-center">
        <article className="py-6 prose dark:prose-invert">
          <h1 className="mb-2">{post.title}</h1>
          <hr className="my-4" />
          <Mdx code={post.body.code} />
        </article>
      </section>
    </>
  );
}
