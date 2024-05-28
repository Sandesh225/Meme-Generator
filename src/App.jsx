import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [memes, setMemes] = useState([]);
  const [randomMeme, setRandomMeme] = useState(null);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get("https://api.imgflip.com/get_memes");
        setMemes(response.data.data.memes);
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    };

    fetchMemes();
  }, []);

  const getRandomMeme = () => {
    const randomIndex = Math.floor(Math.random() * memes.length);
    setRandomMeme(memes[randomIndex]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-500 to-indigo-700">
      <div className="max-w-md w-full  bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4  underline">
            Meme Generator
          </h1>
          <div className="mb-8">
            {randomMeme && (
              <div className="flex flex-col items-center justify-center">
                <img
                  src={randomMeme.url}
                  alt={randomMeme.name}
                  className="max-w-full h-auto rounded-lg"
                />
                <p className="text-gray-600 mt-2">{randomMeme.name}</p>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button
              onClick={getRandomMeme}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Generate Memes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
