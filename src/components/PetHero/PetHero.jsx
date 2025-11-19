import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { MdOutlineLocationOn } from "react-icons/md";
import hero1 from "../../assets/User 1.jpeg";
import hero2 from "../../assets/User 2.jpg";
import hero3 from "../../assets/User 3.jpg";
import hero4 from "../../assets/User 4.jpg";
import hero5 from "../../assets/User 5.jpg";
import hero6 from "../../assets/User 6.jpg";
import hero7 from "../../assets/User 7.jpg";

const PetHero = () => {
  const petHeroes = [
    {
      name: "Rahim & Bella",
      location: "Dhaka, Bangladesh",
      story:
        "We adopted Bella during the pandemic. She's not just a pet — she's family. Thanks to PawMart, we found our loyal companion who filled our home with joy.",
      image: hero1,
    },
    {
      name: "Tasnim & Simba",
      location: "Chattogram, Bangladesh",
      story:
        "Simba was rescued from the streets. Today, he's the most playful and loving cat. Adopting him was one of the best decisions we ever made.",
      image: hero2,
    },
    {
      name: "Faria & Rocky",
      location: "Sylhet, Bangladesh",
      story:
        "Rocky came into our lives when we least expected it. He's taught us patience, love, and the true meaning of companionship. Adopt, don't shop!",
      image: hero3,
    },
    {
      name: "Jamil & Coco",
      location: "Khulna, Bangladesh",
      story:
        "Coco was a scared little pup when we found her on PawMart. Now, she's the heart of our home — always smiling, always loyal.",
      image: hero4,
    },
    {
      name: "Ayesha & Milo",
      location: "Rajshahi, Bangladesh",
      story:
        "Milo helped me overcome anxiety with his unconditional love. Every day is brighter with him by my side. Thank you PawMart for connecting us!",
      image: hero5,
    },
    {
      name: "Sohel & Luna",
      location: "Barisal, Bangladesh",
      story:
        "Luna was our first adoption through PawMart. She's transformed our family with her energy and affection. Adoption truly saves lives!",
      image: hero6,
    },
    {
      name: "Nadia & Max",
      location: "Rangpur, Bangladesh",
      story:
        "Max came to us as a foster but quickly became a permanent family member. His resilience and love inspire us every single day.",
      image: hero7,
    },
  ];
  return (
    <section className="max-w-7xl mx-auto w-[95%] lg:w-[97%] cursor-default">
      <div className="space-y-1.5 mb-7 sm:space-y-3 md:mb-9 lg:mb-11">
        <h2 className="text-center text-xl font-bold sm:text-2xl lg:text-3xl">
          Meet Our <span className="text-[#fc4422]">Pet</span> Heroes
        </h2>
        <p className="text-center md:text-lg">
          Inspiring stories of love and companionship from our PawMart community
        </p>
      </div>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 25 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper lg:px-7!"
        >
          {petHeroes.map((hero, index) => (
            <SwiperSlide key={index} className="pb-10">
              <div className="bg-white h-[309px] transition-all duration-300 rounded-3xl flex flex-col text-center group shadow-md p-6 hover:shadow-xl sm:p-7 md:p-8 sm:h-[383px] md:h-[377px] lg:h-[407px]">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary shadow-md">
                  <img
                    src={hero.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed italic mb-5 sm:text-base md:text-lg">
                  “{hero.story}”
                </p>
                <h6 className="text-gray-700 mx-auto text-xs sm:text-sm md:text-base ">
                  <span className="flex items-center gap-1.5">
                    <MdOutlineLocationOn /> {hero.location}
                  </span>
                </h6>
                <div className="mt-auto">
                  <h4 className="text-[#fc4422] font-semibold text-base sm:text-lg">
                    {hero.name}
                  </h4>
                  <div className="w-16 h-1 bg-linear-to-r from-primary to-secondary rounded-full mt-2 mx-auto transition-all duration-300 group-hover:w-25"></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PetHero;
