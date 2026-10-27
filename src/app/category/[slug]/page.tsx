import Link from "next/link";
import { notFound } from "next/navigation";
import Card from "@/components/Card";
import PauseToggle from "@/components/PauseToggle";
import TopicTabs from "@/components/TopicTabs";
import { categories, terms } from "@/lib/data";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = categories.find((c) => c.id === slug);
  return { title: cat ? `${cat.name_ko} · 효과사전` : "효과사전" };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = categories.find((c) => c.id === slug);
  if (!cat) notFound();
  const list = terms.filter((t) => t.category === cat.id).sort((a, b) => a.no - b.no);

  return (
    <div className="mx-auto max-w-[1080px]">
      <header className="mb-7 flex flex-wrap items-end gap-3">
        <div>
          <Link href="/" className="text-[13px] font-bold tracking-[.02em] text-accent">
            ← 효과사전
          </Link>
          <h1 className="mt-1.5 text-[26px] font-extrabold tracking-[-.02em]">{cat.name_ko}</h1>
          <p className="mt-1.5 text-sm text-sub">{list.length}개 효과 · 움직이는 모습을 보고 이름을 찾아보세요</p>
        </div>
        <div className="ml-auto">
          <PauseToggle />
        </div>
      </header>

      <TopicTabs current={cat.id} />

      {list.length === 0 ? (
        <p className="rounded-[22px] bg-white p-10 text-center text-sub">아직 준비 중이에요</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[18px]">
          {list.map((term, i) => (
            <Card key={term.slug} term={term} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
