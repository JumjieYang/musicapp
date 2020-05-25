import axios from 'axios';
import { NETEASE_HOST} from '../Config/config';

export const getRecommendList = (updateTime =null) => {
    let url = '';
    if (updateTime) {
        url = NETEASE_HOST + `/top/playlist/highquality?before=${updateTime}&limit=30`;
    } else {
      url = NETEASE_HOST + '/top/playlist/highquality?limit=30';
    }
    return axios.get(url);
};

export const getMusicListDetail = (id) => {
    const url = NETEASE_HOST + `/playlist/detail?id=${id}`;
    return axios.get(url);
};

export const getMusicUrl = (id) => {
    const url = NETEASE_HOST + `/song/url?id=${id}`;
    return axios.get(url);
};

export const getMusicDetail = (id) => {
    const url = NETEASE_HOST + `/song/detail?ids=${id}`;
    return axios.get(url);
};

export const getMusicLyric = (id) => {
    const url = NETEASE_HOST + `/lyric?id=${id}`;
    return axios.get(url);
};

export const getSingerInfo = (id) => {
    const url = NETEASE_HOST + `/artists/?id=${id}`;
    return axios.get(url);
};

export const getSingerAlbums = (id) => {
    const url = NETEASE_HOST + `/artist/album?id=${id}`;
    return axios.get(url);
};

export const getAlbumInfo = (id) => {
    const url = NETEASE_HOST + `/album?id=${id}`;
    return axios.get(url);
}

export const getAllRank = () => {
    const url = NETEASE_HOST + `/toplist`;
    return axios.get(url);
}