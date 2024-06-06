import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
 import { TbSquareRoundedArrowLeft, TbSquareRoundedArrowRight } from "react-icons/tb";

type Props = {
  category: any;
  setCategory: any;
  categories: any;
};

const CategoryListCarousel = ({ category, categories, setCategory }: Props) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  const CustomButtonGroup = ({ next, previous }: any) => (
    <div className="carousel-button-group flex justify-center  space-x-2 mt-2 ">
      <button className="carousel-button hover:bg-gray-200 p-2 rounded-full hidden  md:block" onClick={previous}>
      <TbSquareRoundedArrowLeft size={25} />{/* Icon for right scroll */}
      </button>
      <button className="carousel-button  hover:bg-gray-200 p-2 rounded-full hidden  md:block" onClick={next}>
      <TbSquareRoundedArrowRight size={25} />
      </button>
    </div>
  );

  return (
    <div>
      <Carousel
        swipeable
        draggable
        showDots={false}
        responsive={responsive}
        ssr
        infinite
        autoPlay={false}
        keyBoardControl
        customTransition="transform 500ms ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        arrows={false}
        renderButtonGroupOutside
        customButtonGroup={<CustomButtonGroup />}
      >
        <div
          className={`h-[35px] text-xs hover:text-white hover:bg-gray-900 text-black ${
            category === "All" ? "bg-gray-900 text-white" : "bg-gray-200"
          } mt-6 800px:mr-4 mr-2 ml-2 px-4 rounded-xl flex items-center justify-center font-Poppins cursor-pointer`}
          onClick={() => setCategory("All")}
        >
          All
        </div>
        {categories &&
          categories.map((cat: any, index: number) => (
            <div key={index}>
              <div
                className={`h-[35px] text-xs hover:text-white hover:bg-gray-900 ${
                  category === cat ? "bg-gray-900 text-white" : "bg-gray-200"
                } mt-6 mr-8 px-2 rounded-xl flex items-center justify-center font-Poppins cursor-pointer text-black`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default CategoryListCarousel;
