import { Request } from "./request";

export const registerAdmin = async (data) => {
  return Request.call({
    url: "/admin/register",
    method: "POST",
    data,
  });
};

export const loginAdmin = async (data) => {
  return Request.call({
    url: "/admin/login",
    method: "POST",
    data,
  });
};

export const getCustomerOrder = async () => {
  return Request.call({
    url: `/order/getOrder`,
    method: "GET",
  });
};

export const addFood = async (data) => {
  return Request.call({
    url: "/food/addFood",
    method: "POST",
    data,
  });
};

export const getFoods = async () => {
  return Request.call({
    url: `/food/getFood`,
    method: "GET",
  });
};

export const updateFood = async (userId, data) => {
  return Request.call({
    url: `/food/updateFood/${userId}`,
    method: "PUT",
    data,
  });
};

export const deleteFood = async (foodId) => {
  return Request.call({
    url: `/food/deleteFood/${foodId}`,
    method: "DELETE",
  });
};
