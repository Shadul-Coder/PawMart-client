import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import bg1 from "../../assets/Slide 1.jpg";
import bg2 from "../../assets/Slide 2.jpg";
import bg3 from "../../assets/Slide 3.jpg";
import bg4 from "../../assets/Slide 4.jpg";
import bg5 from "../../assets/Slide 5.jpg";

const Hero = () => {
  return (
    <section
      id="banner"
      className="relative max-w-7xl mx-auto w-[95%] lg:w-[97%]"
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={30}
        centeredSlides={true}
        speed={500}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = ".custom-prev";
          swiper.params.navigation.nextEl = ".custom-next";
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="bg-yellow-300 h-[370px] rounded-3xl overflow-hidden sm:h-[450px] md:h-[500px] lg:h-[600px] xl:h-[650px]">
            <div
              style={{
                backgroundImage: `url(${bg1})`,
              }}
              className="h-full bg-center bg-cover relative"
            >
              <div className="z-0 absolute inset-0 bg-black/50"></div>
              <div className="relative z-10 h-full p-13 flex flex-col justify-center items-center gap-3 sm:p-15 md:p-20 md:gap-5 lg:gap-7">
                <h1 className="text-center text-2xl font-bold text-white cursor-default sm:text-3xl md:text-4xl lg:text-5xl">
                  Find Your Furry Friend Today
                </h1>
                <p className="text-center text-gray-300 w-[80%] cursor-default sm:w-[75%] md:w-[70%] md:text-lg lg:w-[60%] xl:w-[50%]">
                  Give a pet a loving home — adopt, don’t shop. Every paw
                  deserves happiness.
                </p>
                <div className="flex flex-col gap-1.5 sm:gap-3 sm:flex-row">
                  <button className="flex items-center px-6 py-3 text-[13px] sm:text-sm md:text-base font-medium rounded-lg rounded-tr-3xl rounded-bl-3xl cursor-pointer border-2 border-secondary text-secondary transition-all duration-300 hover:scale-101 active:scale-99">
                    Adopt Now
                  </button>
                  <button className="flex items-center px-6 py-3 text-[13px] sm:text-sm md:text-base font-medium rounded-lg rounded-tr-3xl rounded-bl-3xl cursor-pointer bg-linear-to-r from-[#fc4422] to-[#ff9266] text-white transition-all duration-300 hover:scale-101 active:scale-99">
                    Explore Supplies
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-yellow-300 h-[370px] rounded-3xl overflow-hidden sm:h-[450px] md:h-[500px] lg:h-[600px] xl:h-[650px]">
            <div
              style={{
                backgroundImage: `url(${bg2})`,
              }}
              className="h-full bg-center bg-cover relative"
            >
              <div className="z-0 absolute inset-0 bg-black/50"></div>
              <div className="relative z-10 h-full p-13 flex flex-col justify-center items-center gap-3 sm:p-15 md:p-20 md:gap-5 lg:gap-7">
                <h1 className="text-center text-2xl font-bold text-white cursor-default sm:text-3xl md:text-4xl lg:text-5xl">
                  Where Pet Lovers Connect
                </h1>
                <p className="text-center text-gray-300 w-[80%] cursor-default sm:w-[75%] md:w-[70%] md:text-lg lg:w-[60%] xl:w-[50%]">
                  Join a caring community of adopters, owners, and pet
                  enthusiasts — all under one roof.
                </p>
                <div className="flex flex-col gap-1.5 sm:gap-3 sm:flex-row">
                  <button className="flex items-center px-6 py-3 text-[13px] sm:text-sm md:text-base font-medium rounded-lg rounded-tr-3xl rounded-bl-3xl cursor-pointer bg-linear-to-r from-[#fc4422] to-[#ff9266] text-white transition-all duration-300 hover:scale-101 active:scale-99">
                    Join Now
                  </button>
                  <button className="flex items-center px-6 py-3 text-[13px] sm:text-sm md:text-base font-medium rounded-lg rounded-tr-3xl rounded-bl-3xl cursor-pointer border-2 border-secondary text-secondary transition-all duration-300 hover:scale-101 active:scale-99">
                    Browse Listings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-yellow-300 h-[370px] rounded-3xl overflow-hidden sm:h-[450px] md:h-[500px] lg:h-[600px] xl:h-[650px]">
            <div
              style={{
                backgroundImage: `url(${bg3})`,
              }}
              className="h-full bg-center bg-cover relative"
            >
              <div className="z-0 absolute inset-0 bg-black/50"></div>
              <div className="relative z-10 h-full p-13 flex flex-col justify-center items-center gap-3 sm:p-15 md:p-20 md:gap-5 lg:gap-7">
                <h1 className="text-center text-2xl font-bold text-white cursor-default sm:text-3xl md:text-4xl lg:text-5xl">
                  Adopt Love. Shop Care.
                </h1>
                <p className="text-center text-gray-300 w-[80%] cursor-default sm:w-[75%] md:w-[70%] md:text-lg lg:w-[60%] xl:w-[50%]">
                  From adorable adoptions to quality supplies — PawMart brings
                  it all together for your pets.
                </p>
                <div className="flex flex-col gap-1.5 sm:gap-3 sm:flex-row">
                  <button className="flex items-center px-6 py-3 text-[13px] sm:text-sm md:text-base font-medium rounded-lg rounded-tr-3xl rounded-bl-3xl cursor-pointer border-2 border-secondary text-secondary transition-all duration-300 hover:scale-101 active:scale-99">
                    Browse Pets
                  </button>
                  <button className="flex items-center px-6 py-3 text-[13px] sm:text-sm md:text-base font-medium rounded-lg rounded-tr-3xl rounded-bl-3xl cursor-pointer bg-linear-to-r from-[#fc4422] to-[#ff9266] text-white transition-all duration-300 hover:scale-101 active:scale-99">
                    Shop Supplies
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-yellow-300 h-[370px] rounded-3xl overflow-hidden sm:h-[450px] md:h-[500px] lg:h-[600px] xl:h-[650px]">
            <div
              style={{
                backgroundImage: `url(${bg4})`,
              }}
              className="h-full bg-center bg-cover relative"
            >
              <div className="z-0 absolute inset-0 bg-black/50"></div>
              <div className="relative z-10 h-full p-13 flex flex-col justify-center items-center gap-3 sm:p-15 md:p-20 md:gap-5 lg:gap-7">
                <h1 className="text-center text-2xl font-bold text-white cursor-default sm:text-3xl md:text-4xl lg:text-5xl">
                  Because Every Paw Deserves Love
                </h1>
                <p className="text-center text-gray-300 w-[80%] cursor-default sm:w-[75%] md:w-[70%] md:text-lg lg:w-[60%] xl:w-[50%]">
                  Be a hero to a homeless pet — adopt, care, and make a
                  difference today.
                </p>
                <div className="flex flex-col gap-1.5 sm:gap-3 sm:flex-row">
                  <button className="flex items-center px-6 py-3 text-[13px] sm:text-sm md:text-base font-medium rounded-lg rounded-tr-3xl rounded-bl-3xl cursor-pointer bg-linear-to-r from-[#fc4422] to-[#ff9266] text-white transition-all duration-300 hover:scale-101 active:scale-99">
                    Start Adopting
                  </button>
                  <button className="flex items-center px-6 py-3 text-[13px] sm:text-sm md:text-base font-medium rounded-lg rounded-tr-3xl rounded-bl-3xl cursor-pointer border-2 border-secondary text-secondary transition-all duration-300 hover:scale-101 active:scale-99">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-yellow-300 h-[370px] rounded-3xl overflow-hidden sm:h-[450px] md:h-[500px] lg:h-[600px] xl:h-[650px]">
            <div
              style={{
                backgroundImage: `url(${bg5})`,
              }}
              className="h-full bg-center bg-cover relative"
            >
              <div className="z-0 absolute inset-0 bg-black/70"></div>
              <div className="relative z-10 h-full p-13 flex flex-col justify-center items-center gap-3 sm:p-15 md:p-20 md:gap-5 lg:gap-7">
                <h1 className="text-center text-2xl font-bold text-white cursor-default sm:text-3xl md:text-4xl lg:text-5xl">
                  Your Trusted Pet Marketplace
                </h1>
                <p className="text-center text-gray-300 w-[80%] cursor-default sm:w-[75%] md:w-[70%] md:text-lg lg:w-[60%] xl:w-[50%]">
                  Buy, adopt, or list your pets and products securely — all with
                  PawMart’s trusted community.
                </p>
                <div className="flex flex-col gap-1.5 sm:gap-3 sm:flex-row">
                  <button className="flex items-center px-6 py-3 text-[13px] sm:text-sm md:text-base font-medium rounded-lg rounded-tr-3xl rounded-bl-3xl cursor-pointer border-2 border-secondary text-secondary transition-all duration-300 hover:scale-101 active:scale-99">
                    Explore Now
                  </button>
                  <button className="flex items-center px-6 py-3 text-[13px] sm:text-sm md:text-base font-medium rounded-lg rounded-tr-3xl rounded-bl-3xl cursor-pointer bg-linear-to-r from-[#fc4422] to-[#ff9266] text-white transition-all duration-300 hover:scale-101 active:scale-99">
                    Add a Listing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="custom-prev absolute left-5 top-1/2 -translate-y-1/2 z-10 sm:left-6 md:left-7 lg:left-9">
        <button className="button rotate-180">
          <span className="svg">
            <svg
              className="w-11 cursor-pointer sm:w-13 md:w-15 lg:w-17"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 38 15"
              fill="none"
            >
              <path
                fill="white"
                d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z"
              ></path>
            </svg>
          </span>
        </button>
      </div>
      <div className="custom-next absolute right-5 top-1/2 -translate-y-1/2 z-10 sm:right-6 md:right-7 lg:right-9">
        <button className="button">
          <span className="svg">
            <svg
              className="w-11 cursor-pointer sm:w-13 md:w-15 lg:w-17"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 38 15"
              fill="none"
            >
              <path
                fill="white"
                d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
};

export default Hero;
