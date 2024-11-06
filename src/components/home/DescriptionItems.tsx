interface DescriptionItems {
  description: string;
}

const DescriptionItems = () => {
  const DescriptionItems: DescriptionItems[] = [
    {
      description:
        "Complete your application by sending us your academic achievements, important documents, and financial information. This helps us assess your eligibility and determine how best we can assist you on your journey to college success.",
    },
    {
      description:
        "We’ll match you with a dedicated counselor and provide you access to our digital course, which serves as a guide to help you complete your application. However, the true value comes from listening to your counselor’s personalized advice.",
    },
    {
      description:
        "We’ll help you make informed decisions on choosing your final university. Additionally, we’ll guide you through the steps needed to book a visa appointment and plan your trip, ensuring a smooth transition to your new academic journey abroad.",
    },
  ];

  return (
    <>

      {/* Mobile View */}
      <div className="flex flex-col space-y-5 md:hidden">
        {DescriptionItems.map(
          (descriptionItem: DescriptionItems, index: number) => (
            <div
              key={index}
              className={`bg-white flex gap-4 shadow-custom-blue p-10 rounded-none `}
            >
              <h1 className="text-gray-400 text-5xl">
                {index + 1}
              </h1>
              <div className="">
                <p className="text-primary text-sm">
                  {descriptionItem.description}
                </p>
              </div>
            </div>
          )
        )}
      </div>


      {/* Desktop View */}
      <div className="hidden md:flex flex-col space-y-5 md:space-y-24">
        {DescriptionItems.map(
          (descriptionItem: DescriptionItems, index: number) => (
            <div
              key={index}
              className={`relative bg-white bg-opacity-100 z-20 w-[471px] h-[180px] flex gap-4 shadow-custom-blue p-10 rounded-none ${
                index === 1 ? "md:ml-20" : ""
              }`}
            >
              <h1 className="absolute -top-6 left-2 text-gray-400 text-5xl">
                {index + 1}
              </h1>
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center p-10">
                <p className="text-primary font-[500]">
                  {descriptionItem.description}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default DescriptionItems;
