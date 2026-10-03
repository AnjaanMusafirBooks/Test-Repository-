/* ANJAAN MUSAFIR BOOKS — सारी किताबों की जानकारी यहीं है।
   नई किताब जोड़ने के लिए BOOKS में एक और {…} जोड़ें और cover  में रखें।
   checkout: Payhip का लिंक। खाली ("") रहे तो Buy Now की जगह "जल्द उपलब्ध" दिखेगा।
   featured: सिर्फ़ एक किताब पर true रखें। popular: जिन पर badge चाहिए उन पर true।
   preview: बाद में enabled:true और pages में image paths डालकर चालू करें (अभी बंद)। */

const SITE = {
  email: "officialsuperswagg@gmail.com",
  instagram: "https://www.instagram.com/anjaanmusafirbooks",
  instagramName: "@anjaanmusafirbooks",
  priceLabel: "EXCLUSIVE EBOOK PRICE",
  legal: {
    privacy: "https://anjaanmusafirbooks.github.io/vicharon-ki-kaid/privacy.html",
    terms: "https://anjaanmusafirbooks.github.io/vicharon-ki-kaid/terms.html",
    refund: "https://anjaanmusafirbooks.github.io/vicharon-ki-kaid/refund.html",
    contact: "https://anjaanmusafirbooks.github.io/vicharon-ki-kaid/contact.html"
  }
};

