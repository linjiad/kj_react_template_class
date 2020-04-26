import a from "db";
const db = new a.indexDB();
const dbMes = {
    dbName:"linjiad",
    dbVersion:1,
    tableName:"lintable",
    mainKey:"id",
    dataList:[
        {
            indexName:"id",
            indexType:"id",
            unique:false
        },
        {
            indexName:"name",
            indexType:"name",
            unique:true
        },
        {
            indexType:"url",
            unique:true
        },
    ]
};
const add = {
    tableName:"lintable",
    data:{id: 1, name: "zhuangyea" ,url:"123"}
};
const add2 = {
    tableName:"lintable",
    data:{id: 2, name: "linjiad",url:"33333"}
};
const read = {
    tableName:"lintable",
    id:1
};
const read2 = {
    tableName:"lintable",
    key:"name",
    value:"linjiad"
};
async function fn(){
    await db.openDB(dbMes);
    await db.addData(add);
    await db.addData(add2);
    console.log(await db.readData(read));
    console.log(await db.suoyin(read2));
    await db.clearData("lintable");
}
fn();