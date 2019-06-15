// Taken from https://github.com/MythTV/mythtv/blob/36a1ff5a6fdefe4da0e4c39c6605ddb87611baea/mythtv/html/tv/js/constants.js
const RecStatusMap = {
  '-15': {Name: 'Pending', Color: 'green', Active: true},
  '-14': {Name: 'Failing', Color: 'red', Active: false},
  '-13': {Name: 'Other Recording', Color: 'yellow', Active: false},     // Deprecated , Active: false
  '-12': {Name: 'Other Tuning', Color: 'yellow', Active: false},        // Deprecated , Active: false
  '-11': {Name: 'Missed', Color: 'red', Active: false},
  '-10': {Name: 'Tuning', Color: 'green', Active: true},
  '-9' : {Name: 'Recorder Failed', Color: 'red', Active: false},
  '-8' : {Name: 'Tuner Busy', Color: 'red', Active: false},
  '-7' : {Name: 'Low Disk Space', Color: 'red', Active: false},
  '-6' : {Name: 'Manual Cancel', Color: 'red', Active: false},
  '-5' : {Name: 'Missed', Color: 'red', Active: false},
  '-4' : {Name: 'Aborted', Color: 'red', Active: false},
  '-3' : {Name: 'Recorded', Color: 'green', Active: true},
  '-2' : {Name: 'Recording', Color: 'green', Active: true},
  '-1' : {Name: 'Will Record', Color: 'green', Active: true},
  '0'  : {Name: 'Unknown', Color: 'red', Active: false},
  '1'  : {Name: 'Don\'t Record', Color: 'yellow', Active: false},
  '2'  : {Name: 'Previously Recorded', Color: 'yellow', Active: false},
  '3'  : {Name: 'Currently Recorded', Color: 'yellow', Active: false},
  '4'  : {Name: 'Earlier Showing', Color: 'yellow', Active: false},
  '5'  : {Name: 'Max Recordings', Color: 'yellow', Active: false},
  '6'  : {Name: 'Not Listed', Color: 'yellow', Active: false},
  '7'  : {Name: 'Conflicting', Color: 'red', Active: false},
  '8'  : {Name: 'Later Showing', Color: 'yellow', Active: false},
  '9'  : {Name: 'Repeat', Color: 'yellow', Active: false},
  '10' : {Name: 'Inactive', Color: 'yellow', Active: false},
  '11' : {Name: 'Never Record', Color: 'yellow', Active: false},
  '12' : {Name: 'Recorder Off-Line', Color: 'red', Active: false},
};

const RecTypes = [
  'Not Recording',
  'Single Record',
  'Record One',
  'Record All',
  'Record Daily',
  'Record Weekly',
  'Override Recording',
  'Do not Record',
  'Recording Template',
];

const DupMethods = [
  'None',
  'Subtitle',
  'Description',
  'Subtitle and Description',
  'Subtitle then Description',
];

const DupIn = [
  'Current Recordings',
  'Previous Recordings',
  'All Recordings',
  'New Episodes Only',
];

export { RecStatusMap, RecTypes, DupMethods, DupIn };