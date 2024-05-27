import { type CoreMessage, streamText, StreamingTextResponse } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const groq = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
    const { searchParams } = new URL(req.url);
    const model = searchParams.get("model");
    const { messages }: { messages: CoreMessage[] } = await req.json();

    if (!model) {
        console.log(model);
        return new Response("Missing query parameter", { status: 400 });
    }

    const result = await streamText({
        model: groq(model),
        system: "You are a helpful assistant.",
        messages,
    });

    const stream = result.toAIStream({
        async onFinal(completion) {
            // console.log(completion);
            // await saveChat(completion)
        },
    });

    return new StreamingTextResponse(stream);
}
