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
    default: {
        playing:false
    }
});

export const PlayList = atom({
    key: 'playList',
    default: {
        playLists: [{
            src: 'http://m7.music.126.net/20200614192134/2651308e33a5d972d2f61aa9c820209d/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3',
            artist:'黄家驹',
            name:'海阔天空',
            img:'',
            id:'33894312'
        },]
    }
});

export const favor = atom ({
    key: 'favor',
    default: {
        favor: []
    }
});