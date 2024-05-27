import { NextResponse } from "next/server";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

export async function POST(req: Request) {
    const { content } = await req.json();

    const message = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypePrettyCode, {
            // See Options section below.
        })
        .use(rehypeStringify)
        .process(content);

    return new NextResponse(JSON.stringify(message.value), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
