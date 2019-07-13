// @ts-ignore
import { MDXProvider } from "@mdx-js/react";
import App, { Container } from "next/app";
import Head from "next/head";
import React, { FunctionComponent } from "react";

import * as components from "../components";

// MDXProvider uses hooks, so it has to be a FunctionComponent
const MDX: FunctionComponent = ({ children }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    // @ts-ignore because it's not on NextComponentType
    const { metadata = {} } = Component;
    const { title } = metadata;

    return (
      <Container>
        <Head>
          <title>{title || "Eric Clemmons"}</title>
        </Head>

        <components.Layout>
          {title ? <components.h1>{title}</components.h1> : null}

          <MDX>
            <Component {...pageProps} />
          </MDX>
        </components.Layout>
      </Container>
    );
  }
}
