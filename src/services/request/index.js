import ajax from "ajax";

const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
};
/**
 * post请求
 * @param {data.url} 路径
 * @param {data.params} 参数
 * @param {data.headers} 请求头
 * @return 成功或失败的值
 * */
export function post (data){
    const promise = new Promise((resolve, reject) => {
        ajax.post({
            url:data.url,
            headers,
            params:data.params,
            type:data.type
        }).then((resultJson) => {
            if(resultJson.code === 1){
                resolve(resultJson);
            }else if (resultJson.code === 20008){
                console.log("token过期这里需要跳转到登录页面");
                window.location.href=`${window.logInUrl}&url=http://${window.location.host}`;
            }else {
                reject(resultJson);
            }
        }).catch((errMsg) => {
            reject(errMsg);
        });
    });
    return promise;
}


/**
 * get请求
 * @param {data.url} 路径
 * @param {data.params} 参数
 * @param {data.headers} 请求头
 * @return 成功或失败的值
 * */
export function get (data){
    const promise = new Promise((resolve, reject) => {
        ajax.get({
            url:data.url,
            headers,
            params:data.params,
            type:data.type
        }).then((resultJson) => {
            if(resultJson.code === 1){
                resolve(resultJson);
            }else if (resultJson.code === 20008){
                console.log("token过期这里需要跳转到登录页面");
                window.location.href=`${window.logInUrl}&url=http://${window.location.host}`;
            }else {
                reject(resultJson);
            }
        }).catch((errMsg) => {
            reject(errMsg);
        });
    });
    return promise;
}

/**
 * del请求
 * @param {data.url} 路径
 * @param {data.params} 参数
 * @param {data.headers} 请求头
 * @return 成功或失败的值
 * */
export function del (data){
    const promise = new Promise((resolve, reject) => {
        ajax.del({
            url:data.url,
            headers,
            params:data.params,
            type:data.type
        }).then((resultJson) => {
            if(resultJson.code === 1){
                resolve(resultJson);
            }else if (resultJson.code === 20008){
                console.log("token过期这里需要跳转到登录页面");
                window.location.href=`${window.logInUrl}&url=http://${window.location.host}`;
            }else {
                reject(resultJson);
            }
        }).catch((errMsg) => {
            reject(errMsg);
        });
    });
    return promise;
}

