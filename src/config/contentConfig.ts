export interface Chapter1Config {
  eyebrow: string;
  title: string;
  subtitle: string;
  badgeLittleAarshi: string;
  badgeTodayAarshi: string;
  childhoodPhoto?: string;
  todayPhoto?: string;
  dialogue1Label: string;
  dialogue1Text: string;
  dialogue2Label: string;
  dialogue2Text: string;
  dialogue3Label: string;
  dialogue3Text: string;
  dialogue4Label: string;
  dialogue4Text: string;
  buttonText: string;
}

export interface Chapter2Config {
  eyebrow: string;
  title: string;
  subtitle: string;
  dateBadge: string;
  centerMoonNote: string;
}

export interface Chapter3Config {
  eyebrow: string;
  title: string;
  subtitle: string;
  card1Title: string;
  card1Subtitle: string;
  card1Description: string;
  card1Placeholder: string;
  card2Title: string;
  card2Subtitle: string;
  card2Description: string;
  card2Placeholder: string;
  card3Title: string;
  card3Subtitle: string;
  card3Description: string;
  card3Placeholder: string;
}

export interface Chapter4Config {
  eyebrow: string;
  shayariBadge: string;
  birthdayTitle: string;
  birthdayName: string;
  shayariLine1: string;
  shayariLine2: string;
  shayariLine3: string;
  shayariLine4: string;
}

export interface Chapter5Page {
  id: string;
  number: string;
  title: string;
  body: string;
  accentColor: string;
}

export interface Chapter6Config {
  eyebrow: string;
  title: string;
  typewriterQuote: string;
  cakeMessage: string;
  heartfeltLetter: string;
}

export interface AppContentConfig {
  version: number;
  lastUpdated?: string;
  chapter1: Chapter1Config;
  chapter2: Chapter2Config;
  chapter3: Chapter3Config;
  chapter4: Chapter4Config;
  chapter5Pages: Chapter5Page[];
  chapter6: Chapter6Config;
}

