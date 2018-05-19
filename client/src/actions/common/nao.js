export const NAO_CONNECT = 'NAO_CONNECT';
export const NAO_VERSION = 'NAO_VERSION';
export const NAO_SAY = 'NAO_SAY';
export const NAO_BEHAVIOR = 'NAO_BEHAVIOR';
export const NAO_RASTA = 'NAO_RASTA';
export const NAO_GET_BEHAVIOR_LIST = 'NAO_GET_BEHAVIOR_LIST';
export const NAO_GET_BEHAVIOR_LIST_RECIEVE = 'NAO_GET_BEHAVIOR_LIST_RECIEVE';

export const NAO_SHUTDOWN = 'NAO_SHUTDOWN';

export const NAO_GET_BATTERY = 'NAO_GET_BATTERY';
export const NAO_GET_BATTERY_RECIEVE = 'NAO_GET_BATTERY_RECIEVE';

export const NAO_GET_CPU_TEMPERATURE = 'NAO_GET_CPU_TEMPERATURE';
export const NAO_SET_CPU_TEMPERATURE = 'NAO_SET_CPU_TEMPERATURE';

export const NAO_GET_LFOOT_WEIGHT = 'NAO_GET_LFOOT_WEIGHT';
export const NAO_SET_LFOOT_WEIGHT = 'NAO_SET_LFOOT_WEIGHT';

export const NAO_GET_RFOOT_WEIGHT = 'NAO_GET_RFOOT_WEIGHT';
export const NAO_SET_RFOOT_WEIGHT = 'NAO_SET_RFOOT_WEIGHT';

export const NAO_GET_RSHOULDER_TEMPERATURE = 'NAO_GET_RSHOULDER_TEMPERATURE';
export const NAO_SET_RSHOULDER_TEMPERATURE = 'NAO_SET_RSHOULDER_TEMPERATURE';

export const NAO_GET_LSHOULDER_TEMPERATURE = 'NAO_GET_LSHOULDER_TEMPERATURE';
export const NAO_SET_LSHOULDER_TEMPERATURE = 'NAO_SET_LSHOULDER_TEMPERATURE';

export const NAO_GET_RELBOW_TEMPERATURE = 'NAO_GET_RELBOW_TEMPERATURE';
export const NAO_SET_RELBOW_TEMPERATURE = 'NAO_SET_RELBOW_TEMPERATURE';

export const NAO_GET_LELBOW_TEMPERATURE = 'NAO_GET_LELBOW_TEMPERATURE';
export const NAO_SET_LELBOW_TEMPERATURE = 'NAO_SET_LELBOW_TEMPERATURE';

export const NAO_GET_RHIP_TEMPERATURE = 'NAO_GET_RHIP_TEMPERATURE';
export const NAO_SET_RHIP_TEMPERATURE = 'NAO_SET_RHIP_TEMPERATURE';

export const NAO_GET_LHIP_TEMPERATURE = 'NAO_GET_LHIP_TEMPERATURE';
export const NAO_SET_LHIP_TEMPERATURE = 'NAO_SET_LHIP_TEMPERATURE';

export const NAO_GET_RKNEE_TEMPERATURE = 'NAO_GET_RKNEE_TEMPERATURE';
export const NAO_SET_RKNEE_TEMPERATURE = 'NAO_SET_RKNEE_TEMPERATURE';

export const NAO_GET_LKNEE_TEMPERATURE = 'NAO_GET_LKNEE_TEMPERATURE';
export const NAO_SET_LKNEE_TEMPERATURE = 'NAO_SET_LKNEE_TEMPERATURE';

export const NAO_GET_DATA = 'NAO_GET_DATA';
export const NAO_GET_DATA_RECIEVE = 'NAO_GET_DATA_RECIEVE';

export const NAO_SET_BATTERY_CHARGE = 'NAO_SET_BATTERY_CHARGE';
export const NAO_SET_SYSTEM_VERSION = 'NAO_SET_SYSTEM_VERSION';

export const NAO_STOP_ALL_BEHAVIOR = 'NAO_STOP_ALL_BEHAVIOR';

export const NAO_MOVE = 'NAO_MOVE';
export const NAO_MOVE_HEAD = 'NAO_MOVE_HEAD';

export function connect(payload) {
  return {
    type: NAO_CONNECT,
    payload
  }
}

