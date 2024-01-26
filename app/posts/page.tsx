import Link from "next/link";
import { allPosts, Post } from "contentlayer/generated";
import { compareDesc } from "date-fns";

function PostCard(post: Post, index: number) {
  return (
    <Link href={post.url} className="grid grid-cols-4 max-w-[400px]">
      <h2>01</h2>
      <h2>{post.title}</h2>
      <h2></h2>
      <h2>2023</h2>
    </Link>
  );
}

function page() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <>
      <section className="flex flex-col">
        <div>
          <div className="space-y-2">
            {posts.map((post, idx) => (
              <PostCard key={idx} index={idx} {...post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default page;
