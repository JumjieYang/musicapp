import React, { useState } from 'react';
import Singers from '../Singers';
import { useRecoilState } from "recoil";
import { PlayList } from "../../Store/store";
import './index.scss';
import Axios from 'axios';
import { getSearchResult } from '../../Api/search';

const Songs = props => {
    const [playList,setPlayList] = useRecoilState(PlayList);

    const renderMusicList = () => {
        return props.list.map((item) => {
            return (
                <li key={item.id} className = 'list-li'>
                    <div className="music-name">
                        <span
                        className="highlight"
                        onClick={() => console.log("highlight music name")}>
                            {item.musicName}
                        </span>
                    </div>
                    <div className="singer-name">
                        <Singers singers={item.singers} />
                    <div className="album-name">
                        <span className="highlight"
                        onClick={() => console.log("highlight album name")}>
                            {item.album.name}
                        </span>
                    </div>

                    </div>
                </li>
            )
        })
    };

    return (
        <div className="songs-container">
            <ul>
                <li className="title">
                <div className="music-name">
                <span>歌曲名</span>
                </div>
                <div className="singer-name">
                <span>歌手</span>
                </div>
                <div className="album-name">
                <span>专辑</span>
                </div>
                </li>
          {renderMusicList()}
        </ul>
      </div>
    );
}

export default Songs;