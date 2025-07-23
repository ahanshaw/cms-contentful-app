import React, { FunctionComponent } from 'react';
import ContentfulImage from "@/lib/contentful-image";
import type { IOtterCard } from "@/lib/interfaces";

const OtterCard: FunctionComponent<IOtterCard> = ({ slug, title, imageUrl }) => {
	return (
		<div>
			<a href={`/otters/${slug}`} className="relative block aspect-[1/1] rounded-xl overflow-hidden">
				<ContentfulImage
					className="absolute top-[0] left-[0] w-full h-full object-cover" 
					alt=""
					priority
					width={600}
					height={600}
					src={imageUrl}
				/>
			</a>
			<h2 className="mt-6 mb-3"><a className="font-bold text-3xl hover:underline" href={`/otters/${slug}`}>{title}</a></h2>
		</div>
	)
}

export default OtterCard;