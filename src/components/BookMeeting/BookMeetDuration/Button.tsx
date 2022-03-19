import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMeetingDuration } from "store/NewMeeting/newMeeting";

// Local Imports
import StyledBtnText from './ButtonPartials/StyledBtnText';
import StyledButton from './ButtonPartials/StyledButton';


import {useSelector} from "react-redux";
import { meetingsDurationSelector } from "store/NewMeeting/selectors";
import { nextEventStartSelector } from "store/StateRoom/selectors";
import dayjs from "dayjs";
// import { useNavigate } from "react-router-dom";
import { setIsLessThan15Mins } from "store/StateRoom/stateRoomSlice";
import { Button, styled } from "@mui/material";
import { grey } from "@mui/material/colors";

// Props validation
interface props { 
  value: string
}


/* ------------------ Component -------------- */
/*
  Building block for creating the 'XYZ min' meeting duration button(s)
*/

const BookMeetingBtn = styled(Button)(({theme}) => ({
  padding: "clamp(1rem, 0.4830rem + 2.5141vw, 3.5rem)",
  backgroundColor: '#a6dab3',
  // fontSize: '1.6rem',
  boxShadow: '6px 10px 37px -7px rgba(0,0,0,0.41)',
  border: 0,
  borderRadius: 5,
  flexShrink: 1,
  color: '#679980',
  fontSize: 'clamp(25px, 4.5vw, 3rem)',
  textTransform: 'lowercase',
  fontWeight: 900,
  [theme.breakpoints.down('tablet')]: {
    fontWeight: 400
  },
  "&:hover": {
    background: 'none',
    backgroundColor: "transparent"
  },
  // '&:focus': {
  //   backgroundColor: '#fef9e5',
  //   opacity: [0.4, 0.4, 0.9],
  //   borderColor: grey[500],
  //   boxShadow: '5px 11px 50px -8px rgba(0,0,0,0.95)',
  //   color: '#75726c',
  // },
  "&:disabled": {
    color: "gray",
    backgroundColor: 'transparent',
    boxShadow: 'none',
    border: '1px solid gray'
  }
}));


// const BookMeetingBtn = ({ value}: props) => {
//   return (
//     <StyledButton>
//       <StyledBtnText>{value}</StyledBtnText>
//     </StyledButton>
//   );
// };

export default BookMeetingBtn;
