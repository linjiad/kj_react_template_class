// 实用工具类
class Utile {
    /**
     * list转换成string
     * @param {List} list-传过来的list
     * @param {string} key-list中每个对象的key
     * @param{any} value-list中每个对象的value
     * @return list转换成的string
     * */
    listObjectToStr= (list,key,value) => {
        let str = "";
        list.forEach((item)=>{
            str = `${str}"${item[key]}":"${item[value]}",`;
        });
        str = `{${str.substring(0,str.length-1)}}`;
        return str;
    }
    /**
     * string转换成list
     * @param {string} str-传过来的string
     * @param {string} key-list中每个对象的key
     * @param{any} value-list中每个对象的value
     * @return string转换成的list（[{key:value}]）
     * */
    strToListObject= (str,key,value) => {
        let list = [];
        const map = eval("("+str+")");
        for (let item in map){
            list.push({
                [key]: item,
                [value]:map[item]
            });
        }
        return list;
    }
    /**
     * 过滤参数
     * @param {Object} json-需要过滤的json
     * @param {Object} model-需要过滤成的json模板
     * @return 过滤后的json
     * */
    filterParameter = (json,model)=>{
        const map = {};
        for(let key in model){
            map[key] = json[key];
        }
        return map;
    }
    /**
     * 给json中的属性赋值
     * @param {Object} form-需要修改的json.
     * @param {string} key-需要修改的json的key.
     * @param {any} value-修改的值.
     * @return 修改值后的json
     * */
    copyJson = (form,key,value)=>{
        const result = {};
        const formNew = {
            [key]:value
        };
        Object.assign(result,form,formNew);
        return result;
    }
    /**
     * 过滤json的空对象
     * @param {json} json-传过来的json
     * @return 过滤出空对象的json
     * */
    filterJson= (json) => {
        let jsonNew = {};
        for (let item in json){
            if(json[item]){
                jsonNew[item] = json[item];
            }
        }
        return jsonNew;
    }
    /**
     * string转换成list
     * @param {string} str-传过来的str
     * @return 返回list
     * */
    strToList= (str) => {
        return  str.split(",");
    }
    /**
     * list转换成string
     * @param {List} list-传过来的list
     * @return 返回list
     * */
    listToStr= (list) => {
        let str = "";
        list.forEach((item)=>{
            str = `${str}${item},`;
        });
        str=(str.substring(str.length-1)===",")?str.substring(0,str.length-1):str;
        return  str;
    }
}
export default Utile;