import React, {useEffect} from "react";
import Button from "@mui/material/Button";
import {styled} from "@mui/material";
import {deleteEvent} from "../../../store/Event/actionCreators";
import {useDispatch} from "react-redux";
import {FindUpcomingEvents} from "../../../utils/events.utils";
import {useAppDispatch} from "../../../hooks/redux";

const MeetingEndButton = styled(Button)({
  width: '100%',
  background: 'white',
  borderRadius: '10px',
  height: '4rem',
  color: 'black',
  textTransform: 'none',
  fontSize: '20px',
  '&:hover': {
    background: '#d4d1d1'
  },
})

const EndButton = ({isBusy, upcomingEvent, getNextEventFunction}: any) => {
  const dispatch = useAppDispatch();

  const DeleteEvent = (id: number) => {
    dispatch(deleteEvent(id))
      .unwrap()
      .then(() => {
        getNextEventFunction()
      })
  }
  if (isBusy) {
    return (<MeetingEndButton onClick={() => DeleteEvent(upcomingEvent.elementId)}>End Now</MeetingEndButton>)
  } else return (<></>)
}

export default EndButton;
