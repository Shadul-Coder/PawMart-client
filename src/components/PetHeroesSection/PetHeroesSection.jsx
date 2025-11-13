import user1 from "../../assets/User 1.jpg";
import user2 from "../../assets/User 2.jpg";
import user3 from "../../assets/User 3.jpg";
import user4 from "../../assets/User 4.jpg";
import { motion } from "motion/react";
import { Typewriter } from "react-simple-typewriter";

const PetHeroesSection = () => {
  const heroes = [
    {
      id: 1,
      name: "Ayesha Rahman",
      role: "Animal Rescue Volunteer",
      location: "Dhaka",
      image: user1,
      story:
        "Started rescuing street animals during COVID-19 lockdown. Now runs a network of 50+ volunteers across Dhaka.",
      achievement: "200+ Rescues",
      specialty: "Street Animal Rescue",
      social: "@dhakaAnimalRescue",
    },
    {
      id: 2,
      name: "Rajib Ahmed",
      role: "Veterinary Doctor",
      location: "Chittagong",
      image: user2,
      story:
        "Provides free medical camps for street animals and low-cost services for adopted pets in port areas.",
      achievement: "1,000+ Treated",
      specialty: "Community Vet Care",
      social: "@chittagongPetCare",
    },
    {
      id: 3,
      name: "Fatima Begum",
      role: "Community Educator",
      location: "Sylhet",
      image: user3,
      story:
        "Educates tea garden communities about pet care and organizes adoption drives in rural Sylhet.",
      achievement: "50+ Villages",
      specialty: "Rural Education",
      social: "@sylhetPetAwareness",
    },
    {
      id: 4,
      name: "Sohel Rana",
      role: "Shelter Founder",
      location: "Rajshahi",
      image: user4,
      story:
        "Founded Rajshahi's first no-kill shelter with local business support, now housing 150+ animals.",
      achievement: "150+ Residents",
      specialty: "Shelter Management",
      social: "@rajshahiAnimalSanctuary",
    },
  ];
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto w-[95%] lg:w-[97%]">
        <div className="text-center mb-16 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
          >
            Our{" "}
            <span className="text-[#fc4422]">
              <Typewriter
                words={["Pet Heroes"]}
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
            Meet the incredible people transforming animal welfare across
            Bangladesh through compassion and action.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {heroes.map((hero, index) => (
            <motion.div
              key={hero.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group relative bg-base-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#fc4422] to-[#ff9266] p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 bg-white/20 overflow-hidden rounded-2xl flex items-center justify-center text-2xl"
                    >
                      <img src={hero.image} alt="" />
                    </motion.div>
                    <div className="text-right">
                      <div className="text-white/80 text-sm">Location</div>
                      <div className="font-bold text-lg">{hero.location}</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{hero.name}</h3>
                  <p className="text-white/90 font-semibold">{hero.role}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-[#fc4422] rounded-full text-sm font-semibold mb-4">
                  <span>⭐</span>
                  <span>{hero.specialty}</span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                  {hero.story}
                </p>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 mb-6 border border-orange-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#fc4422] mb-1">
                      {hero.achievement}
                    </div>
                    <div className="text-xs text-gray-600 uppercase tracking-wide">
                      Lifetime Impact
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm font-medium">
                    {hero.social}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-[#fc4422] text-white rounded-full text-sm font-semibold hover:bg-[#e53e1f] transition-colors duration-300"
                  >
                    Follow
                  </motion.button>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-transparent rounded-3xl transition-all duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 bg-gradient-to-r from-[#fc4422] to-[#ff9266] rounded-3xl p-8 lg:p-12 text-white"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Collective Impact Across Bangladesh
            </h3>
            <p className="text-xl opacity-90">
              Together, our heroes are creating lasting change
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "15,000+", label: "Animals Rescued" },
              { number: "45+", label: "Cities Covered" },
              { number: "200+", label: "Volunteers" },
              { number: "95%", label: "Success Rate" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm"
              >
                <div className="text-2xl lg:text-3xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PetHeroesSection;
