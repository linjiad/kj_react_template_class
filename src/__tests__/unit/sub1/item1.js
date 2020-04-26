import React from "react";
// import ReactDOM from 'react-dom';
import { shallow } from "enzyme";
import Item1 from "../../../pages/content/sub1/item1";
// 封装公共方法
import {findTestWrapper} from "../../untils/testUtils";

describe("item1组件",()=>{
    it("渲染正常",()=>{
        const wrapper = shallow(<Item1 />);
        // 利用快照
        expect(wrapper).toMatchSnapshot();
    });

    it("含有一个input框", () => {
        const wapper = shallow(<Item1 />);
        const inputElem = findTestWrapper(wapper,"input");
        expect(inputElem.length).toBe(1);
    });

    it("组件初始化值为空", () => {
        const wapper = shallow(<Item1 />);
        const inputElem = findTestWrapper(wapper,"input");
        expect(inputElem.prop("value")).toEqual("");
    });
    it("当用户输入时，会跟随变化(监测state的值)", () => {
        const wapper = shallow(<Item1 />);
        const inputElem = findTestWrapper(wapper,"input");
        const userInput = "单元测试";
        // 模拟用户输入
        inputElem.simulate("change",{
            target:{value:userInput}
        });
        // 校验value的值
        expect(wapper.state("value")).toEqual(userInput);
        // 需要重新获取一下input
        const newInputElem = findTestWrapper(wapper,"input");
        expect(newInputElem.prop("value")).toEqual(userInput);
    });
});