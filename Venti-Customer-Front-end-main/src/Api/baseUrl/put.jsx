import instance from "../axios";

const Put = (url, body, params) => instance.put(url, body, { ...params });
export default Put;