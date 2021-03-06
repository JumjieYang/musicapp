import React, { useState, useEffect } from 'react';

import "./index.css";
import { getRecommendList } from '../../Api';
import { imageRatio } from '../../Config/util';

const Home = () => {
  const [recommendList, setRecommendList] = useState([]);
  useEffect( () => {
    const fetchData = async (updateTime = null) => {
      const result = await getRecommendList(updateTime);
      console.log(result.data.total);
      setRecommendList(recommendList.concat(...result.data.playlists));
    };
    fetchData();
  },[]);


  const renderRecommendList = () => {
    return recommendList.map((item) => {
      return (
        <li key={item.id}>
          <div className='list-img-container'
                onClick= {() => console.log(item.id)}>
                  <i className='iconfont icon-play'/>
            <img className='list-img' src={item.coverImgUrl +imageRatio(100)} alt=""/>
          </div>
          <div className='shadow'/>
          <span className='list-name'>{item.name}</span>
        </li>
      )
    })
  }

  return (
    <div className="home">
      <h1>今日精选</h1>
      <hr/>
        <ul className='recommend-list'>
          {renderRecommendList()}
        </ul>
    </div>
  )
}
export default Home;