"use client";

import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Import danych
import comboboxMenu from "@/lib/comboboxMenu.json";

// Mapowanie kategorii
const categories = Object.keys(comboboxMenu).map((key) => ({
  value: key.toLowerCase(),
  label: key,
}));

export default function ComboboxCategory({ selectedValue, onChange }) {
  const [open, setOpen] = React.useState(false);

  // Wyszukiwanie etykiety do wyświetlenia na przycisku
  const displayLabel = selectedValue
    ? categories.find((category) => category.label === selectedValue)?.label ?? selectedValue
    : "Wybierz kategorię...";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "min-w-[18rem] h-16 justify-between gap-3 rounded-2xl border-4 border-pink-400 bg-pink-100 px-4 py-3 text-left text-base font-extrabold text-pink-700 shadow-[6px_6px_0px_0px_#d62d81] transition-all hover:border-pink-500 hover:bg-pink-50 hover:text-pink-800 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[4px_4px_0px_0px_#d62d81] data-[state=open]:translate-x-0.5 data-[state=open]:translate-y-0.5 data-[state=open]:shadow-[4px_4px_0px_0px_#d62d81]",
          )}
        >
          <span className="min-w-0 flex-1 truncate">{displayLabel}</span>
          <ChevronsUpDown className="size-5 shrink-0 text-pink-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[min(26rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border-4 border-pink-400 bg-pink-50 p-0 shadow-[8px_8px_0px_0px_#d62d81]"
      >
        <Command
          className={cn(
            "bg-transparent text-pink-950 **:data-[slot=command-input-wrapper]:h-14 **:data-[slot=command-input-wrapper]:gap-3 **:data-[slot=command-input-wrapper]:border-b-4 **:data-[slot=command-input-wrapper]:border-pink-300 **:data-[slot=command-input-wrapper]:bg-pink-100/70 **:data-[slot=command-input-wrapper]:px-4 **:data-[slot=command-input-wrapper]_svg]:size-5 **:data-[slot=command-input-wrapper]_svg]:text-pink-600 **:data-[slot=command-input]:h-14 **:data-[slot=command-input]:text-base **:data-[slot=command-input]:font-medium **:data-[slot=command-input]:placeholder:text-pink-400",
          )}
        >
          <CommandInput placeholder="Szukaj kategorii..." />
          <CommandList className="p-1">
            <CommandEmpty className="py-8 text-center text-sm font-medium text-pink-500">
              Nie znaleziono kategorii.
            </CommandEmpty>
            <CommandGroup className="p-2 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-extrabold **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-[0.18em] **:[[cmdk-group-heading]]:text-pink-500">
              {categories.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={(currentValue) => {
                    const originalKey = categories.find(
                      (c) => c.value === currentValue,
                    )?.label;
                    // Logika single-select działająca w oparciu o props z elementu nadrzędnego
                    onChange(originalKey === selectedValue ? "" : originalKey);
                    setOpen(false);
                  }}
                  className={cn(
                    "mb-1 flex items-center justify-between rounded-xl border-2 border-pink-200 bg-white px-3 py-2.5 text-pink-800 shadow-[3px_3px_0px_0px_#f472b6] transition-all outline-none hover:border-pink-400 hover:bg-pink-100 hover:text-pink-900 data-highlighted:border-pink-500 data-highlighted:bg-pink-200 data-highlighted:text-pink-950 data-highlighted:shadow-[2px_2px_0px_0px_#d62d81] data-[selected=true]:border-pink-600 data-[selected=true]:bg-pink-200 data-[selected=true]:text-pink-950 data-[selected=true]:shadow-[2px_2px_0px_0px_#d62d81]",
                  )}
                >
                  <span className="font-semibold">{category.label}</span>
                  <CheckIcon
                    className={cn(
                      "size-5 text-pink-600 transition-opacity",
                      selectedValue === category.label
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
