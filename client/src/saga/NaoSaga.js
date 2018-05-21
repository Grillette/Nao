import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { isEmpty, isUndefined, values, isNull } from 'lodash';

import Nao from '../services/naoClass';

import {
  NAO_CONNECT,
  NAO_VERSION,
  NAO_SAY,
  NAO_MOVE,
  NAO_MOVE_HEAD,
  NAO_BEHAVIOR,
  NAO_RASTA,
  NAO_GET_BEHAVIOR_LIST,
  NAO_GET_BEHAVIOR_LIST_RECIEVE,
  NAO_SET_BATTERY_CHARGE,
  NAO_GET_BATTERY,
  NAO_SET_CPU_TEMPERATURE,
  NAO_GET_CPU_TEMPERATURE,
  NAO_SET_SYSTEM_VERSION,
  NAO_STOP_ALL_BEHAVIOR,
  NAO_SET_LFOOT_WEIGHT,
  NAO_GET_LFOOT_WEIGHT,
  NAO_SET_RFOOT_WEIGHT,
  NAO_GET_RFOOT_WEIGHT,
  NAO_SET_LSHOULDER_TEMPERATURE,
  NAO_GET_LSHOULDER_TEMPERATURE,
  NAO_SET_RSHOULDER_TEMPERATURE,
  NAO_GET_RSHOULDER_TEMPERATURE,
  NAO_SET_LKNEE_TEMPERATURE,
  NAO_GET_LKNEE_TEMPERATURE,
  NAO_SET_RKNEE_TEMPERATURE,
  NAO_GET_RKNEE_TEMPERATURE,
  NAO_SET_LELBOW_TEMPERATURE,
  NAO_GET_LELBOW_TEMPERATURE,
  NAO_SET_RELBOW_TEMPERATURE,
  NAO_GET_RELBOW_TEMPERATURE,
  NAO_SET_LHIP_TEMPERATURE,
  NAO_GET_LHIP_TEMPERATURE,
  NAO_SET_RHIP_TEMPERATURE,
  NAO_GET_RHIP_TEMPERATURE,
  NAO_GET_RUNNING_BEHAVIORS,
  NAO_SET_RUNNING_BEHAVIORS,
  NAO_SHUTDOWN,

  NOTIFICATION_ADD,
  BEHAVIOR_PROGRESS_SET_LOADING,
  LOADING_SET_LOADING
} from '../actions';
//import {getRunningBehaviors} from "../actions/common/nao";

