// types/mdx.d.ts
declare module "*.mdx" {
  import { NextPage } from "next";

  const MDXComponent: NextPage;

  export default MDXComponent;
}
