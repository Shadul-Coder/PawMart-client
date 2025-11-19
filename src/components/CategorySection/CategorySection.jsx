import { motion } from "motion/react";
import { Link } from "react-router";
import img1 from "../../assets/Pets.jpg";
import img2 from "../../assets/Pet Food.jpg";
import img3 from "../../assets/Accessories.jpg";
import img4 from "../../assets/Care Products.jpg";

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      name: "Pets",
      image: img1,
      filter: "pets",
    },
    {
      id: 2,
      name: "Pet Food",
      image: img2,
      filter: "foods",
    },
    {
      id: 3,
      name: "Accessories",
      image: img3,
      filter: "accessories",
    },
    {
      id: 4,
      name: "Care Products",
      image: img4,
      filter: "care-products",
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-center text-xl font-bold sm:text-2xl lg:text-3xl">
          Find What You're <span className="text-[#fc4422]">Looking</span> For
        </h2>
        <p className="text-center md:w-[70%] md:mx-auto md:text-lg">
          Explore a variety of categories including pets for adoption, essential
          supplies, foods, and accessories — everything in one place
        </p>
      </motion.div>
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {categories.map((category) => (
          <motion.div key={category.id} variants={itemVariants}>
            <Link
              to={`/adopt&shop?filter=${category.filter}`}
              className="group relative h-35 sm:h-45 md:h-50 rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 block"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-107"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold text-center px-4 group-hover:scale-105 transition-transform duration-300">
                  {category.name}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default CategorySection;