const BOOKS = [
  {
    id: "dimag-ka-shor",
    title: "दिमाग़ का शोर",
    subtitle: "Overthinking को समझें, रोकें और ख़ुद को बेहतर बनाएँ",
    author: "Nitendra Sahu",
    pages: 100, language: "हिंदी", price: 129, mrp: 399,
    cover: "dimag-ka-shor.jpg",
    checkout: "",
    featured: true, popular: true,
    desc: "रात को एक ही बात बार-बार दिमाग़ में घूमती रहे, तो यह किताब उसे समझने से शुरू करती है। पहले समझना, फिर पकड़ना, फिर रोकना और आख़िर में रोज़ का एक आसान system बनाना।",
    inside: ["Overthinking क्या है और क्यों होती है", "Triggers और दिमाग़ की सोचने की ग़लतियाँ", "Loop तोड़ने की तुरंत तकनीकें और Decision Framework", "Worksheets, 21-दिन का Reset Plan और Final Action Plan"],
    chapters: ["भूमिका: रात के 2 बजे का वो सवाल", "वो आवाज़ जो बंद नहीं होती", "दिमाग़ ऐसा क्यों करता है", "Overthinking के चार चेहरे", "Overthinking की असली क़ीमत", "Triggers: शोर कब और क्यों शुरू होता है", "विचार बनाम तथ्य: दिमाग़ की दस चालें", "आपकी Overthinking Profile", "Loop तोड़ने की पाँच तुरंत तकनीकें", "सोच से फ़ैसले तक: Decision Framework", "Worry Time, Journaling और CBT के औज़ार", "शरीर से शुरू करें: Mindfulness और Reset", "Perfectionism, तुलना और भीतर की आवाज़", "रोज़ का System: शोर कम रखने की आदतें", "21-दिन का Reset Plan", "आपका Final Action Plan"],
    forWho: ["जो छोटी बातों को बार-बार सोचते हैं", "जिन्हें फ़ैसला लेने में बहुत समय लगता है", "जो रोज़ के लिए एक सरल तरीका चाहते हैं"],
    note: "यह किताब शैक्षिक और self-improvement के लिए है। यह डॉक्टर या therapist की सलाह का विकल्प नहीं है।",
    preview: { enabled: false, pages: [] }
  },
  {
    id: "ai-career",
    title: "AI + Career",
    subtitle: "नए दौर में अपने लिए बेहतर करियर बनाने की व्यावहारिक मार्गदर्शिका",
    author: "Nitendra Sahu",
    pages: 70, language: "हिंदी", price: 99, mrp: 299,
    cover: "ai-career.jpg",
    checkout: "",
    featured: false, popular: true,
    desc: "AI से डरने की जगह उसे समझने और अपने काम में इस्तेमाल करने की सीधी गाइड। किताब में आसान उदाहरण हैं और हर अध्याय के अंत में एक छोटा काम, जो आप उसी दिन कर सकते हैं।",
    inside: ["AI असल में कैसे काम करता है", "कौन-से काम बदलेंगे और कौन-सी Skills काम आएँगी", "AI से बात करने की कला (Prompting) और AI Toolkit", "कमाई के रास्ते, Resume और LinkedIn, 90 दिन का Roadmap"],
    forWho: ["विद्यार्थी और Freshers", "नौकरी करने वाले लोग", "Freelancers, छोटे business वाले और करियर बदलने वाले"],
    note: "इसमें कमाई या नौकरी के नतीजों की कोई गारंटी नहीं दी गई है। नतीजे हर व्यक्ति के लिए अलग हो सकते हैं।",
    preview: { enabled: false, pages: [] }
  },
  {
    id: "aadaton-ke-paar",
    title: "आदतों के पार",
    subtitle: "अनुशासन, फोकस और निरंतरता की वह यात्रा, जो आदतों से आगे जाती है",
    author: "Nitendra Sahu",
    pages: 113, language: "हिंदी", price: 129, mrp: 399,
    cover: "aadaton-ke-paar.jpg",
    checkout: "",
    featured: false, popular: false,
    desc: "हम जानते हैं कि क्या करना चाहिए, फिर भी नहीं कर पाते। यह किताब आदत के साथ पहचान, स्पष्टता, ध्यान और वापस लौटने की कला पर बात करती है।",
    inside: ["आदत का भ्रम और अनुशासन की असली परिभाषा", "पहचान, स्पष्टता और ऊर्जा का प्रबंधन", "फोकस, समय, टालमटोल और वातावरण", "असफलता से वापसी, 30 दिन की योजना और Templates"],
    chapters: ["आदत का भ्रम", "अनुशासन की असली परिभाषा", "पहचान: आप कौन बनना चाहते हैं", "स्पष्टता: लक्ष्य से सिस्टम तक", "ऊर्जा का प्रबंधन", "ध्यान और फोकस: शोर के पार", "समय और प्राथमिकता", "टालमटोल और प्रतिरोध", "वातावरण और संगत की ताकत", "असफलता, गिरावट और वापसी", "निरंतरता का विज्ञान", "आदतों के पार: स्वतंत्रता", "30 दिन की योजना", "टेम्पलेट और चेकलिस्ट"],
    forWho: ["जो बार-बार शुरू करके छोड़ देते हैं", "जो फोकस और समय सँभालना चाहते हैं", "जो सिर्फ़ आदत नहीं, सोच-समझकर जीना चाहते हैं"],
    note: "यह किताब सामान्य जानकारी के लिए है। नींद, स्वास्थ्य या मानसिक स्वास्थ्य की गंभीर समस्या में योग्य डॉक्टर से मिलें।",
    preview: { enabled: false, pages: [] }
  },
  {
    id: "vicharon-ki-kaid",
    title: "विचारों की कैद",
    subtitle: "जब अपने ही विचार इंसान को भीतर से बाँधने लगें",
    author: "अनजान मुसाफ़िर",
    pages: 119, language: "हिंदी", price: 49, mrp: 499,
    cover: "vicharon-ki-kaid.jpg",
    checkout: "https://payhip.com/buy?link=9ONVy",
    featured: false, popular: false,
    desc: "यह किताब आपके विचारों को चुप कराने का वादा नहीं करती। यह उन्हें थोड़ा बेहतर समझने की एक यात्रा है: Overthinking, डर, बीती बातें और आने वाले कल की चिंता के बीच से।",
    inside: ["Overthinking और मन के दोहराव वाले पैटर्न", "डर, अतीत और भविष्य की चिंता", "Perfectionism, तुलना और control को समझना", "20 अध्याय, 21-Day Mind Practice और एक Mind System"],
    forWho: ["जो छोटी बातों को बार-बार सोचते हैं", "जिनका मन अक्सर बीते कल या आने वाले कल में चला जाता है", "जो अपने विचारों को थोड़ा बेहतर समझना चाहते हैं"],
    note: "यह किताब आत्मचिंतन और personal development के लिए है। यह किसी मानसिक स्वास्थ्य स्थिति के निदान या इलाज का विकल्प नहीं है।",
    preview: { enabled: false, pages: [] } /* पुराने preview पन्ने  में रखे हैं */
  },
  {
    id: "reality-of-manifestation",
    title: "The Reality of Manifestation",
    subtitle: "Turn Your Intentions Into Reality.",
    author: "Nitendra Sahu",
    pages: 69, language: "English", price: 99, mrp: 299,
    cover: "reality-of-manifestation.jpg",
    checkout: "",
    featured: false, popular: false,
    desc: "Manifestation को सिर्फ़ सोचने तक सीमित न रखकर, इसे साफ़ इरादे, सही कदम और धैर्य से जोड़ने वाली किताब। इसमें R.E.A.L. Method समझाया गया है। (किताब English में है।)",
    inside: ["Manifestation की सच्चाई और दिमाग़ कैसे काम करता है", "Clarity और Intention Statement", "Limiting Beliefs, Visualization, Emotions और Energy", "Action, Habits, Fear, Environment और Blueprint Templates"],
    chapters: ["The Truth About Manifestation", "How the Mind Works", "Clarity", "The Intention Statement", "Limiting Beliefs", "Visualization", "Emotions & Energy", "Action", "Habits & Consistency", "Fear & Procrastination", "Environment & People", "Review & Patience"],
    forWho: ["जो अपने लक्ष्य को साफ़ करना चाहते हैं", "जो सोच के साथ कदम भी जोड़ना चाहते हैं", "जिन्हें English में पढ़ना आसान लगता है"],
    note: "यह किताब सामान्य जानकारी और प्रेरणा के लिए है। किसी नतीजे की गारंटी नहीं है।",
    preview: { enabled: false, pages: [] }
  }
];
