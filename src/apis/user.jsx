import axios from "./axios";

export const apiGetUser = () => {
  return axios({
    url: "user/get-user",
    method: "get",
  });
};

export const apiDeleteUser = (uid) => {
  return axios({
    url: "user/delete-user/" + uid,
    method: "delete",
  });
};

export const apiCreateUser = (data) => {
  return axios({
    url: "user/create",
    method: "post",
    data,
  });
};

export const apiUpdateUser = (data, uid) => {
  return axios({
    url: "user/update-user/" + uid,
    method: "put",
    data,
  });
};
export const apiGetDetailUser = (uid) => {
  return axios({
    url: "user/get-detail-user/" + uid,
    method: "get",
  });
};
