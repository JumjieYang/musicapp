import React from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {HomeOutlined, UserOutlined, HeartOutlined, SearchOutlined, InfoCircleOutlined} from '@ant-design/icons'
import Home from './Pages/Home';
import About from './Pages/About';
import Header from './Components/Header';
import "./App.css"
import SearchClass from './Pages/Search';
import Auth from './Pages/Auth';
import Like from './Pages/Like';

const App = (props) => {
		return (
			<Router>
				<div className = "App">
					<Layout style={{ minHeight: "100vh"}}>
					<Layout.Header style={{position: 'fixed', zIndex:1, width:'100%', height:"50px", backgroundColor:"rgba(26, 25, 25, 1)"}} >
						<Header />
					</Layout.Header>
					<Layout className="site-layout" >
					<Layout.Sider
					style={{
						overflow: 'auto',
						height:'100vh',
						position:'fixed',
						left:0,
						paddingTop:"60px",
						backgroundColor:"rgba(26, 25, 25, 0.918)"
					}}
					collapsedWidth={60}
					width={60}
					theme="dark"
					>
					<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{backgroundColor:"rgba(26, 25, 25, 0.918)"}}>
				<Menu.Item key="1">
                    <Link to="/">
					<HomeOutlined/>
					</Link>
					主页
				</Menu.Item>
				<Menu.Item key="2">
				<Link to="/search">
				<SearchOutlined/>
				</Link>
					搜索
				</Menu.Item>
				<Menu.Item key="3">
					<Link to="/auth">
						<UserOutlined/>
					</Link>
					用户
				</Menu.Item>
				<Menu.Item key="4">
				<Link to="/like">
					<HeartOutlined />
					</Link>
					收藏
				</Menu.Item>
				<Menu.Item key="5">
					<Link to="/about">
					<InfoCircleOutlined />
					</Link>
					关于
				</Menu.Item>
			</Menu>
					</Layout.Sider>
					<Layout.Content style={{paddingTop:"50px", backgroundColor:"rgba(26, 25, 25, 0.918)"}}>
					<div className="app-background">
						<Route exact path="/" component={Home}/>
						<Route path="/about" component={About}/>
						<Route path="/search" component={SearchClass}/>
						<Route path="/auth" component={Auth}/>
						<Route path="/like" component={Like}/>
					</div>
					</Layout.Content>
					</Layout>
					{/* <Layout.Footer style={{position: 'fixed', width:'100%'}}>
					<Footer/>
					</Layout.Footer> */}
					</Layout>
					
				</div>
			</Router>
		)
	}
export default App;
