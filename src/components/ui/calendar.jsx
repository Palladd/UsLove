import * as React from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  const handleTimeChange = (e) => {
    const time = e.target.value;
    if (!props.selected || !time) return;

    const [hours, minutes] = time.split(":");
    const newDate = new Date(props.selected);
    newDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));

    if (props.onSelect) {
      props.onSelect(newDate);
    }
  };

  const selectedTime =
    props.selected instanceof Date
      ? `${props.selected.getHours().toString().padStart(2, "0")}:${props.selected.getMinutes().toString().padStart(2, "0")}`
      : "";

  return (
    <div
      className={cn(
        "inline-block rounded-xl border-[3px] border-pink-400 bg-pink-100 p-4 shadow-[4px_4px_0px_0px_#ec4899]",
        className,
      )}
    >
      <DayPicker
        showOutsideDays={showOutsideDays}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-bold text-pink-900",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            "h-7 w-7 bg-white p-0 border-2 border-pink-400 shadow-[2px_2px_0px_0px_#ec4899] hover:bg-pink-50 transition-all rounded-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-pink-600 rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
          day: cn(
            "h-9 w-9 p-0 font-normal border-2 border-transparent hover:border-pink-400 hover:shadow-[2px_2px_0px_0px_#ec4899] rounded-md transition-all aria-selected:opacity-100",
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-pink-400 text-white border-pink-700 shadow-[2px_2px_0px_0px_#000000] hover:bg-pink-500 hover:border-pink-700 font-bold focus:bg-pink-400 focus:text-white",
          day_today:
            "bg-pink-200 text-pink-900 border-dashed border-2 border-pink-400",
          day_outside:
            "day-outside text-pink-300 opacity-50 aria-selected:bg-pink-100/50 aria-selected:text-pink-500 aria-selected:opacity-30",
          day_disabled: "text-pink-200 opacity-50",
          day_range_middle:
            "aria-selected:bg-pink-100 aria-selected:text-pink-900",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: () => <ChevronLeft className="h-4 w-4" />,
          IconRight: () => <ChevronRight className="h-4 w-4" />,
        }}
        {...props}
      />

      <div className="mt-4 flex w-full flex-col gap-2 border-t-2 border-dashed border-pink-400 pt-4">
        <label className="pl-1 text-xs font-extrabold uppercase tracking-wider text-pink-700">
          Godzina randki
        </label>
        <div className="flex w-full items-center gap-2 rounded-xl border-2 border-pink-400 bg-white px-3 py-2 shadow-[3px_3px_0px_0px_#ec4899] transition-all focus-within:translate-x-0.5 focus-within:translate-y-0.5 focus-within:shadow-[1px_1px_0px_0px_#ec4899]">
          <Clock className="h-5 w-5 text-pink-500" />
          <input
            type="time"
            disabled={!props.selected}
            onChange={handleTimeChange}
            value={selectedTime}
            className="w-full bg-transparent text-center text-lg font-black text-pink-900 outline-none appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
