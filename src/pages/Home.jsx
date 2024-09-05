import React from 'react'
import { GifState } from '../context/gifContext';
import { useEffect } from 'react';
import Gif from '../components/Gif';
import { Link } from 'react-router-dom';
import FilterGif from '../components/FilterGif';

const Home = () => {
  
  const {gf, gifs, setGifs, filter, favourites} = GifState();
  

  const fetchTrendingGifs = async() =>{
    const {data} = await gf.trending({
    limit:20,
    type:filter,
    rating: "g"
    });
    setGifs(data);
  }

  useEffect(() =>{
    fetchTrendingGifs();
  },[favourites]);

  return (
  <>
    <div>
      <img src="/banner.gif" alt ="earth banner" className="mt-2 rounded w-full"/>
    </div>

    {/*FilteGif */}
    <FilterGif showTrending/>

    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
     {
      gifs.map((gif) =>{
       return <Gif key={gif.title} gif={gif}/>
      })
     }
    </div>
    </>
  )
}

export default Home
