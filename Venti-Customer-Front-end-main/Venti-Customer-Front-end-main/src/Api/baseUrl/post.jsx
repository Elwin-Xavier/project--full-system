import instance from "../axios";

const Post = (url, body, params) => instance.post(url, body, { ...params });
export default Post;