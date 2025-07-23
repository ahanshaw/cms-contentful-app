import React, { FunctionComponent } from 'react';
import ContentfulImage from "@/lib/contentful-image";
import type { IFunFact } from "@/lib/interfaces";

const FunFact: FunctionComponent<IFunFact> = ({ head, fact, imageUrl }) => {
	return (
		<div>
			<ContentfulImage
				alt=""
				priority
				width={2000}
				height={1000}
				src={imageUrl}
			/>
			<h2>{head}</h2>
			<p>{fact}</p>
		</div>
	)
}

export default FunFact;
