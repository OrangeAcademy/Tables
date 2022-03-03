import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

export interface ITopic {
  topicID: string,
  presenter: string,
  topic: string
}

export interface IMeetingSliceState {
  presenters: ITopic[]
}

const initialState:IMeetingSliceState = {
  presenters: []
}

const meetingTopicsSlice = createSlice({
  name: 'meetingTopics',
  initialState,
  reducers: {
    addMeetings: {
      reducer: (state, action: PayloadAction<ITopic[]>) => {
          state.presenters.push(...action.payload);
      },
      prepare: (topic) => ({...topic, topicID: nanoid()})
    },
    removeMeeting: {
      reducer: (state, action: PayloadAction<ITopic>) => {
        state.presenters.filter(topic => topic.topicID !== action.payload.topicID)
      },
      prepare: (topic) => {
        return ({...topic})
      }
    }
  }
})

export const { addMeetings, removeMeeting } = meetingTopicsSlice.actions;
export default meetingTopicsSlice.reducer;