import Link from "next/link";
import { allPosts, Post } from "contentlayer/generated";
import { compareDesc } from "date-fns";

function PostCard(post: Post) {
  return (
    <main className="">
      <section className="flex flex-col container divide-y">
        <div>
          <h2>
            <Link href={post.url}>{post.title}</Link>
          </h2>
        </div>
      </section>
    </main>
  );
}

function page() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div>
      <div>
        {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
    </div>
  );
}

export default page;
