import {
  ON_INIT_DASHBOARD,
  ON_SELECT_DRIVE,
  SET_DRIVE_DETAILS

}
  from '../actions/ActionType';


const initialState = {
  selectedDrive: "",
  drivePath: "",
  driveDetails: [],
  driveFetchStatus: false,
  previousPath: ""

}

const Dashboard = (state = initialState, action) => {
  let localState = Object.assign({}, state);
  switch (action.type) {
    case ON_INIT_DASHBOARD:
      localState.selectedDrive = "";
      localState.drivePath = "";
      localState.previousPath = "";
      localState.driveDetails = [];
      localState.driveFetchStatus = false;
      return localState;
    case ON_SELECT_DRIVE:
      localState.selectedDrive = action.selectedDrive;
      localState.drivePath = action.drivePath;
      return localState;
    case SET_DRIVE_DETAILS:
      localState.driveDetails = [...action.driveDetails];
      localState.driveFetchStatus = action.apiStatus;
      localState.drivePath = action.drivePath;
      localState.previousPath = action.previousPath;
      return localState;
    default:
      return localState;
  }
};

export default Dashboard;