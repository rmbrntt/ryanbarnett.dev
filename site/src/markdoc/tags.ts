import { Callout } from "../components/markdoc/Callout";
import { CodeBlock } from "../components/markdoc/CodeBlock";
import { MathComponent } from "../components/markdoc/Math";
import { Mermaid } from "../components/markdoc/Mermaid";
import { Gallery } from "../components/markdoc/Gallery";
import { Chart } from "../components/markdoc/Chart";

export const tags = {
  callout: {
    render: Callout,
    attributes: {
      type: {
        type: String,
        default: "note",
        matches: ["note", "warning", "info", "success", "error"],
      },
      title: { type: String },
    },
  },
  code: {
    render: CodeBlock,
    attributes: {
      language: { type: String },
      filename: { type: String },
      showLineNumbers: { type: Boolean, default: true },
      highlightLines: { type: Array, default: [] },
    },
  },
  math: {
    render: MathComponent,
    attributes: {
      block: { type: Boolean, default: false },
    },
    transform(node, config) {
      const attributes = node.transformAttributes(config);
      const children = node.transformChildren(config);
      return {
        ...node,
        attributes: {
          ...attributes,
          math: children.join(""),
        },
      };
    },
  },
  mermaid: {
    render: Mermaid,
    attributes: {
      title: { type: String },
    },
    transform(node, config) {
      const attributes = node.transformAttributes(config);
      const children = node.transformChildren(config);
      return {
        ...node,
        attributes: {
          ...attributes,
          chart: children.join(""),
        },
      };
    },
  },
  gallery: {
    render: Gallery,
    attributes: {
      images: { type: Array },
      columns: { type: Number, default: 3 },
      gap: { type: Number, default: 4 },
      aspectRatio: { type: String, default: "4/3" },
    },
  },
  chart: {
    render: Chart,
    attributes: {
      type: { type: String, matches: ["line", "bar"], default: "line" },
      labels: { type: Array },
      datasets: { type: Array },
      title: { type: String },
      aspectRatio: { type: Number, default: 2 },
      animate: { type: Boolean, default: true },
      grid: { type: Boolean, default: true },
    },
  },
};
