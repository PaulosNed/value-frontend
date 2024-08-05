
interface DescriptionItems {
  description: string;
}

const DescriptionItems = () => {
  const DescriptionItems: DescriptionItems[] = [
    {
      description:
        "Schedule a consultation with our Enrollment Team. During the consultation, we’ll learn more about your academic journey, and what help you need along the way.",
    },
    {
      description:
        "We’ll match you to accomplished counselors that are the best fit for you based on your goals.",
    },
    {
      description:
        "Once we help you create the perfect path and provide you with everything you need its up to you to take a giant leap toward admission success!",
    },
  ];

  return (
    <div className="flex flex-col space-y-5 md:space-y-24">
      {DescriptionItems.map(
        (descriptionItem: DescriptionItems, index: number) => (
          <div
            key={index}
            className={`relative bg-white bg-opacity-100 z-20 w-[471px] h-[150px] flex gap-4 shadow-custom-blue p-10 rounded-none ${
              index === 1 ? "md:ml-20" : ""
            }`}
          >
            <h1 className="absolute -top-6 left-2 text-gray-400 text-5xl">
              {index + 1}
            </h1>
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center p-10">
              <p className="text-primary font-[500]">{descriptionItem.description}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default DescriptionItems;
