import {PLAY_MODE } from '../../Config/config';
import * as types from '../Util';
const DEFAULT_VOLUME = 0.5;


const defaultState= {
    musicList: [],
    showMusicList:false,
    showMusicDetail:false,
    singerInfo:false,
    showSingerInfo:false,
    currentMusic:{
        id: 0,
        musicName: '',
        musicUrl: '',
        image:'',
        singers: [{
            id:0,
            name:''
        }],
        album: {
            id:0,
            name:''
        }
    },

    musicLyric: null,

    playing:false,
    playList:[],
    currentIndex: 0,
    playMode: PLAY_MODE.One,
    favor: [],
    showLoading: false,
    volume: DEFAULT_VOLUME
};

export default (state = defaultState, action) => {
    if (action.type === types.CHANGE_CURRENT_MUSIC_LIST) {
        const newState = deepCopy(state);
        newState.musicList = action.value;
        if (action.value) {
          newState.showMusicList = true;
        }
        return newState;
      }
      if (action.type === types.HIDE_MUSIC_LIST) {
        const newState = deepCopy(state);
        newState.showMusicList = false;
        return newState;
      }
      if (action.type === types.CHANGE_CURRENT_MUSIC) {
        const newState = deepCopy(state);
        newState.currentMusic = action.value;
        newState.playing = true;
        return newState;
      }
      if (action.type === types.CHANGE_PLAYING_STATUS) {
        const newState = deepCopy(state);
        newState.playing = action.status;
        return newState;
      }
      if (action.type === types.CHANGE_PLAY_LIST) {
        const newState = deepCopy(state);
        newState.playList = action.value;
        return newState;
      }
      if (action.type === types.CHANGE_CURRENT_INDEX) {
        const newState = deepCopy(state);
        newState.currentIndex = action.index;
        return newState;
      }
      if (action.type === types.CHANGE_PLAY_MODE) {
        const newState = deepCopy(state);
        newState.playMode = action.value;
        return newState;
      }
      if (action.type === types.TOGGLE_SHOW_MUSIC_DETAIL) {
        const newState = deepCopy(state);
        newState.showMusicDetail = !newState.showMusicDetail;
        return newState;
      }
      if (action.type === types.CHANGE_CURRENT_MUSIC_LYRIC) {
        const newState = deepCopy(state);
        newState.musicLyric = action.value;
        return newState;
      }
      if (action.type === types.CHANGE_SINGER_INFO) {
        const newState = deepCopy(state);
        newState.singerInfo = action.value;
        newState.showSingerInfo = true;
        return newState;
      }
      if (action.type === types.HIDE_SINGER_INFO) {
        const newState = deepCopy(state);
        newState.showSingerInfo = false;
        return newState;
      }
      if (action.type === types.CHANGE_FAVOR) {
        const newState = deepCopy(state);
        newState.collector = action.value;
        return newState;
      }
      if (action.type === types.REFRESH_FAVOR) {
        const newState = deepCopy(state);
        newState.collector = getNewFavor();
        return newState;
      }
      if (action.type === types.CHANGE_SHOW_LOADING) {
        const newState = deepCopy(state);
        newState.showLoading = action.value;
        return newState;
      }
      if (action.type === types.HIDE_ALL) {
        const newState = deepCopy(state);
        newState.showMusicList = false;
        newState.showSingerInfo = false;
        newState.showMusicDetail = false;
        return newState;
      }
      if (action.type === types.CHANGE_VOLUME) {
        const newState = deepCopy(state);
        newState.volume = action.value;
        return newState;
      }
    return state;
};

function deepCopy (val) {
    return JSON.parse(JSON.stringify(val));
}

function getNewFavor() {
    let newFavor = [];
    return newFavor;
}