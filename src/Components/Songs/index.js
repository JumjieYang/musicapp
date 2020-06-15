import React from 'react';
import Singers from '../Singers';
import { useRecoilState } from "recoil";
import { PlayList } from "../../Store/store";
import './index.scss';
import { Table } from 'antd';

const Songs = props => {
    const [playList,setPlayList] = useRecoilState(PlayList);
    const columns = [
    {
        title:'Music Name',
        dataIndex: 'name',
        width:50
    },
    {
        title:'Singer Name',
        dataIndex: 'singer',
        width:50
    },
    {
        title:'Album Name',
        dataIndex: 'album',
        width:50
    },

]
    const musicList = [];
    const getMusicList = () => {
        return props.list.map((item) => {
            musicList.push({
                id:item.id,
                name:item.musicName,
                singer:item.singers[0].name,
                album:item.album.name
            });
        });
    };

    return (
        getMusicList(),
        <div className="songs-container">
            {/* <ul>
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
        </ul> */}
        
        <Table
        pagination={false}
        rowKey = {record => record.id}
        onRow={record => {
            return {
                
                onDoubleClick: () => {
                    let result = [{
                        id:record.id,
                        name:record.name,
                        singer:record.singer,
                        album:record.album,
                        img:'',
                    }];
                setPlayList(result);
                }
            }
        }} style={{background: "black"}} columns={columns} dataSource={musicList} scroll={{x:599, y: 450}}/>
      </div>
    );
}

export default Songs;