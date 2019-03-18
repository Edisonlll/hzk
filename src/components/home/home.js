
import React, { Component } from 'react';
import Chat from '../chat/chat'
import Mine from '../mine/mine'
import Main from '../main/main'
import News from '../news/news'
import { TabBar } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
import './home.css'
import tabBarDataFromJson from './tabbardata.json';
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'main',

            fullScreen: true,
        }
    }
    renderContent = () => {
        switch (this.state.selectedTab) {
            case 'main':
                return <Main />
                break;
            case 'news':
                return <News />
                break;
            case 'chat':
                return <Chat />
                break;
            case 'mine':
                return <Mine />
                break;
        }
    }
    render() {
        const TabBarDataTemplate = tabBarDataFromJson.tabBarData.map((item, i) => {
            return (
                <TabBar.Item
                    title={item.title}
                    key={item.id}
                    icon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: `${item.icon_bg_url}`
                    }}
                    />
                    }
                    selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: `${item.sele_bg_url}`
                    }}
                    />
                    }
                    selected={this.state.selectedTab === `${item.selectedTabPath}`}

                    onPress={() => {
                        this.setState({
                            selectedTab: `${item.selectedTabPath}`,
                        });
                    }}
                    data-seed="logId"
                >
                    {this.renderContent()}
                </TabBar.Item>
            )
        })
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                hidden={this.state.hidden}
            >

                {TabBarDataTemplate}

            </TabBar>
        )
    }
}

export default Home
