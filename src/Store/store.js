import {atom} from 'recoil';

export const musicList = atom({
    key: 'musicList',
    default: {
        musicList: []
    }
});

export const showMusicList = atom({
    key: 'showMusicList',
    default: {
        show: false
    }
});

export const showMusicDetail = atom({
    key: 'showMusicDetail',
    default:{
        show: false
    }
});

export const singerInfo = atom({
    key: 'singerInfo',
    default: {
        info: ''
    }
});

export const showSingerInfo = atom({
    key: 'showSingerInfo',
    default:{
        show: false
    }
});

export const currentMusic = atom({
    key: 'currentMusic',
    default:{
        id: 0,
        musicNmae: '',
        src:'',
        img:'',
        artist: '',
        artistid: 0,
        name:'', //album name
        albumid:0
    }
});

export const musicLyric = atom({
    key: 'musicLyric',
    default: {
        lyric: ''
    }
});

export const playing = atom({
    key: 'playing',
    default: false
});

export const PlayList = atom({
    key: 'playList',
    default: [{
            id:'33894312',
            name:'情非得已',
            singer:'Unkown',
            album:'',
            img:'',
        },]
});

export const favor = atom ({
    key: 'favor',
    default: {
        favor: []
    }
});