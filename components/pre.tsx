/** @jsx jsx */
// @ts-ignore
import { jsx } from "benefit/react";

import CodeBlock from "./CodeBlock";

export default function pre(props: any) {
  return (
    <div className="my-4 -ml-8" {...props}>
      <CodeBlock {...props.children.props} />
    </div>
  );
}
