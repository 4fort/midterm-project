import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import KbdKey from "./kbd-key";

export function GlobalSearch({ items }: { items: string[] }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="hidden md:inline-flex text-muted-foreground px-5"
      >
        <Search /> Search country...{" "}
        <KbdKey className="ml-6">
          <span className="text-xs">⌘/ctrl</span>
        </KbdKey>
        <KbdKey>K</KbdKey>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search any countries" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Countries">
            {items.map((item, i) => (
              <CommandItem
                key={`${item}-${i}`}
                className="cursor-pointer pointer-events-auto"
                onSelect={() => {
                  setOpen(false);
                  navigate(`/${item}`);
                }}
              >
                {item}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
