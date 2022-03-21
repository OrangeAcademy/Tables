import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { postEvents, getEvents } from 'store/Event/actionCreators';
import {
  autoBookConfigSelector,
  autoBookDurationSelector,
  shouldAutoBookSelector,
} from 'store/StateRoom/selectors';
import {
  setAutoBookDuration,
  setIsLessThan15Mins,
  setNextEventStart,
  setRoomStatus,
  setShouldAutoBook,
  storeUpcomingEvent,
} from 'store/StateRoom/stateRoomSlice';
import { newReservationTemplate } from 'constants/newAutobook';
import { IEvent } from 'models/Event';
import { getClosestEvent } from 'utils/events.utils';
import { useAppDispatch } from './redux';

function useAutobook() {
  const dispatch = useAppDispatch();
  const _getConfig = useSelector(autoBookConfigSelector);
  const _getIsAutobookable = useSelector(shouldAutoBookSelector);
  const _getDuration = useSelector(autoBookDurationSelector);

  // SETTING UP the autobookConfig in Redux
  const setConfig = useCallback(
    (meetingDuration: number) => {
      dispatch(setAutoBookDuration(meetingDuration));
      dispatch(setShouldAutoBook(true));
    },
    [dispatch]
  );

  // RESETTING the autobookConfig in Redux
  const resetConfig = useCallback(() => {
    dispatch(setAutoBookDuration(null));
    dispatch(setShouldAutoBook(false));
  }, [dispatch]);

  /* 
   GetUpcomingEvent is used for fetching the events data from DB 
   and stores the fetched events + the closest event in Redux
    1. Fetches all events (event => events)
    2. getClosestEvent Function call that finds the closest event
    3. Stores the closest event in Redux (roomState => upcomingEvent)
    4. Sets its start time in Redux (roomState => upcomingEvent)
  */
  const handlePostAndUpdate = useCallback(async () => {
    try {
      const events: IEvent[] = await dispatch(getEvents()).unwrap();
      const nextMeeting = await getClosestEvent(events);

      dispatch(storeUpcomingEvent(nextMeeting));
      dispatch(setNextEventStart(nextMeeting.start));
    } catch (e) {
      console.log('Something went wrong in useAutoBook.ts. ', e);
    }
  }, [dispatch]);

  const setRoomBooked = useCallback(() => {
    dispatch(setRoomStatus(true));
    dispatch(setIsLessThan15Mins(true));
    resetConfig();
  }, [dispatch, resetConfig]);

  /*
    Function that posts an autoGenerated event to DB 
    (if the autobookConfig is enabled)
  */
  const automaticallyBookMeeting = useCallback(async () => {
    if (_getDuration) {
      await dispatch(postEvents(newReservationTemplate(_getDuration)));
      await handlePostAndUpdate();
      setRoomBooked();
    }
  }, [_getDuration, dispatch, handlePostAndUpdate, setRoomBooked]);

  return {
    setConfig,
    resetConfig,
    automaticallyBookMeeting,
    handlePostAndUpdate,
    _getConfig,
    _getIsAutobookable,
    _getDuration,
  };
}

export default useAutobook;
