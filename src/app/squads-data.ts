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
  // ── India ──────────────────────────────────────────────────────────────────
  {
    id: "ind",
    name: "India",
    shortName: "IND",
    flag: "🇮🇳",
    captain: "Rohit Sharma",
    wicketkeeper: "Rishabh Pant",
    players: [
      { name: "Rohit Sharma (C)", role: "Opening Batsman",          style: "Right-hand bat",                  rating: 92 },
      { name: "Virat Kohli",      role: "Top-Order Batsman",        style: "Right-hand bat",                  rating: 96 },
      { name: "Shubman Gill",     role: "Top-Order Batsman",        style: "Right-hand bat",                  rating: 89 },
      { name: "Yashasvi Jaiswal", role: "Opening Batsman",          style: "Left-hand bat",                   rating: 90 },
      { name: "Suryakumar Yadav",role: "Middle-Order Batsman",      style: "Right-hand bat",                  rating: 92 },
      { name: "Rishabh Pant (WK)",role: "Wicketkeeper Batsman",     style: "Left-hand bat",                   rating: 90 },
      { name: "Hardik Pandya",    role: "All-Rounder",              style: "Right-hand bat / Fast-medium",    rating: 88 },
      { name: "Ravindra Jadeja",  role: "All-Rounder",              style: "Left-hand bat / Slow left-arm",   rating: 91 },
      { name: "Jasprit Bumrah",   role: "Fast Bowler",              style: "Right-arm fast",                  rating: 97 },
      { name: "Mohammed Shami",   role: "Fast Bowler",              style: "Right-arm fast-medium",           rating: 92 },
      { name: "Mohammed Siraj",   role: "Fast Bowler",              style: "Right-arm fast",                  rating: 88 },
      { name: "Kuldeep Yadav",    role: "Spin Bowler",              style: "Left-arm wrist spin",             rating: 90 },
      { name: "Axar Patel",       role: "All-Rounder",              style: "Left-hand bat / Slow left-arm",   rating: 87 },
      { name: "KL Rahul",         role: "Wicketkeeper Batsman",     style: "Right-hand bat",                  rating: 87 },
      { name: "Shreyas Iyer",     role: "Middle-Order Batsman",     style: "Right-hand bat",                  rating: 87 },
      { name: "Rinku Singh",      role: "Middle-Order Batsman",     style: "Left-hand bat",                   rating: 83 },
      { name: "Arshdeep Singh",   role: "Fast Bowler",              style: "Left-arm fast-medium",            rating: 86 },
      { name: "Washington Sundar",role: "All-Rounder",              style: "Right-arm off break / Bat",       rating: 83 },
    ],
  },

  // ── Pakistan ───────────────────────────────────────────────────────────────
  {
    id: "pak",
    name: "Pakistan",
    shortName: "PAK",
    flag: "🇵🇰",
    captain: "Babar Azam",
    wicketkeeper: "Mohammad Rizwan",
    players: [
      { name: "Babar Azam (C)",      role: "Top-Order Batsman",    style: "Right-hand bat",                 rating: 93 },
      { name: "Mohammad Rizwan (WK)",role: "Wicketkeeper Batsman",  style: "Right-hand bat",                 rating: 91 },
      { name: "Fakhar Zaman",        role: "Opening Batsman",       style: "Left-hand bat",                  rating: 87 },
      { name: "Saim Ayub",           role: "Opening Batsman",       style: "Left-hand bat",                  rating: 86 },
      { name: "Mohammad Haris",      role: "Middle-Order Batsman",  style: "Right-hand bat",                 rating: 83 },
      { name: "Iftikhar Ahmed",      role: "All-Rounder",           style: "Right-hand bat / Off break",     rating: 84 },
      { name: "Shadab Khan",         role: "All-Rounder",           style: "Right-arm leg break",            rating: 86 },
      { name: "Imad Wasim",          role: "All-Rounder",           style: "Slow left-arm / Left bat",       rating: 84 },
      { name: "Shaheen Shah Afridi", role: "Fast Bowler",           style: "Left-arm fast",                  rating: 93 },
      { name: "Naseem Shah",         role: "Fast Bowler",           style: "Right-arm fast",                 rating: 89 },
      { name: "Haris Rauf",          role: "Fast Bowler",           style: "Right-arm express",              rating: 88 },
      { name: "Aamer Jamal",         role: "All-Rounder",           style: "Right-arm fast-medium",          rating: 85 },
      { name: "Agha Salman",         role: "All-Rounder",           style: "Right-hand bat / Off break",     rating: 85 },
      { name: "Usama Mir",           role: "Spin Bowler",           style: "Right-arm leg break",            rating: 84 },
      { name: "Abrar Ahmed",         role: "Spin Bowler",           style: "Right-arm googly",               rating: 83 },
    ],
  },

  // ── South Africa ───────────────────────────────────────────────────────────
  {
    id: "sa",
    name: "South Africa",
    shortName: "RSA",
    flag: "🇿🇦",
    captain: "Temba Bavuma",
    wicketkeeper: "Quinton de Kock",
    players: [
      { name: "Temba Bavuma (C)",   role: "Top-Order Batsman",    style: "Right-hand bat",                 rating: 86 },
      { name: "Quinton de Kock (WK)",role:"Wicketkeeper Batsman", style: "Left-hand bat",                  rating: 92 },
      { name: "Reeza Hendricks",    role: "Opening Batsman",      style: "Right-hand bat",                 rating: 86 },
      { name: "Aiden Markram",      role: "Top-Order Batsman",    style: "Right-hand bat / Off break",     rating: 89 },
      { name: "Heinrich Klaasen",   role: "Middle-Order Batsman", style: "Right-hand bat",                 rating: 92 },
      { name: "David Miller",       role: "Middle-Order Batsman", style: "Left-hand bat",                  rating: 89 },
      { name: "Marco Jansen",       role: "All-Rounder",          style: "Left-arm fast / Right bat",      rating: 88 },
      { name: "Wiaan Mulder",       role: "All-Rounder",          style: "Right-arm fast-medium / Bat",    rating: 85 },
      { name: "Keshav Maharaj",     role: "Spin Bowler",          style: "Slow left-arm orthodox",         rating: 88 },
      { name: "Tabraiz Shamsi",     role: "Spin Bowler",          style: "Left-arm wrist spin",            rating: 87 },
      { name: "Kagiso Rabada",      role: "Fast Bowler",          style: "Right-arm fast",                 rating: 94 },
      { name: "Anrich Nortje",      role: "Fast Bowler",          style: "Right-arm express",              rating: 91 },
      { name: "Lungi Ngidi",        role: "Fast Bowler",          style: "Right-arm fast-medium",          rating: 87 },
      { name: "Gerald Coetzee",     role: "Fast Bowler",          style: "Right-arm fast",                 rating: 86 },
      { name: "Ryan Rickelton",     role: "Opening Batsman",      style: "Left-hand bat",                  rating: 83 },
    ],
  },

  // ── England ────────────────────────────────────────────────────────────────
  {
    id: "eng",
    name: "England",
    shortName: "ENG",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    captain: "Jos Buttler",
    wicketkeeper: "Jos Buttler",
    players: [
      { name: "Jos Buttler (C/WK)", role: "Wicketkeeper Batsman",  style: "Right-hand bat",                 rating: 92 },
      { name: "Ben Stokes",         role: "All-Rounder",           style: "Left-hand bat / Fast-medium",    rating: 93 },
      { name: "Joe Root",           role: "Top-Order Batsman",     style: "Right-hand bat / Off break",     rating: 95 },
      { name: "Harry Brook",        role: "Middle-Order Batsman",  style: "Right-hand bat",                 rating: 91 },
      { name: "Zak Crawley",        role: "Opening Batsman",       style: "Right-hand bat",                 rating: 86 },
      { name: "Ben Duckett",        role: "Opening Batsman",       style: "Left-hand bat",                  rating: 87 },
      { name: "Jonny Bairstow",     role: "Wicketkeeper Batsman",  style: "Right-hand bat",                 rating: 87 },
      { name: "Liam Livingstone",   role: "All-Rounder",           style: "Right-hand bat / Spin",          rating: 87 },
      { name: "Moeen Ali",          role: "All-Rounder",           style: "Left-hand bat / Off break",      rating: 87 },
      { name: "Chris Woakes",       role: "All-Rounder",           style: "Right-arm fast-medium",          rating: 87 },
      { name: "Jofra Archer",       role: "Fast Bowler",           style: "Right-arm fast",                 rating: 91 },
      { name: "Mark Wood",          role: "Fast Bowler",           style: "Right-arm express",              rating: 90 },
      { name: "Adil Rashid",        role: "Spin Bowler",           style: "Right-arm leg break",            rating: 89 },
      { name: "Gus Atkinson",       role: "Fast Bowler",           style: "Right-arm fast",                 rating: 87 },
      { name: "Rehan Ahmed",        role: "All-Rounder",           style: "Right-arm leg break",            rating: 84 },
    ],
  },

  // ── Australia ──────────────────────────────────────────────────────────────
  {
    id: "aus",
    name: "Australia",
    shortName: "AUS",
    flag: "🇦🇺",
    captain: "Pat Cummins",
    wicketkeeper: "Alex Carey",
    players: [
      { name: "Pat Cummins (C)",    role: "Fast Bowler / All-Rounder",style: "Right-arm fast",             rating: 95 },
      { name: "Travis Head",        role: "Opening Batsman",         style: "Left-hand bat / Off break",    rating: 92 },
      { name: "David Warner",       role: "Opening Batsman",         style: "Left-hand bat",                rating: 91 },
      { name: "Steve Smith",        role: "Top-Order Batsman",       style: "Right-hand bat",               rating: 94 },
      { name: "Marnus Labuschagne", role: "Top-Order Batsman",       style: "Right-hand bat / Leg break",   rating: 90 },
      { name: "Glenn Maxwell",      role: "All-Rounder",             style: "Right-hand bat / Off break",   rating: 90 },
      { name: "Mitchell Marsh",     role: "All-Rounder",             style: "Right-hand bat / Medium",      rating: 88 },
      { name: "Alex Carey (WK)",    role: "Wicketkeeper Batsman",    style: "Left-hand bat",                rating: 87 },
      { name: "Tim David",          role: "Middle-Order Batsman",    style: "Right-hand bat",               rating: 86 },
      { name: "Mitchell Starc",     role: "Fast Bowler",             style: "Left-arm fast",                rating: 93 },
      { name: "Josh Hazlewood",     role: "Fast Bowler",             style: "Right-arm fast-medium",        rating: 93 },
      { name: "Adam Zampa",         role: "Spin Bowler",             style: "Right-arm leg break",          rating: 90 },
      { name: "Nathan Lyon",        role: "Spin Bowler",             style: "Right-arm off break",          rating: 90 },
      { name: "Josh Inglis",        role: "Wicketkeeper Batsman",    style: "Right-hand bat",               rating: 85 },
      { name: "Sean Abbott",        role: "Fast Bowler",             style: "Right-arm fast-medium",        rating: 84 },
    ],
  },

  // ── New Zealand ────────────────────────────────────────────────────────────
  {
    id: "nz",
    name: "New Zealand",
    shortName: "NZL",
    flag: "🇳🇿",
    captain: "Kane Williamson",
    wicketkeeper: "Tom Latham",
    players: [
      { name: "Kane Williamson (C)",role: "Top-Order Batsman",    style: "Right-hand bat",                  rating: 94 },
      { name: "Tom Latham (WK)",    role: "Wicketkeeper Batsman", style: "Left-hand bat",                   rating: 87 },
      { name: "Devon Conway",       role: "Opening Batsman",      style: "Left-hand bat",                   rating: 89 },
      { name: "Will Young",         role: "Opening Batsman",      style: "Right-hand bat",                  rating: 84 },
      { name: "Daryl Mitchell",     role: "All-Rounder",          style: "Right-hand bat / Medium",         rating: 90 },
      { name: "Glenn Phillips",     role: "All-Rounder",          style: "Right-hand bat / Off break",      rating: 88 },
      { name: "Rachin Ravindra",    role: "All-Rounder",          style: "Left-hand bat / Slow left-arm",   rating: 90 },
      { name: "Mitchell Santner",   role: "All-Rounder",          style: "Slow left-arm / Left bat",        rating: 88 },
      { name: "Tim Southee",        role: "Fast Bowler",          style: "Right-arm fast-medium",           rating: 88 },
      { name: "Trent Boult",        role: "Fast Bowler",          style: "Left-arm fast-medium",            rating: 92 },
      { name: "Matt Henry",         role: "Fast Bowler",          style: "Right-arm fast-medium",           rating: 88 },
      { name: "Lockie Ferguson",    role: "Fast Bowler",          style: "Right-arm express",               rating: 89 },
      { name: "Ish Sodhi",          role: "Spin Bowler",          style: "Right-arm leg break",             rating: 87 },
      { name: "Mark Chapman",       role: "Middle-Order Batsman", style: "Left-hand bat",                   rating: 83 },
      { name: "Michael Bracewell",  role: "All-Rounder",          style: "Right-arm off break / Bat",       rating: 85 },
    ],
  },

  // ── Sri Lanka ──────────────────────────────────────────────────────────────
  {
    id: "sl",
    name: "Sri Lanka",
    shortName: "SL",
    flag: "🇱🇰",
    captain: "Charith Asalanka",
    wicketkeeper: "Kusal Mendis",
    players: [
      { name: "Charith Asalanka (C)", role: "Middle-Order Batsman",style: "Left-hand bat",                  rating: 86 },
      { name: "Kusal Mendis (WK)",    role: "Wicketkeeper Batsman",style: "Right-hand bat",                 rating: 88 },
      { name: "Pathum Nissanka",      role: "Opening Batsman",     style: "Right-hand bat",                 rating: 86 },
      { name: "Kamindu Mendis",       role: "All-Rounder",         style: "Left-hand bat / Spin",           rating: 87 },
      { name: "Dhananjaya de Silva",  role: "All-Rounder",         style: "Right-hand bat / Off break",     rating: 88 },
      { name: "Angelo Mathews",       role: "All-Rounder",         style: "Right-hand bat / Medium",        rating: 85 },
      { name: "Dasun Shanaka",        role: "All-Rounder",         style: "Right-hand bat / Fast-medium",   rating: 83 },
      { name: "Wanindu Hasaranga",    role: "All-Rounder",         style: "Right-arm leg break",            rating: 91 },
      { name: "Maheesh Theekshana",   role: "Spin Bowler",         style: "Right-arm off break",            rating: 87 },
      { name: "Dunith Wellalage",     role: "Spin Bowler",         style: "Slow left-arm",                  rating: 84 },
      { name: "Matheesha Pathirana",  role: "Fast Bowler",         style: "Right-arm fast",                 rating: 87 },
      { name: "Dilshan Madushanka",   role: "Fast Bowler",         style: "Left-arm fast",                  rating: 85 },
      { name: "Asitha Fernando",      role: "Fast Bowler",         style: "Right-arm fast",                 rating: 84 },
      { name: "Nuwan Thushara",       role: "Fast Bowler",         style: "Right-arm fast-medium",          rating: 83 },
    ],
  },

  // ── West Indies ────────────────────────────────────────────────────────────
  {
    id: "wi",
    name: "West Indies",
    shortName: "WI",
    flag: "🏴‍☠️",
    captain: "Rovman Powell",
    wicketkeeper: "Nicholas Pooran",
    players: [
      { name: "Rovman Powell (C)",   role: "Middle-Order Batsman",style: "Right-hand bat",                  rating: 86 },
      { name: "Nicholas Pooran (WK)",role: "Wicketkeeper Batsman",style: "Left-hand bat",                   rating: 90 },
      { name: "Brandon King",        role: "Opening Batsman",     style: "Right-hand bat",                  rating: 86 },
      { name: "Kyle Mayers",         role: "Opening Batsman",     style: "Left-hand bat",                   rating: 87 },
      { name: "Shai Hope",           role: "Top-Order Batsman",   style: "Right-hand bat",                  rating: 86 },
      { name: "Sherfane Rutherford", role: "Middle-Order Batsman",style: "Left-hand bat",                   rating: 83 },
      { name: "Jason Holder",        role: "All-Rounder",         style: "Right-arm fast-medium / Bat",     rating: 86 },
      { name: "Andre Russell",       role: "All-Rounder",         style: "Right-hand bat / Fast",           rating: 88 },
      { name: "Alzarri Joseph",      role: "Fast Bowler",         style: "Right-arm fast",                  rating: 88 },
      { name: "Shamar Joseph",       role: "Fast Bowler",         style: "Right-arm fast",                  rating: 85 },
      { name: "Gudakesh Motie",      role: "Spin Bowler",         style: "Slow left-arm orthodox",          rating: 86 },
      { name: "Akeal Hosein",        role: "Spin Bowler",         style: "Slow left-arm orthodox",          rating: 84 },
      { name: "Shimron Hetmyer",     role: "Middle-Order Batsman",style: "Left-hand bat",                   rating: 86 },
      { name: "Keacy Carty",         role: "Top-Order Batsman",   style: "Right-hand bat",                  rating: 82 },
    ],
  },

  // ── Afghanistan ────────────────────────────────────────────────────────────
  {
    id: "afg",
    name: "Afghanistan",
    shortName: "AFG",
    flag: "🇦🇫",
    captain: "Rashid Khan",
    wicketkeeper: "Mohammad Shahzad",
    players: [
      { name: "Rashid Khan (C)",    role: "All-Rounder",          style: "Right-arm leg break",             rating: 94 },
      { name: "Mohammad Nabi",      role: "All-Rounder",          style: "Right-arm off break / Bat",       rating: 86 },
      { name: "Ibrahim Zadran",     role: "Opening Batsman",      style: "Right-hand bat",                  rating: 86 },
      { name: "Rahmanullah Gurbaz", role: "Opening Batsman",      style: "Right-hand bat",                  rating: 87 },
      { name: "Mohammad Shahzad (WK)",role:"Wicketkeeper Batsman",style: "Right-hand bat",                  rating: 82 },
      { name: "Gulbadin Naib",      role: "All-Rounder",          style: "Right-arm fast-medium / Bat",     rating: 83 },
      { name: "Azmatullah Omarzai", role: "All-Rounder",          style: "Right-arm fast-medium / Bat",     rating: 86 },
      { name: "Mujeeb Ur Rahman",   role: "Spin Bowler",          style: "Right-arm off break / Googly",    rating: 90 },
      { name: "Noor Ahmad",         role: "Spin Bowler",          style: "Left-arm wrist spin",             rating: 89 },
      { name: "Fazalhaq Farooqi",   role: "Fast Bowler",          style: "Left-arm fast-medium",            rating: 90 },
      { name: "Naveen-ul-Haq",      role: "Fast Bowler",          style: "Right-arm fast",                  rating: 85 },
      { name: "Hashmatullah Shahidi",role:"Middle-Order Batsman", style: "Left-hand bat",                   rating: 83 },
      { name: "Sediqullah Atal",    role: "Spin Bowler",          style: "Right-arm leg break",             rating: 82 },
    ],
  },
];
