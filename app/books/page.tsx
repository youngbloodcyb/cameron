import Link from "next/link";
import { books } from "./books";
import Image from "next/image";

function PostCard({ book }: { book: Book }) {
  const date = new Date(book.date).getFullYear();
  return (
    <Link
      href={`/books/${book.slug}`}
      className="flex justify-between items-center mr-2 gap-4"
    >
      <div>
        <h2>{book.title}</h2>
        <p className="text-sm">{book.author}</p>
      </div>
      <Image
        src={`/${book.slug}.jpeg`}
        alt={`Book image for ${book.title}`}
        width={100}
        height={100}
      />
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
