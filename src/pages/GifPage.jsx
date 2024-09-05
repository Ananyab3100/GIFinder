import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GifState } from '../context/gifContext';
import Gif from '../components/Gif';
import {HiOutlineExternalLink} from "react-icons/hi";
import {HiMiniChevronDown, HiMiniChevronUp, HiMiniHeart} from "react-icons/hi2";
import FollowOn from '../components/FollowOn';
import {IoCodeSharp} from "react-icons/io5";



import {FaPaperPlane} from "react-icons/fa6";




const GifPage = () => {

  const {type, slug} = useParams();

  const[gif, setGif] = useState({});
  const[relatedGifs, setRelatedGifs] = useState([]);
  const [readMore,setReadMore] = useState(false);
  const [embedCode, setEmbedCode] = useState("");

  const {gf,  favourites,addToFavourites} = GifState();
 


  

  const shareGif = () =>{
//asignment
if(navigator.share){
  try{
   navigator.share({
    title: gif.title,
    text: `Check out this GIF: ${gif.title}`,
    url: gif.url,
   }
  ).then(() => console.log('GIF shared successfully!'))
   .catch((error) => console.log('Error sharing GIF:', error));
  }
  catch(error){
    console.log('An unexpected error occurred while sharing the GIF:', error);
  }
}
else{
  alert("Your browser does not support sharing")
}
}

  const EmbedGif = () =>{
//assignment
const embedUrl = `<iframe src="${gif.url}" width="480" height="270" frameborder="0" allowfullscreen></iframe>`;
setEmbedCode(embedUrl);
  }

  const contentType = ["gifs", "stickers", "texts"];

  const fetchGif = async() =>{
    const gifId = slug.split("-");
    const {data} = await gf.gif(gifId[gifId.length-1]);
    console.log("Fetched GIF:", data);
    const {data: related} = await gf.related(gifId[gifId.length-1],{
      limit:10,
    });

    setGif(data);
    
    setRelatedGifs(related);
    
  }

  useEffect(() =>{
    if(!contentType.includes(type)){
      throw new Error("Invalid Content Type")
    }

    fetchGif();
  },[])
  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
     {gif?.user && (
      <>
      <div className="flex gap-1">
      <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />

             <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
      </div>

      {gif?.user?.description && (
        <p className="py-4 whitespace-pre-line text-sm text-gray-400">
          {readMore ? gif?.user?.description : gif?.user.description.slice(0,100) + '...'}
        <div className="flex items-center faded-text cursor-pointer"
        onClick = {() => setReadMore(!readMore)}>
        {readMore ? (
      <>
    
      Read less <HiMiniChevronUp size={20} />

     
      </>
        ): (
          <>
            Read more <HiMiniChevronDown size={20}/>
          </>
        )}

        </div>
        </p>
      )}
      </>
     )}

     <FollowOn />

     <div className="divider"> </div>
      {
        gif?.source && (
          <div className="">
            <span className="faded-text mt-4">Source</span>
            <div className="flex gap-1">
            <HiOutlineExternalLink size={25} />
            <a href={gif.source} target="_blank" className="truncate text-sm font-bold">{gif.source}</a>
            </div>
          </div>
        )
      }
     
      </div>

      <div className="col-span-4 sm:col-span-3">
    <div className="flex gap-6">
      <div className="w-full sm:w-3/4">
      <div className="faded-text truncate mb-2">{gif.title}</div>
      <Gif gif={gif} hover={false}/>
      {/*Mobile UI */}
      <div className="flex  sm:hidden gap-1 mt-2 justify-between">
              <div className="flex">
               <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />

             <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>

              </div>

              <div className="flex justify-end gap-4">
             
              <button
              onClick={() => addToFavourites(gif.id)}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <HiMiniHeart
                size={30}
                className={
                  `${ favourites.includes(gif.id) ? "text-red-500" : ""}`
                }
              />
            </button>

              <button className="ml-auto" 
              onClick={shareGif}
              >
                <FaPaperPlane size={25}
                className="text-white hover:text-teal-600"/>
              </button>
              </div>

              

      </div>

            {/* -- Mobile UI -- */}
      </div>


      {/*favourites/share/embed*/}
      <div className="hidden sm:flex flex-col gap-5 mt-6">
      
            <button
              onClick={() => addToFavourites(gif.id)}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <HiMiniHeart
                size={30}
                className={
                  `${ favourites.includes(gif.id) ? "text-red-500" : ""}`
                  
                }
              />
              Favourite
            </button>
            <button
              onClick={shareGif} // Assignment
              className="flex gap-6 items-center font-bold text-lg "
            >
              <FaPaperPlane size={25}
              className="text-white hover:text-teal-600 transition-transform duration-300 hover:scale-110"  />
              Share
            </button>
            <button
              onClick={EmbedGif} // Assignment
              className="flex gap-5 items-center font-bold text-lg"
            >
              <IoCodeSharp size={30} className="transition-transform duration-300 hover:scale-110" />
              Embed
            </button>

            {embedCode && (
              <div>
                <textarea  className="w-full p-2 bg-gray-800 text-white rounded overflow-hidden text-sm font-semibold"
                 value={embedCode}

                 rows="4"
                 readOnly/>
                 <button className="mt-2 p-2 bg-purple-500 text-white font-semibold border-b-white rounded"
                 onClick={() => navigator.clipboard.writeText(embedCode)}>Copy Embed Code</button>
              </div>
              
            )}

      </div>

      {/*-- */}

    </div>

    <div classNmae=" mt-8 sm:mt-6">
      <span className="font-extrabold">Related GIFs</span>
      <div className="columns-2 md:columns-3 gap-2 ">
            {relatedGifs.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
    </div>
      </div>
    </div>
  )
}

export default GifPage
