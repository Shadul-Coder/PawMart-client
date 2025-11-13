const WhyAdoptSection = () => {
  const adoptionReasons = [
    {
      id: 1,
      icon: "🏠",
      title: "Give Street Animals a Home",
      description:
        "Over 50,000 stray animals in Dhaka alone need loving homes. Your adoption directly saves lives and reduces street animal suffering.",
      stat: "50K+ Strays Need Homes",
    },
    {
      id: 2,
      icon: "💰",
      title: "Affordable & Responsible",
      description:
        "Adoption costs 70% less than buying from breeders. All pets are vaccinated and health-checked by our partner vets in Dhaka, Chittagong, and Sylhet.",
      stat: "70% Cost Saving",
    },
    {
      id: 3,
      icon: "❤️",
      title: "Support Local Rescue",
      description:
        "Work with trusted Bangladeshi rescue organizations like Obhoyaronno and JAAGO Foundation. Your adoption supports their life-saving work.",
      stat: "25+ Local Partners",
    },
    {
      id: 4,
      icon: "🌱",
      title: "Adapted to Bangladesh Climate",
      description:
        "Our rescued pets are already adapted to Bangladesh's climate and living conditions, making them perfect companions for local families.",
      stat: "Climate Adapted",
    },
  ];
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto w-[95%] lg:w-[97%]">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Why Adopt from <span className="text-[#fc4422]">PawMart</span> BD?
          </h2>
          <p className="md:text-lg max-w-3xl mx-auto">
            Join thousands of Bangladeshi families who've chosen compassion.
            Every adoption creates space for another street animal to be
            rescued.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { number: "15K+", label: "Pets Adopted" },
            { number: "25+", label: "Cities Covered" },
            { number: "95%", label: "Success Rate" },
            { number: "50+", label: "Vet Partners" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-base-100 shadow rounded-2xl"
            >
              <div className="text-2xl lg:text-3xl font-bold text-[#fc4422]">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {adoptionReasons.map((reason, index) => (
            <div
              key={reason.id}
              className="group relative bg-gradient-to-br from-white/10 to-orange-50/10 rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-orange-100"
            >
              <div className="hidden sm:flex absolute -top-4 -left-4 w-12 h-12 bg-[#fc4422] text-white rounded-full items-center justify-center font-bold text-lg shadow-lg">
                {index + 1}
              </div>
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 text-5xl transform group-hover:scale-110 transition-transform duration-300">
                  {reason.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-[#fc4422] transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600/300 text-lg leading-relaxed mb-6">
                    {reason.description}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fc4422] text-white rounded-full text-sm font-semibold">
                    {reason.stat}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAdoptSection;
