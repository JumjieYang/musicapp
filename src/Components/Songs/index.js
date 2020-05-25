import React from 'react';
import {If, Then, ELse} from 'react-if';
import {
    getChangeCurrentMusic,
    getAlbumInfoAction,
    getAddToLikeListAction
} from '../../Store/Action';
import { useSelector, useDispatch } from 'react-redux';
import Singers from '../Singers';
import './index.scss';

const Songs = props => {
    const playList = useSelector(store => store.playList);
    const dispatch = useDispatch();

    const renderMusicList = () => {
        return props.list.map((item, index) => {
            let count = index +1;
            if (count < 10) {
                count = '0' + count;
            };
            return (
                <li key={item.id} className = 'list-li'>
                    <div className="count">{count}</div>
                    <div className="music-name">
                        <span
                        className="highlight"
                        onClick={() => dispatch(getChangeCurrentMusic(item))}>
                            {item.musicName}
                        </span>
                    </div>
                    <div className="singer-name">
                        <Singers singers={item.singers} />
                    <div className="album-name">
                        <span className="highlight"
                        onClick={() => dispatch(getAlbumInfoAction(item.album.id))}>
                            {item.album.name}
                        </span>
                    </div>
                    {/* <div className="control-btn">
                        <If condition={findIndex()}
                    </div> */}
                    </div>
                </li>
            )
        })
    };

    return (
        <div className="songs-container">
            <ul>
                <If condition={props.showTitle}>
                    <li className="title">
                <div className="count" />
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
          </If>
          {renderMusicList()}
        </ul>
      </div>
    );
}

export default Songs;