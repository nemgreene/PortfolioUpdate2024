import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import FormattedText from "../Utilities/FormattedText";

const markdown = `[Link](http://a.com)

test`;

export default function RTE() {
  return (
    <div>
      <FormattedText>{markdown}</FormattedText>
    </div>
  );
}

// https://commonmark.org/help/
