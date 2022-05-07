import React, { useState, useEffect } from "react";
import axios from "axios";

const Article = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const loadData = () => {
    let url = "https://medrum.herokuapp.com/articles";
    axios.get(url).then((res) => {
      setData(res.data);
    });
  };
  const moreData = () => {
    let url = `https://medrum.herokuapp.com/feeds/?source=5718e53e7a84fb1901e05971&page=${page}&sort=popular`;
    axios.get(url).then((res) => {
      setData([...data, ...res.data]);
      setPage(page + 1);
      setIsFetching(false);
    });
  };
  const isScrolling = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    setIsFetching(true);
  };

  useEffect(() => {
    loadData();
    window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
  }, []);

  useEffect(() => {
    if (isFetching) {
      moreData();
    }
  }, [isFetching]);

  if (data.length == 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <ul className="list-group-ul">
        {data.map((article, key) => (
          <li className="list-group-li" key={key}>
            <a href={article.url} target="_blank">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Article;
