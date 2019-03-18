
import React, { Component } from 'react';
import { SearchBar, WingBlank, Carousel, Grid } from 'antd-mobile'
import axios from '../../http';
class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {

            imgHeight: 176,
            imagesData: [],
            menuData: [],
            data: Array.from(new Array(8)).map((_val, i) => ({
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: `name${i}`,
            }))

        }
    }
    getHomeData = async (path) => {
        const res = await axios.post(`${path}`)
        const { data, meta } = res
        // console.log(data);
        if (meta.status === 200) {
            return data.list
        }
    }
    componentDidMount = async () => {

        let imagesData = this.getHomeData('homes/swipe')
        let menuData = this.getHomeData('homes/menu')

        const dataList = await Promise.all([imagesData, menuData])
        console.log(dataList);

        this.setState({
            imagesData: dataList[0],
            menuData: dataList[1]
        }, () => {
            let data = this.state.menuData.map((item, i) => {
                return {
                    icon: `http://127.0.0.1:8086/public/0${i+1}.png`,
                    text: item.menu_name,
                }
            })
            this.setState({
                data
            })
        })
    }
    render() {
        const CarouseTemplate = this.state.imagesData.map((item, i) => {
            return (
                <a key={i}
                    href="/"
                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                    <img
                        src={item.original}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                        }}
                    />
                </a>
            )
        })
        // const 

        return (<div>
            {/* 搜索框 */}
            <SearchBar placeholder="请输入搜索关键字" maxLength={8} />
            <WingBlank size="sm">
                <Carousel infinite>
                    {CarouseTemplate}
                </Carousel>
                <Grid data={this.state.data} onClick={_el => console.log(_el)} />
            </WingBlank>
        </div>)
    }
}

export default Main
