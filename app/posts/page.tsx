import Link from "next/link";
import { posts } from "@/lib/posts";

function PostCard({ post }: { post: Post }) {
  const date = new Date(post.date).getFullYear();
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="flex max-w-[500px] justify-between mr-2 gap-2"
    >
      <h2>{post.title}</h2>
      <h2>{date}</h2>
    </Link>
  );
}

export default function Page() {
  return (
    <>
      <section className="w-full mt-10 not-prose">
        <div>
          <div className="space-y-2">
            {posts.map((post, idx) => (
              <PostCard key={idx} post={post} />
            ))}
          </div>
        </div>
        <div></div>
      </section>
    </>
  );
}
