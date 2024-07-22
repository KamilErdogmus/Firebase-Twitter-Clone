import React from "react";

const AsideContent = [
  {
    category: "Trending in History",
    hashtag: "ATATURK",
    posts: "2.8M posts",
  },
  { category: "News · Trending", hashtag: "BREAKING", posts: "12.1K posts" },
  {
    category: "Politics · Trending",
    hashtag: "SupportTheBill",
    posts: "39.2K posts",
  },
  {
    category: "Trending in Finance",
    hashtag: "Bitcoin",
    posts: "2,711 posts",
  },
  { category: "News · Trending", hashtag: "Gold", posts: "2,117 posts" },

  {
    category: "Business & Finance · Trending",
    hashtag: "Telegram",
    posts: "818K posts",
  },

  {
    category: "Trending in History",
    hashtag: "ForgiveMeTurkey",
    posts: "25.4K posts",
  },
];

const Aside = () => {
  return (
    <aside className="max-xl:hidden w-1/4 flex flex-col ms-4 p-4">
      <h2 className="text-2xl uppercase max-md:text-lg font-bold whitespace-nowrap mb-4">
        Trends You Might Like
      </h2>
      <ul>
        {AsideContent.map((item, index) => (
          <li key={index} className="mb-4 border-b pb-1">
            <p className="text-sm text-gray-500">{item.category}</p>
            <p className="text-lg font-bold cursor-pointer">{item.hashtag}</p>
            <p className="text-sm text-gray-500">{item.posts}</p>
          </li>
        ))}
      </ul>
      <button className="text-blue-500 hover:underline mt-4">Show More</button>
    </aside>
  );
};

//* React memo proplar değişmediği müddetçe bileşenin tekrardan render olmasının önüne geçer
export default React.memo(Aside);
