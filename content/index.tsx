import { defaults, findAllPages, getMDX } from "mdx-site";

const { defaultContentDir } = defaults;

export const posts = async () => {
  const pages = (await findAllPages(defaultContentDir)).filter(page =>
    page.includes("/blog/")
  );

  const mdxs = await Promise.all(pages.map(page => getMDX(page)));

  mdxs.sort((a, b) => {
    return (
      new Date(b.attributes.firstPublishedAt || b.attributes.date).getTime() -
      new Date(a.attributes.firstPublishedAt || a.attributes.date).getTime()
    );
  });

  return mdxs;
};
