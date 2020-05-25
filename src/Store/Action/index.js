import * as types from '../Util'

import { getMusicUrl, getMusicLyric, getSingerInfo, getAlbumInfo, getMusicDetail, getMusicListDetail } from '../../Api';
import { findIndex} from '../../Config/util';
import store from '../index';
import { PLAY_MODE } from '../../Config/config';
import { message } from 'antd';

export const getChangeFavorAction = (value) => ({
    type: types.CHANGE_FAVOR,
    value
});

export const getRefreshFavorAction = (value) => ({
    type: types.REFRESH_FAVOR,
});

export const getChangeCurrentMusicListAction = (value) => ({
    type: types.CHANGE_CURRENT_MUSIC_LIST,
    value
});

export const getMusicListDetailAction = (id) => {
    return (dispatch) => {
        dispatch(getChangeShowLoadingAction(true));
        getMusicListDetail(id).then(({data}) => {
            data.playlist.tracks = formatMusicListTracks(data.playlist.tracks);
            dispatch(getChangeCurrentMusicListAction(data.playlist));
            dispatch(getChangeShowLoadingAction(false));
          }).catch(() => {
            dispatch(getChangeShowLoadingAction(false));
        });
    };
};

export const getChangeShowLoadingAction = (value) => ({
    type: types.CHANGE_SHOW_LOADING,
    value
});

export const getHideMusicListAction = () => ({
    type: types.HIDE_MUSIC_LIST
});

export const getHideSingerInfoAction = () => ({
    type: types.HIDE_SINGER_INFO
});

export const getHideAllAction = () => ({
    type: types.HIDE_ALL
});

export const toggleShowMusicDetail = () => ({
    type: types.TOGGLE_SHOW_MUSIC_DETAIL
});

export const changeCurrentMusicAction = (currentMusic) => ({
    type: types.CHANGE_CURRENT_MUSIC,
    currentMusic
})

export const changeSingerInfoAction = (info) => ({
    type: types.CHANGE_SINGER_INFO,
    info
})

export const getSingerInfoAction = (singerId) => {
    return (dispatch) => {
        dispatch(getChangeShowLoadingAction(true));
        dispatch(changeSingerInfoAction(null));
        getSingerInfo(singerId).then((res) => {
            dispatch(changeSingerInfoAction(res.data));
            dispatch(getChangeShowLoadingAction(false));
        }).catch(() => {
            dispatch(getChangeShowLoadingAction(false));
            message.info("暂时没有找到该歌手～");
            dispatch(getHideSingerInfoAction());
        });
    };
};

export const getAlbumInfoAction = (albumId) => {
    return (dispatch) => {
        dispatch(getChangeShowLoadingAction(true));
        getAlbumInfo(albumId).then(({data: {album, song}}) => {
            const list = {
                name: album.name,
                id: album.id,
                description: album.description ? album.description : '',
                coverImage: album.picUrl,
                tracks: formatAlbumTracks(song),
                company: album.company,
                publishTime: album.publishTime,
                artist: album.artist,
                tyoe: album.type
            };
            dispatch(getChangeShowLoadingAction(false));
            dispatch(getChangeCurrentMusicListAction(list));
            dispatch(getHideSingerInfoAction());
        }).catch(() => {
            dispatch(getChangeShowLoadingAction(false));
        });
    };
};

export const getChangePlayListAction = (playlist) => ({
    type: types.CHANGE_PLAY_LIST,
    playlist
});

export const emptyPlayList = () => {
    return (dispatch) => {
        const EMPTY_PLAYLIST = [];
        const STOP = false;
        dispatch(getChangePlayListAction(EMPTY_PLAYLIST));
        dispatch(getChangePlayStatusAction(STOP));
    };
};

export const getChangeCurrentIndex = (index) => ({
    type: types.CHANGE_CURRENT_INDEX,
    index
});

export const getChangeVolumeAction = (volume) => ({
    type: types.CHANGE_VOLUME,
    volume
});

export const getChangePlayStatusAction = (status) => ({
    type: types.CHANGE_PLAYING_STATUS,
    status
});

export const getChangePlayModeAction = (mode) => ({
    type: types.CHANGE_PLAY_MODE,
    mode
});

export const changeCurrentMusicLyric = (lyric) => ({
    type: types.CHANGE_CURRENT_MUSIC_LYRIC,
    lyric
});

export const getCurrentMusicLyric = () => {
    return (dispatch, getState) => {
        const state = store.getState();
        const currentMusic = state.currentMusic;
        if (!currentMusic) return;
        const id = currentMusic.id;
        dispatch(changeCurrentMusicLyric());
        getMusicLyric(id).then(({data}) => {
            dispatch(changeCurrentMusicLyric(data));
        });
    };
};


