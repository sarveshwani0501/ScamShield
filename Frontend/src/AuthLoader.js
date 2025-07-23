import axios from "axios";
import { API_ENDPOINTS } from "./config/api.js";

const checkUserAuthLoader = async () => {
  try {
    const res = await axios.get(
      API_ENDPOINTS.TOKEN.GET_DETAILS,
      {
        withCredentials: true,
      }
    );
    console.log("Loader ", res.data);
    return res.data;
  } catch (error) {
    console.log(error)
    throw new Response("Unauthorized", {
      status: 302,
      headers: { Location: "/login" },
    });
  }
};

export default checkUserAuthLoader;
