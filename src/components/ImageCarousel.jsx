import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  variableWidth: true,
  swipeToSlide: true,
  edgeFriction: 0.15,
  autoplay: true,
};

const images = [
  "https://steemitimages.com/DQmS2LmA7Dm4UTNkBmxUWWUc3FLpxwhA1D8pVrSKZqy427U/image.png",
  "https://www.slobodenpecat.mk/wp-content/uploads/2019/07/ohridsko-leto.jpg",
  "https://en.netpress.com.mk/wp-content/uploads/2020/01/sk-dino.jpg",
];

const ImageCarousel = () => {
  return (
    <Slider className=".one-time" {...settings}>
      {images.map((image, i) => (
        <img
          className="carousel-img"
          key={i}
          id={image}
          src={image}
          alt="image"
        />
      ))}
    </Slider>
  );
};

export default ImageCarousel;
