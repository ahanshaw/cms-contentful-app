import Link from "next/link";
import { draftMode } from "next/headers";

import FactsCarousel from "./components/facts-carousel";
import CardOtter from "./components/card-otter";
import Date from "./components/date";
import CoverImage from "./components/cover-image";
import Avatar from "./components/avatar";
import MoreStories from "./components/more-stories";

import { getFunFactsCarousel, getAllOtterCards } from "@/lib/api";
import { CMS_NAME, CMS_URL } from "@/lib/constants";

function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Blog.
      </h1>
      <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
        A statically generated blog example using{" "}
        <a
          href="https://nextjs.org/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          Next.js
        </a>{" "}
        and{" "}
        <a
          href={CMS_URL}
          className="underline hover:text-success duration-200 transition-colors"
        >
          {CMS_NAME}
        </a>
        .
      </h2>
    </section>
  );
}

function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: {
  title: string;
  coverImage: any;
  date: string;
  excerpt: string;
  author: any;
  slug: string;
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      </div>
    </section>
  );
}

export default async function Page() {
  const { isEnabled } = await draftMode();
  const funFactsCarousel = await getFunFactsCarousel(isEnabled);
  const funFactsHead = funFactsCarousel.carousel.head;
  const funFactsSlides = funFactsCarousel.carousel.factsCollection.items;
  const otters = await getAllOtterCards(isEnabled);

  return (
    <div className="container mx-auto pt-5 o-12">
		<h1 className="font-bold text-8xl m-0">Otters!</h1>
		<section>
			<h2 className="font-bold text-5xl translate-y-[2rem]">{funFactsHead}</h2>
			<FactsCarousel funFacts={funFactsSlides} />
		</section>
		<section>
			<h2 className="font-bold text-5xl mb-5">All Otters</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
				{otters.map((otter) => {
					return(
						<CardOtter key={otter.sys.id} slug={otter.slug} title={otter.title} excerpt={otter.excerpt} imageUrl={otter.hero.image.url} />
					)
				})}
			</div>
		</section>
    </div>
  );
}
