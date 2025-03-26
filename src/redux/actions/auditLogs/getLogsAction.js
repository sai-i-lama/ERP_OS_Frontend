import { LOGS } from "../../types/AuditLogsType";
import axios from "axios";
import { toast } from "react-toastify";

const getLogsAction = (data) => {
  return {
    type: LOGS,
    payload: data,
  };
};

const loadAllLogs = ({ page, limit, startdate, enddate }) => {
  return async (dispatch) => {
    try {
      console.log("Fetching logs with:", { page, limit, startdate, enddate });
      const { data } = await axios.get(
        `/audit-logs?page=${page}&limit=${limit}&startdate=${startdate}&enddate=${enddate}`
      );

      console.log("Response data:", data);
      // Assurez-vous que `data` contient les propriétés `logs` et `total`
      dispatch(getLogsAction({
        logs: data|| [], // Assurez-vous que `logs` est présent dans la réponse
        total: data.total || 0 // Assurez-vous que `total` est présent dans la réponse
      }));
    } catch (error) {
      console.log(error.message);
      toast.error("Erreur de chargement des logs");
    }
  };
};



export default loadAllLogs;