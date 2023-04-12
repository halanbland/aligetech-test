import axiosInstance from "./configInstance";

const API_PATH = {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    GET_LIST_POST: "/posts",
    GET_SLIDER: "/galleries",
    ADD_DATA: "/posts",
    GET_POST_TAG: "/posts/tags",
    DLETE_DATA: "/posts/",
};

export const UseLogin = async (username) => {
    return await axiosInstance.post(API_PATH.LOGIN, { username });
};
export const ListSlider = async () => {
    return await axiosInstance.get(API_PATH.GET_SLIDER);
};
export const AddDataTable = async (data) => {
    return await axiosInstance.post(API_PATH.ADD_DATA, data);
};
export const GetListPost = async (search) => {
    console.log(search);
    return await axiosInstance.get(API_PATH.GET_LIST_POST, { params: search });
};
export const GetTags = async () => {
    return await axiosInstance.get(API_PATH.GET_POST_TAG);
};
export const DeleteData = async (id) => {
    return await axiosInstance.delete(API_PATH.DLETE_DATA + id);
};
export const UpdateData = async (id, data) => {
    return await axiosInstance.patch(API_PATH.DLETE_DATA + id, data);
};
