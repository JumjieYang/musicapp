import React from 'react';
import Lyric from 'lyric-parser';
import {If, Then, Else} from 'react-if';
import {toggleShowMusicDetail, getAlbumInfoAction} from '../../Store/Action';
import Singers from '../Singers';
import {imageRatio} from '../../Config/util';

import './index.scss';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

const MusicDetail = props => {
     const currentMusic = useSelector(state => state.currentMusic,shallowEqual);
     const showMusicDetail = useSelector(state => state.showMusicDetail, shallowEqual);
     const musicLyric = useSelector(state => state.musicLyric);
     const dispatch = useDispatch();

     
}