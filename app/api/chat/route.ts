import { streamText, StreamingTextResponse, convertToCoreMessages } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const groq = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
    const { searchParams } = new URL(req.url);
    const model = searchParams.get("model");

    const { messages }: { messages: any[] } = await req.json();

    if (!model) {
        console.log(model);
        return new Response("Missing query parameter", { status: 400 });
    }

    const result = await streamText({
        model: groq(model),
        system:
            "You are a helpful assistant. " +
            "Leverage all of the mdx format for more complex responses like lists, headings, text formatting and code blocks. " +
            "For simple and short responses use usual text. " +
            "Always respond in the language of the user. For example if he asks a question in polish, respond in polish. If he asks a question in Spanish, respond in spanish, etc.",
        messages: convertToCoreMessages(messages),
    });

    const stream = result.toAIStream({
        async onFinal(completion) {
            console.log(completion);
            // await saveChat(completion)
        },
    });

    return new StreamingTextResponse(stream);
}
