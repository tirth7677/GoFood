import React from "react";

function Carousel() {
  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      style={{ objectFit: "contain" }}
    >
      <div className="carousel-inner" id="carousels">
        <div className="carousel-caption" style={{ zIndex: "5" }}>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
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
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
