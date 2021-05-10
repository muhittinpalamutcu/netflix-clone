import React, { useState } from "react";
import "./HomeScreen.css";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Row from "../components/Row";
import requests from "../Requests";

const HomeScreen = () => {
  const [key, setKey] = useState("");

  const search = (searchKey) => {
    setKey(searchKey);
  };

  return (
    <div className="homeScreen">
      <Nav search={true} findMovies={search} />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
        search={key}
      />
      <Row
        title="Trending now"
        fetchUrl={requests.fetchTrending}
        search={key}
      />
      <Row title="Top rated" fetchUrl={requests.fetchTopRated} search={key} />
      <Row
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
        search={key}
      />
      <Row
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
        search={key}
      />
      <Row
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
        search={key}
      />
      <Row
        title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
        search={key}
      />
      <Row
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
        search={key}
      />
    </div>
  );
};

export default HomeScreen;
