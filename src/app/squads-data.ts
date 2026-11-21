export interface Player {
  name: string;
  role: string;
  style: string;
  rating: number;
}

export interface StadiumInfo {
  id: string;
  name: string;
  city: string;
  capacity: string;
  boundary: string;
  pitchType: string;
  soil: string;
  paceBounce: string;
  spinLevel: string;
  homeTeam: string;
  description: string;
}

export interface TeamSquad {
  id: string;
  name: string;
  shortName: string;
  flag: string;
  category: "international" | "ipl";
  captain: string;
  wicketkeeper: string;
  jerseyColor: string;
  players: Player[];
}

export const ENHANCED_STADIUMS: StadiumInfo[] = [
  {
    id: "wankhede",
    name: "Wankhede Stadium",
    city: "Mumbai",
    capacity: "33,108",
    boundary: "68m - 72m",
    pitchType: "Batting Paradise · High Pace & Bounce",
    soil: "Red Clay (High Elasticity)",
    paceBounce: "Very High · True Carry",
    spinLevel: "Moderate (Turns in 2nd Innings)",
    homeTeam: "Mumbai Indians / India",
    description: "The crown jewel of Indian cricket and fortress of Mumbai Indians. Red-soil wicket offers electric ball speed off the deck with sea-breeze swing under lights."
  },
  {
    id: "chepauk",
    name: "MA Chidambaram Stadium (Chepauk)",
    city: "Chennai",
    capacity: "38,200",
    boundary: "65m - 70m",
    pitchType: "Spinners' Haven · Low & Turning",
    soil: "Dry Clay / Low Moisture",
    paceBounce: "Low · Slower Carry",
    spinLevel: "Extreme · Sharp Turn & Grip",
    homeTeam: "Chennai Super Kings / India",
    description: "The iconic yellow cauldron. Pitch starts firm then breaks open for spinners. High humidity and grip make mystery spinners and leg-spinners lethal."
  },
  {
    id: "ahmedabad",
    name: "Narendra Modi Stadium",
    city: "Ahmedabad",
    capacity: "132,000",
    boundary: "75m - 82m",
    pitchType: "Sporting Dual Track (Red & Black Soil)",
    soil: "Black Soil (Low Bounce) / Red Soil (Bounce)",
    paceBounce: "High · Heavy Carry",
    spinLevel: "Balanced",
    homeTeam: "Gujarat Titans / World Cup Final",
    description: "The world's largest cricket colosseum. Massive 80m boundaries require calculated running. Hosts ICC World Cup Finals and IPL Grand Finales."
  },
  {
    id: "eden",
    name: "Eden Gardens",
    city: "Kolkata",
    capacity: "66,349",
    boundary: "70m - 75m",
    pitchType: "Fast & Bouncy · Evening Seam",
    soil: "Lush Silt-Clay Blend",
    paceBounce: "High · Extra Seam under Floodlights",
    spinLevel: "Consistent Finger & Wrist Spin",
    homeTeam: "Kolkata Knight Riders / India",
    description: "The Mecca of Indian Cricket. Fast outfield with intense 66,000 crowd roar. Ball zips through under twilight floodlights with early seam movement."
  }
];

