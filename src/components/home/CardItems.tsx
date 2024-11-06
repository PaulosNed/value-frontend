import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardItem {
  title: string;
  description: string;
  icon: string;
}
const CardItems = () => {
  const cardItems: CardItem[] = [
    {
      title: "Testing",
      description: "Prep for all your exams.",
      icon: "/images/home/share.svg",
    },
    {
      title: "Essays",
      description: "Loved by everyone.",
      icon: "/images/home/share.svg",
    },
    {
      title: "Activities",
      description: "Boost your application.",
      icon: "/images/home/share.svg",
    },
  ];

  return (
    <div className="flex flex-col space-y-5 md:space-y-10">
      {cardItems.map((cardItem: CardItem, index: number) => (
        <Card
          key={index}
          className={`flex gap-4 shadow-md p-4 w-full md:w-8/12 rounded-none ${index === 1 ? "md:ml-20" : ""}`}
        >
          <div>
            <img
              src={cardItem.icon}
              alt={cardItem.title}
              className="w-8 h-8 md:w-fit md:h-fit"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">{cardItem.title}</h1>
            <p className="text-sm">
              {cardItem.description}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CardItems;
