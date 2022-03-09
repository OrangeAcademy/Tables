import React from "react";
import Calendar from "../components/ViewMeeting/Calendar/Calendar";
import BackgroundContainer from "../components/ViewMeeting/Containers/BackgroundContainer";
import CircularTimerFunction from "../components/ViewMeeting/CircularTimer/CircularTimerFunction";
import ContentContainer from "../components/ViewMeeting/Containers/ContentContainer";
import StateInfo from "../components/ViewMeeting/StateInfo/StateInfo";
import Details from "../components/ViewMeeting/Details/Details";
import EndButton from "../components/ViewMeeting/EndButton/EndButton";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "../components/ViewMeeting/theme/Theme"

import {MeetingDetails} from "../interfaces/MeetingDetails"

const ViewMeeting = ({isBusy, upcomingEvent, seconds}: MeetingDetails) => {

  return (
    <ThemeProvider theme={theme}>
      <BackgroundContainer>
        <ContentContainer>
          <StateInfo isBusy={isBusy}/>
          <CircularTimerFunction time={seconds}/>
          <Details isBusy={isBusy} upcomingEvent={upcomingEvent}/>
          <EndButton isBusy={isBusy} upcomingEvent={upcomingEvent} />
        </ContentContainer>
        <Calendar/>
      </BackgroundContainer>
    </ThemeProvider>
  );
};
export default ViewMeeting;
