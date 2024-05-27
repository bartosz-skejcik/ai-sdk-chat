"use client";

import ShinyButton from "@/components/magicui/shiny-button";
import Message from "@/components/message";
import { Input } from "@/components/ui/input";
import { preferencesStore } from "@/stores/preferences";
import { useStore } from "@tanstack/react-store";
import { Message as MessageType, useChat } from "ai/react";
import { useEffect } from "react";

function saveMessages(messages: MessageType[]) {
    // save the messages to localStorage
    localStorage.setItem("messages", JSON.stringify(messages));
}

export default function Home() {
    const model = useStore(preferencesStore, (state) => state.model);
    const { messages, setMessages, input, handleInputChange, handleSubmit } =
        useChat({
            api: `api/chat?model=${model}`,
            onFinish: (message) => {
                // check if this is a first message
            },
        });

    useEffect(() => {
        // load messages from localStorage
        const messages = JSON.parse(localStorage.getItem("messages") || "[]");
        if (messages && messages.length > 0) {
            setMessages(messages);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // save messages to localStorage
        if (messages && messages.length > 0) {
            saveMessages(messages);
        }
    }, [messages]);

    return (
        <main className="flex-1 sm:px-1 lg:px-6 py-5 overflow-y-auto">
            <section className="flex-1 gap-4 mb-24 container">
                {messages &&
                    messages.length > 0 &&
                    messages.map((message) => (
                        <Message
                            key={message.id}
                            content={message.content}
                            role={message.role}
                            dateTime={message.createdAt}
                            setMessages={setMessages}
                            messages={messages}
                        />
                    ))}
            </section>
            <form
                onSubmit={handleSubmit}
                className="max-w-2xl w-full absolute left-0 right-0 bottom-5 mx-auto flex flex-col gap-3 bg-background/50 border border-border/50 rounded-lg px-4 py-2 backdrop-blur-sm backdrop-filter"
            >
                <div className="relative flex gap-2">
                    <Input
                        placeholder="Type your message here..."
                        value={input}
                        onChange={handleInputChange}
                        className={`w-full`}
                    />
                    <ShinyButton type="submit" text="Send" />
                </div>
                <p className="text-xs text-center text-muted-foreground font-medium">
                    ChatGPT can make mistakes. Consider checking important
                    information.
                </p>
            </form>
        </main>
        // <Sidebar />
    );
}
