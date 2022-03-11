import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridDay from '@fullcalendar/timegrid';
import {useSelector} from "react-redux";
import {eventsSelector} from "../../store/Event/selectors";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarStyle from "./Calendar.styles";



const Calendar = () => {
const eventsCalendar = useSelector(eventsSelector);


  const calculateDateDiff = (event: any) => {
    return dayjs(event.end).diff(dayjs(event.start), 'minutes')
  }

  const renderEventContent = (arg: any) => {
    let direction = calculateDateDiff(arg.event) <= 30 ? 'row' : 'column';

    return (
      <Box sx={{flexDirection: direction}}>
        <b>{arg.event.extendedProps.subject}</b>
        <span>{arg.event.extendedProps.attendees[0]}</span>
      </Box>
    )
  };



  return (

      <CalendarStyle >
        <FullCalendar
          selectable
          plugins={[timeGridDay, interactionPlugin]}
          initialView="timeGridDay"
          headerToolbar={false}
          nowIndicator
          height='100%'
          allDaySlot={false}
          slotMinTime="08:00"
          slotMaxTime="18:00:01"
          dayHeaderFormat={{weekday: 'long', month: 'long', year: 'numeric', day: 'numeric'}}
          slotLabelFormat={{hour: '2-digit', minute: '2-digit', hour12: false}}
          events={eventsCalendar}
          displayEventTime={false}
          eventContent={renderEventContent}
          expandRows
        />

      </CalendarStyle>

  );
}

export default Calendar;


// const Calendar = () => {
//     const validTime = () => ({start: new Date()});
//     const eventsCalendar = useSelector(eventsSelector);

//     const calculateDateDiff = (event: any) => {
//         return dayjs(event.end).diff(dayjs(event.start), 'minutes')
//     }
//     const renderEventContent = (arg: any) => {
//         let direction = calculateDateDiff(arg.event) <= 35 ? 'row' : 'column';
//         return (
//             <Box sx={{flexDirection: direction}}>
//                 <b>{arg.event.extendedProps.subject}</b>
//                 <span>{arg.event.extendedProps.attendees[0]}</span>
//             </Box>
//         )
//     };


//     return (
//         <FullCalendar
//             plugins={[timeGridDay]}
//             initialView="timeGridDay"
//             nowIndicator
//             allDaySlot={false}
//             slotMinTime={"08:00"}
//             slotMaxTime={"23:00"}
//             selectable
//             dayHeaderFormat={{weekday: 'long', month: 'long', year: 'numeric', day: 'numeric'}}
//             slotLabelFormat={{hour: '2-digit', minute: '2-digit', hour12: false}}
//             displayEventTime={false}
//             expandRows
//             validRange={validTime}
//             eventMinHeight={30}
//             eventShortHeight={30}
//             events={eventsCalendar}
//             eventContent={renderEventContent}
//         />
//     )
//         ;
// };

// export default Calendar;
