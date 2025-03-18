export const bandsCategoryDetails = {
  NoLostBall: { description: "Won't Lose a Ball", points: 10 },
  NoTreeOrBunker: {
    description: "Don't Hit a Tree or Enter a Bunker",
    points: 15,
  },
  Hit2Of3Fairways: { description: "Hit 2/3 Fairways", points: 20 },
  Hit2Of3Greens: { description: "Hit 2/3 Greens", points: 25 },
  OnePutt2Of3Greens: { description: "1-Putt 2/3 Greens", points: 30 },
  NoDoubleBogeyOrWorse: {
    description: "Won't Get a Double Bogey or Worse",
    points: 35,
  },
  NoBogeyOrWorse: { description: "Won't Bogey or Worse", points: 40 },
  ParOrBetter: { description: "Be Par or Under", points: 45 },
  UnderPar: { description: "Be Under Par", points: 50 },
} as const;
