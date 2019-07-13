const mdx = require("@mdx-js/mdx");
const matter = require("gray-matter");
const path = require("path");

const pagesDir = path.resolve(__dirname, "pages");

module.exports = async function mdxLoader(content, options) {
  const callback = this.async();

  const file = matter(content, {
    excerpt: true
  });

  const href =
    this.resourcePath
      // Remove /pages
      .replace(pagesDir, "")
      // Remove /index.mdx from posts in directories
      .replace("/index.mdx", "")
      // Remove .mdx from stand-alone files
      .replace(/\.mdx$/, "") ||
    // Default to "/" for /pages/index.mdx
    "/";

  const metadata = {
    href,
    ...file.data
  };

  const code = `/* @jsx mdx */
// ${this.resourcePath}
import { mdx } from "@mdx-js/react";
import React from "react";

// import-able properties
export const metadata = ${JSON.stringify(metadata)};
export const excerpt = ${JSON.stringify(file.excerpt)};
export const href = ${JSON.stringify(href)}

// Export JS, not markdown
${await mdx(file.content, options)}

// Need this for accessing data within _app.js
MDXContent.metadata = ${JSON.stringify(metadata)};
  `;

  callback(null, code);
};
