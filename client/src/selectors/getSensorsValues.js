/* eslint-disable */
import { createSelector } from 'reselect';
import { filter, first } from 'lodash';

const getSensors = (state) => state.entities.sensors;

export default createSelector(
  [getSensors],
  (sensors) => {
    return getSensors;
  }
);
