import supplierReducer from "./reducers/supplierReducer";
import productReducer from "./reducers/productReducer";
import purchaseReducer from "./reducers/purchaseReducer";
import userReducer from "./reducers/userReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import customerReducer from "./reducers/customerReducer";
import saleReducer from "./reducers/saleReducer";
import supplierPaymentReducer from "./reducers/supplierPaymentReducer";
import accountReducer from "./reducers/accountReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import transactionReducer from "./reducers/transactionReducer";
import productCategoryReducer from "./reducers/productCategoryReducer";
import designationReducer from "./reducers/designationReducer";

const store = createStore(
	combineReducers({
		suppliers: supplierReducer,
		products: productReducer,
		purchases: purchaseReducer,
		customers: customerReducer,
		sales: saleReducer,
		users: userReducer,
		supplierPayments: supplierPaymentReducer,
		accounts: accountReducer,
		dashboard: dashboardReducer,
		transactions: transactionReducer,
		productCategories: productCategoryReducer,
		designations: designationReducer,
	}),

	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
