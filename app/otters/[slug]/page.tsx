import Link from "next/link";
import { draftMode } from "next/headers";
import { Markdown } from "@/lib/markdown";

import { getOtter, getRelatedFunFacts } from "@/lib/api";

import Hero from "../../components/Hero";
import FunFact from "../../components/FunFact";
import Cta from "../../components/Cta";


/*
		<div className="mx-auto max-w-2xl">
		  <div className="prose">
			<Markdown content={post.content} />
			<Cta url={post.link.url} target={post.link.target} label={post.link.label} theme="dark" />
		  </div>
		</div>
*/

/*
	  <hr className="border-accent-2 mt-28 mb-24" />
	  <h2>Fun Facts</h2>
	  {facts && facts.map((fact: any) => {
		return (
			<FunFact key={fact.sys.id} head={fact.head} fact={fact.fact} imageUrl={fact.image.url} />
		)
	  })}
*/

export default async function OtterPage(props: {params: Promise<{ slug: string }>;}) {
  const params = await props.params;
  const { isEnabled } = await draftMode();
  const { post } = await getOtter(params.slug, isEnabled);

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

		{post.sectionsCollection.items.map((item: any) => {
			if (item.__typename === 'Wysiwyg') {
				return (
					<section key={item.sys.id}>
						<Markdown content={item.content} />
					</section>
				)
			}
			if (item.__typename === 'FunFact') {
				return (
					<section key={item.sys.id}>
						<FunFact key={item.sys.id} head={item.head} fact={item.fact} imageUrl={item.image.url} />
					</section>
				)
			}
			if (item.__typename === 'Link') {
				return (
					<section key={item.sys.id}>
						<Cta url={item.url} target={item.target} label={item.label} theme="dark" />
					</section>
				)
			}
		})}
	  </article>
	</div>
  );
}