function * connect(action) {
  try {
    // ip null ou undefined ou vide
    if (isUndefined(action.payload) || isEmpty(action.payload) || isNull(action.payload)) {
      throw new Error('L\'ip du robot est invalide :/\n Il sera impossible d\'ajouter des commandes !')
    }

    yield put({type: LOADING_SET_LOADING, payload: true});

    let data = yield call(Nao.init, action.payload + ':80');

    // erreur de connexion
    if (data.hasOwnProperty('error')) throw new Error(data.error);

    // get battery
    let battery = yield call(Nao.getBatteryCharge, null);
    yield put({type: NAO_SET_BATTERY_CHARGE, payload: battery.toString()});

    // get cpu temperature
    let cpu_temp = yield call(Nao.getCPUTemperature, null);
    yield put ({type: NAO_SET_CPU_TEMPERATURE, payload: cpu_temp.toString()});

    // get LFoot weight
    let lFoot_weight = yield call(Nao.getLFootWeight, null);
    yield put ({type: NAO_SET_LFOOT_WEIGHT, payload: lFoot_weight.toString().substring(0, 5)});

    // get RFoot weight
    let rFoot_weight = yield call(Nao.getRFootWeight, null);
    yield put ({type: NAO_SET_RFOOT_WEIGHT, payload: rFoot_weight.toString().substring(0, 5)});

    // get LShoulder temperature
    let lShoulder_temp = yield call(Nao.getLShoulderTemperature, null);
    yield put ({type: NAO_SET_LSHOULDER_TEMPERATURE, payload: lShoulder_temp.toString()});

    // get RShoulder temperature
    let rShoulder_temp = yield call(Nao.getRShoulderTemperature, null);
    yield put ({type: NAO_SET_RSHOULDER_TEMPERATURE, payload: rShoulder_temp.toString()});

    // get LKnee temperature
    let lKnee_temp = yield call(Nao.getLKneeTemperature, null);
    yield put ({type: NAO_SET_LKNEE_TEMPERATURE, payload: lKnee_temp.toString()});

    // get RKnee temperature
    let rKnee_temp = yield call(Nao.getRKneeTemperature, null);
    yield put ({type: NAO_SET_RKNEE_TEMPERATURE, payload: rKnee_temp.toString()});

    // get LElbow temperature
    let lElbow_temp = yield call(Nao.getLElbowTemperature, null);
    yield put ({type: NAO_SET_LELBOW_TEMPERATURE, payload: lElbow_temp.toString()});

    // get RElbow temperature
    let rElbow_temp = yield call(Nao.getRElbowTemperature, null);
    yield put ({type: NAO_SET_RELBOW_TEMPERATURE, payload: rElbow_temp.toString()});

    // get LHip temperature
    let lHip_temp = yield call(Nao.getLHipTemperature, null);
    yield put ({type: NAO_SET_LHIP_TEMPERATURE, payload: lHip_temp.toString()});

    // get RHip temperature
    let rHip_temp = yield call(Nao.getRHipTemperature, null);
    yield put ({type: NAO_SET_RHIP_TEMPERATURE, payload: rHip_temp.toString()});

    // get Running behaviors list
    // let running_behaviors = yield call(Nao.getRunningBehaviors, null);
    // yield put ({type: NAO_GET_RUNNING_BEHAVIORS, payload: running_behaviors});
    // console.log("running_behaviors : " + running_behaviors);

    let version = yield call(Nao.getSystemVersion, null);
    yield put({type: NAO_SET_SYSTEM_VERSION, payload: version.toString()});

    yield put({type: LOADING_SET_LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING_SET_LOADING, payload: false});
    if (e.message != 'Deja connecté') {
      yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message: e.message, type: 'negative'}});
    }
  }
}

function * version() {
  try {
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: true});
    let data = yield call(Nao.getSystemVersion, null);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
  }
}

function * say(action) {
  try {
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: true});
    let data = yield call(Nao.say, action.payload);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
  }
}

function * rasta(action) {
  try {
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: true});
    let data = yield call(Nao.rasta, action.payload);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
  }
}

