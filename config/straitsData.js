const straitsData = [
  {
    id: 1,
    name: "Bering Strait",
    name_bn: "বেরিং প্রণালী",
    connects: [
      "Bering Sea - Chukchi Sea",
      "Pacific Ocean - Arctic Ocean"
    ],
    separates: [
      "Russia - USA (Alaska)",
      "Asia - North America"
    ]
  },
  {
    id: 2,
    name: "Malacca Strait",
    name_bn: "মালাক্কা প্রণালী",
    connects: [
      "Andaman Sea - South China Sea",
      "Indian Ocean - Pacific Ocean"
    ],
    separates: [
      "Indonesia (Sumatra) - Malaysia (Malay Peninsula)",
      "Asia - Asia"
    ]
  },
  {
    id: 3,
    name: "Palk Strait",
    name_bn: "পক প্রণালী",
    connects: [
      "Palk Bay - Gulf of Mannar (Bay of Bengal)",
      "Indian Ocean - Indian Ocean"
    ],
    separates: [
      "India - Sri Lanka",
      "Asia - Asia"
    ]
  },
  {
    id: 4,
    name: "Strait of Hormuz",
    name_bn: "হরমুজ প্রণালী",
    connects: [
      "Persian Gulf - Gulf of Oman",
      "Indian Ocean (Arabian Sea) - Indian Ocean"
    ],
    separates: [
      "Iran - Oman/UAE",
      "Asia - Asia"
    ]
  },
  {
    id: 5,
    name: "Bab-el-Mandeb",
    name_bn: "বাব-এল-মান্দেব",
    connects: [
      "Red Sea - Gulf of Aden",
      "Indian Ocean - Indian Ocean"
    ],
    separates: [
      "Djibouti/Eritrea - Yemen",
      "Africa - Asia"
    ]
  },
  {
    id: 6,
    name: "Strait of Gibraltar",
    name_bn: "জিব্রাল্টার প্রণালী",
    connects: [
      "Mediterranean Sea - Alboran Sea",
      "Atlantic Ocean - Atlantic Ocean"
    ],
    separates: [
      "Morocco - Spain",
      "Africa - Europe"
    ]
  },
  {
    id: 7,
    name: "Bosphorus Strait",
    name_bn: "বসফরাস প্রণালী",
    connects: [
      "Black Sea - Sea of Marmara",
      "Atlantic Ocean - Atlantic Ocean"
    ],
    separates: [
      "Turkey (Istanbul European side) - Turkey (Istanbul Asian side)",
      "Europe - Asia"
    ]
  },
  {
    id: 8,
    name: "Dardanelles Strait",
    name_bn: "দার্দানেলীস প্রণালী",
    connects: [
      "Sea of Marmara - Aegean Sea",
      "Atlantic Ocean - Atlantic Ocean"
    ],
    separates: [
      "Turkey (Gallipoli  European side) - Turkey (Anatolia  Asian side)",
      "Europe - Asia"
    ]
  },
  {
    id: 9,
    name: "Strait of Dover",
    name_bn: "ডোভার প্রণালী",
    connects: [
      "English Channel - North Sea",
      "Atlantic Ocean - Atlantic Ocean"
    ],
    separates: [
      "United Kingdom - France",
      "Europe - Europe"
    ]
  },
  {
    id: 10,
    name: "Florida Strait",
    name_bn: "ফ্লোরিডা প্রণালী",
    connects: [
      "Gulf of Mexico - Atlantic Ocean",
      "Atlantic Ocean - Atlantic Ocean"
    ],
    separates: [
      "USA (Florida) - Cuba/Bahamas",
      "North America - North America"
    ]
  },
  {
    id: 11,
    name: "Strait of Magellan",
    name_bn: "ম্যাজেলান প্রণালী",
    connects: [
      "Atlantic Ocean - Pacific Ocean",
      "Atlantic Ocean - Pacific Ocean"
    ],
    separates: [
      "Chile (Mainland) - Tierra del Fuego",
      "South America - South America"
    ]
  },
  {
    id: 12,
    name: "Cook Strait",
    name_bn: "কুক প্রণালী",
    connects: [
      "Tasman Sea - South Pacific Ocean",
      "Pacific Ocean - Pacific Ocean"
    ],
    separates: [
      "New Zealand (North Island) - New Zealand (South Island)",
      "Oceania - Oceania"
    ]
  },
  {
    id: 13,
    name: "Bass Strait",
    name_bn: "বাস প্রণালী",
    connects: [
      "Tasman Sea - Indian Ocean",
      "Pacific Ocean - Indian Ocean"
    ],
    separates: [
      "Australia (Mainland) - Tasmania",
      "Australia - Australia"
    ]
  },
  {
    id: 14,
    name: "Taiwan Strait",
    name_bn: "তাইওয়ান প্রণালী",
    connects: [
      "South China Sea - East China Sea",
      "Pacific Ocean - Pacific Ocean"
    ],
    separates: [
      "China - Taiwan",
      "Asia - Asia"
    ]
  },
  {
    id: 15,
    name: "Tsugaru Strait",
    name_bn: "সুগারু প্রণালী",
    connects: [
      "Sea of Japan - Pacific Ocean",
      "Pacific Ocean - Pacific Ocean"
    ],
    separates: [
      "Japan (Honshu) - Japan (Hokkaido)",
      "Asia - Asia"
    ]
  },
  {
    id: 16,
    name: "Suez Canal",
    name_bn: "সুয়েজ খাল",
    connects: [
      "Mediterranean Sea - Red Sea",
      "Atlantic Ocean - Indian Ocean"
    ],
    separates: [
      "Egypt (Africa) - Egypt (Sinai Peninsula)",
      "Africa - Asia"
    ]
  },
  {
    id: 17,
    name: "Sunda Strait",
    name_bn: "সুন্দা প্রণালী",
    connects: [
      "Java Sea - Indian Ocean",
      "Pacific Ocean - Indian Ocean"
    ],
    separates: [
      "Indonesia (Java) - Indonesia (Sumatra)",
      "Asia - Asia"
    ]
  },
  {
    id: 18,
    name: "Lombok Strait",
    name_bn: "লম্বক প্রণালী",
    connects: [
      "Java Sea - Indian Ocean",
      "Pacific Ocean - Indian Ocean"
    ],
    separates: [
      "Indonesia (Bali) - Indonesia (Lombok)",
      "Asia - Asia"
    ]
  },
  {
    id: 19,
    name: "Korea Strait",
    name_bn: "কোরিয়া প্রণালী",
    connects: [
      "East China Sea - Sea of Japan",
      "Pacific Ocean - Pacific Ocean"
    ],
    separates: [
      "South Korea - Japan",
      "Asia - Asia"
    ]
  },
  {
    id: 20,
    name: "Torres Strait",
    name_bn: "টরেস প্রণালী",
    connects: [
      "Arafura Sea - Coral Sea/Gulf of Papua",
      "Indian Ocean - Pacific Ocean"
    ],
    separates: [
      "Australia - Papua New Guinea",
      "Australia - Oceania"
    ]
  },
  {
    id: 21,
    name: "Davis Strait",
    name_bn: "ডেভিস প্রণালী",
    connects: [
      "Baffin Bay - Labrador Sea",
      "Arctic Ocean - Atlantic Ocean"
    ],
    separates: [
      "Denmark (Greenland) - Canada (Baffin Island)",
      "North America - North America"
    ]
  },
  {
    id: 22,
    name: "Denmark Strait",
    name_bn: "ডেনমার্ক প্রণালী",
    connects: [
      "Greenland Sea - Irminger Sea",
      "Arctic Ocean - Atlantic Ocean"
    ],
    separates: [
      "Greenland - Iceland",
      "North America - Europe"
    ]
  },
  {
    id: 23,
    name: "Strait of Messina",
    name_bn: "মেসিনা প্রণালী",
    connects: [
      "Tyrrhenian Sea - Ionian Sea",
      "Mediterranean Sea - Mediterranean Sea"
    ],
    separates: [
      "Sicily (Italy) - Mainland Italy",
      "Europe - Europe"
    ]
  },
  {
    id: 24,
    name: "Otranto Strait",
    name_bn: "ওট্রান্টো প্রণালী",
    connects: [
      "Adriatic Sea - Ionian Sea",
      "Mediterranean Sea - Mediterranean Sea"
    ],
    separates: [
      "Italy - Albania",
      "Europe - Europe"
    ]
  },
  {
    id: 25,
    name: "Yucatán Channel",
    name_bn: "ইউকাতান চ্যানেল",
    connects: [
      "Gulf of Mexico - Caribbean Sea",
      "Atlantic Ocean - Atlantic Ocean"
    ],
    separates: [
      "Mexico - Cuba",
      "North America - North America"
    ]
  },
  {
    id: 26,
    name: "Hudson Strait",
    name_bn: "হাডসন প্রণালী",
    connects: [
      "Hudson Bay - Labrador Sea",
      "Arctic Ocean - Atlantic Ocean"
    ],
    separates: [
      "Canada (Baffin Island) - Canada (Quebec)",
      "North America - North America"
    ]
  }
];

