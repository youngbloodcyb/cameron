import Link from "next/link";
import { books } from "./books";

function PostCard({ book }: { book: Book }) {
  const date = new Date(book.date).getFullYear();
  return (
    <Link
      href={`/books/${book.slug}`}
      className="flex max-w-[500px] justify-between mr-2 gap-2"
    >
      <h2>{book.title}</h2>
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
            {books.map((book, idx) => (
              <PostCard key={idx} book={book} />
            ))}
          </div>
        </div>
        <div></div>
      </section>
    </>
  );
}
