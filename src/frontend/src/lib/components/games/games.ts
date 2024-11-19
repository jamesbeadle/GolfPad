export type Game = {
  id: "mulligans" | "prophet" | "bands" | "build-it" | "next-up";
  title: string;
  image: string;
  description: string;
};

export const games: Game[] = [
  {
    id: "mulligans",
    title: "MULLIGANS",
    image: "/mulligans.png",
    description:
      "Mulligans offer golfers a second chance to retake a shot without penalty, providing a do-over opportunity to improve their game.",
  },
  {
    id: "prophet",
    title: "PROPHET",
    image: "/prophet.png",
    description:
      "Prophet is a golf game format that emphasizes precise scoring based on the length of each putt made by players.",
  },
  {
    id: "bands",
    title: "BANDS",
    image: "/bands.png",
    description:
      "Bands is a golf game where players hit designated targets to earn points.",
  },
  {
    id: "build-it",
    title: "BUILD IT",
    image: "/build-it.png",
    description:
      "Build It is a golf game where players aim to progressively improve their scores over each hole.",
  },
  {
    id: "next-up",
    title: "NEXT UP",
    image: "/next-up.png",
    description:
      "Next Up is a golf game where players compete to score the next best shot after each hole.",
  },
];
