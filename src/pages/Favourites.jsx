import React, { useEffect } from 'react'
import GifSearch from '../components/GifSearch'
import { GifState } from '../context/gifContext'
import { useState } from 'react'
import Gif from '../components/Gif'
const Favourites = () => {

  
  const { gf, favourites } = GifState(); 

  const[favouriteGIFs, setFavouriteGIFs] = useState([]);

  const fetchFavouriteGIFs = async() =>{
    const {data: gifs} = await gf.gifs(favourites);
    setFavouriteGIFs(gifs);
    console.log(favouriteGIFs);
  }

  useEffect(() =>{
    fetchFavouriteGIFs();
  },[])
  return (
    <div className="mt-2">
      <span className="faded-text">My Favourites</span>
      <div className="columns-2 md:columns-3 l:columns-4 xl:columns-5 gap-2 mt-2">
        {favouriteGIFs.map((gif) => (
          <Gif gif={gif} key= {gif.id}/>
        ))}
      </div>
    </div>
  )
}

export default Favourites
