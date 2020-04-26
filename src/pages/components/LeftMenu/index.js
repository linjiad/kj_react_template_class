// eslint-disable-next-line
import React ,{ Component } from "react";
// 引入组件
import common from "common";
window.common = common;
const {LeftMenuWhite, LeftMenuItemWhite, LeftMenuSubWhite,Icon} = window.common;
class Menu extends Component {
    constructor(props){
        super(props);
    }
    state = {
        menuList:[],
        // loading:true,
    };
    componentDidMount(){
        this.setState({menuList:this.findChose(this.props.menuList)});
    }
    // 设置哪个菜单高亮方法
    findChose=(menuList)=>{
        const choseUrl = this.getUrlRelativePath();
        menuList.forEach((item,index)=>{
            if(Object.is(item.url,choseUrl)){
                item.checked = true;
            }else{
                item.checked = false;
                if(item.list.length>0){
                    item.list.forEach((item2,index2)=>{
                        if(Object.is(item2.url,choseUrl)){
                            item2.checked = true;
                        }else{
                            item2.checked = false;
                            if(item2.list.length>0){
                                item2.list.forEach((item3,index3)=>{
                                    if(Object.is(item3.url,choseUrl)){
                                        item3.checked = true;
                                    }else{
                                        item3.checked = false;
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
        return menuList;
    }
    // 获取当前url路径
    getUrlRelativePath = ()=> {
        let url = document.location.toString();
        let arrUrl = url.split("//");

        let start = arrUrl[1].indexOf("/");
        let relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

        if(relUrl.indexOf("?") !== -1){
            relUrl = relUrl.split("?")[0];
        }
        return relUrl;
    }
    select=(id,div)=>{
        this.props.getUrl(id);
    }
    render() {
        return (
            <div style={{width:"100%",height:"100vh"}}>
                <LeftMenuWhite>
                    {
                        this.state.menuList.map((item,index)=>{
                            if(item.list.length>0){
                                return (
                                    <LeftMenuSubWhite title={item.name} lv={1} icon = {item.icon} key={`${index}1`}>
                                        {
                                            item.list.map((item2,index2)=>{
                                                if(item2.list.length>0){
                                                    return (
                                                        <LeftMenuSubWhite title={item2.name} lv={2} icon = {item2.icon} key={`${index2}2`}>
                                                            {
                                                                item2.list.map((item3,index3)=>{
                                                                    return (
                                                                        <LeftMenuItemWhite lv={3} change={this.select.bind(this,item3.url)} key={`${index3}3`} checked={item3.checked}>
                                                                            <div>
                                                                                <Icon color="#ffffff" size="16px" type={item3.icon}/>
                                                                                <span style={{marginLeft:"10px"}}>{item3.name}</span>
                                                                            </div>
                                                                        </LeftMenuItemWhite>
                                                                    );
                                                                })
                                                            }
                                                        </LeftMenuSubWhite>
                                                    );}
                                                else{
                                                    return(
                                                        <LeftMenuItemWhite lv={2} change={this.select.bind(this,item2.url)} key={`${index2}1`}  checked={item2.checked}>
                                                            <div>
                                                                <Icon color="#ffffff" size="16px" type={item2.icon}/>
                                                                <span style={{marginLeft:"10px"}}>{item2.name}</span>
                                                            </div>
                                                        </LeftMenuItemWhite>
                                                    );
                                                }
                                            })
                                        }
                                    </LeftMenuSubWhite>
                                );}
                            else{return (
                                <LeftMenuItemWhite lv={1} change={this.select.bind(this,item.url)} key={`${index}1`} checked={item.checked}>
                                    <div onClick={this.check} style={{width:"100%"}}>
                                        <Icon color="#ffffff" size="16px" type={item.icon}/>
                                        <span style={{marginLeft:"10px"}}>{item.name}</span>
                                    </div>
                                </LeftMenuItemWhite>
                            );
                            }
                        })
                    }
                </LeftMenuWhite>
                {/*<Loading disaplay={this.state.loading}>*/}
                {/*</Loading>*/}
            </div>
        );
    }
}
export default Menu;
