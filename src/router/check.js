import common from "common";
const { message } = common;
// 校验方法
class Check {
    constructor(){}
    loginCheck(url){
        const self = this;
        // 先判断，如果是带token的url
        if(this.getRequest().token){
            // 把token放入浏览器缓存
            db.setStorage("token",this.getRequest().token,1800000000);
            // 把username放入浏览器缓存
            db.setStorage("userName",decodeURIComponent(this.getRequest().userName),1800000000);
            // 把userId放入浏览器缓存
            db.setStorage("userId",decodeURIComponent(this.getRequest().userId),1800000000);
            // 把account放入浏览器缓存
            db.setStorage("account",decodeURIComponent(this.getRequest().account),1800000000);
            // 正常页面跳转到刚才去的路径
            // window.location.href = localStorage.getItem("toUel");
            // console.log("这个验证过了"+url);
            // return true;
        }// 如果不带token的url则进行下面判断
        else{
            window.scrollTo(0, 0); // 每次跳转页面都回到最顶层
            // 把要前往的路径放到本地缓存中
            // localStorage.setItem("toUel", url);
            if(db.getStorage("token")){ // 判断是否有token
                // 判断是否具有权限
                if(localStorage.getItem("routerList").includes(url)){
                    return true;
                }else{
                    message.erro(`您不具备该页面访问权限`,5);
                }
            }else{ // 跳转登录页面
                window.location.href=`${window.logInUrl}&url=http://${window.location.host}${url}`;
            }
        }
        // window.scrollTo(0, 0); // 每次跳转页面都回到最顶层
        // console.log(`${url}验证`);
        // return true; // 验证通过
    }
    // 把返回的url处理处token和user
    getRequest() {
        const url = window.location.search; //获取url中"?"符后的字串
        let map = {};
        if (url.indexOf("?") !== -1) {
            let str = url.substr(1);
            const strs = str.split("&");
            strs.forEach((item)=>{
                map[item.split("=")[0]] = item.split("=")[1];
            });
        }
        return map;
    }
}
export default Check;