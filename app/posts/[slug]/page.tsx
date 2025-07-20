import Link from "next/link";
import { draftMode } from "next/headers";

import MoreStories from "../../components/more-stories";
import Avatar from "../../components/avatar";
import Date from "../../components/date";
import CoverImage from "../../components/cover-image";
import Hero from "../../components/hero";
import Cta from "../../components/cta";

import { Markdown } from "@/lib/markdown";
import { getAllPosts, getPostAndMorePosts } from "@/lib/api";

export async function generateStaticParams() {
  const allPosts = await getAllPosts(false);

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const { isEnabled } = await draftMode();

  const { post, morePosts } = await getPostAndMorePosts(params.slug, isEnabled);

  return (
    <div className="container mx-auto px-5">
      <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
      </h2>
      <article>
		<Hero title={post.hero.title} subtitle={post.hero.subtitle} linkLabel={post.hero.link.label} linkTarget={post.hero.link.target} linkUrl={post.hero.link.url} imageUrl={post.hero.image.url} />

        <div className="mx-auto max-w-2xl mt-[60px]">
			 <div className="hidden md:mb-12 md:block">
				{post.author && (
					<Avatar name={post.author.name} picture={post.author.picture} />
				)}
			</div>
          <div className="mb-6 block md:hidden">
            {post.author && (
              <Avatar name={post.author.name} picture={post.author.picture} />
            )}
          </div>
          <div className="mb-6 text-lg">
            <Date dateString={post.date} />
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="prose">
            <Markdown content={post.content} />
			<Cta url={post.link.url} target={post.link.target} label={post.link.label} theme="dark" />
          </div>
        </div>
      </article>
      <hr className="border-accent-2 mt-28 mb-24" />
      <MoreStories morePosts={morePosts} />
    </div>
  );
}
