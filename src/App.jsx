import { useState, useEffect } from "react";
import "./index.css";
function App() {
   const [dataQuotes, setDataQuotes] = useState({
      tags: [],
      content: "",
      author: "",
   });
   const [color, setColors] = useState({
      bgColor: "",
      textColor: "",
      fill: "",
   });
   const [link, setLink] = useState({
      twitLink: "",
      tumbLink: "",
   });

   let myColor = [
      ["bg-red-400", "text-red-400", "fill-red-400"],
      ["bg-green-400", "text-green-400", "fill-green-400"],
      ["bg-pink-400", "text-pink-400", "fill-pink-400"],
      ["bg-cyan-400", "text-cyan-400", "fill-cyan-400"],
      ["bg-emerald-400", "text-emerald-400", "fill-emerald-400"],
      ["bg-blue-400", "text-blue-400", "fill-blue-400"],
      ["bg-yellow-400", "text-yellow-400", "fill-yellow-400"],
   ];

   const getQuote = async () => {
      const response = await fetch("https://api.quotable.io/random?maxLength=100");
      const data = await response.json();
      const index = Math.floor(Math.random() * myColor.length);

      const twitLink =
         "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
         encodeURIComponent('"' + data.content + '" ' + data.author);
      const tumbLink =
         "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
         encodeURIComponent(data.author) +
         "&content=" +
         encodeURIComponent(data.content) +
         "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button";

      setLink((link) => ({
         ...link,
         twitLink,
         tumbLink,
      }));
      setColors((color) => ({
         ...color,
         bgColor: myColor[index][0],
         textColor: myColor[index][1],
         fill: myColor[index][2],
      }));

      setDataQuotes((dataQuotes) => ({
         ...dataQuotes,
         ...data,
      }));
   };

   useEffect(() => {
      getQuote();
   }, []);

   const { content, author, tags } = dataQuotes;
   const { bgColor, textColor, fill } = color;
   const { twitLink, tumbLink } = link;

   return (
      <div className={`${bgColor} w-[100vw] h-[100vh] flex justify-center items-center duration-500`}>
         <div className="bg-white w-[80vw] sm:w-[650px] rounded-sm px-10 py-8" id="quote-box">
            <blockquote
               className={`text-2xl sm:text-3xl font-medium font-raleway text-center ${textColor} duration-500`}
               id="text"
            >
               <span className=" inline-block ">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 448 512"
                     className={`w-6 h-10 ${fill} duration-500`}
                  >
                     <path d="M96 224C84.72 224 74.05 226.3 64 229.9V224c0-35.3 28.7-64 64-64c17.67 0 32-14.33 32-32S145.7 96 128 96C57.42 96 0 153.4 0 224v96c0 53.02 42.98 96 96 96s96-42.98 96-96S149 224 96 224zM352 224c-11.28 0-21.95 2.305-32 5.879V224c0-35.3 28.7-64 64-64c17.67 0 32-14.33 32-32s-14.33-32-32-32c-70.58 0-128 57.42-128 128v96c0 53.02 42.98 96 96 96s96-42.98 96-96S405 224 352 224z" />
                  </svg>
               </span>{" "}
               {content}
               <div className="flex justify-center text-lg gap-2 pt-2">
                  {tags.map((elemen, i) => {
                     return (
                        <a
                           className="hover:underline focus:ring-2 outline-none"
                           href={`https://twitter.com/hashtag/${elemen}?`}
                           key={i}
                        >
                           #{elemen}{" "}
                        </a>
                     );
                  })}
               </div>
            </blockquote>
            <p className={`text-right font-raleway py-5 ${textColor} duration-500`} id="author">
               {" "}
               - {author}
            </p>
            <div className="flex items-end flex-col sm:flex-row sm:justify-between gap-2 ">
               <div className="flex gap-4">
                  <a href={twitLink} className="outline-none" id="tweet-quote">
                     <button
                        className={`${bgColor} hover:opacity-60 h-11 w-12 rounded-sm px-3 duration-500 focus:ring-2 ring-offset-2 outline-none`}
                        id="twitter-quote"
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-white">
                           <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                        </svg>
                     </button>
                  </a>
                  <a href={tumbLink} className="outline-none">
                     <button
                        className={`${bgColor} hover:opacity-60 h-11 w-12 rounded-sm px-3 duration-500 focus:ring-2 ring-offset-2 outline-none`}
                        id="tumble-quote"
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           viewBox="-100 0 512 512"
                           className="fill-white"
                        >
                           <path d="M309.8 480.3c-13.6 14.5-50 31.7-97.4 31.7-120.8 0-147-88.8-147-140.6v-144H17.9c-5.5 0-10-4.5-10-10v-68c0-7.2 4.5-13.6 11.3-16 62-21.8 81.5-76 84.3-117.1.8-11 6.5-16.3 16.1-16.3h70.9c5.5 0 10 4.5 10 10v115.2h83c5.5 0 10 4.4 10 9.9v81.7c0 5.5-4.5 10-10 10h-83.4V360c0 34.2 23.7 53.6 68 35.8 4.8-1.9 9-3.2 12.7-2.2 3.5.9 5.8 3.4 7.4 7.9l22 64.3c1.8 5 3.3 10.6-.4 14.5z" />
                        </svg>
                     </button>
                  </a>
               </div>
               <button
                  className={`${bgColor} hover:opacity-60 h-11 w-28 rounded-sm text-white font-raleway duration-500 focus:ring-2 ring-offset-2 outline-0 `}
                  id="new-quote"
                  onClick={getQuote}
               >
                  New quote
               </button>
            </div>
         </div>
      </div>
   );
}

export default App;
