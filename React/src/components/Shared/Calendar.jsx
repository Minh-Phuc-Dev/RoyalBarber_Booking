import { DayPicker } from 'react-day-picker';
import { vi } from "react-day-picker/locale";
import "react-day-picker/style.css";


function CalendarPicker({ selected, setSelected }) {


    return (
        <DayPicker
            className="rounded-md border p-4"
            animate
            mode="single"
            disabled={
                {
                    before: new Date()
                }
            }
            classNames={
                {
                    day_button: "size-10 rounded border",

                }
            }
            locale={vi}
            selected={selected}
            onSelect={setSelected}
        />
    );
}

export default CalendarPicker