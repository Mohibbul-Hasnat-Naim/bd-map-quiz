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
      "Morocco - Spain/UK (Gibraltar)",
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
      "Turkey (European side) - Turkey (Asian side)",
      "Europe - Asia"
    ]
  },
  {
    id: 8,
    name: "Dardanelles Strait",
    name_bn: "দার্দানেলেস প্রণালী",
    connects: [
      "Sea of Marmara - Aegean Sea",
      "Atlantic Ocean - Atlantic Ocean"
    ],
    separates: [
      "Turkey (Gallipoli) - Turkey (Anatolia)",
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
  }
];


const straitsData_1 = [
  {
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
    name: "Tsugaru Strait",
    name_bn: "সুগারু প্রণালী",
    connects: [
      "Japan/East Sea - Pacific Ocean"
    ],
    separates: [
      "Russia - Japan",
      "Asia - Asia"
    ]
  },
  {
    name: "Taiwan Strait",
    name_bn: "তাইওয়ান প্রণালী",
    connects: [
      "South China Sea - East China Sea"
    ],
    separates: [
      "Taiwan - China",
      "Asia - Asia"
    ]
  },
  {
    name: "Malacca Strait",
    name_bn: "মালাক্কা প্রণালী",
    connects: [
      "South China Sea - Andaman Sea",
      "Pacific Ocean - Indian Ocean"
    ],
    separates: [
      "Malaysia - Indonesia",
      "Asia - Asia"
    ]
  },
  {
    name: "Cook Strait",
    name_bn: "কুক প্রণালী",
    connects: [
      "Tasman Sea - Pacific Ocean"
    ],
    separates: [
      "New Zealand - New Zealand (Cook Islands - Cook Islands)",
      "Australia - Australia"
    ]
  },
  {
    name: "Bass Strait",
    name_bn: "বাস প্রণালী",
    connects: [
      "Tasman Sea - South Sea",
      "Pacific Ocean - Indian Ocean"
    ],
    separates: [
      "Australia - Tasman Island",
      "Australia - Australia"
    ]
  },
  {
    name: "Palk Strait",
    name_bn: "পক প্রণালী",
    connects: [
      "Arabian Sea - Bay of Bengal",
      "Indian Ocean - Indian Ocean"
    ],
    separates: [
      "India - Sri Lanka"
    ]
  },
  {
    name: "Hormuz Strait",
    name_bn: "হরমুজ প্রণালী",
    connects: [
      "Parsian Gulf - Gulf of Oman (Arab Sea)"
    ],
    separates: [
      "Iran - Oman & United Arab Emirates",
      "Asia - Asia"
    ]
  },
  {
    name: "Bab-El-Mandab Strait",
    name_bn: "বাব এল মান্দেব",
    connects: [
      "Red Sea - Gulf of Aden (Arabian Sea)",
      "Indian Ocean"
    ],
    separates: [
      "Djibouti - Yamen",
      "Africa - Asia"
    ]
  },
  {
    name: "Suez Canal",
    name_bn: "সুয়েজ খাল",
    connects: [
      "Mediterranean Sea - Red Sea"
    ],
    separates: [
      "Egypt - Egypt",
      "Africa - Asia"
    ]
  },
  {
    name: "Bosphorus Strait",
    name_bn: "বসফরাস প্রণালী",
    connects: [
      "Marmara Sea - Black Sea"
    ],
    separates: [
      "Turkey - Turkey",
      "Europe - Asia"
    ]
  },
  {
    name: "Dardanelles Strait",
    name_bn: "দার্দানেলীস প্রণালী",
    connects: [
      "Mediterranean/Aegean Sea - Marmara Sea"
    ],
    separates: [
      "Turkey - Turkey",
      "Europe - Asia"
    ]
  },
  {
    name: "Gibraltar Strait",
    name_bn: "জিব্রাল্টার প্রণালী",
    connects: [
      "Mediterranean Sea - Atlantic Ocean"
    ],
    separates: [
      "Morocco - Spain",
      "Africa - Europe"
    ]
  },
  {
    name: "Dover Strait",
    name_bn: "ডোভার প্রণালী",
    connects: [
      "North Sea - English Channel",
      "Atlantic Ocean"
    ],
    separates: [
      "England - France",
      "Europe - Europe"
    ]
  },
  {
    name: "Skagerrak Strait",
    name_bn: "স্ক্যাজারাক প্রণালী",
    connects: [
      "North Sea - Baltic Sea"
    ],
    separates: [
      "Norway & Sweden - Denmark",
      "Europe - Europe"
    ]
  },
  {
    name: "Florida Strait",
    name_bn: "ফ্লোরিডা প্রণালী",
    connects: [
      "Gulf of Mexico - Atlantic Ocean"
    ],
    separates: [
      "USA - Cuba",
      "North America - North America"
    ]
  },
  {
    name: "Magellan Strait",
    name_bn: "ম্যাজেলান প্রণালী",
    connects: [
      "Atlantic Ocean - Pacific Ocean"
    ],
    separates: [
      "South America - Terra del Fuego Island",
      "Argentina & Chili - Argentina & Chili"
    ]
  }
];

