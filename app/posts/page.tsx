import Link from "next/link";
import { allPosts, Post } from "contentlayer/generated";
import { compareDesc } from "date-fns";

type PostCardProps = Post & {
  index: number;
};

function PostCard({ index, ...post }: PostCardProps) {
  const date = new Date(post.date).getFullYear();
  return (
    <Link href={post.url} className="flex max-w-[500px] justify-between">
      <h2>{post.title}</h2>
      <h2>{date}</h2>
    </Link>
  );
}

function page() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <>
      <section className="w-full mt-10">
        <div>
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
