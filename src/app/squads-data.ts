export interface Player {
  name: string;
  role: string;
  style: string;
  rating: number;
}

export interface TeamSquad {
  id: string;
  name: string;
  shortName: string;
  flag: string;
  captain: string;
  wicketkeeper: string;
  players: Player[];
}

export const MODERN_SQUADS: TeamSquad[] = [
  {
    id: "ind",
    name: "India",
    shortName: "IND",
    flag: "🇮🇳",
    captain: "Rohit Sharma",
    wicketkeeper: "Rishabh Pant",
    players: [
      { name: "Rohit Sharma (C)", role: "Opening Batsman", style: "Right-hand bat", rating: 92 },
      { name: "Virat Kohli", role: "Top-Order Batsman", style: "Right-hand bat", rating: 96 },
      { name: "Shubman Gill", role: "Top-Order Batsman", style: "Right-hand bat", rating: 88 },
      { name: "Yashasvi Jaiswal", role: "Opening Batsman", style: "Left-hand bat", rating: 89 },
      { name: "Suryakumar Yadav", role: "Middle-Order Batsman", style: "Right-hand bat", rating: 91 },
      { name: "Rishabh Pant (WK)", role: "Wicketkeeper Batsman", style: "Left-hand bat", rating: 89 },
      { name: "Hardik Pandya", role: "All-Rounder", style: "Right-hand bat / Fast-medium", rating: 88 },
      { name: "Ravindra Jadeja", role: "All-Rounder", style: "Left-hand bat / Slow left-arm", rating: 90 },
      { name: "Jasprit Bumrah", role: "Fast Bowler", style: "Right-arm fast", rating: 97 },
      { name: "Mohammed Shami", role: "Fast Bowler", style: "Right-arm fast", rating: 91 },
      { name: "Mohammed Siraj", role: "Fast Bowler", style: "Right-arm fast", rating: 88 },
      { name: "Kuldeep Yadav", role: "Spin Bowler", style: "Left-arm wrist spin", rating: 89 },
      { name: "Axar Patel", role: "All-Rounder", style: "Left-hand bat / Slow left-arm", rating: 86 },
      { name: "KL Rahul", role: "Wicketkeeper Batsman", style: "Right-hand bat", rating: 87 },
      { name: "Shreyas Iyer", role: "Middle-Order Batsman", style: "Right-hand bat", rating: 87 },
    ],
  },
  {
    id: "aus",
    name: "Australia",
    shortName: "AUS",
    flag: "🇦🇺",
    captain: "Pat Cummins",
    wicketkeeper: "Alex Carey",
    players: [
      { name: "Pat Cummins (C)", role: "Fast Bowler / All-Rounder", style: "Right-arm fast", rating: 95 },
      { name: "Travis Head", role: "Opening Batsman", style: "Left-hand bat / Off break", rating: 92 },
      { name: "Steve Smith", role: "Top-Order Batsman", style: "Right-hand bat", rating: 94 },
      { name: "Marnus Labuschagne", role: "Top-Order Batsman", style: "Right-hand bat / Leg break", rating: 88 },
      { name: "Glenn Maxwell", role: "All-Rounder", style: "Right-hand bat / Off break", rating: 89 },
      { name: "Mitchell Marsh", role: "All-Rounder", style: "Right-hand bat / Medium", rating: 87 },
      { name: "Alex Carey (WK)", role: "Wicketkeeper Batsman", style: "Left-hand bat", rating: 86 },
      { name: "Mitchell Starc", role: "Fast Bowler", style: "Left-arm fast", rating: 93 },
      { name: "Josh Hazlewood", role: "Fast Bowler", style: "Right-arm fast-medium", rating: 93 },
      { name: "Adam Zampa", role: "Spin Bowler", style: "Right-arm leg break", rating: 90 },
      { name: "Nathan Lyon", role: "Spin Bowler", style: "Right-arm off break", rating: 91 },
      { name: "Josh Inglis", role: "Wicketkeeper Batsman", style: "Right-hand bat", rating: 85 },
    ],
  },
  {
    id: "eng",
    name: "England",
    shortName: "ENG",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    captain: "Jos Buttler",
    wicketkeeper: "Jos Buttler",
    players: [
      { name: "Jos Buttler (C/WK)", role: "Wicketkeeper Batsman", style: "Right-hand bat", rating: 91 },
      { name: "Ben Stokes", role: "All-Rounder", style: "Left-hand bat / Fast-medium", rating: 93 },
      { name: "Joe Root", role: "Top-Order Batsman", style: "Right-hand bat / Off break", rating: 95 },
      { name: "Harry Brook", role: "Middle-Order Batsman", style: "Right-hand bat", rating: 90 },
      { name: "Jonny Bairstow", role: "Wicketkeeper Batsman", style: "Right-hand bat", rating: 87 },
      { name: "Liam Livingstone", role: "All-Rounder", style: "Right-hand bat / Spin", rating: 86 },
      { name: "Chris Woakes", role: "All-Rounder", style: "Right-arm fast-medium", rating: 87 },
      { name: "Jofra Archer", role: "Fast Bowler", style: "Right-arm fast", rating: 91 },
      { name: "Mark Wood", role: "Fast Bowler", style: "Right-arm express", rating: 90 },
      { name: "Adil Rashid", role: "Spin Bowler", style: "Right-arm leg break", rating: 89 },
      { name: "Rehan Ahmed", role: "All-Rounder", style: "Right-arm leg break", rating: 84 },
      { name: "Gus Atkinson", role: "Fast Bowler", style: "Right-arm fast", rating: 86 },
    ],
  },
  {
    id: "sa",
    name: "South Africa",
    shortName: "RSA",
    flag: "🇿🇦",
    captain: "Temba Bavuma",
    wicketkeeper: "Quinton de Kock",
    players: [
      { name: "Temba Bavuma (C)", role: "Top-Order Batsman", style: "Right-hand bat", rating: 86 },
      { name: "Quinton de Kock (WK)", role: "Wicketkeeper Batsman", style: "Left-hand bat", rating: 92 },
      { name: "Aiden Markram", role: "Top-Order Batsman", style: "Right-hand bat / Off break", rating: 89 },
      { name: "Heinrich Klaasen", role: "Middle-Order Batsman", style: "Right-hand bat", rating: 92 },
      { name: "David Miller", role: "Middle-Order Batsman", style: "Left-hand bat", rating: 89 },
      { name: "Marco Jansen", role: "All-Rounder", style: "Left-arm fast / Right bat", rating: 87 },
      { name: "Keshav Maharaj", role: "Spin Bowler", style: "Slow left-arm orthodox", rating: 88 },
      { name: "Kagiso Rabada", role: "Fast Bowler", style: "Right-arm fast", rating: 94 },
      { name: "Anrich Nortje", role: "Fast Bowler", style: "Right-arm express", rating: 90 },
      { name: "Lungi Ngidi", role: "Fast Bowler", style: "Right-arm fast-medium", rating: 86 },
      { name: "Gerald Coetzee", role: "Fast Bowler", style: "Right-arm fast", rating: 86 },
    ],
  },
  {
    id: "nz",
    name: "New Zealand",
    shortName: "NZL",
    flag: "🇳🇿",
    captain: "Kane Williamson",
    wicketkeeper: "Tom Latham",
    players: [
      { name: "Kane Williamson (C)", role: "Top-Order Batsman", style: "Right-hand bat", rating: 94 },
      { name: "Devon Conway", role: "Opening Batsman", style: "Left-hand bat", rating: 88 },
      { name: "Daryl Mitchell", role: "All-Rounder", style: "Right-hand bat / Medium", rating: 89 },
      { name: "Glenn Phillips", role: "All-Rounder", style: "Right-hand bat / Off break", rating: 87 },
      { name: "Tom Latham (WK)", role: "Wicketkeeper Batsman", style: "Left-hand bat", rating: 86 },
      { name: "Rachin Ravindra", role: "All-Rounder", style: "Left-hand bat / Slow left-arm", rating: 89 },
      { name: "Mitchell Santner", role: "All-Rounder", style: "Slow left-arm / Left bat", rating: 87 },
      { name: "Tim Southee", role: "Fast Bowler", style: "Right-arm fast-medium", rating: 88 },
      { name: "Trent Boult", role: "Fast Bowler", style: "Left-arm fast-medium", rating: 91 },
      { name: "Matt Henry", role: "Fast Bowler", style: "Right-arm fast-medium", rating: 88 },
      { name: "Lockie Ferguson", role: "Fast Bowler", style: "Right-arm express", rating: 88 },
    ],
  },
  {
    id: "pak",
    name: "Pakistan",
    shortName: "PAK",
    flag: "🇵🇰",
    captain: "Babar Azam",
    wicketkeeper: "Mohammad Rizwan",
    players: [
      { name: "Babar Azam (C)", role: "Top-Order Batsman", style: "Right-hand bat", rating: 93 },
      { name: "Mohammad Rizwan (WK)", role: "Wicketkeeper Batsman", style: "Right-hand bat", rating: 90 },
      { name: "Fakhar Zaman", role: "Opening Batsman", style: "Left-hand bat", rating: 87 },
      { name: "Saim Ayub", role: "Opening Batsman", style: "Left-hand bat", rating: 85 },
      { name: "Iftikhar Ahmed", role: "All-Rounder", style: "Right-hand bat / Off break", rating: 84 },
      { name: "Shadab Khan", role: "All-Rounder", style: "Right-arm leg break", rating: 86 },
      { name: "Shaheen Shah Afridi", role: "Fast Bowler", style: "Left-arm fast", rating: 93 },
      { name: "Naseem Shah", role: "Fast Bowler", style: "Right-arm fast", rating: 89 },
      { name: "Haris Rauf", role: "Fast Bowler", style: "Right-arm express", rating: 88 },
      { name: "Aamer Jamal", role: "All-Rounder", style: "Right-arm fast-medium", rating: 85 },
      { name: "Agha Salman", role: "All-Rounder", style: "Right-hand bat / Off break", rating: 85 },
    ],
  },
];

