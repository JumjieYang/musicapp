import React, { useState } from 'react';
import { getSearchResult } from '../../Api/search';
import './index.scss';
import Songs from '../../Components/Songs';
import {
    getAlbumInfoAction,
    getSingerInfoAction,
    getMusicListDetailAction
} from '../../Store/Action';
import { imageRatio, formatDate } from '../../Config/util';
import { useDispatch } from 'react-redux';



const SEARCHTYPES = {
    SONGS: 1,
    ALBUMS: 10,
    SINGERS: 100,
    PLAYLIST: 1000
};
const KEYENTER = 13;
const SearchClass = (props) => {
    const [searchVal, setSearchVal] = useState('');
    const [result, setResult] = useState({songs:null,albums:null,singers:null,playlist:null});
    const [searchType, setSearchType] = useState('songs');
    const dispatch=useDispatch();
    const changeSearchType = (type) => {
        if (type === searchType) {
            return;
        } else if (searchVal === '') {
            setSearchType(type);
            return;
        }
    };

    const handleGetSongs = () => {
        getSearchResult(searchVal, SEARCHTYPES.SONGS).then(
            ({
                data: {
                    result: {songs}
                }
            }) => {
                console.log("succeed");
                const r = JSON.parse(JSON.stringify(result));
                r.songs = formatTracks(songs);
                setResult(r);
            }
        ).catch(() => {
            console.log("error");
        });
    };

    const handleGetAlbums = () => {
        getSearchResult(searchVal,SEARCHTYPES.ALBUMS).then(
            ({ data }) => {
                console.log("error");
                const r = JSON.parse(JSON.stringify(result));
                r.albums = data.result.albums;
                setResult(r);
            }
        ).catch(() => {
            console.log("error");
        });
    };

    const handleGetSingers = () => {
        getSearchResult(searchVal,SEARCHTYPES.SINGERS).then(
        ({data}) => {
            console.log("succeed");
            const r = JSON.parse(JSON.stringify(result));
            r.singers = data.result.artists;
            setResult(r);
        }
        ).catch(() => {
            console.log("error");
        });
    }

    const handleGetPlaylist = () => {
        getSearchResult(searchVal, SEARCHTYPES.PLAYLIST).then(
            ({data}) => {
                console.log("succeed");
                const r = JSON.parse(JSON.stringify(result));
                r.playlist = data.result.playlists;
                setResult(r);
            }
        ).catch(() => {
            console.log("error");
        });
    };

    const handleKeydown = (e) => {
        if (e.keyCode === KEYENTER) {
            handleGetType();
        }
    };
    const handleGetType = () => {
        setResult({songs:null,albums:null,singers:null,playlist:null});
        switch(searchType){
            case 'songs':
                handleGetSongs();
                break;
            case 'albums':
                handleGetAlbums();
                break;
            case 'singers':
                handleGetSingers();
                break;
            case 'playlist':
                handleGetPlaylist();
                break;
            default:
                break;
            }
        };

    const renderResult = () => {
        switch (searchType) {
            case 'songs':
                return renderResultSongs();
            case 'albums':
                return renderResultAlbums();
            case 'singers':
                return renderResultSingers();
            case 'playlist':
                return renderResultPlaylist();
        }
    };

    const renderResultSongs = () => {
        if (!result.songs) {
            return null;
        } else {
            return <Songs showTitle={false} list={result.songs} />;
        }
    };

    const renderResultAlbums = () => {
        if (!result.albums) {
            return null;
        } else {
            return (
                <ul className="result-albums">
                    {result.albums.map((item) => {
                        return (
                            <li key={item.id}>
                                <div
                                className="album-img"
                                onClick={() => dispatch(getAlbumInfoAction(item.id))}>
                                    <img src={item.picUrl + imageRatio(20)} alt="album-img"/>
                                </div>
                                <div className="album-name"
                                    onClick={() => dispatch(getAlbumInfoAction(item.id))}>
                                        <p>{item.name}</p>
                                </div>
                                <div className="singer-name"
                                    onClick={() => dispatch(getSingerInfoAction(item.artist.id))}>
                                        <p>{item.artist.name}</p>
                                </div>
                                <div className="publish-time">
                                    {formatDate(item.publishTime)}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )
        }
    };

    const renderResultSingers = () => {
        if (!result.singers) {
            return null;
        } else {
            return (
                <ul className="result-singers">
                    {result.singers.map((item) => {
                        return (
                            <li key={item.id} onClick = {() => dispatch(getSingerInfoAction(item.id))}>
                                <div className="img-container">
                                    <img src={item.img1v1Url+imageRatio(60)} alt="" />
                                </div>
                                <div className="name">
                                    <span>{item.name}</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            );
        }
    };

    const renderResultPlaylist = () => {
        if (!result.playlist){
            return null;
        } else {
            return (
                <ul className="result-playlist">
                    {result.playlist.map((item) => {
                        return (
                            <li key={item.id} onClick={() => dispatch(getMusicListDetailAction(item.id))}>
                                <div className="img-container">
                                    <img src={item.coverImgUrl + imageRatio(100)} alt=""/>
                                </div>
                                <p className="name">{item.name}</p>
                            </li>
                        );
                    })}
                </ul>
            );
        }
    };

    const formatTracks = (list) => {
        return list.map((item) => {
            const singers = item.artists.map((item) => {
                return {
                    id: item.id,
                    name: item.name
                };
            });
            return {
                id: item.id,
                musicName: item.name,
                imgUrl: null,
                singers,
                album: {
                    id:item.album.id,
                    name:item.album.name
                }
            };
        });
    };
    return (
       <div className="search-container">
           <div className="search-input">
               <input autoFocus={true}
               value={searchVal}
               placeholder="搜点想要的叭～"
               onChange={(e) => {
                   const val = e.target.value;
                   setSearchVal(val);
               }}

               onKeyDown={(e) => {
                   handleKeydown(e);
               }}/>

            <div className="search-result">
                <nav>
                    <span
                    className={['songs', searchType === 'songs' ? 'active' : ''].join(' ')}
                    onClick={() => changeSearchType('songs')}>
                        歌曲
                    </span>
                    <span
                    className={['albums', searchType === 'albums' ? 'active' : ''].join(' ')}
                    onClick={() => changeSearchType('albums')}>
                        专辑
                    </span>
                    <span
                    className={['singers', searchType === 'singers' ? 'active' : ''].join(' ')}
                    onClick={() => changeSearchType('singers')}>
                        歌手
                    </span>
                    <span
                    className={['playlist', searchType === 'playlist' ? 'active' : ''].join(' ')}
                    onClick={() => changeSearchType('playlist')}>
                        歌单
                    </span>
                </nav>
                <div className="result">{renderResult()}</div>
            </div>
           </div>
       </div>
    );
};

            
export default SearchClass;