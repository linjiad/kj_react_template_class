class Constant {
    constructor() {
        this.ipConfig= "127.0.0.1:8080";
        this.apiConfig = {
            url: this.getPost(this.ipConfig,"/api/api"),
            author: "name",
            name: "接口地址"
        };
    }
    getPost(ip,url) {
        return `http://${ip}${url}`;
    }
    getGet(ip,url) {
        return `http://${ip}${url}`;
    }
}

export default { Constant };
