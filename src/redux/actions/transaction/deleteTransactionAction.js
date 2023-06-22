// import { DELETE_SUPPLIER_PAYMENT } from "../../types/SupplierPaymentType";
// import axios from "axios";

// const deleteSupplierPaymentAction = (id) => {
//   return {
//     type: DELETE_SUPPLIER_PAYMENT,
//     payload: id,
//   };
// };

// export const deleteSupplierPayment = (id) => {
//   //dispatching with an call back function and returning that
//   return async (dispatch) => {
//     try {
//       await axios({
//         method: "delete",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json;charset=UTF-8",
//         },
//         url: `transaction/${id}`,
//       });
//       //dispatching data
//       dispatch(deleteSupplierPaymentAction(id));
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// };
