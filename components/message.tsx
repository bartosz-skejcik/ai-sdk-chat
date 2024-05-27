"use client";

import { BotIcon, Trash2, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Message as MessageType } from "ai/react";

type Props = {
    role: "function" | "system" | "user" | "assistant" | "data" | "tool";
    content: string;
    dateTime: Date | undefined;
    setMessages: (messages: MessageType[]) => void;
    messages: MessageType[];
};

function Message({ role, content, dateTime, setMessages, messages }: Props) {
    const [mdxSource, setMdxSource] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (
            content &&
            (content.includes("`") || content.includes("*")) &&
            mdxSource == undefined
        ) {
            fetch("http://localhost:3000/api/mdx", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setMdxSource(data);
                });
        }
    }, [content, mdxSource]);

    async function handleDeleteMessage() {
        const newMessages = messages.filter(
            (message) => message.createdAt !== dateTime
        );
        localStorage.setItem("messages", JSON.stringify(newMessages));
        setMessages(newMessages);
    }

    return (
        <div
            className={`w-full p-2 flex items-start justify-start gap-2 ${
                role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
        >
            {role == "user" ? (
                <div className="bg-muted rounded-lg p-1 flex items-center justify-center">
                    <UserRound className="w-8 h-8 text-foreground" />
                </div>
            ) : (
                <div className="bg-muted p-1 rounded-lg flex items-center justify-center">
                    <BotIcon className="w-8 h-8 text-foreground" />
                </div>
            )}
            <div className="flex flex-col gap-1">
                <div
                    className={`flex items-end justify-start group gap-2 ${
                        role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                >
                    <div
                        className={`px-3 py-1 rounded-md ${
                            role === "user"
                                ? "bg-primary"
                                : "border border-border"
                        }`}
                        dangerouslySetInnerHTML={{
                            __html: mdxSource ?? `<span>${content}</span>`,
                        }}
                    ></div>
                    <button
                        onClick={() => {
                            handleDeleteMessage();
                        }}
                        className="p-0.5 rounded-md group-hover:bg-muted text-muted group-hover:text-primary"
                    >
                        <Trash2 className="w-5 h-5 text-foreground" />
                    </button>
                </div>
                {dateTime && (
                    <div
                        className={`text-xs text-muted-foreground ${
                            role === "user" ? "text-right" : "text-left"
                        }`}
                    >
                        {new Date(dateTime).toLocaleString("pl-PL", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                            timeZone: "Europe/Warsaw",
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Message;
