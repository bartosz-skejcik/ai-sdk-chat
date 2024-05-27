"use client";

import Link from "next/link";
import { Hash, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

export function Sidebar() {
    const [chats, setChats] = useState<any[]>([
        {
            id: "1",
            name: "Creating a chat app with Next.js",
            model: "llama3-8b-8192",
        },
    ]);

    useEffect(() => {
        const fetchedChats = JSON.parse(localStorage.getItem("chats") || "[]");
        setChats(fetchedChats);
    }, []);

    return (
        <div className="hidden border-r bg-muted/10 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold"
                    >
                        <Package2 className="h-6 w-6" />
                        <span className="">Acme GPT</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium">
                        {chats.map((chat, index) => (
                            <Link
                                key={index}
                                href={`/?chat=${chat.id}`}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <Hash className="h-4 w-4" />
                                <span>{chat.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="mt-auto p-4">
                    <Card x-chunk="dashboard-02-chunk-0">
                        <CardHeader className="p-2 pt-0 md:p-4">
                            <CardTitle>Upgrade to Pro</CardTitle>
                            <CardDescription>
                                Unlock all features and get unlimited access to
                                our support team.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                            <Button size="sm" className="w-full">
                                Upgrade
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
