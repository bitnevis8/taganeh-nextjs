"use client";
import Marquee from "react-fast-marquee";
import Link from "next/link";

export default function NewsTicker({ articles }) {
  if (!articles?.length) return null;
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t z-50 shadow">
      <Marquee
        direction="right"
        speed={100}
        gradient={false}
        pauseOnHover
        className="py-2"
      >
        {articles.map((a) => (
          <Link
            key={a.id}
            href={`/news/${a.id}`}
            className="mx-6 text-blue-700 font-bold hover:underline whitespace-nowrap"
          >
            {a.agency?.name ? `${a.agency.name}: ` : ''}{a.title}
          </Link>
        ))}
      </Marquee>
    </div>
  );
} 