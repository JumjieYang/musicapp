import React from 'react';
import './index.scss'
import { useRecoilState } from 'recoil';
import { PlayList } from '../../Store/store';
import { Button } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
const Header = () => {

    const [playList,setPlayList] = useRecoilState(PlayList);
    return (
        <div className="header-container">
        <div className="player-control">
            <audio src={`https://music.163.com/song/media/outer/url?id=${playList[0].id}.mp3`} controls={true} onEnded={() => setPlayList(playList)}/>
        <Button className="prev-button"  icon={<LeftOutlined />}></Button>
        {/* <Button className="play-button" onClick={start} icon={<PlayCircleOutlined />}></Button>
        <Button className="pause-button" onClick={stop} icon={<PauseCircleOutlined/>}></Button> */}
        <Button className="next-button" icon={<RightOutlined/>}></Button>
        </div>
        <div className = "player-info">
            <img className="music-img" src={playList[0].img} alt=""></img>
            <p className="music-name">{playList[0].name}</p>
            <p className="music-singer">{playList[0].singer}</p>
        </div>
        </div>
    )
}

export default Header;