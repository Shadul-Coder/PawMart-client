import { motion } from "motion/react";
import { FaShieldAlt, FaHandsHelping } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { GiSelfLove } from "react-icons/gi";

const WhyAdoptSection = () => {
  const adoptionReasons = [
    {
      id: 1,
      icon: <IoHome />,
      title: "Give a Pet a Second Chance",
      description:
        "Many pets are waiting for a loving family. Your adoption can provide them the happy, safe, and caring home they deserve.",
      stat: "Reduce Pet Homelessness",
    },
    {
      id: 2,
      icon: <GiSelfLove />,
      title: "Build an Emotional Bond",
      description:
        "Adopted pets tend to form deeper emotional attachments as they appreciate love, support, and care more than ever.",
      stat: "Love That Lasts Forever",
    },
    {
      id: 3,
      icon: <FaShieldAlt />,
      title: "Safe & Verified Listings",
      description:
        "We ensure authentic adoption listings from real owners, promoting safe transitions, transparency, and responsible pet care.",
      stat: "Trusted & Community Driven",
    },
    {
      id: 4,
      icon: <FaHandsHelping />,
      title: "Support Animal Welfare",
      description:
        "By adopting instead of buying, you help reduce unethical breeding and encourage responsible pet ownership worldwide.",
      stat: "Be a Hero for Animals",
    },
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  return (
    <motion.section
      className="max-w-7xl mx-auto w-[95%] lg:w-[97%] cursor-default"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <motion.div
        className="space-y-1.5 mb-7 sm:space-y-3 md:mb-9 lg:mb-11"
        variants={itemVariants}
      >
        <h2 className="text-center text-xl font-bold sm:text-2xl lg:text-3xl">
          Why Adopt From <span className="text-[#fc4422]">PawMart?</span>
        </h2>
        <p className="text-center md:w-[70%] md:mx-auto md:text-lg">
          At PawMart, every pet deserves a loving home. Adoption brings joy to
          your life while giving a pet a second chance filled with love and care
        </p>
      </motion.div>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-5 mb-7 md:mb-9 lg:mb-11"
        variants={containerVariants}
      >
        {[
          { number: "10K+", label: "Successful Adoptions" },
          { number: "120+", label: "Trusted Cities Connected" },
          { number: "100%", label: "Verified Profiles" },
          { number: "250+", label: "Partnered Vets & Trainers" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="text-center p-6 sm:py-9 lg:py-11 bg-base-100 shadow rounded-2xl"
            variants={statVariants}
          >
            <div className="text-2xl lg:text-3xl font-bold text-[#fc4422]">
              {stat.number}
            </div>
            <div className="text-gray-500 text-sm mt-2">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5"
        variants={containerVariants}
      >
        {adoptionReasons.map((reason) => (
          <motion.div
            key={reason.id}
            className="group relative bg-orange-300/15 rounded-3xl p-5 md:p-7 shadow-lg hover:shadow-xl transition-all duration-500 border border-secondary"
            variants={itemVariants}
          >
            <div className="flex items-start gap-5">
              <div className="shrink-0 text-5xl transform group-hover:scale-105 transition-transform duration-300">
                {reason.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-gray-500 sm:text-lg text-justify leading-relaxed mb-6">
                  {reason.description}
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary to-secondary text-white rounded-xl text-sm font-semibold">
                  {reason.stat}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default WhyAdoptSection;
