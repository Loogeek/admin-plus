import React, { Component } from 'react'
import { Menu } from 'antd'
import NavConfig from '../config/nav'
// import './nav.scss'

const { SubMenu, MenuItemGroup } = Menu

const movieYears = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018']

export default class Nav extends Component {
    state = {
        currentNav: '全部'
    }

    render() {
        const { currentNav } = this.state

        return (
            <div>            
                <Menu
                    onClick={this.handleSelectNav}
                    selectedKeys={[currentNav]}
                    mode="horizontal"
                    theme="dark"
                >
                    <Menu.Item
                        style={{
                            marginLeft: 24,
                            marginRight: 30,
                            fontSize: 18,
                            textAlign: 'center',
                            color: '#fff !important',
                            float: 'left'
                        }}
                    >
                        <span className="hover-scale" style={{color: '#fff2e8'}}>
                            admin后台管理
                        </span>
                    </Menu.Item>
                    {
                        NavConfig.map(({name, path}, index) =>
                            <Menu.Item key={name}>
                                { name }
                            </Menu.Item>
                        )
                    }
                </Menu>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    style={{
                        width: '215px',
                        fontSize: 18,
                        paddingLeft: 24
                    }}
                >
                    {
                        movieYears.map(year => 
                            <Menu.Item key={year}>
                                { `${year}上映` }
                            </Menu.Item>
                        )
                    }
                </Menu>
            </div>
        )
    }
}