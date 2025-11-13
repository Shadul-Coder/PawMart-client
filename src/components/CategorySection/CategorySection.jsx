import { Link } from "react-router";
import { motion } from "motion/react"
import { Typewriter } from "react-simple-typewriter";

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      name: "Pets (Adoption)",
      icon: "🐾",
      filter: "pets",
      gradient: "bg-gradient-to-br from-[#fc4422] to-[#ff9266]",
      hoverGradient: "bg-gradient-to-br from-[#ff9266] to-[#fc4422]",
      description: "Find your perfect furry companion",
    },
    {
      id: 2,
      name: "Pet Food",
      icon: "🍖",
      filter: "foods",
      gradient: "bg-gradient-to-br from-[#ff9266] to-[#fc4422]",
      hoverGradient: "bg-gradient-to-br from-[#fc4422] to-[#ff9266]",
      description: "Premium nutrition for your pets",
    },
    {
      id: 3,
      name: "Accessories",
      icon: "⛓️",
      filter: "accessories",
      gradient: "bg-gradient-to-br from-[#fc4422] to-[#ff7a52]",
      hoverGradient: "bg-gradient-to-br from-[#ff7a52] to-[#fc4422]",
      description: "Toys, collars, and essentials",
    },
    {
      id: 4,
      name: "Pet Care Products",
      icon: "🧴",
      filter: "care-products",
      gradient: "bg-gradient-to-br from-[#ff7a52] to-[#fc4422]",
      hoverGradient: "bg-gradient-to-br from-[#fc4422] to-[#ff7a52]",
      description: "Health and grooming supplies",
    },
  ];
  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto w-[95%] pt-9 sm:pt-13 lg:w-[97%]">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
          >
            Everything for Your{" "}
            <span className="text-[#fc4422]">
              <Typewriter
                words={["Pets"]}
                loop={1}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:text-lg max-w-3xl mx-auto"
          >
            Discover our complete range of pet services and products - from
            adoption to premium care essentials
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to={`/adopt&shop?filter=${category.filter}`}
                className="group block relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
              >
                <div
                  className={`relative h-64 sm:h-72 md:h-80 lg:h-96 ${category.gradient} group-hover:${category.hoverGradient} transition-all duration-500 overflow-hidden`}
                >
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 right-4 text-6xl opacity-30">
                      🐾
                    </div>
                    <div className="absolute bottom-4 left-4 text-6xl opacity-30">
                      🐾
                    </div>
                  </div>
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700 delay-100"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-4 sm:mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                    >
                      <span className="text-3xl sm:text-4xl">
                        {category.icon}
                      </span>
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 transform group-hover:scale-105 transition-transform duration-300">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-center text-sm sm:text-base mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                      {category.description}
                    </p>
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-300 delay-200">
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
                        Explore Now
                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