export function textToSay(payload) {
  return {
    type: NAO_SAY,
    payload
  }
}

export function version() {
  return {
    type: NAO_VERSION
  }
}

export function behavior(payload) {
  return {
    type: NAO_BEHAVIOR,
    payload
  }
}

export function rasta(payload) {
  return {
    type: NAO_RASTA,
    payload
  }
}

export function behaviorList() {
  return {
    type: NAO_GET_BEHAVIOR_LIST
  }
}

export function data(payload) {
  return {
    type: NAO_GET_DATA,
    payload
  }
}

export function setBattery(payload) {
  return {
    type: NAO_SET_BATTERY_CHARGE,
    payload
  }
}

export function setSystemVersion(payload) {
  return {
    type: NAO_SET_SYSTEM_VERSION,
    payload
  }
}

export function stopAllBehavior(payload) {
  return {
    type: NAO_STOP_ALL_BEHAVIOR,
    payload
  }
}

export function move(payload) {
  return {
    type: NAO_MOVE,
    payload
  }
}

export function moveHead(payload) {
  return {
    type: NAO_MOVE_HEAD,
    payload
  }
}

export function getBattery(payload) {
  return {
    type: NAO_GET_BATTERY,
    payload
  }
}

export function getCPUTemperature(payload) {
  return {
    type: NAO_GET_CPU_TEMPERATURE,
    payload
  }
}

export function setCPUTemperature(payload) {
  return {
    type: NAO_SET_CPU_TEMPERATURE,
    payload
  }
}

export function getLFootWeight(payload) {
  return {
    type: NAO_GET_LFOOT_WEIGHT,
    payload
  }
}

export function setLFootWeight(payload) {
  return {
    type: NAO_SET_LFOOT_WEIGHT,
    payload
  }
}

export function getRFootWeight(payload) {
  return {
    type: NAO_GET_RFOOT_WEIGHT,
    payload
  }
}

export function setRFootWeight(payload) {
  return {
    type: NAO_SET_RFOOT_WEIGHT,
    payload
  }
}

export function getRShoulderTemperature(payload) {
  return {
    type: NAO_GET_RSHOULDER_TEMPERATURE,
    payload
  }
}

export function setRShoulderTemperature(payload) {
  return {
    type: NAO_SET_RSHOULDER_TEMPERATURE,
    payload
  }
}

export function getLShoulderTemperature(payload) {
  return {
    type: NAO_GET_LSHOULDER_TEMPERATURE,
    payload
  }
}

export function setLShoulderTemperature(payload) {
  return {
    type: NAO_SET_LSHOULDER_TEMPERATURE,
    payload
  }
}

export function getRElbowTemperature(payload) {
  return {
    type: NAO_GET_RELBOW_TEMPERATURE,
    payload
  }
}

export function setRElbowTemperature(payload) {
  return {
    type: NAO_SET_RELBOW_TEMPERATURE,
    payload
  }
}

export function getLElbowTemperature(payload) {
  return {
    type: NAO_GET_LELBOW_TEMPERATURE,
    payload
  }
}

export function setLElbowTemperature(payload) {
  return {
    type: NAO_SET_LELBOW_TEMPERATURE,
    payload
  }
}

export function getRHipTemperature(payload) {
  return {
    type: NAO_GET_RHIP_TEMPERATURE,
    payload
  }
}

export function setRHipTemperature(payload) {
  return {
    type: NAO_SET_RHIP_TEMPERATURE,
    payload
  }
}

export function getLHipTemperature(payload) {
  return {
    type: NAO_GET_LHIP_TEMPERATURE,
    payload
  }
}

export function setLHipTemperature(payload) {
  return {
    type: NAO_SET_LHIP_TEMPERATURE,
    payload
  }
}

export function getRKneeTemperature(payload) {
  return {
    type: NAO_GET_RKNEE_TEMPERATURE,
    payload
  }
}

export function setRKneeTemperature(payload) {
  return {
    type: NAO_SET_RKNEE_TEMPERATURE,
    payload
  }
}

export function getLKneeTemperature(payload) {
  return {
    type: NAO_GET_LKNEE_TEMPERATURE,
    payload
  }
}

export function setLKneeTemperature(payload) {
  return {
    type: NAO_SET_LKNEE_TEMPERATURE,
    payload
  }
}

export function shutdown() {
  return {
    type: NAO_SHUTDOWN
  }
}
