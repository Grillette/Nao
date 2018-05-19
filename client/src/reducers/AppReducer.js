import {
  FILTER_SET,
  MODE_SET,
  ROBOT_SET_DEFAULT,
  BEHAVIOR_PROGRESS_SET_LOADING,

  NAO_SET_BATTERY_CHARGE,
  NAO_SET_SYSTEM_VERSION,
  NAO_SET_CPU_TEMPERATURE,
  NAO_SET_RFOOT_WEIGHT,
  NAO_SET_LFOOT_WEIGHT,
  NAO_SET_RHIP_TEMPERATURE,
  NAO_SET_LHIP_TEMPERATURE,
  NAO_SET_RELBOW_TEMPERATURE,
  NAO_SET_LELBOW_TEMPERATURE,
  NAO_SET_RKNEE_TEMPERATURE,
  NAO_SET_LKNEE_TEMPERATURE,
  NAO_SET_RSHOULDER_TEMPERATURE,
  NAO_SET_LSHOULDER_TEMPERATURE,
} from '../actions';

const initialState = {
  filter: '',
  mode: 'action', // pas or action etc
  default: null,
  nao: {
    battery: '0',
    version : 'none',
    cpu: '0',
    lFootWeight: '0',
    rFootWeight: '0',
    lHipTemp: '0',
    rHipTemp: '0',
    lElbowTemp: '0',
    rElbowTemp: '0',
    lKneeTemp: '0',
    rKneeTemp: '0',
    lShoulderTemp: '0',
    rShoulderTemp: '0',
    processing: false
  }
};

export default function (state = initialState, action) {

  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = {...state};

  switch (action.type) {

    case FILTER_SET:
      nextState.filter = action.payload;
      return nextState;
      break;

    case MODE_SET:
      nextState.mode = action.payload;
      return nextState;
      break;

    case ROBOT_SET_DEFAULT:
      nextState.default = action.payload;
      return nextState;
      break;

    case NAO_SET_BATTERY_CHARGE:
      nextState.nao.battery = action.payload;
      return nextState;
      break;

    case NAO_SET_CPU_TEMPERATURE:
      nextState.nao.cpu = action.payload;
      return nextState;
      break;

    case NAO_SET_LFOOT_WEIGHT:
      nextState.nao.lFootWeight = action.payload;
      return nextState;
      break;

    case NAO_SET_RFOOT_WEIGHT:
      nextState.nao.rFootWeight = action.payload;
      return nextState;
      break;

    case NAO_SET_LSHOULDER_TEMPERATURE:
      nextState.nao.lShoulderTemp = action.payload;
      return nextState;
      break;

    case NAO_SET_RSHOULDER_TEMPERATURE:
      nextState.nao.rShoulderTemp = action.payload;
      return nextState;
      break;

    case NAO_SET_LKNEE_TEMPERATURE:
      nextState.nao.lKneeTemp = action.payload;
      return nextState;
      break;

    case NAO_SET_RKNEE_TEMPERATURE:
      nextState.nao.rKneeTemp = action.payload;
      return nextState;
      break;

    case NAO_SET_LELBOW_TEMPERATURE:
      nextState.nao.lElbowTemp = action.payload;
      return nextState;
      break;

    case NAO_SET_RELBOW_TEMPERATURE:
      nextState.nao.rElbowTemp = action.payload;
      return nextState;
      break;

    case NAO_SET_LHIP_TEMPERATURE:
      nextState.nao.lHipTemp = action.payload;
      return nextState;
      break;

    case NAO_SET_RHIP_TEMPERATURE:
      nextState.nao.rHipTemp = action.payload;
      return nextState;
      break;

    case NAO_SET_SYSTEM_VERSION:
      nextState.nao.version = action.payload;
      return nextState;
      break;

    case BEHAVIOR_PROGRESS_SET_LOADING:
      nextState.nao.processing = action.payload;
      return nextState;
      break;

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