export const MODERN_SQUADS: TeamSquad[] = [
  // ── 1. India (Priority 1) ──────────────────────────────────────────────────
  {
    id: "ind",
    name: "India",
    shortName: "IND",
    flag: "🇮🇳",
    category: "international",
    captain: "Rohit Sharma",
    wicketkeeper: "Rishabh Pant",
    jerseyColor: "#1d4ed8",
    players: [
      { name: "Rohit Sharma (C)", role: "Opening Batsman",          style: "Right-hand bat",                  rating: 94 },
      { name: "Virat Kohli",      role: "Top-Order Batsman",        style: "Right-hand bat",                  rating: 97 },
      { name: "Yashasvi Jaiswal", role: "Opening Batsman",          style: "Left-hand bat",                   rating: 92 },
      { name: "Shubman Gill",     role: "Top-Order Batsman",        style: "Right-hand bat",                  rating: 91 },
      { name: "Suryakumar Yadav",role: "Middle-Order Batsman",      style: "Right-hand bat (360°)",           rating: 95 },
      { name: "Rishabh Pant (WK)",role: "Wicketkeeper Batsman",     style: "Left-hand bat",                   rating: 92 },
      { name: "Hardik Pandya",    role: "All-Rounder",              style: "Right bat / 140kmh Fast-medium",  rating: 90 },
      { name: "Ravindra Jadeja",  role: "All-Rounder",              style: "Left-hand bat / Slow left-arm",   rating: 93 },
      { name: "Jasprit Bumrah",   role: "Strike Fast Bowler",       style: "Right-arm express yorkers",       rating: 99 },
      { name: "Mohammed Shami",   role: "Seam Bowler",              style: "Upright seam fast",               rating: 93 },
      { name: "Mohammed Siraj",   role: "Fast Bowler",              style: "Right-arm fast away-swing",       rating: 90 },
      { name: "Kuldeep Yadav",    role: "Wrist Spin Bowler",        style: "Left-arm wrist spin (Googly)",    rating: 92 },
      { name: "Axar Patel",       role: "All-Rounder",              style: "Left bat / Arm-ball spin",        rating: 89 },
      { name: "KL Rahul",         role: "Wicketkeeper Batsman",     style: "Right-hand classical bat",        rating: 89 },
      { name: "Shreyas Iyer",     role: "Middle-Order Batsman",     style: "Right-hand spin attacker",        rating: 88 },
      { name: "Arshdeep Singh",   role: "Death-Over Specialist",    style: "Left-arm swing / Yorkers",        rating: 88 },
    ],
  },

  // ── 2. Australia (Priority 2) ──────────────────────────────────────────────
  {
    id: "aus",
    name: "Australia",
    shortName: "AUS",
    flag: "🇦🇺",
    category: "international",
    captain: "Pat Cummins",
    wicketkeeper: "Josh Inglis",
    jerseyColor: "#eab308",
    players: [
      { name: "Pat Cummins (C)",     role: "Fast Bowler",          style: "Right-arm fast-medium bouncers",  rating: 96 },
      { name: "Travis Head",         role: "Attacking Opener",     style: "Left-hand power hitter",          rating: 95 },
      { name: "Steve Smith",         role: "Top-Order Batsman",    style: "Right-hand bat",                  rating: 94 },
      { name: "Marnus Labuschagne",  role: "Top-Order Batsman",    style: "Right-hand bat / Leg break",      rating: 91 },
      { name: "Mitchell Marsh",      role: "Power All-Rounder",    style: "Right bat / Fast-medium",         rating: 90 },
      { name: "Glenn Maxwell",       role: "Finisher / Off Spin",  style: "Right bat (Switch hit) / Spin",   rating: 93 },
      { name: "Josh Inglis (WK)",    role: "Wicketkeeper Batsman", style: "Right-hand bat",                  rating: 87 },
      { name: "Mitchell Starc",      role: "Strike Fast Bowler",   style: "Left-arm express yorkers (150k)", rating: 95 },
      { name: "Josh Hazlewood",      role: "Metronomic Pacer",     style: "Right-arm fast seam",             rating: 94 },
      { name: "Adam Zampa",          role: "Leg Spin Bowler",      style: "Right-arm leg spin / Googly",     rating: 92 },
      { name: "Nathan Lyon",         role: "Off Spin Bowler",      style: "Right-arm off break",             rating: 92 },
      { name: "Alex Carey",          role: "Wicketkeeper Batsman", style: "Left-hand bat",                   rating: 86 },
      { name: "Marcus Stoinis",      role: "All-Rounder",          style: "Right bat / Fast-medium",         rating: 87 },
      { name: "Sean Abbott",         role: "Bowling All-Rounder",  style: "Right-arm fast-medium",           rating: 84 },
    ],
  },

  // ── 3. South Africa ────────────────────────────────────────────────────────
  {
    id: "sa",
    name: "South Africa",
    shortName: "SA",
    flag: "🇿🇦",
    category: "international",
    captain: "Temba Bavuma",
    wicketkeeper: "Heinrich Klaasen",
    jerseyColor: "#15803d",
    players: [
      { name: "Heinrich Klaasen (WK)",role: "Middle-Order Finisher", style: "Right-hand spin crusher",       rating: 95 },
      { name: "Quinton de Kock",      role: "Opening Batsman",       style: "Left-hand power bat",           rating: 93 },
      { name: "Aiden Markram",        role: "Top-Order Batsman",     style: "Right-hand bat / Off spin",     rating: 90 },
      { name: "David Miller",         role: "Death-Over Finisher",   style: "Left-hand power hitter",        rating: 91 },
      { name: "Kagiso Rabada",        role: "Strike Fast Bowler",    style: "Right-arm fast express",        rating: 95 },
      { name: "Anrich Nortje",        role: "Express Speedster",     style: "Right-arm 150+ kmh thunderbolts",rating: 92 },
      { name: "Marco Jansen",         role: "Left-Arm All-Rounder",  style: "Left fast / Power hitting",     rating: 89 },
      { name: "Keshav Maharaj",       role: "Finger Spinner",        style: "Slow left-arm orthodox",        rating: 90 },
      { name: "Temba Bavuma (C)",     role: "Top-Order Batsman",     style: "Right-hand bat",                rating: 85 },
      { name: "Tristan Stubbs",       role: "Middle-Order Batsman",  style: "Right-hand bat / Off break",    rating: 88 },
      { name: "Tabraiz Shamsi",       role: "Wrist Spinner",         style: "Left-arm unorthodox wrist spin",rating: 88 },
    ],
  },

  // ── 4. England ─────────────────────────────────────────────────────────────
  {
    id: "eng",
    name: "England",
    shortName: "ENG",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    category: "international",
    captain: "Jos Buttler",
    wicketkeeper: "Jos Buttler",
    jerseyColor: "#dc2626",
    players: [
      { name: "Jos Buttler (C/WK)",  role: "Wicketkeeper Opener",   style: "Right-hand 360° hitter",         rating: 95 },
      { name: "Joe Root",            role: "Anchor Batsman",        style: "Right-hand classical / Off spin", rating: 96 },
      { name: "Ben Stokes",          role: "Match-Winning All-Round",style: "Left bat / Fast-medium seam",   rating: 94 },
      { name: "Harry Brook",         role: "Middle-Order Batsman",  style: "Right-hand aggressive bat",      rating: 92 },
      { name: "Phil Salt",           role: "Explosive Opener",      style: "Right-hand aggressive bat",      rating: 89 },
      { name: "Liam Livingstone",    role: "Power All-Rounder",     style: "Right bat / Leg & Off spin",     rating: 88 },
      { name: "Sam Curran",          role: "All-Rounder",           style: "Left bat / Left-arm swing",      rating: 87 },
      { name: "Jofra Archer",        role: "Express Fast Bowler",   style: "Right-arm 150kmh bouncers",      rating: 93 },
      { name: "Mark Wood",           role: "Express Fast Bowler",   style: "Right-arm 152+ kmh pace",        rating: 92 },
      { name: "Adil Rashid",         role: "Leg Spin Bowler",       style: "Right-arm leg spin / Googly",    rating: 91 },
      { name: "Reece Topley",        role: "Fast Bowler",           style: "Left-arm tall swing",            rating: 86 },
    ],
  },

  // ── 5. Chennai Super Kings (IPL Priority) ──────────────────────────────────
  {
    id: "csk",
    name: "Chennai Super Kings",
    shortName: "CSK",
    flag: "🦁",
    category: "ipl",
    captain: "Ruturaj Gaikwad",
    wicketkeeper: "MS Dhoni",
    jerseyColor: "#facc15",
    players: [
      { name: "MS Dhoni (WK)",        role: "Legendary Finisher",    style: "Right-hand helicopter bat",     rating: 96 },
      { name: "Ruturaj Gaikwad (C)",  role: "Opening Batsman",       style: "Right-hand classical timing",    rating: 91 },
      { name: "Ravindra Jadeja",      role: "Prime All-Rounder",     style: "Left bat / Bullet throws / Spin",rating: 94 },
      { name: "Shivam Dube",          role: "Power Hitter",          style: "Left-hand six-machine / Medium", rating: 90 },
      { name: "Matheesha Pathirana",  role: "Sling Death Bowler",    style: "Right-arm slinging yorkers",     rating: 92 },
      { name: "Rachin Ravindra",      role: "Top-Order All-Rounder", style: "Left-hand bat / Left-arm spin",  rating: 89 },
      { name: "Devon Conway",         role: "Opening Batsman",       style: "Left-hand bat",                  rating: 89 },
      { name: "Moeen Ali",            role: "All-Rounder",           style: "Left bat / Right-arm off break", rating: 88 },
      { name: "Deepak Chahar",        role: "New-Ball Swing Specialist",style:"Right-arm outswing",           rating: 87 },
      { name: "Tushar Deshpande",     role: "Fast Bowler",           style: "Right-arm fast",                 rating: 86 },
      { name: "Mustafizur Rahman",    role: "Cutter Specialist",     style: "Left-arm off-cutters",           rating: 88 },
    ],
  },

  // ── 6. Mumbai Indians (IPL Priority) ───────────────────────────────────────
  {
    id: "mi",
    name: "Mumbai Indians",
    shortName: "MI",
    flag: "💙",
    category: "ipl",
    captain: "Hardik Pandya",
    wicketkeeper: "Ishan Kishan",
    jerseyColor: "#0284c7",
    players: [
      { name: "Rohit Sharma",         role: "Opening Batsman",       style: "Right-hand pull shot maestro",   rating: 94 },
      { name: "Jasprit Bumrah",       role: "Strike Fast Bowler",    style: "Right-arm yorkers & slower balls",rating: 99 },
      { name: "Suryakumar Yadav",     role: "360° Specialist",       style: "Right-hand scoop & ramp bat",    rating: 95 },
      { name: "Hardik Pandya (C)",    role: "Fast All-Rounder",      style: "Right bat / 140kmh hard length", rating: 91 },
      { name: "Tilak Varma",          role: "Middle-Order Batsman",  style: "Left-hand bat",                  rating: 89 },
      { name: "Ishan Kishan (WK)",    role: "Wicketkeeper Opener",   style: "Left-hand aggressive bat",       rating: 88 },
      { name: "Tim David",            role: "Power Finisher",        style: "Right-hand death over bat",      rating: 88 },
      { name: "Gerald Coetzee",       role: "Express Fast Bowler",   style: "Right-arm 148kmh pace",          rating: 88 },
      { name: "Piyush Chawla",        role: "Veteran Leg Spinner",   style: "Right-arm leg spin / Googly",    rating: 85 },
      { name: "Nuwan Thushara",       role: "Sling Pacer",           style: "Right-arm sling yorkers",        rating: 86 },
      { name: "Naman Dhir",           role: "All-Rounder",           style: "Right-hand power bat",           rating: 83 },
    ],
  },

  // ── 7. Royal Challengers Bengaluru (IPL Priority) ──────────────────────────
  {
    id: "rcb",
    name: "Royal Challengers Bengaluru",
    shortName: "RCB",
    flag: "🔴",
    category: "ipl",
    captain: "Faf du Plessis",
    wicketkeeper: "Dinesh Karthik",
    jerseyColor: "#b91c1c",
    players: [
      { name: "Virat Kohli",          role: "Anchor & Power Opener", style: "Right-hand cover drive king",    rating: 97 },
      { name: "Faf du Plessis (C)",   role: "Opening Batsman",       style: "Right-hand aggressive bat",      rating: 91 },
      { name: "Rajat Patidar",        role: "Spin Destroyer",        style: "Right-hand middle-order bat",    rating: 90 },
      { name: "Glenn Maxwell",        role: "Game-Changer",          style: "Right bat / Off-break spin",     rating: 92 },
      { name: "Cameron Green",        role: "Pace All-Rounder",      style: "Right-arm fast / Tall batter",   rating: 90 },
      { name: "Dinesh Karthik (WK)",  role: "Elite Finisher",        style: "Right-hand scoop master",        rating: 89 },
      { name: "Mohammed Siraj",       role: "Strike Fast Bowler",    style: "Right-arm fast away-swing",      rating: 91 },
      { name: "Will Jacks",           role: "Explosive All-Rounder", style: "Right-hand power / Off break",   rating: 89 },
      { name: "Yash Dayal",           role: "Left-Arm Seamer",       style: "Left-arm back-of-length",        rating: 86 },
      { name: "Lockie Ferguson",      role: "Express Pacer",         style: "Right-arm 150kmh speed",         rating: 88 },
      { name: "Karn Sharma",          role: "Leg Spinner",           style: "Right-arm leg spin",             rating: 84 },
    ],
  },

  // ── 8. Kolkata Knight Riders (IPL Champions) ───────────────────────────────
  {
    id: "kkr",
    name: "Kolkata Knight Riders",
    shortName: "KKR",
    flag: "💜",
    category: "ipl",
    captain: "Shreyas Iyer",
    wicketkeeper: "Phil Salt",
    jerseyColor: "#581c87",
    players: [
      { name: "Sunil Narine",         role: "Mystery Opener / Spin", style: "Left power bat / Carrom spin",   rating: 95 },
      { name: "Andre Russell",        role: "Monster All-Rounder",   style: "Right monster bat / 140k pace",  rating: 95 },
      { name: "Shreyas Iyer (C)",     role: "Captain & Middle-Order",style: "Right-hand classical timing",    rating: 91 },
      { name: "Phil Salt (WK)",       role: "Powerplay Wrecking Ball",style:"Right-hand attacking opener",    rating: 91 },
      { name: "Rinku Singh",          role: "Ice-Cold Finisher",     style: "Left-hand clutch hitter",        rating: 91 },
      { name: "Mitchell Starc",       role: "Big-Match Pacer",       style: "Left-arm 150kmh yorkers",        rating: 94 },
      { name: "Varun Chakravarthy",   role: "Mystery Leg Spinner",   style: "Right-arm carrom / googly",      rating: 92 },
      { name: "Venkatesh Iyer",       role: "Big-Match Batter",      style: "Left-hand clean striker",        rating: 89 },
      { name: "Harshit Rana",         role: "Fast Bowler",           style: "Right-arm heavy ball & slower",  rating: 87 },
      { name: "Ramandeep Singh",      role: "All-Rounder Finisher",  style: "Right bat / Medium pace",        rating: 85 },
      { name: "Vaibhav Arora",        role: "New-Ball Swing",        style: "Right-arm in-dipper",            rating: 85 },
    ],
  },

  // ── 9. Rajasthan Royals ────────────────────────────────────────────────────
  {
    id: "rr",
    name: "Rajasthan Royals",
    shortName: "RR",
    flag: "👑",
    category: "ipl",
    captain: "Sanju Samson",
    wicketkeeper: "Sanju Samson",
    jerseyColor: "#db2777",
    players: [
      { name: "Sanju Samson (C/WK)",  role: "Top-Order Batter",      style: "Right-hand elegant power",       rating: 93 },
      { name: "Yashasvi Jaiswal",     role: "Opening Dynamo",        style: "Left-hand fearless strokeplayer",rating: 93 },
      { name: "Jos Buttler",          role: "White-Ball Master",     style: "Right-hand 360° match winner",   rating: 94 },
      { name: "Riyan Parag",          role: "Middle-Order Heavy Bat",style: "Right-hand aggressive bat",      rating: 90 },
      { name: "Shimron Hetmyer",      role: "Death Over Finisher",   style: "Left-hand Caribbean flair",      rating: 88 },
      { name: "Dhruv Jurel",          role: "Finisher Batsman",      style: "Right-hand calm finisher",       rating: 87 },
      { name: "Trent Boult",          role: "1st-Over Wicket Specialist",style:"Left-arm banana swing",       rating: 93 },
      { name: "Yuzvendra Chahal",     role: "IPL All-Time Top Wicket",style:"Right-arm deceptive leg spin",  rating: 93 },
      { name: "Ravichandran Ashwin",  role: "Tactical Spinner",      style: "Right-arm carrom & off spin",    rating: 90 },
      { name: "Sandeep Sharma",       role: "Death Overs Maestro",   style: "Right-arm knuckle & yorkers",    rating: 88 },
      { name: "Avesh Khan",           role: "Fast Bowler",           style: "Right-arm back-of-hand pace",    rating: 87 },
    ],
  },

  // ── 10. Sunrisers Hyderabad ────────────────────────────────────────────────
  {
    id: "srh",
    name: "Sunrisers Hyderabad",
    shortName: "SRH",
    flag: "🦅",
    category: "ipl",
    captain: "Pat Cummins",
    wicketkeeper: "Heinrich Klaasen",
    jerseyColor: "#ea580c",
    players: [
      { name: "Travis Head",          role: "Destructive Opener",    style: "Left-hand ultra-aggressive bat", rating: 95 },
      { name: "Heinrich Klaasen (WK)",role: "Ultimate Spin Basher",  style: "Right-hand raw brute force",     rating: 95 },
      { name: "Abhishek Sharma",      role: "Powerplay Crusher",     style: "Left-hand spin hitter / Spin",   rating: 91 },
      { name: "Pat Cummins (C)",      role: "Leader & Pacer",        style: "Right-arm hard length / Bat",    rating: 95 },
      { name: "Nitish Kumar Reddy",   role: "Pace All-Rounder",      style: "Right-hand bat / Seamer",        rating: 89 },
      { name: "Aiden Markram",        role: "Middle-Order Batter",   style: "Right-hand solid technique",     rating: 89 },
      { name: "Bhuvneshwar Kumar",    role: "Swing Artist",          style: "Right-arm classic swing",        rating: 89 },
      { name: "T. Natarajan",         role: "Yorker King",           style: "Left-arm pinpoint toe-crushers", rating: 90 },
      { name: "Shahbaz Ahmed",        role: "All-Rounder",           style: "Left bat / Slow left-arm",       rating: 85 },
      { name: "Jaydev Unadkat",       role: "Slower Ball Specialist",style: "Left-arm off-cutters",          rating: 85 },
      { name: "Mayank Markande",      role: "Leg Spinner",           style: "Right-arm leg spin",             rating: 84 },
    ],
  },

  // ── 11. Gujarat Titans ─────────────────────────────────────────────────────
  {
    id: "gt",
    name: "Gujarat Titans",
    shortName: "GT",
    flag: "🦁",
    category: "ipl",
    captain: "Shubman Gill",
    wicketkeeper: "Jos Buttler",
    jerseyColor: "#1e40af",
    players: [
      { name: "Shubman Gill (C)",     role: "Top-Order Batter",      style: "Right-hand silky elegance",      rating: 94 },
      { name: "Jos Buttler (WK)",     role: "White-Ball Master",     style: "Right-hand 360° aggressor",      rating: 94 },
      { name: "Sai Sudharsan",        role: "Dependable No.3",       style: "Left-hand classical touch",      rating: 90 },
      { name: "David Miller",         role: "Death Over Hero",       style: "Left-hand big-hitting Finisher", rating: 92 },
      { name: "Shahrukh Khan",        role: "Power Finisher",        style: "Right-hand muscular hitting",    rating: 87 },
      { name: "Rahul Tewatia",        role: "Last-Over Finisher",    style: "Left-hand slog & Leg spin",      rating: 88 },
      { name: "Mohit Sharma",         role: "Pace Specialist",       style: "Right-arm pace & variations",   rating: 88 },
      { name: "Rashid Khan",          role: "World's Best Spinner",  style: "Right-arm leg-spin genius",      rating: 97 },
      { name: "Noor Ahmad",           role: "Afghan Wrist Spinner",  style: "Left-arm chinaman marvel",       rating: 89 },
      { name: "Spencer Johnson",      role: "Left-arm Swing Pacer",  style: "Left-arm inswing yorker",        rating: 87 },
      { name: "Prasidh Krishna",      role: "Tall Seam Bowler",      style: "Right-arm bounce & seam",        rating: 88 },
    ],
  },

  // ── 12. Delhi Capitals ─────────────────────────────────────────────────────
  {
    id: "dc",
    name: "Delhi Capitals",
    shortName: "DC",
    flag: "⚡",
    category: "ipl",
    captain: "Rishabh Pant",
    wicketkeeper: "Rishabh Pant",
    jerseyColor: "#1d4ed8",
    players: [
      { name: "Rishabh Pant (C/WK)",  role: "Maverick Batter",       style: "Left-hand unorthodox genius",    rating: 95 },
      { name: "Jake Fraser-McGurk",   role: "Powerplay Destroyer",   style: "Right-hand ultra-aggressive",    rating: 91 },
      { name: "Faf du Plessis",       role: "Dependable Opener",     style: "Right-hand elegant strokeplay",  rating: 89 },
      { name: "Axar Patel",           role: "All-Round Match Winner",style: "Left bat / Left-arm pace-spin",  rating: 93 },
      { name: "Tristan Stubbs",       role: "Middle-Order Hitter",   style: "Right-hand power hitting",       rating: 88 },
      { name: "Ashutosh Sharma",      role: "Death Over Finisher",   style: "Right-hand slog sweep specialist",rating: 86 },
      { name: "Mitchell Starc",       role: "World-Class Pacer",     style: "Left-arm 150kmh fire & swing",   rating: 94 },
      { name: "Kuldeep Yadav",        role: "Chinaman Mastermind",   style: "Left-arm wrist spin deception",  rating: 93 },
      { name: "T. Natarajan",         role: "Yorker Specialist",     style: "Left-arm pinpoint toe-crushers", rating: 89 },
      { name: "Mukesh Kumar",         role: "Seam Bowler",           style: "Right-arm seam & line/length",   rating: 86 },
      { name: "Dushmantha Chameera",  role: "Express Pacer",         style: "Right-arm raw pace & bouncers",  rating: 87 },
    ],
  },

  // ── 13. Lucknow Super Giants ───────────────────────────────────────────────
  {
    id: "lsg",
    name: "Lucknow Super Giants",
    shortName: "LSG",
    flag: "🌊",
    category: "ipl",
    captain: "KL Rahul",
    wicketkeeper: "KL Rahul",
    jerseyColor: "#0ea5e9",
    players: [
      { name: "KL Rahul (C/WK)",      role: "Anchor & Accumulator",  style: "Right-hand elegant top-order",   rating: 93 },
      { name: "Quinton de Kock",      role: "Aggressive Opener",     style: "Left-hand power & panache",      rating: 92 },
      { name: "Nicholas Pooran",      role: "Death Over Carnage",    style: "Left-hand Caribbean pyrotechnics",rating: 91 },
      { name: "Deepak Hooda",         role: "Middle-Order Utility",  style: "Right-hand clean striking",      rating: 87 },
      { name: "Ayush Badoni",         role: "Rising Finisher",       style: "Right-hand innovative shots",    rating: 87 },
      { name: "Marcus Stoinis",       role: "Pace All-Rounder",      style: "Right-hand batting / Right-arm", rating: 89 },
      { name: "Krunal Pandya",        role: "Spin All-Rounder",      style: "Left-arm spin / Hard-hitting bat",rating: 89 },
      { name: "Mohsin Khan",          role: "Left-arm Swing Artist", style: "Left-arm fast-medium classic",   rating: 87 },
      { name: "Avesh Khan",           role: "Death Over Pacer",      style: "Right-arm back-of-hand variations",rating: 87 },
      { name: "Ravi Bishnoi",         role: "Googly Specialist",     style: "Right-arm googly & variations",  rating: 90 },
      { name: "Yash Thakur",          role: "Pace Bowler",           style: "Right-arm swing & seam",         rating: 85 },
    ],
  },

  // ── 14. Punjab Kings ──────────────────────────────────────────────────────
  {
    id: "pbks",
    name: "Punjab Kings",
    shortName: "PBKS",
    flag: "🦁",
    category: "ipl",
    captain: "Shreyas Iyer",
    wicketkeeper: "Prabhsimran Singh",
    jerseyColor: "#dc2626",
    players: [
      { name: "Shreyas Iyer (C)",     role: "Top-Order Match-Winner",style: "Right-hand spin dominator",      rating: 92 },
      { name: "Prabhsimran Singh (WK)",role: "Explosive Opener",     style: "Right-hand big-hitting opener",  rating: 88 },
      { name: "Shikhar Dhawan",       role: "Experienced Opener",    style: "Left-hand elegant stroke-maker", rating: 86 },
      { name: "Liam Livingstone",     role: "360° Power Hitter",     style: "Right-hand smashing & Leg spin", rating: 92 },
      { name: "Ashutosh Sharma",      role: "Death Specialist",      style: "Right-hand slog sweep expert",   rating: 87 },
      { name: "Atharva Taide",        role: "Middle-Order Batter",   style: "Right-hand solid technique",     rating: 85 },
      { name: "Arshdeep Singh",       role: "India's Premier Pacer", style: "Left-arm swing & yorker master", rating: 93 },
      { name: "Kagiso Rabada",        role: "World-Class Fast Bowler",style:"Right-arm raw pace & seam",      rating: 95 },
      { name: "Yuzvendra Chahal",     role: "Leg Spin Wizard",       style: "Right-arm deceptive flight",     rating: 91 },
      { name: "Harpreet Brar",        role: "Left-arm Spinner",      style: "Left-arm orthodox spin",         rating: 86 },
      { name: "Nathan Ellis",         role: "Death Over Specialist",  style: "Right-arm knuckle & slower",    rating: 86 },
    ],
  },

  // ══ INTERNATIONAL TEAMS ═══════════════════════════════════════════════════

  // ── Pakistan ───────────────────────────────────────────────────────────────
  {
    id: "pak",
    name: "Pakistan",
    shortName: "PAK",
    flag: "🇵🇰",
    category: "international",
    captain: "Babar Azam",
    wicketkeeper: "Mohammad Rizwan",
    jerseyColor: "#16a34a",
    players: [
      { name: "Babar Azam (C)",       role: "World's Best Batter",   style: "Right-hand elegant precision",   rating: 97 },
      { name: "Mohammad Rizwan (WK)", role: "Technically Sound Bat",  style: "Right-hand gritty accumulator",  rating: 93 },
      { name: "Fakhar Zaman",         role: "Explosive Opener",      style: "Left-hand attacking strokeplay",  rating: 89 },
      { name: "Shan Masood",          role: "Solid Left-Hander",     style: "Left-hand classical technique",  rating: 86 },
      { name: "Imam-ul-Haq",          role: "Dependable Opener",     style: "Left-hand patient build-up",     rating: 86 },
      { name: "Shadab Khan",          role: "Leg-Spin All-Rounder",  style: "Right-arm leg spin / Bat",        rating: 89 },
      { name: "Mohammad Nawaz",       role: "Left-arm Spin AR",      style: "Left-arm orthodox / Bat",         rating: 86 },
      { name: "Shaheen Shah Afridi",  role: "Pace Spearhead",        style: "Left-arm swing & reverse",       rating: 95 },
      { name: "Naseem Shah",          role: "Young Express Pacer",   style: "Right-arm raw pace & seam",      rating: 91 },
      { name: "Haris Rauf",           role: "Death Overs Enforcer",  style: "Right-arm 150kmh pace",           rating: 90 },
      { name: "Mohammad Wasim Jr.",   role: "Seam All-Rounder",      style: "Right-arm pace & lower bat",     rating: 87 },
    ],
  },

  // ── New Zealand ────────────────────────────────────────────────────────────
  {
    id: "nz",
    name: "New Zealand",
    shortName: "NZ",
    flag: "🇳🇿",
    category: "international",
    captain: "Tom Latham",
    wicketkeeper: "Tom Latham",
    jerseyColor: "#1e1e1e",
    players: [
      { name: "Tom Latham (C/WK)",    role: "Dependable Opener",     style: "Left-hand patient & productive",  rating: 88 },
      { name: "Devon Conway",         role: "Technically Sound Bat", style: "Left-hand elegant stroke-making", rating: 90 },
      { name: "Kane Williamson",      role: "World Class Batter",    style: "Right-hand near-perfect technique",rating: 95 },
      { name: "Rachin Ravindra",      role: "Rising Star Bat/Spin",  style: "Left-hand attacking top-order",   rating: 90 },
      { name: "Daryl Mitchell",       role: "Hard-Hitting Finisher", style: "Right-hand big-match temperament",rating: 89 },
      { name: "Glenn Phillips",       role: "360° Striker",          style: "Right-hand innovative strokeplay", rating: 89 },
      { name: "Mitchell Santner",     role: "Spin All-Rounder",      style: "Left-arm spin / Left bat",        rating: 88 },
      { name: "Tim Southee",          role: "Swing Spearhead",       style: "Right-arm classic outswing",      rating: 90 },
      { name: "Trent Boult",          role: "Master Swing Bowler",   style: "Left-arm banana swing",           rating: 93 },
      { name: "Matt Henry",           role: "Reliable Seamer",       style: "Right-arm seam both ways",        rating: 87 },
      { name: "Lockie Ferguson",      role: "Express Pacer",         style: "Right-arm extreme pace",          rating: 89 },
    ],
  },

  // ── West Indies ────────────────────────────────────────────────────────────
  {
    id: "wi",
    name: "West Indies",
    shortName: "WI",
    flag: "🇼🇮",
    category: "international",
    captain: "Rovman Powell",
    wicketkeeper: "Nicholas Pooran",
    jerseyColor: "#7f1d1d",
    players: [
      { name: "Rovman Powell (C)",    role: "Hard-Hitting Captain",  style: "Right-hand massive power hitting",rating: 88 },
      { name: "Nicholas Pooran (WK)",  role: "World-Class Finisher", style: "Left-hand Caribbean carnage",     rating: 91 },
      { name: "Brandon King",         role: "Attacking Opener",      style: "Right-hand aggressive strokeplay",rating: 86 },
      { name: "Kyle Mayers",          role: "Powerful All-Rounder",  style: "Left-hand bat / Right-arm seam",  rating: 87 },
      { name: "Shimron Hetmyer",      role: "Dangerous Finisher",    style: "Left-hand explosive hitting",     rating: 88 },
      { name: "Shai Hope",            role: "Dependable Middle-Order",style: "Right-hand solid technique",     rating: 87 },
      { name: "Jason Holder",         role: "Tall Pace All-Rounder", style: "Right-arm seam / Right bat",      rating: 88 },
      { name: "Andre Russell",        role: "T20 Icon All-Rounder",  style: "Right bat / Right-arm thunderbolts",rating: 93 },
      { name: "Alzarri Joseph",       role: "Express Pace Threat",   style: "Right-arm 150kmh & bouncers",    rating: 89 },
      { name: "Akeal Hosein",         role: "Left-arm Chinaman",     style: "Left-arm wrist spin",             rating: 85 },
      { name: "Gudakesh Motie",       role: "Left-arm Spinner",      style: "Left-arm orthodox slow",          rating: 85 },
    ],
  },

  // ── Afghanistan ────────────────────────────────────────────────────────────
  {
    id: "afg",
    name: "Afghanistan",
    shortName: "AFG",
    flag: "🇦🇫",
    category: "international",
    captain: "Hashmatullah Shahidi",
    wicketkeeper: "Rahmanullah Gurbaz",
    jerseyColor: "#1d4ed8",
    players: [
      { name: "Hashmatullah Shahidi (C)",role: "Stubborn Anchor",    style: "Left-hand gritty defence",        rating: 85 },
      { name: "Rahmanullah Gurbaz (WK)",role: "Explosive Opener",    style: "Right-hand brutal powerplay",     rating: 90 },
      { name: "Ibrahim Zadran",         role: "Elegant Opener",      style: "Right-hand classical technique",  rating: 86 },
      { name: "Gulbadin Naib",          role: "Pace All-Rounder",    style: "Right bat / Right-arm seam",      rating: 83 },
      { name: "Najibullah Zadran",      role: "Finishing Hitter",    style: "Left-hand power hitting",         rating: 88 },
      { name: "Azmatullah Omarzai",     role: "Pace All-Rounder",    style: "Right-arm pace / Right bat",      rating: 87 },
      { name: "Mohammad Nabi",          role: "Experienced AR",      style: "Right-arm off-spin / Right bat",  rating: 87 },
      { name: "Rashid Khan",            role: "World's Best Spinner",style: "Right-arm leg-spin genius",       rating: 97 },
      { name: "Mujeeb Ur Rahman",       role: "Mystery Spinner",     style: "Right-arm varied off-spin",       rating: 90 },
      { name: "Noor Ahmad",             role: "Chinaman Sensation",  style: "Left-arm wrist spin marvel",      rating: 89 },
      { name: "Fazalhaq Farooqi",       role: "Left-arm Swing Star", style: "Left-arm swing & yorkers",        rating: 90 },
    ],
  },
];
