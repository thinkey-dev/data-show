import request from '../request/index'

// 获取所有权限
export function getUsers(data) {
    return request({
        url: "user/getUsers",
        method: "post",
        data: data
    });
}
// 获取用户树
export function getUserTree() {
    return request({
        url: "user/getUserTree",
        method: "get",
        params: {}
    });
}
export function getUserProfit(data) {
    return request({
        url: "user/getUserProfit",
        method: "post",
        data: data
    });
}
export function getVote(data) {
    return request({
        url: "user/getVote",
        method: "post",
        data: data
    });
}

export function getVoteDetail(data) {
    return request({
        url: "user/getVoteDetail",
        method: "post",
        data: data
    });
}