export const getChangeCurrentMusic = (music) => {
    return (dispatch, getState) => {
      let index;
        const state = getState();
        let list = state.playList;
        if (list) {
        index = findIndex(list, music);
        }
        else {
          index = 0;
        }
        // if (index === state.currentIndex){
        //     return;
        // }
        if (index >= 0 ) {
            dispatch(getChangeCurrentIndex(index));
        } else {
            list.push(music);
            dispatch(getChangePlayListAction(list));
            dispatch(getChangeCurrentIndex(list.length-1));
        }
        dispatch(changeCurrentMusicAction(music));
        dispatch(getCurrentMusicLyric());
        getMusicUrl(music.id).then(({data: {data}}) => {
            // if (index !== list.length -1) {
            //     dispatch(playNextMusicAction());
            //     return;
            // }
            music.musicUrl = data[0].url;
            dispatch(changeCurrentMusicAction(music));
            if (!music.imgUrl) {
                getMusicDetail(music.id).then(({data}) => {
                    music.imgUrl = data.songs[0].al.picUrl;
                    dispatch(changeCurrentMusicAction(music));
                });
            }
        }
        );
    };
};

export const playPrevMusicAction = () => {
    return (dispatch, getState) => {
      const state = getState();
      let { currentIndex } = state;
      const { playList } = state;
      const length = playList.length;
      if (length === 0 || length === 1) {
        return;
      }
      if (state.playMode === PLAY_MODE.RANDOM) {
        // 返回值不能等于原来的 index
        currentIndex = random(currentIndex, length);
      } else if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = length - 1;
      }
      dispatch(getChangeCurrentMusic(playList[currentIndex]));
      dispatch(getChangeCurrentIndex(currentIndex));
    };
  };
  
  export const playNextMusicAction = () => {
    return (dispatch, getState) => {
      const state = getState();
      let { currentIndex } = state;
      const { playList } = state;
      if (!playList) return;
      const length = playList.length;
      if (length === 0 || length === 1) {
        return;
      }
      if (state.playMode === PLAY_MODE.RANDOM) {
        currentIndex = random(currentIndex, length);
      } else if (currentIndex < length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      dispatch(getChangeCurrentMusic(playList[currentIndex]));
      dispatch(getChangeCurrentIndex(currentIndex));
    };
  };
  
  export const getDeleteMusicAction = (item) => {
    return (dispatch, getState) => {
      const state = getState();
      let { currentIndex } = JSON.parse(JSON.stringify(state));
      const { playList } = JSON.parse(JSON.stringify(state));
      const index = findIndex(playList, item);
      playList.splice(index, 1);
      if (index < currentIndex) {
        currentIndex--;
        dispatch(getChangeCurrentIndex(currentIndex));
      } else if (index === currentIndex) {
        // 先播放下一首
        dispatch(playNextMusicAction());
        // 然后将 currentIndex 修改回来
        dispatch(getChangeCurrentIndex(currentIndex));
      }
      // 当 playList 已经没有的时候，删除掉当前音乐的 url
      // 音乐就会暂停播放
      if (playList.length === 0) {
        const { currentMusic } = JSON.parse(JSON.stringify(state));
        currentMusic.musicUrl = '';
        dispatch(changeCurrentMusicAction(currentMusic));
      }
      dispatch(getChangePlayListAction(playList));
    };
  };
  
  /**
   * 实现喜欢歌曲的功能
   */
  export const getAddToLikeListAction = (value) => {
    
  };
  
  /**
   * 收藏 / 取消收藏 歌单
   */
//   export const getToggleCollectPlaylist = (list) => {
//     return (dispatch) => {
//       $db.find({ name: 'collector' }, (err, res) => {
//         const collector = res[0];
//         const index = findIndex(collector.collectList, list);
//         if (index < 0) {
//           collector.collectList.push(list);
//           dispatch(getChangeCollectorAction(collector));
//           $db.update({ name: 'collector' }, collector, () => {
//             message.info('收藏歌单成功');
//           });
//         } else {
//           collector.collectList.splice(index, 1);
//           dispatch(getChangeCollectorAction(collector));
//           $db.update({ name: 'collector' }, collector);
//         }
//       });
//     };
//   };
  
  /**
   * 加载缓存信息
   */
//   export const getLoadCacheAction = (cache) => {
//     return (dispatch) => {
//       dispatch(getChangePlayListAction(cache.playList));
//       dispatch(getChangeVolumeAction(cache.volume));
//       dispatch(getChangeCurrentIndex(cache.currentIndex));
//       if (cache.currentIndex !== -1 && cache.playList.length !== 0) {
//         dispatch(getChangeCurrentMusic(cache.playList[cache.currentIndex], true));
//       }
//     };
//   };
  
  function random (index, length) {
    const res = Math.floor(Math.random() * length);
    if (res === index) {
      return random(index, length);
    }
    return res;
  }
  
  function formatAlbumTracks (list) {
    return list.map((item) => {
      const singers = item.ar.map((item) => {
        return {
          id: item.id,
          name: item.name
        };
      });
      return {
        id: item.id,
        musicName: item.name,
        imgUrl: item.al.picUrl,
        singers,
        album: {
          id: item.al.id,
          name: item.al.name
        }
      };
    });
  }
  
  function formatMusicListTracks (list) {
    return list.map((item) => {
      const singers = item.ar.map((item) => {
        return {
          id: item.id,
          name: item.name
        };
      });
      return {
        id: item.id,
        musicName: item.name,
        imgUrl: item.al.picUrl,
        singers,
        album: {
          id: item.al.id,
          name: item.al.name
        }
      };
    });
  }