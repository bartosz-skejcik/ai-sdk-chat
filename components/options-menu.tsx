import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";
import ShinyButton from "./magicui/shiny-button";

type Props = {
    options: {
        label: string;
        onClick: () => void;
    }[];
};

function OptionsMenu({ options }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <ShinyButton
                    icon={<EllipsisIcon className="w-4 h-4" />}
                    type="button"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {options.map((option, index) => (
                    <DropdownMenuItem key={index} onClick={option.onClick}>
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default OptionsMenu;
