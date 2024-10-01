import instance from "../axios";

const get = (url, body, params) => instance.get(url, body, { ...params });
export default get;