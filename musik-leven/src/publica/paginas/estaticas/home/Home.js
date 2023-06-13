import React from "react";
import { useNavigate } from "react-router-dom";
//import "./HeaderLogin.css";
import image from "../../assets/img/tomorrowland.jpg";
import image2 from "../../assets/img/mysteryland.avif";
import image3 from "../../assets/img/daydream.jpg";
import image4 from "../../assets/img/dreambeach.jpg";
import HomeHero from "./home-hero/HomeHero";


function HomePage() {
  let navigate = useNavigate();

  //const goToLoginForm = () => {};

  return (
    <div>
      <HomeHero />

      <main className="main">
        <section className="main__section1">
          <h2>Descubre todos los festivales de este verano!</h2>

          <div className="container">
            <div className="container__flex">
              <div className="cardFilm">
                <img src={image} alt="Tomorrowland" />
              </div>
              <div className="cardFilm">
                <img src={image2} alt="Misteryland" />
              </div>
              <div className="cardFilm">
                <img src={image3} alt="DayDream" />
              </div>
              <div className="cardFilm">
                <img src={image4} alt="DreamBeach" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;