import axios from "axios";

const checkUserAuthLoader = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/token/gettokendetails",
      {
        withCredentials: true,
      }
    );
    console.log("Loader ", res.data);
    return res.data;
  } catch (err) {
    throw new Response("Unauthorized", {
      status: 302,
      headers: { Location: "/login" },
    });
  }
};

export default checkUserAuthLoader;
