/* ─────────────────────────────────────────────────────────────────────
   PORTFOLIO CONTENT
   Edit this file to update all text and data on the site.
   ───────────────────────────────────────────────────────────────────── */

window.CONTENT = {

  /* ── Identity ───────────────────────────────────────────────────── */
  name:      "Kenneth Huang",
  tagline:   "Software Engineer · Data Scientist · Student",
  email:     "kennethhuang9@gmail.com",
  resumePdf: "assets/resume.pdf",

  /* ── Hero meta block ─────────────────────────────────────────────── */
  meta: [
    { label: "Currently", value: "MS CS @ Georgia Tech" },
    { label: "Based in",  value: "Brooklyn, NY" },
    { label: "Available", value: "Open to Work" },
    { label: "Email",     value: "kennethhuang9@gmail.com" },
  ],

  /* ── Bio paragraphs ─────────────────────────────────────────────── */
  bio: [
    "Aspiring Software Engineer with a strong multidisciplinary background in Statistics and Business Analytics.",
    "My past experience largely focused on working with data, where I took on responsibilities in automating data processing scripts and grew an interest towards coding and software development",
    "Outside of work, I enjoy gaming, exploring new technologies, and building media-related projects.",
  ],

  /* ── Skills ─────────────────────────────────────────────────────── */
  skills: [
    "Python", "R", "SQL", "JavaScript", "Java", "Git", "Prompt Engineering"
  ],

  /* ── External links (footer + about page) ───────────────────────── */
  links: [
    { label: "GitHub",   href: "https://github.com/huang-kenneth" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kennethhuang9/" },
    { label: "Email",    href: "mailto:kennethhuang9@gmail.com" },
  ],

  /* ── Career timeline ─────────────────────────────────────────────── */
  /* start/end: [year, month 1–12].  end: null = ongoing.              */
  /* kind: "career" | "gap" | "education"                              */
  /* Overlapping entries automatically stack into separate lanes.      */
  /* Add more entries at the same time period to get 3-column display. */
  timeline: [
    { start: [2025, 1],  end: null,       role: "M.S. Computer Science",                              org: "Georgia Institute of Technology", kind: "education", current: true },
    { start: [2024, 10], end: [2025, 5],  role: "Software Developer Volunteer",                        org: "Readeezy via Develop for Good",   kind: "career"                 },
    { start: [2023, 12], end: null,       role: "Personal Assistant",                                  org: "Private Employer",           kind: "career",    current: true },
    { start: [2023, 7],  end: [2023, 12], role: "Sales Associate",                                     org: "Herschel Supply Co.",             kind: "career"                 },
    { start: [2022, 8],  end: [2023, 5],  role: "Teaching Assistant – Lead Instructor",                org: "Carnegie Mellon University",      kind: "career"                 },
    { start: [2022, 5],  end: [2023, 5],  role: "Data Science Intern",                                 org: "IQVIA",                           kind: "career"                 },
    { start: [2021, 5],  end: [2021, 8],  role: "Team Member",                                         org: "Whole Foods Market",              kind: "career"                 },
    { start: [2019, 8],  end: [2023, 5],  role: "B.S. Business Administration + Statistics and Machine Learning", org: "Carnegie Mellon University", kind: "education" },
  ],

  /* ── Projects ───────────────────────────────────────────────────── */
  /* Sorted newest → oldest. examples: .mp4 (video), .pdf, .png/.gif. */
  /* note: optional callout on the detail page.                        */
  /* Omit github or leave "" to hide the GitHub button.               */
  projects: [
    // 2026
    {
      id: "p10", num: "001",
      title: "Robotics and AI Techniques",
      cat: "development", year: "2026",
      desc: "Various projects for GTech's CS7638. Implemented PID Control, SLAM, Particle and Kalman Filters.",
      stack: "Python",
      note: "Unfortunately, code is confidential per school's academic policy.",
      thumb: "assets/rait-drone-thumb.jpg",
      examples: ["assets/rait-drone.mp4", "assets/rait-particlefilters.mp4", "assets/rait-slam.mp4"],
    },
    {
      id: "p12", num: "002",
      title: "Unity 3D Game — Echoes of Ruin",
      cat: "development", year: "2026",
      desc: "Built a Unity game collaboratively with 4 other developers.",
      stack: "Unity · C#",
      thumb: "assets/vgd-echoesofruin-thumb.jpg",
      examples: ["assets/vgd-echoesofruin.mp4"],
    },
    {
      id: "p13", num: "003",
      title: "Stock Ticker Dashboard",
      cat: "development", year: "2026",
      desc: "A stock tracker that visualizes historical and live data from stocks, powered by Alpaca.",
      stack: "TimescaleDB · Python · Streamlit",
      github: "https://github.com/huang-kenneth/trading-dashboard",
      thumb: "assets/tradingbot-demo-thumb.jpg",
      examples: ["assets/tradingbot-demo.mp4"],
    },
    {
      id: "p14", num: "004",
      title: "Job Tracker Extension",
      cat: "development", year: "2026",
      desc: "A Chrome extension that auto-stores job application info for organized tracking.",
      stack: "Python · Javascript · SQL · Manifest V3",
      thumb: "assets/jobtracker-sample1.png",
      examples: ["assets/jobtracker-sample1.png", "assets/jobtracker-sample2.png"],
    },
    {
      id: "p17", num: "005",
      title: "Geo-trainer Flashcards",
      cat: "development", year: "2026",
      desc: "A flashcard website for Geoguessr and studying geographical clues.",
      stack: "Supabase · SQL · React · Javascript · TypeScript",
      thumb: "assets/geotrainer-thumb.jpg",
      examples: ["assets/geotrainer.mp4"],
    },
    {
      id: "p18", num: "006",
      title: "Youtube Lyric Video Generator (Rebuilt)",
      cat: "development", year: "2026",
      desc: "Auto YouTube download, vocal separation, transcription, alignment, subtitle rendering, and video composition.",
      stack: "Python · Flask · Tailwind · FFmpeg · OpenAI Whisper · Demucs",
      thumb: "assets/karaoke-demo-thumb.jpg",
      examples: ["assets/karaoke-demo.mp4"],
    },
    // 2025
    {
      id: "p9",  num: "007",
      title: "Simplified MapReduce Framework",
      cat: "development", year: "2025",
      desc: "Implemented a MapReduce framework from scratch: sharding, mapping, intermediary files, and reducing.",
      stack: "C++",
      note: "Unfortunately, code is confidential per school's academic policy. This is a project I'm proud of, but can't fully share.",
      thumb: "assets/map-reduce.png",
      examples: ["assets/map-reduce.png"],
    },
    {
      id: "p11", num: "008",
      title: "Job Comparison App",
      cat: "development", year: "2025",
      desc: "Job comparison Android app made with Android Studio.",
      stack: "Java · Android Studio",
      note: "Unfortunately, code is confidential per school's academic policy.",
      thumb: "assets/sdp-android-thumb.jpg",
      examples: ["assets/sdp-android.mp4"],
    },
    // 2023
    {
      id: "p8",  num: "009",
      title: "Generating E-Sports Commentary Using Audio",
      cat: "development", year: "2023",
      desc: "Trained a GPT-3 curie model using YouTube transcripts to auto-generate live commentary.",
      stack: "Colab · OpenAI · Python",
      github: "https://github.com/huang-kenneth/esports-commentator-ai",
      thumb: "assets/esports-ai-thumb.jpg",
      examples: ["assets/esports-ai.mp4"],
    },
    {
      id: "p15", num: "010",
      title: "Fomotimer",
      cat: "development", year: "2023",
      desc: "A Pomodoro technique inspired global timer for the web. Good for studying with others.",
      stack: "Javascript",
      github: "https://github.com/huang-kenneth/pomotimer",
      thumb: "assets/fomotimer.gif",
      examples: ["assets/fomotimer.gif"],
    },
    {
      id: "p16", num: "011",
      title: "Youtube Lyric Video Generator",
      cat: "development", year: "2023",
      desc: "A web app that converts YouTube links to lyric video mp4s.",
      stack: "Python · OpenAI Whisper · FFMPEG · Spleeter · Flask",
      note: "This project is the legacy version of the 2026 project. The original code is a bit messy since it was my first time working with all these tools, but the core concept and implementation are similar.",
      thumb: "assets/karaoke-legacy-demo.png",
      examples: ["assets/karaoke-legacy-demo.png", "assets/karaoke-legacy-demo.mp4"],
      github: "https://github.com/huang-kenneth/Youtube-Lyric-Video-Generator",
    },
    // 2022
    {
      id: "p7",  num: "012",
      title: "Predicting Music Genre from Audio Features",
      cat: "data-science", year: "2022",
      desc: "Music genre classification using Random Forest.",
      stack: "Weka",
      thumb: "assets/MLIP-musicgenre-thumb.png",
      examples: ["assets/MLIP-musicgenre.pdf"],
    },
    // 2021
    {
      id: "p6",  num: "013",
      title: "United States Wind Turbine Analysis",
      cat: "data-science", year: "2021",
      desc: "Investigate location attributes and power production from wind farms across the USA.",
      stack: "R",
      thumb: "assets/36315-windfarm-thumb.png",
      examples: ["assets/36315-windfarm.pdf"],
    },
    // 2020
    {
      id: "p4",  num: "014",
      title: "Predicting NYC Household Income",
      cat: "data-science", year: "2020",
      desc: "Predicting annual income of residents in NYC using the NYC Housing and Vacancy Survey.",
      stack: "R",
      thumb: "assets/36202-1-thumb.png",
      examples: ["assets/36202-1.pdf"],
    },
    {
      id: "p5",  num: "015",
      title: "Predicting Room Occupancy to Signal Fire Emergencies",
      cat: "data-science", year: "2020",
      desc: "Project to predict when a building should be evacuated based on sensor data.",
      stack: "R",
      thumb: "assets/36202-2-thumb.png",
      examples: ["assets/36202-2.pdf"],
    },
    // 2019
    {
      id: "p1",  num: "016",
      title: "15-112 — Music Rush",
      cat: "development", year: "2019",
      desc: "Piano Tiles style rhythm game with beat detection to generate levels for any audio file.",
      stack: "Python · aubio · pygame",
      github: "https://github.com/huang-kenneth/Music-Rush",
      thumb: "assets/15-112-music-rush-thumb.jpg",
      examples: ["assets/15-112-music-rush.mp4"],
    },
    {
      id: "p2",  num: "017",
      title: "15-112 — Marvel Sidescroller",
      cat: "development", year: "2019",
      desc: "Sidescroller game where you need to move obstacles away from the player.",
      stack: "Python · pygame",
      thumb: "assets/15112-sidescroller-thumb.jpg",
      examples: ["assets/15112-sidescroller.mp4"],
    },
    {
      id: "p3",  num: "018",
      title: "15-112 — Tetris",
      cat: "development", year: "2019",
      desc: "Recreation of Tetris using CMU's graphics library.",
      stack: "Python",
      thumb: "assets/15112-tetris-thumb.jpg",
      examples: ["assets/15112-tetris.mp4"],
    },
  ],

};
