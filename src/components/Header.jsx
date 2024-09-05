import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { GifState } from '../context/gifContext';
import GifSearch from './GifSearch';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const { gf, setGifs, filter, setFilter, favourites } = GifState();

  const fetchGifCategories = async () => {
    const { data } = await gf.categories();
    setCategories(data);
  };

  useEffect(() => {
    fetchGifCategories();
  }, []);

  return (
    <nav>
      <div className="relative flex justify-between items-center mb-2">
        <Link to="/" className="flex gap-2">
          <img src="/final2_logo.png" alt="Giphy-logo" className="w-8 sm:w-12" />
          <h1 className="text-3xl sm:text-5xl font-bold cursor-pointer tracking-tight logoColor">GIFinder</h1>
        </Link>

        {/* Rendering categories */}
        <div className="font-bold text-md flex gap-2 items-center">
          <Link className="px-4 py-1 hover:gradient border-b-4 hidden lg:block">Reactions</Link>

          {categories.slice(0, 5)?.map((category) => (
            <Link
              to={`/${category.name_encoded}`}
              key={category.name}
              className="px-4 py-1 hover:gradient border-b-4 hidden lg:block"
            >
              {category.name}
            </Link>
          ))}

          {/* Desktop Category Button */}
          <button onClick={() => setShowCategories(!showCategories)}>
            <HiEllipsisVertical size={35} className={`py-0.5 hover:gradient ${showCategories ? "gradient" : ""} border-b-4 hidden lg:block`} />
          </button>

          <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
            <Link to="/favourites">Favourite GIFs</Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setShowCategories(!showCategories)}>
            <HiMiniBars3BottomRight size={30} className="text-sky-400 block lg:hidden" />
          </button>

          {/* Category Dropdown */}
          {showCategories && (
            <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20 lg:hidden">
              <span>Categories</span>
              <hr />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid:cols-6 gap-4">
                {categories?.map((category) => (
                  <Link to={`/${category.name_encoded}`} className="font-bold" key={category.name}>
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Desktop Dropdown */}
          {showCategories && (
            <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20 hidden lg:block">
              <span>Categories</span>
              <hr />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid:cols-6 gap-4">
                {categories?.map((category) => (
                  <Link to={`/${category.name_encoded}`} className="font-bold" key={category.name}>
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      <GifSearch />
    </nav>
  );
};

export default Header;
