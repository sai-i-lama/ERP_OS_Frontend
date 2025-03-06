import { DASHBOARD } from "../../types/DashboardType";
import axios from "axios";

const getDashboardData = (data) => {
  return {
    type: DASHBOARD,
    payload: data,
  };
};

export const loadDashboardData = ({ startdate, enddate }) => {
  //dispatching with an call back function and returning that
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `dashboard?startdate=${startdate}&enddate=${enddate}`
      );
      //dispatching data
      dispatch(getDashboardData(data));
    } catch (error) {
      console.log(error.message);
    }
  };
};
