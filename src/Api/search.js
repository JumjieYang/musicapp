import axios from 'axios';
import {NETEASE_HOST} from '../Config/config';

export const getHotSearch = () => {
    const url = NETEASE_HOST+ '/top/playlist/highquality?limit=20'
    return axios.get(url);
};

export const getSearchResult = (searchName, type) => {
    const url = NETEASE_HOST + `/search?keywords=${searchName}&type=${type}&limit=30`;
    return axios.get(url);
};
