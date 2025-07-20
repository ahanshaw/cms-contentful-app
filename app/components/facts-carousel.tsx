"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import FactsCarouselSlide from "./facts-carousel-slide";

export default function FactsCarousel({ funFacts }: { funFacts: any[] }) {

	return (
		<div className="carousel">
			<Swiper
				modules={[Navigation, A11y]}
				slidesPerView={1}
				breakpoints={{
					768: {
						slidesPerView: 2,
						spaceBetween: 48,
					},
					1024: {
						slidesPerView: 3,
						spaceBetween: 48,
					},
				}}
				navigation
			>
				{funFacts.map((fact: any) => (
					<SwiperSlide>
						<FactsCarouselSlide head={fact.head} fact={fact.fact} linkSlug={fact.link.slug} linkTitle={fact.link.title} imageUrl={fact.image.url} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}