import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import {
    transformerNotationDiff,
    transformerNotationHighlight,
    transformerMetaHighlight,
} from "@shikijs/transformers";

const el = (tagName, properties, children = []) => ({
    type: "element",
    tagName,
    properties,
    children,
});

// Wraps each code block in a header bar with its language and a copy button.
// The button is wired up by the script in src/layouts/BlogPost.astro.
const transformerCodeChrome = {
    name: "code-chrome",
    root(root) {
        const lang = this.options.lang;
        const label = !lang || lang === "plaintext" ? "text" : lang;
        root.children = [
            el("div", { className: ["code-block", "kv-notch"] }, [
                el("div", { className: ["code-header"] }, [
                    el("span", { className: ["code-lang"] }, [
                        { type: "text", value: label },
                    ]),
                    el(
                        "button",
                        {
                            type: "button",
                            className: ["code-copy"],
                            ariaLabel: "Copy code to clipboard",
                        },
                        [{ type: "text", value: "copy" }],
                    ),
                ]),
                ...root.children,
            ]),
        ];
    },
};

// https://astro.build/config
export default defineConfig({
    site: "https://codewithkv.com",
    integrations: [mdx(), sitemap()],
    markdown: {
        shikiConfig: {
            // Dual themes: colors switch with the site's light/dark theme in global.css.
            themes: {
                light: "github-light",
                dark: "github-dark-dimmed",
            },
            defaultColor: false,
            // Line highlighting: ```js {2,4-5}  or  // [!code highlight] / [!code ++] / [!code --]
            transformers: [
                transformerMetaHighlight(),
                transformerNotationHighlight(),
                transformerNotationDiff(),
                transformerCodeChrome,
            ],
        },
        rehypePlugins: [
            // Heading ids must exist before anchors can link to them.
            rehypeHeadingIds,
            [
                rehypeAutolinkHeadings,
                {
                    behavior: "append",
                    properties: {
                        className: ["heading-anchor"],
                        ariaLabel: "Link to this section",
                    },
                    content: { type: "text", value: "#" },
                },
            ],
        ],
    },
});
