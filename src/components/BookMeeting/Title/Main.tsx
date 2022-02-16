import React from "react";

// MUI Imports
import { Container } from '@mui/material';

// Local imports
import TitleText from './TitleText';

// Styles
const containerStyles = { mb: 10 };

// Props validation
interface props {
  location: string,
  meetingRoom: string, 
  isRoomAvailable?: boolean
}

// The main page title containing
// 1. Information about the office location and meeting room
// 2. Its availability status (free until hh:mm || busy)
const Title = ({location,meetingRoom,isRoomAvailable}: props) => {
  return (
    <Container sx={{ ...containerStyles }}>
      <TitleText>{`${location} - ${meetingRoom}`}</TitleText>
      <TitleText>{isRoomAvailable ? `Free until 10:50` : `Busy`}</TitleText>
    </Container>
  );
};

export default Title;