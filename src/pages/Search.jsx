import React from 'react'
import { useParams } from 'react-router-dom';
import { GifState } from '../context/gifContext';
import { useState,useEffect } from 'react';
import Gif from '../components/Gif';
import FilterGif from '../components/FilterGif';
const Search = () => {
  const[searchResults, setSearchResults] = useState([]);

  const{query} = useParams();

  const {gf, filter} = GifState();

  const fetchSearchResults = async() =>{
    const {data} = await gf.search(query,{
      sort: "relevant",
      lang:"en",
      type: filter,
      limit:20,
    });

    setSearchResults(data);
  }

  useEffect(() =>{
  fetchSearchResults();
  },[filter])
  return (
    <div className=" my-2 lg:my-4">
     <h2 className="text-3xl lg:text-5xl pb-3 font-extrabold">{query}</h2>
     <FilterGif alignLeft={true}/>

     {searchResults.length >0 ?(<>
     
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
     {
      searchResults.map((gif) =>{
       return <Gif key={gif.title} gif={gif}/>
      })
     }
    </div>

     </>): (
      <span>{" "} No GIFs found for {query}. Try searching for Stickers instead?</span>
     )}
    </div>
  )
}

export default Search
