import axios from "axios";

const register = async (username, name, email, password) => {
  try {
    const res = await axios.post("http://localhost:8080/api/v1/auth/signup", {
      username: username,
      name: name,
      email: email,
      password: password,
    });

    if (res && res.data) {
      return res.data;
    }
  } catch (error) {
    // return { title: "Error", message: "Something went wrong with server" };
    return error.response.data;
  }
};

export { register };