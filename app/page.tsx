import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full mt-10 not-prose">
      <div>
        <h2 className="mb-4">online journal of cameron youngblood</h2>
        <Link href="/posts">
          <h3 className="text-sm underline italic">read posts</h3>
        </Link>
      </div>
    </section>
  );
}
