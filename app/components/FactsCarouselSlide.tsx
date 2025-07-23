import React, { FunctionComponent } from 'react';
import ContentfulImage from "@/lib/contentful-image";
import type { IFunFact } from "@/lib/interfaces";

const FactsCarouselSlide: FunctionComponent<IFunFact> = ({head, fact, linkSlug, imageUrl}) => {
	return (
		<>
			<a href={`/otters/${linkSlug}`} className="relative block aspect-[1/1] rounded-xl overflow-hidden">
				<ContentfulImage
					className="absolute top-[0] left-[0] w-full h-full object-cover" 
					alt=""
					priority
					width={600}
					height={600}
					src={imageUrl}
				/>
			</a>
			<h2 className="mt-[1rem] mb-[.5rem]"><a className="font-bold text-xl" href={`/otters/${linkSlug}`}>{head}</a></h2>
			<p>{fact}</p>
		</>
	)
}

export default FactsCarouselSlide;