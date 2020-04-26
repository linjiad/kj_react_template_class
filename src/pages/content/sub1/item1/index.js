import React ,{ Component } from "react";
import myLess from "./index.less";
class Item1 extends Component {
    constructor(){
        super();
    }
    state = {
        value:""
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                sub1_item1
                <input data-test="input" value={this.state.value} onChange={(event)=>this.setState({value:event.target.value})}/>
            </div>
        );
    }
}
export default Item1;
