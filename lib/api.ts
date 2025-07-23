// otter page
const OTTER_GRAPHQL_FIELDS = `
	sys {
		id
	}
	slug
	title
	hero {
		title
		subtitle
		image {
			url
		}
		link {
			label
			target
			url
		}
	}
	excerpt
	sectionsCollection {
		items {
			... on Wysiwyg {
            	__typename
				sys {
				  id
				}
				content {
					json
					links {
						assets {
							block {
								sys {
									id
								}
								url
								description
							}
						}
					}
				}
			}
			... on Link {
            	__typename
				sys {
				  id
				}
				label
				target
				url
			}
			... on FunFact {
            	__typename
				sys {
				  id
				}
				head
				fact
				link {
					title
					slug
				}
				image {
					url
				}
			}
		}
	}
`;

// otter card
const OTTER_CARD_GRAPHQL_FIELDS = `
  sys {
   id 
  }
  slug
  title
  hero {
	image {
	  url
	}
  }
  excerpt
`;

async function fetchOtterGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["otter"] },
    },
  ).then((response) => response.json());
}

function extractOtter(fetchResponse: any): any {
  return fetchResponse?.data?.otterCollection?.items?.[0];
}

function extractOtterEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.otterCollection?.items;
}

export async function getPreviewOttersBySlug(slug: string | null): Promise<any> {
  const entry = await fetchOtterGraphQL(
    `query {
      otterCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${OTTER_GRAPHQL_FIELDS}
        }
      }
    }`,
    true,
  );
  return extractOtter(entry);
}

export async function getAllOtters(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchOtterGraphQL(
    `query {
      otterCollection(where: { slug_exists: true }, order: title_ASC, preview: ${
        isDraftMode ? "true" : "false"
      }, limit: 5) {
        items {
          ${OTTER_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode,
  );
  return extractOtterEntries(entries);
}

export async function getAllOtterCards(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchOtterGraphQL(
    `query {
      otterCollection(where: { slug_exists: true }, order: title_ASC, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          ${OTTER_CARD_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode,
  );
  return extractOtterEntries(entries);
}

export async function getOtter(
  slug: string,
  preview: boolean,
): Promise<any> {
  const entry = await fetchOtterGraphQL(
    `query {
      otterCollection(where: { slug: "${slug}" }, limit: 1, preview: ${
        preview ? "true" : "false"
      }) {
        items {
          ${OTTER_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );

  return {
    post: extractOtter(entry),
  };
}

export async function getOtterAndMoreOtters(
  slug: string,
  preview: boolean,
): Promise<any> {
  const entry = await fetchOtterGraphQL(
    `query {
      otterCollection(where: { slug: "${slug}" }, preview: ${
        preview ? "true" : "false"
      }, limit: 1) {
        items {
          ${OTTER_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  const entries = await fetchOtterGraphQL(
    `query {
      otterCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
        preview ? "true" : "false"
      }, limit: 2) {
        items {
          ${OTTER_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  console.log('entry', entry);
  return {
    post: extractOtter(entry),
    morePosts: extractOtterEntries(entries),
  };
}

// fun facts
const FUNFACTS_GRAPHQL_FIELDS = `
  sys {
   id 
  }
  head
  fact
  link {
   title
   slug 
  }
  image {
	url
  }
`;

async function fetchFunFactGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["funFact"] },
    },
  ).then((response) => response.json());
}

function extractFunFact(fetchResponse: any): any {
  return fetchResponse?.data?.funFactCollection?.items?.[0];
}

function extractFunFactEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.funFactCollection?.items;
}

export async function getPreviewFunFactBySlug(slug: string | null): Promise<any> {
  const entry = await fetchFunFactGraphQL(
    `query {
      funFactCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${FUNFACTS_GRAPHQL_FIELDS}
        }
      }
    }`,
    true,
  );
  return extractFunFact(entry);
}

export async function getAllFunFacts(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchFunFactGraphQL(
    `query {
      funFactCollection(where: { head_exists: true }, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          ${FUNFACTS_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode,
  );
  return extractFunFactEntries(entries);
}

export async function getRelatedFunFacts(
  title: string,
  preview: boolean,
): Promise<any> {
  const entries = await fetchFunFactGraphQL(
    `query {
      funFactCollection(where: {
		  	link: {
            	title_contains: "${title}"
			}
        }, preview: ${
        preview ? "true" : "false"
      }, limit: 5) {
        items {
          ${FUNFACTS_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  return {
    facts: extractFunFactEntries(entries),
  };
}

export async function getFunFactAndMoreFunFacts(
	title: string,
  slug: string,
  preview: boolean,
): Promise<any> {
  const entry = await fetchFunFactGraphQL(
    `query {
      funFactCollection(where: {
		  	link: {
            	title_contains: "${title}"
			}
        }, preview: ${
        preview ? "true" : "false"
      }, limit: 1) {
        items {
          ${FUNFACTS_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  const entries = await fetchFunFactGraphQL(
    `query {
      funFactCollection(where: { slug_not_in: "${slug}" }, preview: ${
        preview ? "true" : "false"
      }, limit: 5) {
        items {
          ${FUNFACTS_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );

  return {
    post: extractFunFact(entry),
    morePosts: extractFunFactEntries(entries),
  };
}

// fun facts carousel
const FUNFACTS_CAROUSEL_GRAPHQL_FIELDS = `
    head
    factsCollection {
      items {
	    head
        fact
		link {
		  slug
		  title
		}
		image {
		  url
		}
      }
    }
`;

async function fetchFunFactsCarouselGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["funFactsCarousel"] },
    },
  ).then((response) => response.json());
}

function extractFunFactsCarousel(fetchResponse: any): any {
  return fetchResponse?.data?.funFactsCarouselCollection?.items?.[0];
}

export async function getFunFactsCarousel(
  preview: boolean,
): Promise<any> {
  const entry = await fetchFunFactsCarouselGraphQL(
    `query {
      funFactsCarouselCollection(preview: ${preview ? "true" : "false"
      }) {
        items {
          ${FUNFACTS_CAROUSEL_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  return {
    carousel: extractFunFactsCarousel(entry),
  };
}