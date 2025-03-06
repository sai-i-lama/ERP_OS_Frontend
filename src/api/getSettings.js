import axios from "axios";

const getSetting = async () => {
  try {
    const res = await axios.get(`setting`)
    
    return {
      result: res.data,
      message: "success",
    };
    // return data;
  } catch (error) {
    console.log(error.message);
  }
}

export default getSetting;