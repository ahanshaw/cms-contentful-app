import React, { FunctionComponent } from "react";
import type { IHero } from "@/lib/interfaces";

import ContentfulImage from "@/lib/contentful-image";
import Cta from "./cta";

const Hero: FunctionComponent<IHero> = ({
	title,
	subtitle,
	linkLabel,
	linkTarget,
	linkUrl,
	imageUrl,
}) => (
	<div className="relative aspect-[2/1] bg-black rounded-xl overflow-hidden">
		<ContentfulImage
			className="absolute top-[0] left-[0] w-full h-full object-cover opacity-50" 
			alt=""
			priority
			width={2000}
			height={1000}
			src={imageUrl}
		/>
		<div className="relative w-full h-full flex flex-col justify-end items-end text-white p-[60px] z-1">
			<h1 className="text-7xl font-bold">{title}</h1>
			<p className="text-3xl font-bold mt-[8px] mb-[40px]">{subtitle}</p>
			<Cta url={linkUrl} target={linkTarget} label={linkLabel} theme="light" />
		</div>
	</div>	
);

export default Hero;
