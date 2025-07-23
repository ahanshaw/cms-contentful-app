import { draftMode } from "next/headers";

import FactsCarousel from "./components/FactsCarousel";
import CardOtter from "./components/OtterCard";

import { getFunFactsCarousel, getAllOtterCards } from "@/lib/api";

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
