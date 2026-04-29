const straitsData = [
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
    name_bn: "দাদদান্দেনরলস প্রণালী",
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

const straitsData_id = [
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
    name_bn: "দাদদান্দেনরলস প্রণালী",
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
