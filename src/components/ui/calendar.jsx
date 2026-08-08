import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-4 bg-pink-100 border-[3px] border-pink-400 rounded-xl shadow-[4px_4px_0px_0px_#ec4899]",
        className,
      )}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
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
          "bg-pink-400 text-white border-pink-700 shadow-[2px_2px_0px_0px_#000] hover:bg-pink-500 hover:border-pink-700 font-bold focus:bg-pink-400 focus:text-white",
        day_today:
          "bg-pink-50 text-pink-900 border-dashed border-2 border-pink-400",
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
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
