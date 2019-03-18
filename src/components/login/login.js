
import React, { Component } from 'react';
import { NavBar, Flex, List, InputItem, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
import './login.css'
import axios from '../../http'
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uname: '',
            pwd: ''
        }
    }
    chagneValue = (k, v) => {

        this.setState({
            [k]: v
        })
    }
    handelLogin = async () => {
        const body = this.state
        const { history } = this.props
        const res = await axios.post(`users/login`, body)
        // console.log(res);

        const { data, meta } = res
        if (meta.status === 400) {
            Toast.fail(meta.msg, 1);
        } else {
            localStorage.setItem('token', data.token)
            history.push('/')
        }
    }
    render() {
        return (
            <Flex direction="column" justify="center">
                <Flex.Item><NavBar mode="dark">登录</NavBar></Flex.Item>
                <WhiteSpace></WhiteSpace>
                <Flex.Item><List >
                    <WingBlank size="sm"> <InputItem value={this.state.uname} clear
                        onChange={(v) => { this.chagneValue('uname', v) }}
                    >姓名</InputItem></WingBlank>
                    <WingBlank size="sm"> <InputItem value={this.state.pwd} type="password"
                        clear onChange={(v) => { this.chagneValue('pwd', v) }}
                    >密码</InputItem></WingBlank>
                    <WhiteSpace></WhiteSpace>
                    <WingBlank size="md"><Button type="primary" onClick={this.handelLogin}>登录</Button></WingBlank>
                </List></Flex.Item>
            </Flex>


        )
    }
}

export default Login
