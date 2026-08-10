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

// Bezpośrednio wklejone dane, aby uniknąć problemów z importami
const comboboxData = {
  "🍽️ Jedzenie": [
    "🍔 Burger",
    "🍣 Sushi",
    "🍕 Pizza",
    "🍝 Kuchnia włoska",
    "🥡 Kuchnia azjatycka",
    "🥩 Steakhouse",
    "🌮 Tacos / kuchnia meksykańska",
    "🍜 Ramen",
    "🥙 Kebab",
    "🥟 Pierogi",
    "🥐 Śniadanie na mieście",
    "🥞 Brunch",
    "☕ Kawiarnia",
    "🍦 Lodziarnia",
    "🍰 Desery (gofry, naleśniki, ciasta)"
  ],
  "☕ Kawa i słodkości": [
    "☕ Kawiarnia",
    "🍵 Herbaciarnia",
    "🧋 Bubble tea",
    "🧁 Cukiernia",
    "🍨 Lody",
    "🍩 Pączki"
  ],
  "🎉 Rozrywka": [
    "🎬 Kino",
    "🎳 Kręgle",
    "🎱 Bilard",
    "🧩 Escape room",
    "🎤 Karaoke",
    "🕹️ Arcade",
    "🥽 VR",
    "❓ Quiz pubowy",
    "🎭 Stand-up"
  ],
  "🌿 Na świeżym powietrzu": [
    "🚶 Spacer",
    "🧺 Piknik",
    "🌅 Zachód słońca",
    "🏖️ Plaża",
    "🏞️ Jezioro",
    "🌳 Park",
    "🐦 Rezerwat przyrody",
    "🔭 Punkt widokowy",
    "🌺 Ogród botaniczny"
  ],
  "🏃 Aktywność": [
    "🚴 Rower",
    "🛼 Rolki",
    "🏊 Basen",
    "🏋️ Siłownia",
    "🧗 Ścianka wspinaczkowa",
    "🏓 Padel",
    "🎾 Tenis",
    "👟 Squash",
    "🏸 Badminton",
    "⛳ Minigolf"
  ],
  "🏛️ Kultura": [
    "🏛️ Muzeum",
    "🖼️ Galeria sztuki",
    "🎭 Teatr",
    "🖌️ Wystawa",
    "🔭 Planetarium"
  ],
  "🏠 W domu": [
    "👩‍🍳 Gotowanie razem",
    "🧑‍🍳 Pieczenie",
    "🍿 Wieczór filmowy",
    "🎲 Planszówki",
    "🎮 Gry na konsoli",
    "🧩 Puzzle",
    "🍱 Degustacja przekąsek",
    "🧖 Spa w domu"
  ]
};

const mainCategories = Object.keys(comboboxData).map((key) => ({
  value: key.toLowerCase(),
  label: key,
}));

