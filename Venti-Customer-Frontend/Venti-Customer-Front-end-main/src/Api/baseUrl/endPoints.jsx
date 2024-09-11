/* eslint-disable no-unused-vars */
import Post from "./post";
import get from "./get";
import Delete from "./delete";
import Put from "./put";

const EndPoints = {
    Auth: {
        login: (data) => Post('/auth/login', data),
        register: (data) => Post('/auth/register', data),
        verify_otp: (data) => Post('/auth/verify-otp', data),
        resend_otp: (data) => Post('auth/resend-otp', data),
        forgot_password: (data) => Post('/auth/reset-pwd-otp', data),
        reset_password: (data) => Post('/auth/update-forgot-pwd', data),
        delete_users:() => Delete('/auth/delete-user'),
    },
    Settings: {
        update_password: (data) => Put('/auth/update-password', data),
        creator_uploads: (data) => Post("/auth/create-creator-user", data),
        become_creator: (data) => Post('auth/create-creator-user'),
    },
    profile: {
        fetch_user_profile: () => get("/auth/all-user-details"),
        update_profile: (data) => Put("auth/update-user-profile", data),
    },
    posts: {
        create_post: (data) => Post("/post/", data),
        fetch_all_posts: () => get('/post/'),
        like_post: (id) => Post(`/post/${id}/like`),
        comment_post: (id, data) => Post(`/post/${id}/comment`, data),
        fetch_users_posts:()=>get('/post/userposts'),
        delete:(id)=>Delete(`/post/${id}`),
        fetch_post:(id)=>get(`/post/specific-post/${id}`),
    },
    events: {
        fetch_all_events: () => get('/event/all-events'),
        create_event: (data) => Post('/event/create', data),
        fetch_by_id: (id) => get(`/event/eventById/${id}`),
        fetch_creator_events: () => get('/event/userEvents'),
        update_event: (id, data) => Put(`/event/update/${id}`, data),
        delete_event: (id) => Delete(`/event/delete/${id}`),
    },
    tickects:{
        purchase:(data)=>Post('/ticket/purchase-ticket', data),
    },
}
export default EndPoints;