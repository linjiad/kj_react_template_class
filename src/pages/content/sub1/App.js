import React,{ Component } from "react";
import { Route,Redirect} from "react-router-dom";
import appLess from "./App.less";
import Menu from "../../components/LeftMenu/index";
import checkConfig from "../../../router/check";

class App extends Component {
    constructor(props) {
        super(props);
        this.Check = new checkConfig();
    }
    state = {
        menuList:[
            {
                name:"sub1_item1",
                key: "01",
                icon: " ",
                url: "/sub1/item1",
                list:[],
            },
            {
                name:"sub1_item2",
                key: "01",
                icon: " ",
                url: "/sub1/item2",
                list:[],
            },
        ],
    }
    getUrl = url =>{
        this.props.history.push(url); // 需要获取APP中的props的history
    }
    render() {
        {/*<div className="content" id="particles-js">*/}
        return (
            <div className={appLess.content}>
                <div className={appLess.mainLeft} >
                    <Menu menuList = {this.state.menuList} getUrl={this.getUrl}></Menu>
                </div>
                <div className={appLess.mainRight}>
                    {
                        this.props.routes.map((route,key)=>{
                            return <Route key={key} exact path={route.path} component={route.component}/>;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default App;