// Reużywalny, neobrutalistyczny komponent comboboxa
function NeobrutalistCombobox({
  options,
  selectedValues = [],
  onChange,
  placeholder,
  emptyText = "Nie znaleziono.",
}) {
  const [open, setOpen] = React.useState(false);

  const displayLabel =
    selectedValues.length > 0 ? selectedValues.join(", ") : placeholder;

  const handleToggle = (label) => {
    const updated = selectedValues.includes(label)
      ? selectedValues.filter((item) => item !== label)
      : [...selectedValues, label];

    if (onChange) {
      onChange(updated);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "h-auto min-h-16 w-full min-w-[18rem] justify-between gap-3 rounded-2xl border-4 border-pink-400 bg-pink-100 px-4 py-3 text-left text-base font-extrabold text-pink-700 shadow-[6px_6px_0px_0px_#d62d81] transition-all hover:border-pink-500 hover:bg-pink-50 hover:text-pink-800 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[4px_4px_0px_0px_#d62d81] data-[state=open]:translate-x-0.5 data-[state=open]:translate-y-0.5 data-[state=open]:shadow-[4px_4px_0px_0px_#d62d81]"
          )}
        >
          <span className="min-w-0 flex-1 whitespace-normal wrap-break-word">
            {displayLabel}
          </span>
          <ChevronsUpDown className="mt-0.5 size-5 shrink-0 text-pink-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="z-100 w-[min(26rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border-4 border-pink-400 bg-pink-50 p-0 shadow-[8px_8px_0px_0px_#d62d81]"
      >
        <Command
          className={cn(
            "bg-transparent text-pink-950 **:data-[slot=command-input-wrapper]:h-14 **:data-[slot=command-input-wrapper]:gap-3 **:data-[slot=command-input-wrapper]:border-b-4 **:data-[slot=command-input-wrapper]:border-pink-300 **:data-[slot=command-input-wrapper]:bg-pink-100/70 **:data-[slot=command-input-wrapper]:px-4 **:data-[slot=command-input-wrapper]_svg]:size-5 **:data-[slot=command-input-wrapper]_svg]:text-pink-600 **:data-[slot=command-input]:h-14 **:data-[slot=command-input]:text-base **:data-[slot=command-input]:font-medium **:data-[slot=command-input]:placeholder:text-pink-400"
          )}
        >
          <CommandInput placeholder="Szukaj..." />
          <CommandList className="max-h-64 overflow-x-hidden overflow-y-auto p-1">
            <CommandEmpty className="py-8 text-center text-sm font-medium text-pink-500">
              {emptyText}
            </CommandEmpty>
            <CommandGroup className="p-2 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-extrabold **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-[0.18em] **:[[cmdk-group-heading]]:text-pink-500">
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.label);

                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      const originalKey = options.find(
                        (c) => c.value === currentValue
                      )?.label;
                      if (originalKey) {
                        handleToggle(originalKey);
                      }
                    }}
                    className={cn(
                      "mb-1 flex cursor-pointer items-center gap-3 rounded-xl border-2 border-pink-200 bg-white px-3 py-2.5 text-pink-800 shadow-[3px_3px_0px_0px_#f472b6] outline-none transition-all hover:border-pink-400 hover:bg-pink-100 hover:text-pink-900 data-[selected=true]:border-pink-500 data-[selected=true]:bg-pink-200 data-[selected=true]:shadow-[2px_2px_0px_0px_#d62d81] data-[selected=true]:text-pink-950"
                    )}
                  >
                    <div
                      className={cn(
                        "pointer-events-none flex size-5 shrink-0 items-center justify-center rounded-md border-2 border-pink-400 bg-white transition-all",
                        isSelected && "border-pink-600 bg-pink-500 text-white"
                      )}
                    >
                      <CheckIcon
                        className={cn(
                          "size-3.5 stroke-3",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </div>
                    <span className="pointer-events-none font-semibold">
                      {option.label}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default function ComboboxCategory({ selectedValue, onChange }) {
  // Jeśli App.jsx przekazuje pustą tablicę na start, konwertujemy to wewnętrznie na obiekt
  const selectionState = React.useMemo(() => {
    if (Array.isArray(selectedValue)) {
      return selectedValue.reduce((acc, cat) => {
        acc[cat] = [];
        return acc;
      }, {});
    }
    return selectedValue || {};
  }, [selectedValue]);

  // Główne kategorie, które zostały już wybrane przez użytkownika
  const mainSelected = Object.keys(selectionState);

  const handleMainChange = (newMainCategories) => {
    const newState = {};
    // Zachowujemy już wybrane podkategorie przy przełączaniu
    newMainCategories.forEach((cat) => {
      newState[cat] = selectionState[cat] || [];
    });

    if (onChange) {
      onChange(newState);
    }
  };

  const handleSubChange = (mainCategory, newSubCategories) => {
    if (onChange) {
      onChange({
        ...selectionState,
        [mainCategory]: newSubCategories,
      });
    }
  };

  return (
    <div className="flex max-h-[50vh] w-full min-w-[20rem] flex-col items-center gap-6 overflow-y-auto px-2 pb-2">
      {/* 1. Combobox Główny */}
      <div className="flex w-full flex-col gap-2">
        <label className="pl-1 text-xs font-extrabold uppercase tracking-wider text-pink-700">
          Ogólny klimat randki
        </label>
        <NeobrutalistCombobox
          options={mainCategories}
          selectedValues={mainSelected}
          onChange={handleMainChange}
          placeholder="Wybierz kategorie..."
        />
      </div>

      {/* 2. Comboboxy Podrzędne (generują się dynamicznie na bazie głównego wyboru) */}
      {mainSelected.length > 0 && (
        <div className="flex w-full flex-col gap-5 border-t-4 border-dashed border-pink-300 pt-5">
          {mainSelected.map((cat) => {
            const subOptions = (comboboxData[cat] || []).map((item) => ({
              value: item.toLowerCase(),
              label: item,
            }));

            return (
              <div
                key={cat}
                className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2"
              >
                <label className="pl-1 text-xs font-extrabold uppercase tracking-wider text-pink-700">
                  Co dokładnie z: {cat}?
                </label>
                <NeobrutalistCombobox
                  options={subOptions}
                  selectedValues={selectionState[cat] || []}
                  onChange={(newSubs) => handleSubChange(cat, newSubs)}
                  placeholder="Wybierz opcje..."
                  emptyText="Brak szczegółowych opcji."
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}