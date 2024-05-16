import axios from "axios";
import { userByIdURL } from "./APIRoutes";

const userById = async () => {
  try {
    const response = await axios.get(`${userByIdURL}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          process.env.REACT_APP_LOCALHOST_KEY
        )}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default userById;
