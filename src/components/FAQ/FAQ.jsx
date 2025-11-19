const FAQ = () => {
  const faq = [
    {
      id: 1,
      question: "How can I list a pet or product on PawMart?",
      answer:
        "Simply create an account, go to the 'Add Listing' section, and fill out the details for your pet or product. Your listing will go live after submission.",
    },
    {
      id: 2,
      question: "Is PawMart only for pet adoption?",
      answer:
        "No, PawMart also allows breeders, pet shops, and owners to sell pet-related products like food, toys, and accessories.",
    },
    {
      id: 3,
      question: "How do I contact a seller or adopter?",
      answer:
        "You can use the built-in messaging option available on each listing page to contact sellers or adopters directly.",
    },
    {
      id: 4,
      question: "Does PawMart charge any fees for listing?",
      answer:
        "Creating an account and listing pets or products is free. However, premium features or promotional boosts may include additional charges.",
    },
    {
      id: 5,
      question: "Is it safe to buy or adopt through PawMart?",
      answer:
        "PawMart encourages verified listings and transparent communication. Always review listing details and speak directly with the seller before confirming any transaction.",
    },
  ];
  return (
    <>
      <div className="space-y-1.5 mb-7 sm:space-y-3 md:mb-9 lg:mb-11">
        <h2 className="text-center text-xl font-bold sm:text-2xl lg:text-3xl">
          <span className="text-[#fc4422]">Frequently</span> Asked Questions
        </h2>
        <p className="text-center md:w-[70%] md:mx-auto md:text-lg">
          Got questions? We’ve got answers — here’s everything you need to know
          about PawMart.
        </p>
      </div>
      <div className="space-y-1.5 md:space-y-3">
        {faq.map((que) => (
          <div
            key={que.id}
            className="collapse collapse-plus rounded-2xl bg-linear-to-r from-[#fc4422]/10 to-[#ff9266]/10 border border-[#fc4422]/20"
          >
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title text-[#fc4422] font-semibold">
              {que.question}
            </div>
            <div className="collapse-content text-base-content/60 text-sm">
              {que.answer}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FAQ;