export const DEFAULT_CONTENT_CONFIG: AppContentConfig = {
  version: 3,
  lastUpdated: '2026-09-05T19:27:41.541Z',
  chapter1: {
    eyebrow: 'Chapter I • The Beginning of Starlight',
    title: 'Do Pal, Ek Pyaari Kahani',
    subtitle: 'Where the dreams of a little girl met the magic of today',
    badgeLittleAarshi: 'Choti Aarshi 🌸',
    badgeTodayAarshi: 'Aaj Ki Aarshi',
    childhoodPhoto: '/childhood_aarshi.jpg',
    todayPhoto: '/today_aarshi.jpg',
    dialogue1Label: 'Little Aarshi asks softly:',
    dialogue1Text: 'Kya main badi hoke sach me khush rahungi?',
    dialogue2Label: 'Future Aarshi gently smiles:',
    dialogue2Text: 'Jitna tum soch sakti ho, usse bhi kahin zyada...',
    dialogue3Label: 'Little Aarshi asks with wonder:',
    dialogue3Text: 'Will someone truly make me feel special?',
    dialogue4Label: 'Future Aarshi speaks with warmth:',
    dialogue4Text: 'Ek din... koi sirf tumhare liye ek poori universe bana dega.',
    buttonText: 'Meri Kahani Shuru Karein',
  },
  chapter2: {
    eyebrow: 'Chapter II • The Moon of Aarshi',
    title: 'Orbit of Sweetness',
    subtitle: 'Chaand ke orbit me ghumte hue Aarshi ke ye anmol jazbaat...',
    dateBadge: "18 March • Aarshi's Cosmic Constellation",
    centerMoonNote: 'You are the sweetest moon in my entire universe.',
  },
  chapter3: {
    eyebrow: 'Chapter III • Your Birthday Powers',
    title: '3 Golden Promises',
    subtitle: 'Sirf 1 card choose karein — jo bhi likhengi, wo sidha WhatsApp par confirm ho jayega.',
    card1Title: 'Anything You Ask',
    card1Subtitle: 'Ek Pakka Vachan',
    card1Description: 'Kuch bhi maang sakti ho — koi choti khwahish, koi aadat badalna ya koi special treat.',
    card1Placeholder: 'Yahan likhein aap mujhse kya chahti hain...',
    card2Title: 'One Golden Wish',
    card2Subtitle: 'Dili Khwahish',
    card2Description: 'Apne dil ki koi aisi wish jo aap hamesha se poori dekhna chahti hain.',
    card2Placeholder: 'Apni dili khwahish yahan likhein...',
    card3Title: 'Ask Me Anything',
    card3Subtitle: 'Sachha Jawab',
    card3Description: 'Koi bhi aisa sawaal jiska aapko hamesha se 100% sachha aur dil se jawab chahiye tha.',
    card3Placeholder: 'Apna sawaal yahan poochhein...',
  },
  chapter4: {
    eyebrow: 'Chapter IV • Constellation of Starlight',
    shayariBadge: 'Aasman Ka Paigaam ✨',
    birthdayTitle: 'HAPPY BIRTHDAY',
    birthdayName: 'Aarshi',
    shayariLine1: 'Aasman ke taare bhi aaj saj kar aaye hain,',
    shayariLine2: 'Aarshi ke janamdin par duaon ke phool laaye hain.',
    shayariLine3: 'Tu muskuraye toh roshan ho jaye har ek jahan,',
    shayariLine4: 'Khushiyon se bhara rahe tera ye aasmaan.',
  },
  chapter5Pages: [
    {
      id: 'page-1',
      number: 'I',
      title: 'Kind Heart',
      body: 'Jab se hum mile hain, tab se mujhe aap hamesha dil se bahut pure aur genuine insaan lage hain. Chahe bahar se aap jaise bhi dikhte ya behave karte hon, lekin mujhe hamesha laga hai ki andar se aapka dil bahut saaf aur pure hai. Aap dusre logon ke saath kaise rehte hain, mujhe nahi pata, lekin mere saamne aap hamesha bahut achhe aur pyaar se rahe hain. Aur shayad isi wajah se mere dil mein aapke liye ek alag hi respect aur achhi feeling hai.',
      accentColor: '#FFC8DD',
    },
    {
      id: 'page-2',
      number: 'II',
      title: 'Caring Nature',
      body: 'Aapki caring nature ke baare mein mujhe utna nahi pata, lekin jab woh Anaya wala phase tha na, tab mujhe aapki yeh cheez sabse zyada pasand thi. Us phase mein aap meri care karte the. Aap abhi bhi meri care karte hain, lekin us time aap meri bahut zyada care karte the.',
      accentColor: '#CDB4FF',
    },
    {
      id: 'page-6',
      number: 'III',
      title: 'Supportive Spirit',
      body: 'Mere bure waqt mein mera saath dene ke liye, sabse pehle toh main aapka jitna thanks karun, woh shayad kam hi hoga. Mujhe nahi pata ki main aapko kaise thank you kahun, lekin aapki wajah se hi main thoda bahut theek ho paya tha. Aur haan, sirf mere saath hi nahi, balki sabke saath aapka supportive nature hai. Aap sach mein bahut achhe ho, literally.',
      accentColor: '#CDB4FF',
    },
    {
      id: 'page-7',
      number: 'IV',
      title: 'Calm Energy',
      body: 'Aapke saath rehne se pata nahi kaisi ek shanti si chha jaati hai. Yaad hai aapko, jab hum mazaar gaye the? Literally, woh din main aaj tak nahi bhool paya, kyunki woh mere liye itna khaas tha ki main kya hi bataun. Woh ek positive energy, uncle logon ka humein ghoorna, aur yeh sab chhoti-chhoti cheezein… sach mein, woh sab mere liye bahut special tha. Sach mein bacche, you are so special to me.',
      accentColor: '#FFD166',
    },
  ],
  chapter6: {
    eyebrow: 'Chapter VI • The Grand Finale',
    title: 'A Letter Written for You',
    typewriterQuote: 'Kuch log poori zindagi ko sach me behad khaas bana dete hain...Aarshi, aap unme se ek ho.',
    cakeMessage: 'Make a silent wish and blow the starlight candles, Aarshi! 🎂✨',
    heartfeltLetter: `**Phase 1 — Jab Hum Pehli Baar Mile**

Jab hum pehli baar mile the, Teacher's Day ke din, literally us din mujhe aap sach mein pasand aaye the. Aapka mere bagal mein aakar baithna aur baatein karna, jabki main aapko jaanta bhi nahi tha, mere liye kaafi unexpected tha. Phir maine Annu se poocha tha, “Kaun hai yeh hot si ladki black saree mein?”

**Phase 2 — Hamari Dobara Mulakat**

Hamari dobara mulakat library mein hui thi. Aap Kokila Ma'am ka kuch print karwane aayi thi, aur main aur Keshav bhi wahan gaye the. Woh hamari second meeting thi.

**Phase 3 — Corridor Wale Din**

Phir woh phase aaya jab hum corridor mein aate-jaate, bhatakte hue mil jaate the.

**Phase 4 — Farewell Ki Baatein**

Jab farewell ki baat ho rahi thi aur hum aapki class mein masti kar rahe the. Hum sab mast the, aur aap bhi.

**Phase 5 — Dheere-Dheere Close Hona**

Jab maine aapko Ishu ke baare mein Instagram par bataya tha, uske baad dheere-dheere hamari baatein hone lagi. Phir hum friends bane aur dheere-dheere aur close hote chale gaye.

**Phase 6 — 1 January Aur Woh Khaas Din**

Jab hum 1 January ko mile the, main bahut zyada excited tha. Usi excitement mein main theek se so bhi nahi paya tha. Hum mile, ghoome, dargah gaye aur mandir bhi gaye.

Maine apni dargahon mein bhi kabhi sar nahi jhukaya tha, lekin sirf aapke liye pata nahi kaise us din maine matha teka, woh bhi mandir mein. Pata nahi kaise, lekin us din mandir aur dargah dono jagah meri prayer sirf yahi thi ki **aap hamesha khush raho**.

Literally, aapne woh din meri life ka best day bana diya tha. Shayad wahin se main aur zyada aapki taraf khinchta chala gaya aur hum normal se zyada close ho gaye. Mujhe aapke liye ek alag si feeling aane lagi thi. Main us waqt khud ko control karne ki koshish kar raha tha, isliye maine seedha baat karna band kar diya tha.

Lekin uske baad hamari chatting aur calls itni badh gayi ki main aapke call aur messages ka wait karne laga. Mujhe aapki bahut buri aadat lag gayi thi, kyunki mujhe feelings aane lagi thi. Main itna attached ho gaya tha ki aap mere sapno mein bhi aane lagi thi. Us waqt mere dimaag mein kuch chalta tha toh bas aap hi aap thi, aur koi nahi.

Phir ek din aapko sahi-galat wala sapna aaya aur mujhe bartan se maarne wala. Us din ke baad se hum aur zyada close ho gaye the.

**Phase 7 — Holi Ka Din**

Holi ke din jab aapne mujhse poocha tha ki kya main aapse pyaar karta hoon, toh mera answer haan tha. Lekin us waqt main Ishu ke gham se bhi poori tarah bahar nahi nikal pa raha tha.

Aapne mujhe itna disturb kar diya tha ki main dono ke baare mein soch-soch kar bahut confused aur pareshan rehta tha. Jab bhi aap apne ex ka naam lekar roti thi, toh literally mujhe bahut bura lagta tha. Gitesh ho ya Anurag, kisi bhi ladke ka naam sunte hi mujhe jalan aur insecurity feel hone lagti thi.

Aur jab Anurag ne relationship ka evidence diya tha, us din mujhe literally wahi dard dobara feel hua tha jo Ishu ke saath hua tha. Main us din bahut roya tha. Isi wajah se main aapse baat nahi kar raha tha, aur phir Anaya ke papa ka kehkar mujhe manaya gaya. Thoda sa drama, thodi si blushing, aur phir main maan gaya.

Phir papers tak sab kuch aisa hi chalta raha. Lekin papers ke baad aapke replies fast aana band ho gaye, ignore feel hone laga aur calls bhi kam ya band ho gayi. Us waqt main dobara bahut toot gaya tha. Main bahut zyada disturbed ho gaya tha aur mere dimaag mein bahut overthinking chalne lagi thi—ki shayad aap kisi aur se baat kar rahi hongi aur na jaane kya-kya.

Phir maine khud ko control kiya aur thodi doori maintain ki. Dheere-dheere maine khud ko theek karna shuru kiya. Lekin phir bhi mann nahi laga, toh maine aapko dobara message kiya. Dheere-dheere hamari baatein phir se shuru hui, mujhe theek lagne laga aur main thoda cool bhi ho chuka tha.

Lekin kabhi-kabhi jab aap wahi Aarshi aur Anaya wale phase ki baatein karti thi, toh main emotionally wapas usi jagah chala jata tha. Isliye kabhi-kabhi main mana kar deta tha ya ignore kar deta tha.

**Last Phase — Aaj**

Aaj main aapke saamne hoon, aur bas itna kahunga ki meri feelings khatam nahi hui hain. Lekin jab tak meri life mein koi aur nahi aata, mujhe pata hai ki main aap aur Ishu, dono ko lekar aise hi kabhi-kabhi disturbed hota rahunga.

Mujhe pata hai ismein aap dono ki galti nahi hai. Kuch thoughts hote hain na jo adhuri cheezon ko accept nahi kar paate—shayad mera dimaag bhi kabhi-kabhi bas wahi karta hai.

**Happy Birthday to you, mere pyare bacche. God bless you.** 🤍`,
  },
};
