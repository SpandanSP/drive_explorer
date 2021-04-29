import axios from 'axios';
import { toast } from 'react-toastify';
import serverConfig from '../config/serverConfig.json';
import {
  ON_INIT_DASHBOARD,
  ON_SELECT_DRIVE,
  SET_DRIVE_DETAILS
} from './ActionType';



//On Init
export const onInitDashboard = () => {
  return dispatch => {
    return dispatch(initState());
  };
};

export const initState = () => {
  return {
    type: ON_INIT_DASHBOARD
  };
};

//Select Drive
export const handleselectedDrive = (drive) => {
  return dispatch => {
    console.log("Selected ---->", drive.target.value);
    return dispatch(setDriveValue(drive.target.value));
  };
};

export const setDriveValue = (drive) => {
  return {
    type: ON_SELECT_DRIVE,
    selectedDrive: drive,
    drivePath: drive
  };
};


//Submit
export const onSubmit = (props, key) => {
  return dispatch => {
    console.log("props --->", props);
    let drivePath = props.drivePath;
    if(key === "back") {
      drivePath = props.previousPath;
    }
    if(key === "home") {
      drivePath = props.selectedDrive;
    }
    let driveDetails;
    let data = {
      "drivePath": drivePath
    }
    return axios.post(`${serverConfig.API_URL}/getDriveDetails`, data, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }).then(response => {
      console.log("API Response --->", response);
      if (response.data.status) {
        driveDetails = response.data.data;
        console.log("driveDetails --->", driveDetails);
        let finalData = {
          "driveDetails": driveDetails,
          "apiStatus": true,
          "drivePath": drivePath,
          "previousPath": drivePath
        };
        dispatch(setDriveDetails(finalData));
      }
      else {
        toast.error(response.data.message, { containerId: 'toastMsg' });
        let finalData = {
          "driveDetails": [],
          "apiStatus": false,
          "drivePath": drivePath,
          "previousPath": drivePath
        };
        dispatch(setDriveDetails(finalData));
      }
    })

  }
};


export const setDriveDetails = (finalData) => {
  return {
    type: SET_DRIVE_DETAILS,
    driveDetails: finalData.driveDetails,
    apiStatus: finalData.apiStatus,
    drivePath: finalData.drivePath,
    previousPath: finalData.previousPath
  }
}


//View
export const viewDetails = (detail, props) => {
  return dispatch => {
    console.log("detail --->", detail);
    if (!detail.isDir) {
      toast.error("Please select a directory!", { containerId: 'toastMsg' });
    }
    else {
      let pathArray = props.drivePath.split("/");
      let drivePath = "";
      if (pathArray[pathArray.length - 1] !== "") {
        drivePath = props.drivePath + "/" + detail.fileName;
      }
      else {
        drivePath = props.drivePath + detail.fileName;
      }
      let driveDetails;

      let data = {
        "drivePath": drivePath
      }
      return axios.post(`${serverConfig.API_URL}/getDriveDetails`, data, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }).then(response => {
        console.log("API Response --->", response);
        if (response.data.status) {
          driveDetails = response.data.data;
          console.log("driveDetails --->", driveDetails);
          let finalData = {
            "driveDetails": driveDetails,
            "apiStatus": true,
            "drivePath": drivePath,
            "previousPath": props.drivePath
          };
          dispatch(setDriveDetails(finalData));
        }
        else {
          toast.error(response.data.message, { containerId: 'toastMsg' });
          let finalData = {
            "driveDetails": [],
            "apiStatus": false,
            "drivePath": drivePath,
            "previousPath": props.drivePath
          };
          dispatch(setDriveDetails(finalData));
        }
      })
    }



  }
};