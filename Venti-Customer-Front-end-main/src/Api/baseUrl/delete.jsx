import instance from "../axios";

const Delete = (url, body, params) => instance.delete(url, body, { ...params });
export default Delete;