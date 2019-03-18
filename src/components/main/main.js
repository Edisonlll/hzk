
import React, { Component } from 'react';
import { SearchBar, WingBlank, Carousel, Grid, NoticeBar, WhiteSpace, Card, Badge } from 'antd-mobile'
import axios from '../../http';
const badegStyle = {
    marginLeft: 12,
    padding: '0 5px',
    backgroundColor: '#fff',
    borderRadius: 2,
    color: '#f19736',
    border: '1px solid #f19736',
}
const hstyle = {
    padding: 0,
    margin: 5
}
const thumbStyle = {
    width: '125px',
    height: '95px'
  }
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
            })),
            infoData: [],
            faqData: [],
            houseData: [],
            newHouseData: []

        }
    }
    //分割数组
    fn = (arr, ...test) => {
        let temp = []
        for (var i = 0; i < test.length; i++) {
            temp.push(arr.splice(0, test[i]))
        }
        return temp
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
        let infoData = this.getHomeData('homes/info')
        let faqData = this.getHomeData('homes/faq')
        let houseData = this.getHomeData('homes/house')

        const dataList = await Promise.all([imagesData, menuData, infoData, faqData, houseData])
        console.log(dataList);

        this.setState({
            imagesData: dataList[0],
            menuData: dataList[1],
            infoData: dataList[2],
            faqData: dataList[3],
            houseData: dataList[4]
        }, () => {
            let data = this.state.menuData.map((item, i) => {
                return {
                    icon: `http://127.0.0.1:8086/public/0${i + 1}.png`,
                    text: item.menu_name,
                }
            })
            const newHouseData = this.fn(this.state.houseData, 2, 2, 3)
            this.setState({
                data,
                newHouseData
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
        const InfoDataTemplate = this.state.infoData.map((item, i) => {
            return (
                <NoticeBar mode="link" action={<span>去看看</span>} key={i} marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }} U>
                    {item.info_title}
                </NoticeBar>)
        })

        let faqTemplate = this.state.faqData.map((item, i) => {
            return (
                <Card full key={i}>
                    <Card.Header
                        title={item.question_name}
                        thumb={<Badge text="hot" hot />}
                    />
                    <Card.Body>
                        <div>
                            <Badge text={item.question_tag} style={badegStyle}
                            />
                            <Badge text={item.answer_content} style={badegStyle}
                            />
                            <Badge text={item.atime} style={badegStyle}
                            />
                            <Badge text={item.qnum} style={badegStyle}
                            />
                        </div>
                    </Card.Body>

                </Card>
            )
        })
        faqTemplate = [<h3 key='aaa' style={hstyle}>好客问答</h3>, ...faqTemplate]


        const houseTemplate = this.state.newHouseData.map((item, i) => {
            const houseTemplateItem = item.map((item2, j) => {
                return (
                    <Card key={j}>
                        <Card.Header
                            // title="This is title"
                            thumb="http://127.0.0.1:8086/public/home.png"
                            thumbStyle={thumbStyle}
                            extra={
                                <div>
                                    <Badge text={item2.home_name} style={badegStyle} />
                                    <Badge text={item2.home_price} style={badegStyle} />
                                    <Badge text={item2.home_desc} style={badegStyle} />
                                    <Badge text={item2.home_tags} style={badegStyle} />
                                </div>
                            }
                        />
                    </Card>
                )
            })
            let titles = ['最新开盘', '二手精选', '组个家']
            return (
                <div key={i}>
                    <h3 style={hstyle}>{titles[i]}</h3>
                    {houseTemplateItem}
                </div>)
        })
        return (<div>
            {/* 搜索框 */}
            <SearchBar placeholder="请输入搜索关键字" maxLength={8} />
            <WingBlank size="sm">
                <Carousel infinite>
                    {CarouseTemplate}
                </Carousel>
                <Grid data={this.state.data} onClick={_el => console.log(_el)} />
                <WhiteSpace size="sm" />
                {InfoDataTemplate}
                <WhiteSpace size="sm" />
                {faqTemplate}
                <WhiteSpace size="sm" />
                {houseTemplate}
            </WingBlank>
        </div>)
    }
}

export default Main
