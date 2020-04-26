import APP from "../pages/content/App";
import Sub2 from "../pages/content/sub2/App";
import Sub2Item1 from "../pages/content/sub2/item1";
import Sub2Item2 from "../pages/content/sub2/item2";
import Sub1 from "../pages/content/sub1/App";
import Sub1Item1 from "../pages/content/sub1/item1/index";
import Sub1Item2 from "../pages/content/sub1/item2/index";
import {Component} from "react";
class RouterConfig extends Component {
    constructor(){
        super();
        this.config = [
            {path : "/", name : "首页", component : APP, check : false, exact:true},
            {path : "/sub1", name : "sub1", component : Sub1, check : false,
                routes : [
                    {path : "/sub1/item1", name : "item1", component : Sub1Item1, check : false},
                    {path : "/sub1/item2", name : "item2", component : Sub1Item2, check : false},
                ]
            },
            {path : "/sub2", name : "sub2", component : Sub2, check : false,
                routes : [
                    //Basic ---------------------------------------------------------------------------------------------
                    {path : "/sub2/item1", name : "item1", component : Sub2Item1, check : false},
                    {path : "/sub2/item2", name : "item2", component : Sub2Item2, check : false},
                ]
            },
        ];
    }
}

export default RouterConfig;
