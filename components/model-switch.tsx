"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useStore } from "@tanstack/react-store";
import { preferencesStore } from "@/stores/preferences";
import { ChevronDown } from "lucide-react";

type Props = {};

function ModelSwitch({}: Props) {
    const model = useStore(preferencesStore, (state) => state.model);

    const changeModel = (model: string) => {
        preferencesStore.setState((state) => {
            return {
                ...state,
                model,
            };
        });
    };

    const availableModels = [
        "llama3-8b-8192",
        "llama3-70b-8192",
        "mixtral-8x7b-32768",
        "gemma-7b-it",
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size={"sm"}
                    className="text-sm font-normal"
                >
                    Model: {model}
                    <ChevronDown className="inline ml-1" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Available models</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={model}
                    onValueChange={changeModel}
                >
                    {availableModels.map((model) => (
                        <DropdownMenuRadioItem key={model} value={model}>
                            {model}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ModelSwitch;
