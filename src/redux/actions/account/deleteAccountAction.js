import { DELETE_ACCOUNT } from "../../types/AccountType";

import axios from "axios";

const deleteAccountAction = (id) => {
  return {
    type: DELETE_ACCOUNT,
    payload: id,
  };
};

export const deleteAccount = (id) => {
  //dispatching with an call back function and returning that
  return async (dispatch) => {
    try {
      await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `account/${id}`,
      });
      //dispatching data
      dispatch(deleteAccountAction(id));
    } catch (error) {
      console.log(error.message);
    }
  };
};
