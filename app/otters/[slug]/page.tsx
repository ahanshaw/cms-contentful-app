import Link from "next/link";
import { draftMode } from "next/headers";

import Hero from "../../components/hero";
import Cta from "../../components/cta";
import FunFact from "../../components/fun-fact";

import { Markdown } from "@/lib/markdown";
import { getOtterAndMoreOtters, getRelatedFunFacts } from "@/lib/api";

export default async function OtterPage(props: {params: Promise<{ slug: string }>;}) {
  const params = await props.params;
  const { isEnabled } = await draftMode();
  const { post } = await getOtterAndMoreOtters(params.slug, isEnabled);
  const { facts } = await getRelatedFunFacts(post.title, isEnabled);

  console.log('post', post);
  return (
	<div className="container mx-auto px-5">
	  <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
		<Link href="/" className="hover:underline">
		  Otters!
		</Link>
	  </h2>
	  <article>
		<Hero title={post.hero.title} subtitle={post.hero.subtitle} linkLabel={post.hero.link.label} linkTarget={post.hero.link.target} linkUrl={post.hero.link.url} imageUrl={post.hero.image.url} />

		<div className="mx-auto max-w-2xl">
		  <div className="prose">
			<Markdown content={post.content} />
			<Cta url={post.link.url} target={post.link.target} label={post.link.label} theme="dark" />
		  </div>
		</div>
	  </article>

	  <hr className="border-accent-2 mt-28 mb-24" />
	  <h2>Fun Facts</h2>
	  {facts && facts.map((fact: any) => {
		return (
			<FunFact key={fact.sys.id} head={fact.head} fact={fact.fact} imageUrl={fact.image.url} />
		)
	  })}
	</div>
  );
}
