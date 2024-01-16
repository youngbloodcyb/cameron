import Link from "next/link";
import { allPosts, Post } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Header from "@/components/header";

function PostCard(post: Post) {
  return (
    <div>
      <h2>
        <Link href={post.url}>{post.title}</Link>
      </h2>
    </div>
  );
}

function page() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <>
      <Header />
      <section className="flex flex-col">
        <div>
          <div>
            {posts.map((post, idx) => (
              <PostCard key={idx} {...post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default page;
