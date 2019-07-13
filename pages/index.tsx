import Index from "./index.mdx";

const content = require.context("./blog", true, /\.mdx$/);

Index.getInitialProps = async () => {
  return {
    posts: content
      .keys()
      .map(key => content(key))
      .sort((a, b) => {
        return (
          new Date(b.metadata.firstPublishedAt || b.metadata.date).getTime() -
          new Date(a.metadata.firstPublishedAt || a.metadata.date).getTime()
        );
      })
  };
};

export default Index;
