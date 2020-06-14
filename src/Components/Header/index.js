import React, { useEffect } from 'react';
import './index.scss'
import { useRecoilState } from 'recoil';
import { PlayList } from '../../Store/store';
import { Button } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
const Header = () => {

    const [playList,setPlayList] = useRecoilState(PlayList);
    const audio = new Audio(`https://music.163.com/song/media/outer/url?id=${playList.playLists[0].id}.mp3`);
    const start = () => {
        audio.play();
    }
    const stop = () => {
        audio.pause();
    }
    return (
        <div className="header-container">
        <div className="player-control">
        <Button className="prev-button"  icon={<LeftOutlined />}></Button>
        <Button className="play-button" onClick={start} icon={<PlayCircleOutlined />}></Button>
        <Button className="pause-button" onClick={stop} icon={<PauseCircleOutlined/>}></Button>
        <Button className="next-button" icon={<RightOutlined/>}></Button>
        </div>
        <div className = "player-info">
            <img className="music-img" src={playList.playLists[0].img} alt=""></img>
            <p className="music-name">{playList.playLists[0].name}</p>
            <p className="music-artist">{playList.playLists[0].artist}</p>
        </div>
        </div>
    )
}

export default Header;