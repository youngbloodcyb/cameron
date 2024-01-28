import Link from "next/link";
import { allPosts, Post } from "contentlayer/generated";
import { compareDesc } from "date-fns";

function PostCard(post: Post, index: number) {
  return (
    <Link href={post.url} className="grid grid-cols-[1fr_6fr_1fr]">
      <h2 className="col-span-1">01</h2>
      <h2 className="col-span-1">{post.title}</h2>
      <h2 className="col-span-1">2023</h2>
    </Link>
  );
}

function page() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <>
      <section className="flex flex-row">
        <div className="flex flex-col justify-between col-span-1 w-1/2">
          <div>
            <h2>Cameron Youngblood</h2>
          </div>
          <div className="space-y-2">
            {posts.map((post, idx) => (
              <PostCard key={idx} index={idx} {...post} />
            ))}
          </div>
        </div>
        <div></div>
      </section>
    </>
  );
}

export default page;
