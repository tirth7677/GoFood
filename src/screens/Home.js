import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";

function Home() {
  const [foodCat, setfoodcat] = useState([]);
  const [fooditem, setfooditem] = useState([]);
  const [search, setsearch] = useState("");

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setfooditem(data[0]);
      setfoodcat(data[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        style={{ objectFit: "contain" }}
      >
        <div className="carousel-inner" id="carousels">
          <div className="carousel-caption" style={{ zIndex: "5" }}>
            <div class="d-flex " role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setsearch(e.target.value);
                }}
              />
              {/* <button class="btn btn-outline-success" type="submit">
                Search
              </button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/300×300/?pasta"
              className="d-block w-100"
              alt="..."
              style={{
                objectFit: "cover",
                maxHeight: "500px",
                filter: "brightness(33%)",
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/300×300/?taco"
              className="d-block w-100"
              alt="..."
              style={{
                objectFit: "cover",
                maxHeight: "500px",
                filter: "brightness(33%)",
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/300×300/?nachos"
              className="d-block w-100"
              alt="..."
              style={{
                objectFit: "cover",
                maxHeight: "500px",
                filter: "brightness(33%)",
              }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        {foodCat !== [] ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {fooditem !== [] ? (
                  fooditem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                    .map((filteritems) => {
                      return (
                        <div
                          key={filteritems._id}
                          className="col-12 col-md-6 col-lg-3 m-4 justify-content-center"
                        >
                          <Card
                            fooditems={filteritems}
                            options={filteritems.options[0]}
                          ></Card>
                        </div>
                      );
                    })
                ) : (
                  <div>No Such data Found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>Not Found</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
