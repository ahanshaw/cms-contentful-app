export interface ICta {
	label: string;
	target: string;
	url: string;
	theme: string;
}

export interface IOtterCard {
	id?: string;
	slug: string;
	title: string;
	excerpt?: string;
	imageUrl: string;
}

export interface IHero {
	title: string;
	subtitle: string;
	linkLabel: string;
	linkTarget: string;
	linkUrl: string;
	imageUrl: string;
}

export interface IFunFact {
	id?: string;
	slug?: string;
	head: string;
	fact: string;
	linkSlug?: string;
	linkTitle?: string;
	imageUrl: string;
}