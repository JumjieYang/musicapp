import React from 'react';
import GitHubButton from 'react-github-btn';
import {MailOutlined, GithubOutlined, ZhihuCircleFilled} from '@ant-design/icons';
import './index.css';

const About = () => {
    return (
        <div className="About">
            <h1>musicapp</h1>
            <p>
            <GitHubButton href="https://github.com/JumjieYang/musicapp" data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large" data-show-count="true" aria-label="Follow this project on GitHub">Follow this project on GitHub</GitHubButton>
            <br/>
                这个项目基于TDD的思想，但和所有现存软件的缺陷一样，测试用例只会帮助你找出bug， 并不会帮助程序实现bug free.<br/>
                并且因为现阶段作者个人开发维护， 所以难免会有一些注意不到的问题，烦请见谅。<br/>如果您在使用过程中发现了问题,
                欢迎提Issue， 或者可以直接联系作者解决。 如果您喜欢这个产品, 欢迎star / fork. <br/>
            </p>
            <h1>关于作者</h1>
            <p>
                作者是一名在北美一所野鸡大学读书的一名卑微CS学生～<br/>
                作者在平时无聊的时候会写一点奇怪的小工具～<br/>
                欢迎关注作者的各类社交账号，获取更多类似于本产品的其他项目~<br/>
            </p>
            <p id='icons'>
            <a href='mailto:junjie.yang2@mail.mcgill.ca' target='_blank' rel="noopener noreferrer">
                        <MailOutlined style={{marginLeft:"41%"}}/>
                    </a>|
                    <a href='https://github.com/JumjieYang' target="_blank" rel="noopener noreferrer">
                        <GithubOutlined />
                    </a>|
                    <a href='https://www.zhihu.com/people/yang-jun-jie-76-12' target="_blank" rel="noopener noreferrer">
                        <ZhihuCircleFilled />
                    </a>
            </p>
            <h1>CopyRight</h1>
            <p>
                本项目使用 React.js, Electron.js, Recoil, Django Framework 进行开发，基于MIT协议开源
            </p>
        </div>
    )
}
  
export default About;