const straitsData_2 = [
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
    name: "Tsugaru Strait",
    name_bn: "সুগারু প্রণালী",
    connects: [
      "Japan/East Sea - Pacific Ocean"
    ],
    separates: [
      "Russia - Japan",
      "Asia - Asia"
    ]
  },
  {
    id: 3,
    name: "Taiwan Strait",
    name_bn: "তাইওয়ান প্রণালী",
    connects: [
      "South China Sea - East China Sea"
    ],
    separates: [
      "Taiwan - China",
      "Asia - Asia"
    ]
  },
  {
    id: 4,
    name: "Malacca Strait",
    name_bn: "মালাক্কা প্রণালী",
    connects: [
      "South China Sea - Andaman Sea",
      "Pacific Ocean - Indian Ocean"
    ],
    separates: [
      "Malaysia - Indonesia",
      "Asia - Asia"
    ]
  },
  {
    id: 5,
    name: "Cook Strait",
    name_bn: "কুক প্রণালী",
    connects: [
      "Tasman Sea - Pacific Ocean"
    ],
    separates: [
      "New Zealand - New Zealand (Cook Islands - Cook Islands)",
      "Australia - Australia"
    ]
  },
  {
    id: 6,
    name: "Bass Strait",
    name_bn: "বাস প্রণালী",
    connects: [
      "Tasman Sea - South Sea",
      "Pacific Ocean - Indian Ocean"
    ],
    separates: [
      "Australia - Tasman Island",
      "Australia - Australia"
    ]
  },
  {
    id: 7,
    name: "Palk Strait",
    name_bn: "পক প্রণালী",
    connects: [
      "Arabian Sea - Bay of Bengal",
      "Indian Ocean - Indian Ocean"
    ],
    separates: [
      "India - Sri Lanka"
    ]
  },
  {
    id: 8,
    name: "Hormuz Strait",
    name_bn: "হরমুজ প্রণালী",
    connects: [
      "Parsian Gulf - Gulf of Oman (Arab Sea)"
    ],
    separates: [
      "Iran - Oman & United Arab Emirates",
      "Asia - Asia"
    ]
  },
  {
    id: 9,
    name: "Bab-El-Mandab Strait",
    name_bn: "বাব এল মান্দেব",
    connects: [
      "Red Sea - Gulf of Aden (Arabian Sea)",
      "Indian Ocean"
    ],
    separates: [
      "Djibouti - Yamen",
      "Africa - Asia"
    ]
  },
  {
    id: 10,
    name: "Suez Canal",
    name_bn: "সুয়েজ খাল",
    connects: [
      "Mediterranean Sea - Red Sea"
    ],
    separates: [
      "Egypt - Egypt",
      "Africa - Asia"
    ]
  },
  {
    id: 11,
    name: "Bosphorus Strait",
    name_bn: "বসফরাস প্রণালী",
    connects: [
      "Marmara Sea - Black Sea"
    ],
    separates: [
      "Turkey - Turkey",
      "Europe - Asia"
    ]
  },
  {
    id: 12,
    name: "Dardanelles Strait",
    name_bn: "দার্দানেলীস প্রণালী",
    connects: [
      "Mediterranean/Aegean Sea - Marmara Sea"
    ],
    separates: [
      "Turkey - Turkey",
      "Europe - Asia"
    ]
  },
  {
    id: 13,
    name: "Gibraltar Strait",
    name_bn: "জিব্রাল্টার প্রণালী",
    connects: [
      "Mediterranean Sea - Atlantic Ocean"
    ],
    separates: [
      "Morocco - Spain",
      "Africa - Europe"
    ]
  },
  {
    id: 14,
    name: "Dover Strait",
    name_bn: "ডোভার প্রণালী",
    connects: [
      "North Sea - English Channel",
      "Atlantic Ocean"
    ],
    separates: [
      "England - France",
      "Europe - Europe"
    ]
  },
  {
    id: 15,
    name: "Skagerrak Strait",
    name_bn: "স্ক্যাজারাক প্রণালী",
    connects: [
      "North Sea - Baltic Sea"
    ],
    separates: [
      "Norway & Sweden - Denmark",
      "Europe - Europe"
    ]
  },
  {
    id: 16,
    name: "Florida Strait",
    name_bn: "ফ্লোরিডা প্রণালী",
    connects: [
      "Gulf of Mexico - Atlantic Ocean"
    ],
    separates: [
      "USA - Cuba",
      "North America - North America"
    ]
  },
  {
    id: 17,
    name: "Magellan Strait",
    name_bn: "ম্যাজেলান প্রণালী",
    connects: [
      "Atlantic Ocean - Pacific Ocean"
    ],
    separates: [
      "South America - Terra del Fuego Island",
      "Argentina & Chili - Argentina & Chili"
    ]
  }
];
