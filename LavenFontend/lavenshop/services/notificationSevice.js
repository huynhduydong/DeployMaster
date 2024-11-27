import axios from "axios";

const getAllNotifications = async (pageNo, pageSize) => {
  try {
    const res = await axios.get("http://localhost:8080/api/v1/notifications", {
      params: {
        pageNo,
        pageSize,
      },
    });
    if (res && res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const createNotification = async (notifications) => {
  let data = notifications;

  let config = {
    maxBodyLength: Infinity,
    headers: {
        "X-Auth-User-Id": "1",  
    },
  };

  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1/notifications",
      data,
      config
    );
    if (res && res.data) {
      return res;
    }
  } catch (error) {
    return error.response;
  }
};

const updateNotificationById = async (notifications, id) => {
  let data = notifications;

  let config = {
    maxBodyLength: Infinity,
    headers: {
        "X-Auth-User-Id": "1",  
    },
  };

  try {
    const res = await axios.put(
      `http://localhost:8080/api/v1/notifications/${id}`,
      data,
      config
    );
    if (res && res.data) {
      return res;
    }
  } catch (error) {
    return error.response;
  }
};

const deleteNotificationById = async (id) => {
  let config = {
    maxBodyLength: Infinity,
    headers: {
        "X-Auth-User-Id": "1",  
    },
  };

  try {
    const res = await axios.delete(
      `http://localhost:8080/api/v1/notifications/${id}`,
      config
    );
    if (res && res.data) {
      return res;
    }
  } catch (error) {
    return error.response;
  }
};

const getShockNotificationById = async (id) => {
  let config = {
    maxBodyLength: Infinity,
    headers: {
      "X-Auth-User-Id": "1",  
    },
  };

  try {
    const res = await axios.get(
      `http://localhost:8080/api/v1/notifications/shock/${id}`,
      config
    );
    if (res && res.data) {
      return res.data;
    }
  } catch (error) {
    return error.response;
  }
};

const searchNotificationByTitle = async (title, pageNo, pageSize) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/v1/notifications/search?title=${title}`,
      {
        params: {
          pageNo: pageNo,
          pageSize: pageSize,
        },
      }
    );
    if (res && res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllNotifications,
  createNotification,
  updateNotificationById,
  deleteNotificationById,
  getShockNotificationById,
  searchNotificationByTitle,
};