function * behavior(action) {
  try {
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: true});
    let data = yield call(Nao.behavior, action.payload);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
  } catch (e) {
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * behaviorList() {
  try {
    let data = yield call(Nao.behaviorList, null);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: NAO_GET_BEHAVIOR_LIST_RECIEVE, payload: data});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * stopAllBehavior() {
  try {
    let data = yield call(Nao.stopAllBehavior, null);
    yield call (Nao.behavior, 'debout/behavior_1');
    if (data.hasOwnProperty('error')) throw new Error(data.error);
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * move(action) {
  try {
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: true});
    let data = yield call(Nao.move, action.payload.x, action.payload.y, action.payload.theta);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
  } catch (e) {
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * moveHead(action) {
  try {
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: true});
    let data = yield call(Nao.moveHead, action.payload.mode, action.payload.x, action.payload.y);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
  } catch (e) {
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * getBattery() {
  try {
    let data = yield call(Nao.getBatteryCharge, null);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: NAO_SET_BATTERY_CHARGE, payload: data.toString()});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * shutdown() {
  try {
    let data = yield call(Nao.shutdown, null);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * getCPUTemperature() {
  try{
    let data = yield call(Nao.getCPUTemperature, null);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: NAO_SET_CPU_TEMPERATURE, payload: data.toString()});
    console.log("cpu2 : " + data);
    if(data.hasOwnProperty('error')) throw new Error(data.error);
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * getLFootWeight() {
  try {
    let data = yield call(Nao.getLFootWeight, null);
    console.log("Lfootweight2 : " + data);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: NAO_SET_LFOOT_WEIGHT, payload: data.toString()});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * getRFootWeight() {
  try {
    let data = yield call(Nao.getRFootWeight, null);
    console.log("Rfootweight2 : " + data);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: NAO_SET_RFOOT_WEIGHT, payload: data.toString()});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * getLShoulderTemperature() {
  try{
    let data = yield call(Nao.getLShoulderTemperature, null);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: NAO_SET_LSHOULDER_TEMPERATURE, payload: data.toString()});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * getRShoulderTemperature() {
  try{
    let data = yield call(Nao.getRShoulderTemperature, null);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: NAO_SET_RSHOULDER_TEMPERATURE, payload: data.toString()});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * getLKneeTemperature() {
  try{
    let data = yield call(Nao.getLKneeTemperature, null);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: NAO_SET_LKNEE_TEMPERATURE, payload: data.toString()});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * getRKneeTemperature() {
  try{
    let data = yield call(Nao.getRKneeTemperature, null);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: NAO_SET_RKNEE_TEMPERATURE, payload: data.toString()});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * getLElbowTemperature() {
  try{
    let data = yield call(Nao.getLElbowTemperature, null);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: NAO_SET_LELBOW_TEMPERATURE, payload: data.toString()});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * getRElbowTemperature() {
  try{
    let data = yield call(Nao.getRElbowTemperature, null);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: NAO_SET_RELBOW_TEMPERATURE, payload: data.toString()});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * getLHipTemperature() {
  try{
    let data = yield call(Nao.getLHipTemperature, null);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: NAO_SET_LHIP_TEMPERATURE, payload: data.toString()});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * getRHipTemperature() {
  try{
    let data = yield call(Nao.getRHipTemperature, null);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: NAO_SET_RHIP_TEMPERATURE, payload: data.toString()});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * getRunningBehaviors() {
  console.log("SALOPE");
  try{
    let data = yield call(Nao.getRunningBehaviors, null);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: NAO_SET_RUNNING_BEHAVIORS, payload: data});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * NaoSaga() {
  yield [
    takeLatest(NAO_CONNECT, connect),
    takeLatest(NAO_VERSION, version),
    takeLatest(NAO_SAY, say),
    takeLatest(NAO_BEHAVIOR, behavior),
    takeLatest(NAO_RASTA, rasta),
    takeLatest(NAO_GET_BEHAVIOR_LIST, behaviorList),
    takeLatest(NAO_STOP_ALL_BEHAVIOR, stopAllBehavior),
    takeLatest(NAO_MOVE, move),
    takeLatest(NAO_MOVE_HEAD, moveHead),
    takeLatest(NAO_GET_BATTERY, getBattery),
    takeLatest(NAO_GET_CPU_TEMPERATURE,getCPUTemperature),
    takeLatest(NAO_GET_LFOOT_WEIGHT, getLFootWeight),
    takeLatest(NAO_GET_RFOOT_WEIGHT, getRFootWeight),
    takeLatest(NAO_GET_LSHOULDER_TEMPERATURE, getLShoulderTemperature),
    takeLatest(NAO_GET_RSHOULDER_TEMPERATURE, getRShoulderTemperature),
    takeLatest(NAO_GET_LKNEE_TEMPERATURE, getLKneeTemperature),
    takeLatest(NAO_GET_RKNEE_TEMPERATURE, getRKneeTemperature),
    takeLatest(NAO_GET_LELBOW_TEMPERATURE, getLElbowTemperature),
    takeLatest(NAO_GET_RELBOW_TEMPERATURE, getRElbowTemperature),
    takeLatest(NAO_GET_LHIP_TEMPERATURE, getLHipTemperature),
    takeLatest(NAO_GET_RHIP_TEMPERATURE, getRHipTemperature),
    takeLatest(NAO_GET_RUNNING_BEHAVIORS, getRunningBehaviors),
    takeLatest(NAO_SHUTDOWN, shutdown),
  ];
}

export default NaoSaga;
