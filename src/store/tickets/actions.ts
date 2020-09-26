import { Dispatch } from 'redux';
import { db } from '../db';
import { FETCH_TICKETS, FETCH_TICKETS_FAILURE, FETCH_TICKETS_SUCCESS } from './types';

export const fetchTickets = () => (dispatch: Dispatch) => {
  dispatch({
    type: FETCH_TICKETS,
  });

  return db()
    .collection('tickets')
    .orderBy('order', 'asc')
    .get()
    .then((snaps) => {
      const list = snaps.docs.map((snap) => Object.assign({}, snap.data(), { id: snap.id }));

      dispatch({
        type: FETCH_TICKETS_SUCCESS,
        payload: { list },
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_TICKETS_FAILURE,
        payload: { error },
      });
    });
};
