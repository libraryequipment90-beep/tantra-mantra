const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
const toast = document.getElementById("toast");

navToggle?.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

function headerOffset() {
  return document.querySelector(".site-header")?.offsetHeight || 78;
}

const pageIds = ["home", "about", "services", "mantras", "testimonials", "blog", "faq", "contact"];

function showPage(id, scroll = true) {
  if (!document.querySelector(".page-section")) return false;
  const page = pageIds.includes(id) ? id : "home";
  const showAll = page === "home";
  document.body.classList.toggle("home-view", showAll);
  document.querySelectorAll(".page-section").forEach((section) => {
    section.classList.toggle("is-visible", showAll || section.id === page);
  });
  document.querySelectorAll(".main-nav a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    a.classList.toggle("active", href === `#${page}`);
  });
  history.replaceState(null, "", `#${page}`);
  mainNav?.classList.remove("open");
  if (typeof renderMantras === "function") renderMantras();
  if (scroll) {
    if (showAll) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      requestAnimationFrame(() => {
        const target = document.getElementById(page);
        if (!target) return;
        const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset());
        window.scrollTo({ top, behavior: "smooth" });
      });
    }
  }
  return true;
}

document.querySelectorAll('.main-nav a, .site-footer nav a, .brand').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href") || "";
    if (!href.startsWith("#")) {
      mainNav?.classList.remove("open");
      return;
    }
    e.preventDefault();
    const id = href.slice(1) === "top" ? "home" : href.slice(1);
    showPage(id);
  });
});

document.querySelectorAll('.header-cta, .hero-btns a, .text-link, .btn-outline').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href") || "";
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const id = href.slice(1) === "top" ? "home" : href.slice(1);
    if (link.classList.contains("home-only")) {
      showPage(id);
      return;
    }
    showPage("home", false);
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (!target) return;
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset());
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
});

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

const WHATSAPP_NUMBER = "919311629296";

function bindForm(id) {
  const form = document.getElementById(id);
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const service = (data.get("service") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();
    const text = [
      "New enquiry from Tantra Mantra website",
      `Name: ${name}`,
      `Mobile: ${phone}`,
      `Service: ${service}`,
      `Message: ${message}`
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    form.reset();
    if (id === "serviceForm") closeServiceModal();
    showToast("Opening WhatsApp to send your message.");
  });
}

bindForm("heroForm");
bindForm("contactForm");
bindForm("serviceForm");

const serviceModal = document.getElementById("serviceModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalService = document.getElementById("modalService");

function openServiceModal(service, desc) {
  modalTitle.textContent = service;
  modalDesc.textContent = desc;
  modalService.value = service;
  serviceModal.hidden = false;
  document.body.style.overflow = "hidden";
  serviceModal.querySelector('input[name="name"]')?.focus();
}

function closeServiceModal() {
  serviceModal.hidden = true;
  document.body.style.overflow = "";
}

document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("click", () => {
    openServiceModal(card.dataset.service || "", card.dataset.desc || "");
  });
});

document.getElementById("modalClose")?.addEventListener("click", closeServiceModal);
serviceModal?.addEventListener("click", (e) => {
  if (e.target === serviceModal) closeServiceModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && serviceModal && !serviceModal.hidden) closeServiceModal();
  if (e.key === "Escape" && mantraModal && !mantraModal.hidden) closeMantraModal();
});

const sacredTexts = [
  {
    type: "shabar",
    deity: "Nath",
    title: "Guru Aadesh Shabar",
    preview: "ॐ नमो आदेश गुरु को। सत्यनाम आदेश गुरु का...",
    text: "ॐ नमो आदेश गुरु को।\nसत्यनाम आदेश गुरु का।\nॐ गुरु गोरखनाथाय नमः।\nआदेश! आदेश! आदेश!\nशब्द सांचा पिंड काँचा।\nफुरो मंत्र ईश्वरी वाचा॥",
    meaning: "Nath sampradaya ka mool aadesh. Har sadhana se pehle guru-shakti jagane ka siddh prachin shabar.",
    note: "Har japa se pehle 3 baar. Face east or north. Satvik raho."
  },
  {
    type: "shabar",
    deity: "Nath",
    title: "Alakh Niranjan Shabar",
    preview: "अलख निरंजन। सत्यनाम आदेश...",
    text: "अलख निरंजन।\nसत्यनाम आदेश।\nआदेश गुरु का।\nआदिनाथ मच्छन्दरनाथ गोरक्षनाथ।\nतीनों नाथ साक्षी।\nफुरो मंत्र ईश्वरी वाचा॥",
    meaning: "Gupt Nath naam. Mann shuddha rakhne aur sadhana ka dwar kholne ka prachin shabar.",
    note: "Subah-shaam 11 baar. Aawaz dheemi, shraddha se."
  },
  {
    type: "shabar",
    deity: "Nath",
    title: "Gorakhnath Duhai Shabar",
    preview: "ॐ नमो गोरखनाथ जती, जोगी बलवान...",
    text: "ॐ नमो गोरखनाथ जती, जोगी बलवान।\nगोरखनाथ की आन।\nमत्स्येन्द्रनाथ की दुहाई।\nशिव की साखी।\nजो अनिष्ट आए, सो टले।\nआदेश! फुरे नाथ वाचा॥",
    meaning: "Prachin Gorakhnath duhai. Sankat, bhay aur adrishta baadha ke liye.",
    note: "21 baar. Mangalvaar ya Shanivaar sandhya. Kisi ka nuksaan mat maango."
  },
  {
    type: "shabar",
    deity: "Nath",
    title: "Navnath Siddhi Shabar",
    preview: "ॐ नमो आदिनाथ। ॐ नमो मच्छन्दरनाथ...",
    text: "ॐ नमो आदिनाथ।\nॐ नमो मच्छन्दरनाथ।\nॐ नमो गोरक्षनाथ।\nॐ नवनाथेभ्यो नमः।\nनवनाथ रक्षा करो।\nसाधना सिद्ध हो।\nफुरे नाथ वाचा॥",
    meaning: "Navnath smaran. Gupt sadhana aur raksha ke liye Nath-shakti jagata hai.",
    note: "11 ya 21 baar. Guruvaar vishesh. Satvik bhojan."
  },
  {
    type: "shabar",
    deity: "Hanuman",
    title: "Hanuman Vajra Kavach Shabar",
    preview: "ॐ नमो वज्र नमो वज्र का कोठा...",
    text: "ॐ नमो वज्र नमो वज्र का कोठा,\nजिसमें पिंड हमारो पैठा।\nईश्वर कुञ्जी, ब्रह्म का ताला।\nमेरे आठों याम का यति हनुमंत रखवाला॥",
    meaning: "Siddh Hanuman vajra-kavach. Tan-man ko bandhkar din-raat raksha karta hai.",
    note: "Mangalvaar/Shanivaar shaam. Sarson tel ka diya. 11, 21 ya 108 baar."
  },
  {
    type: "shabar",
    deity: "Hanuman",
    title: "Hanuman Bhoot Pret Nashak Shabar",
    preview: "ॐ नमो आदेश गुरु को। हडमान हठीले...",
    text: "ॐ नमो आदेश गुरु को।\nहडमान हठीले ठीक वज्र काकील मेरा गुरू कचनी काटे।\nमैं भी कचनी काटूं, सात समंदर खाय।\nहनुमत रज क उच्चारे मेरी अंजनी का पूत।\nसंकट में सहाय होय मेरी आन गुरू की शान।\nमेरी आन गुरू की आन।\nईश्वर गौरा पार्वती महादेव की दुहाई॥",
    meaning: "Prachin siddh Hanuman shabar. Ghar, raat aur adrishta bhay ke liye.",
    note: "Shaam ko 21 baar. Ghar ke chaar konon ki taraf muh karke bhi padh sakte ho."
  },
  {
    type: "shabar",
    deity: "Hanuman",
    title: "Hanumant Beer Bajrangi Shabar",
    preview: "ॐ नमः आदेश गुरू को। हनुमंत बीर बीर बजरंगी...",
    text: "ॐ नमः आदेश गुरू को।\nहनुमंत बीर बीर बजरंगी वज्र धार।\nडाकिनी शाकिनी भूत प्रेत जिन्न सबको अब भाग भाग।\nन भागे तो निरंजनी निराकार की दोहाई॥",
    meaning: "Siddh Bajrangi shabar. Bhoot-pret, daraav aur raat ke bhay ke liye.",
    note: "21 baar. Intention raksha ho, himsa nahi."
  },
  {
    type: "shabar",
    deity: "Hanuman",
    title: "Deep Jage Bhoot Nashak Shabar",
    preview: "ॐ नमो दीप मोहे। दीप जागे। पवन चाले...",
    text: "ॐ नमो दीप मोहे।\nदीप जागे। पवन चाले। पानी चाले।\nशाकिनी चाले। डाकिनी चाले।\nभूत चाले। प्रेत चाले।\nनौ सौ निन्यानवे नदी चाले।\nहनुमान वीर की दुहाई।\nमेरी भक्ति। गुरु की शक्ति।\nफुरै मंत्र ईश्वरो वाचा॥",
    meaning: "Diya jalaakar padha jaane wala prachin shabar. Ghar ki hawa halki karne ke liye.",
    note: "Raat ko diya jalao, phir 11 baar. Ghee ya sarson tel."
  },
  {
    type: "shabar",
    deity: "Hanuman",
    title: "Hanuman Jwara Nashak Shabar",
    preview: "ॐ नमो हनुमान आंजनेय, वायु पुत्र महाबली...",
    text: "ॐ नमो हनुमान आंजनेय, वायु पुत्र महाबली।\nजैसे रावण की लंका जली, वैसे ज्वर जल जाए।\nराम की आन, सीता की दुहाई।\nज्वर भाग, ज्वर भाग।\nॐ फट्॥",
    meaning: "Prachin jwara-shanti shabar. Bukhaar aur deh-taap ke saath shraddha se.",
    note: "11 baar. Dawa aur doctor ke saath. Keval mantra par mat chhodna."
  },
  {
    type: "shabar",
    deity: "Shiva",
    title: "Deh Raksha Kavach Shabar",
    preview: "ॐ नमो आदेश गुरु को। शिव शक्ति रखवाली...",
    text: "ॐ नमो आदेश गुरु को।\nशिव शक्ति रखवाली।\nकाया के आठों द्वार, राखो नाथ हमार।\nअग्नि जल वायु भूमि आकाश, पंच तत्त्व निर्मल राख।\nशब्द सांचा पिंड काँचा।\nफुरो मंत्र ईश्वरी वाचा॥",
    meaning: "Sharir ke aathon dwar ki raksha. Panch tattva shuddha rakhne ka siddh shabar.",
    note: "Roz snan ke baad 11 baar. Face north."
  },
  {
    type: "shabar",
    deity: "Durga",
    title: "Griha Raksha Ghera Shabar",
    preview: "ॐ नमो आदेश गुरु को। चारों कोने घर के...",
    text: "ॐ नमो आदेश गुरु को।\nचारों कोने घर के, माँ दुर्गा रखवाली।\nदरवाजे पर हनुमंत, छत पर भैरव नाथ।\nरसोई में अन्नपूर्णा, आँगन में क्षेत्रपाल।\nकोई अनिष्ट आए तो, गोरखनाथ की आन।\nफुरो मंत्र ईश्वरी वाचा॥",
    meaning: "Ghar ke chaar kone, dwar, chhat aur aangan ki prachin ghera-raksha.",
    note: "Ghar ke beech khade hokar 11 baar. Naya ghar ya bhari mahol mein vishesh."
  },
  {
    type: "shabar",
    deity: "Nath",
    title: "Sarv Raksha Aadesh Shabar",
    preview: "ॐ नमो आदेश गुरु को। सब ओर रक्षा करो...",
    text: "ॐ नमो आदेश गुरु को।\nसब ओर रक्षा करो।\nपूरब पश्चिम उत्तर दक्षिण।\nअग्नि जल वायु आकाश।\nआड़े बीच कूट कपट हर।\nशब्द सांचा पिंड काँचा।\nफुरो मंत्र ईश्वरी वाचा॥",
    meaning: "Charon disha aur panch tattva ki sarv-raksha. Roz ka gupt kavach.",
    note: "Subah 11 baar. Safar se pehle bhi padho."
  },
  {
    type: "shabar",
    deity: "Kali",
    title: "Masan Kali Tali Shabar",
    preview: "काली काली महाकाली, इन्द्र की बेटी, ब्रह्मा की साली...",
    text: "काली काली महाकाली, इन्द्र की बेटी, ब्रह्मा की साली।\nपीती भर भर रक्त प्याली, उड़ बैठी पीपल की डाली।\nदोनों हाथ बजाए ताली।\nजहाँ जाए वज्र की ताली, वहाँ ना आए दुश्मन हाली।\nदुहाई कामरो कामाख्या नैना योगिनी की।\nईश्वर महादेव गोरा पार्वती की।\nदुहाई वीर मसान की॥",
    meaning: "Prachin Masan Kali shabar. Raat, nazar aur gupt bhay ke liye.",
    note: "Amavasya ya sandhya. Shant chitt. Kisi par hamla mat maango."
  },
  {
    type: "shabar",
    deity: "Kali",
    title: "Kamakhya Devi Shabar",
    preview: "ॐ कामरू देश कामाक्षा देवी जहां बसे...",
    text: "ॐ कामरू देश कामाक्षा देवी जहां बसे।\nकामरू जाई जहां बैठी माई।\nगुरू गोरखनाथ बंगाल खंड कामाक्षा की दुहाई।\nअनिष्ट टले, घर शुद्ध रहे।\nफुरो मंत्र ईश्वरी वाचा॥",
    meaning: "Kamakhya-Gorakhnath parampara ka gupt shabar. Ghar shuddhi ke liye.",
    note: "21 baar. Shraddha se. Himsa ki ichha mat rakho."
  },
  {
    type: "shabar",
    deity: "Kali",
    title: "Kali Bhoot Pret Sanghar Shabar",
    preview: "ॐ काली काली महाकाली... जाग जाग रे कालिका के पूत भैरो अवधूत...",
    text: "ॐ काली काली महाकाली।\nजाग जाग रे कालिका के पूत भैरो अवधूत।\nबरिया बाँध, मुर्दा बाँध, हनुमन्त वीर चौकी बाँध।\nजाग जाग रे।\nसाबर मन्त्र फुरे।\nदुहाई काली कामाक्षा देवी के होवा सहाय॥",
    meaning: "Kali-Bhairav-Hanuman teen shakti ki chauki. Ghar ki raat-raksha.",
    note: "Shaam 11 baar. Diya jalao. Ghar ke dwar ki taraf."
  },
  {
    type: "shabar",
    deity: "Bhairav",
    title: "Kalabhairav Choki Shabar",
    preview: "ॐ नमो कालभैरवाय। चौकी बंधाओ, मोरा द्वार...",
    text: "ॐ नमो कालभैरवाय।\nचौकी बंधाओ, मोरा द्वार।\nजागो जागो कालिका पूत भैरो अवधूत।\nबरिया बाँध, मुर्दा बाँध, हनुमंत वीर चौकी बाँध।\nदुहाई भैरव की।\nकाशी नाथ की आन।\nफुरे कालभैरव वाचा॥",
    meaning: "Bhairav chauki bandhne ka siddh shabar. Dwar aur raat ki raksha.",
    note: "Ravivaar sandhya ya Bhairav Ashtami. Sarson tel ka diya."
  },
  {
    type: "shabar",
    deity: "Durga",
    title: "Nazar Utarna Shabar",
    preview: "ॐ नमो सती माता, नजर उतारो...",
    text: "ॐ नमो सती माता, नजर उतारो।\nकाला नजर, गोरी नजर, बुरी नजर सब दूर कर।\nमाँ की आन, गुरु की दुहाई।\nनजर लगे तो जले, नजर वाले की आँख जले।\nसात जड़ी, सात बूटी।\nॐ नमः॥",
    meaning: "Prachin nazar-utaran shabar. Buri nazar aur ghar ki bhari hawa ke liye.",
    note: "11 baar. Namak-mirch ghumakar bhi kiya jaata hai. Bachchon ke liye dheere padho."
  },
  {
    type: "shabar",
    deity: "Durga",
    title: "Durga Duhai Shabar",
    preview: "जय काली जय माँ काली, जय माँ दुर्गा महाबली...",
    text: "जय काली जय माँ काली, जय माँ दुर्गा महाबली।\nमेरी रक्षा करो माँ।\nगोरखनाथ की दुहाई, माँ दुर्गा की आन।\nजो मेरा अनिष्ट करे, माँ तू उसे टाल दे।\nफट् स्वाहा॥",
    meaning: "Durga-Kali duhai. Sankat aur shatru-bhay mein raksha maangne ka prachin shabar.",
    note: "Mangalvaar/Shukravaar 21 baar. Gussa nahi, shraddha se."
  },
  {
    type: "shabar",
    deity: "Baglamukhi",
    title: "Baglamukhi Mukh Stambhan Shabar",
    preview: "ॐ ह्लीं बगलामुखि। वाचं मुखं स्तम्भय...",
    text: "ॐ नमो आदेश गुरु को।\nॐ ह्लीं बगलामुखि।\nवाचं मुखं स्तम्भय।\nझूठी जुबान बन्द हो।\nपीताम्बरा रखवाली।\nफुरो मंत्र ईश्वरी वाचा॥",
    meaning: "Siddh Baglamukhi shabar. Jhoothi zubaan, nyay aur raksha ke liye. Himsa ke liye nahi.",
    note: "Subah 108. Peela asana agar ho. Court/exam se pehle. Dushman ko maarne ki ichha mat rakho."
  },
  {
    type: "shabar",
    deity: "Nath",
    title: "Nath Rog Nashak Shabar",
    preview: "ॐ नमो आदेश गुरु को। हरड़ बहेड़ा आमला...",
    text: "ॐ नमो आदेश गुरु को।\nहरड़ बहेड़ा आमला, तीनों औषधि एक माला।\nजो रोग मेरे तन में आया, वो रोग दूर भगाया।\nगोरखनाथ की आन, मत्स्येन्द्रनाथ की दुहाई।\nनाथ ने कहा, रोग गया।\nॐ स्वाहा॥",
    meaning: "Nath parampara ka rog-shanti shabar. Dawa ke saath shraddha se.",
    note: "11 baar. Doctor/dawa zaroori. Keval mantra par mat chhodna."
  },
  {
    type: "shabar",
    deity: "Hanuman",
    title: "Yatra Raksha Shabar",
    preview: "ॐ नमो पवनसुताय। यात्रा मंगल हो...",
    text: "ॐ नमो पवनसुताय।\nयात्रा मंगल हो। मार्ग सुरक्षित हो।\nचोर बैरी दूर रहें।\nरात हो या दिन, हनुमंत साथ रहें।\nफुरे बजरंग वाचा॥",
    meaning: "Safar, raat-yatra aur raste ki raksha ka prachin shabar.",
    note: "Nikalne se pehle 11 baar. Pocket mein Hanuman naam rakhna shubh."
  },
  {
    type: "shabar",
    deity: "Shiva",
    title: "Atma Raksha Shabar",
    preview: "ॐ नमो महादेवाय। तन मन आत्मा रक्षित हो...",
    text: "ॐ नमो महादेवाय।\nतन मन आत्मा रक्षित हो।\nअनिष्ट स्पर्श न हो।\nनजर लगे तो काटो, टोना टोटका जाओ।\nशिव की दुहाई।\nफुरे महादेव वाचा॥",
    meaning: "Tan-man-atma ki gupt raksha. Tona-totka aur nazar ke liye.",
    note: "Roz 11 baar. Face north. Rudraksha ho to aur achha."
  },
  {
    type: "shabar",
    deity: "Nath",
    title: "Gorakhnath Vajra Kotha Shabar",
    preview: "ॐ वज्र में कोठा, वज्र में ताला, वज्र में बंध्या दस्ते द्वारा...",
    text: "ॐ वज्र में कोठा, वज्र में ताला, वज्र में बंध्या दस्ते द्वारा।\nतहां वज्र का लग्या किवाड़ा, वज्र में चौखट, वज्र में कील।\nजहां से आय, तहां ही जावे। जाने भेजा, जांकू खाए, हमको फेर न सूरत दिखाए।\nहाथ कूँ, नाक कूँ, सिर कूँ, पीठ कूँ, कमर कूँ, छाती कूँ जो जोखो पहुंचाए, तो गुरु गोरखनाथ की आज्ञा फुरे।\nमेरी भक्ति गुरु की शक्ति।\nफुरो मंत्र ईश्वरो वाचा॥",
    meaning: "Guru Gorakhnath ka siddh vajra-kotha. Tan ke dwar bandhkar anisht wapas bhejne ka prachin tantra shabar.",
    note: "Roz 27 baar. Face north. Shraddha se. Kisi par hamla mat maango."
  },
  {
    type: "shabar",
    deity: "Nath",
    title: "Asana Laganeka Shabar",
    preview: "सत नमो आदेश। गुरुजी को आदेश। सत्य की धरती सत्य का आकाश...",
    text: "सत नमो आदेश। गुरुजी को आदेश। ॐ गुरुजी।\nसत्य की धरती सत्य का आकाश। सत्य की माला सत्य की जाप सत्य का आसन सत्य का पूत।\nआसन बैठे योगी अवधूत। आसन ब्रह्मा इन्द्र। आसन बैठे हरि गोविन्द।\nआसन बैठे जपिये जाप कोटि जन्म के उतरन्ते पाप।\nआसन बैठे सिंहासन बैठे बैठे गिरी की छाया।\nपांच तत्व से ले आसन बैठे सतगुरु सत्य का शब्द सुनाया।\nबिना मन्त्र आसन लगाया सो योगी नरक को जाय। मन्त्र पढ़ आसन लगाया सो योगी अमरपुर जाय।\nश्रीनाथ जी गुरुजी को आदेश। आदेश॥",
    meaning: "Nath tantra ka asana-lagan shabar. Baithne se pehle bhoomi, panch tattva aur satya-shabd ki raksha.",
    note: "Japa se pehle 1 baar. Asana par pani chhidakkar. Face east ya north."
  },
  {
    type: "shabar",
    deity: "Nath",
    title: "Panch Maheshwar Asana Shabar",
    preview: "सत नमो आदेश, गुरुजी को आदेश, ॐ गुरुजी मन मारू मैदा करू...",
    text: "सत नमो आदेश, गुरुजी को आदेश।\nॐ गुरुजी मन मारू मैदा करू, करू चकनाचूर।\nपांच महेश्वर आज्ञा करे तो बैठू आसन पूर।\nश्री नाथ जी गुरुजी को आदेश आदेश॥",
    meaning: "Nath gupt asana-shuddhi. Mann ki mail katkar panch Maheshwar ki agya se baithne ka siddh shabar.",
    note: "Asana par jal chhidakkar 1 baar. Subah snan ke baad."
  },
  {
    type: "shabar",
    deity: "Nath",
    title: "Goraksha Gayatri Shabar",
    preview: "सत नमो आदेश। अलख निरंजन कौन स्वरूपी बोलिये...",
    text: "सत नमो आदेश। गुरु जी को आदेश। ॐ गुरु जी।\nअलख निरंजन कौन स्वरूपी बोलिये। अलख निरंजन ज्योति स्वरूपी बोलिये।\nओंकारे शिवरूपी संख्या ने साधुरूपी मध्याहे हंस रूपी हंस परमहंस दो अक्षर गुरु तो गोरक्ष काया तो गायत्री।\nॐ ब्रह्मसोहं शक्ति-शून्य माता अविगत पिता अभय पंथ अचल पदवी निरंजन गोत्र विहंगम जाति असंख्य प्रवर अनन्त शाखा सूक्ष्म वेद आत्मज्ञानी ब्रह्मज्ञानी।\nश्री ॐ गों गोरक्षनाथाय विद्महे शून्य पुत्राय धीमहि तन्नो गोरक्ष निरंजन प्रचोदयात्।\nएता गोरक्ष गायत्री जाप सम्पूर्ण भया। श्री नाथ जी गुरुजी को आदेश। आदेश॥",
    meaning: "Nath sampradaya ki Goraksha gayatri. Alakh Niranjan aur shunya-putra Goraksha ka gupt tantra paath.",
    note: "Mula japa se pehle 1 baar. Face north. Satvik raho."
  },
  {
    type: "shabar",
    deity: "Nath",
    title: "Shiv Goraksha Mula Shabar",
    preview: "ॐ शिव गोरक्ष योगी...",
    text: "ॐ शिव गोरक्ष योगी।\nशिव गोरक्ष।\nसत नमो आदेश। गुरुजी को आदेश।\nॐ सद्गुरुजी, नाथ जी गुरुजी को आदेश।\nआदेश! आदेश! आदेश॥",
    meaning: "Nath mula shabar. Samadhi, shanti aur atma-vichara jagane ka siddh beeja.",
    note: "Mala par 108. Subah. Nadi-shuddhi ke saath 11 cycle bhi kiya jaata hai."
  },
  {
    type: "shabar",
    deity: "Bhairav",
    title: "Bhairav Pret Bhoot Nashak Shabar",
    preview: "ॐ नमो भैरव काल भैरव। प्रेत पिशाच डाकिनी शाकिनी...",
    text: "ॐ नमो भैरव काल भैरव।\nप्रेत पिशाच डाकिनी शाकिनी, जो भी आए सताए, काल भैरव उसे खदेड़ो।\nकाशी नाथ की दुहाई, गोरखनाथ की आन।\nभूत भागे प्रेत भागे।\nफट् फट् स्वाहा॥",
    meaning: "Kaal Bhairav-Gorakhnath duhai. Raat, pret-bhay aur ghar ki baadha door karne ka tantra shabar.",
    note: "Ravivaar sandhya 11 baar. Sarson tel ka diya. Himsa ki ichha mat rakho."
  },
  {
    type: "shabar",
    deity: "Hanuman",
    title: "Mor Pankh Bhoot Nashak Shabar",
    preview: "बांधों भूत जहाँ तू उपजो छाड़ो गिर पर्वत चढ़ाई...",
    text: "बांधों भूत जहाँ तू उपजो छाड़ो गिर पर्वत चढ़ाई।\nसर्ग दुहेली तू जमी। झिलमिलाही हुंकारों हनुमंत पचारई।\nसभी जारि जारि भस्म करें जो चापें सींउ॥",
    meaning: "Prachin Hanuman mor-pankh shabar. Bhoot-baadha ko bandhkar wapas bhejne ka gupt paath.",
    note: "Shaam 21 baar. Intention raksha ho. Kisi ka nuksaan mat maango."
  },
  {
    type: "shabar",
    deity: "Nath",
    title: "Navnath Svarupa Japa Shabar",
    preview: "सत नमो आदेश। गुरुजी को आदेश। ॐ गुरुजी ओंकार आदिनाथ...",
    text: "सत नमो आदेश। गुरुजी को आदेश।\nॐ गुरुजी ओंकार आदिनाथ ओंकार स्वरूप बोलिये।\nउदयनाथ पार्वती धरती स्वरूप बोलिये।\nसत्यनाथ ब्रह्माजी जल स्वरूप बोलिये।\nसंतोषनाथ विष्णुजी खड्ग-खाण्ड तेज स्वरूप बोलिये।\nअचल-अचम्बेनाथ आकाश शेष स्वरूप बोलिये।\nगजबेली गजकण्ठरनाथ गणेशजी गज हस्ती स्वरूप बोलिये।\nज्ञानपारखी सिद्ध चौरंगीनाथ अठारह भार बनस्पति स्वरूप बोलिये।\nमाया रूपी दादा मत्स्येन्द्रनाथ माया स्वरूप बोलिये।\nघटे पिण्डे नव निरन्तरे सम्पूर्ण रक्षा करन्ते श्री शम्भुजती गुरु गोरक्षनाथ बाल स्वरूप बोलिये।\nइतना नवनाथ स्वरूप मन्त्र सम्पूर्ण भया।\nअनन्त कोट सिद्धो में बैठकर गुरु गोरक्षनाथजी ने कहाया नाथजी गुरुजी आदेश॥",
    meaning: "Navnath svarupa japa. Nav Nath ke roop se ghat-pind ki sampoorna raksha. Gorakhnath tantra ka siddh paath.",
    note: "Subah 1 ya 3 baar. Face north. Satvik raho."
  },
  {
    type: "shabar",
    deity: "Nath",
    title: "Chaurasi Siddha Gayatri Shabar",
    preview: "सत नमो आदेश। ॐ गंगा गोदा अनुपान शिला, सुमीर बैठे गुरु गोरक्षनाथ बाला...",
    text: "सत नमो आदेश। गुरुजी को आदेश। ॐ गुरुजी।\nॐ गंगा गोदा अनुपान शिला, सुमीर बैठे गुरु गोरक्षनाथ बाला।\nअनभय पंथ, अनन्त शाखा, ऋद्धि-सिद्धि सिद्धा का मेला।\nॐ कार आदि नाथ तान अनुपम शिष्य, माया मचन्दर, जालन्दर शिष्य।\nसनक-सनातन-सनन्द सिद्ध सनत्कुमार-मार्कण्डेयजी सिद्ध।\nमीन सिद्ध-सिद्ध विरूपाक्ष, सिद्ध श्रृंगेरीपा-चोली घोआ शिष्य।\nमाया पार्वती उदयनाथ सिद्ध शिलनाथ तिण्डिणी योगी सिद्ध।\nकान पा उत्पत्ति गजकर्ण गजकण्ठनाथ, इनकी कथनी, करनी बज्र काया भ्रमर गुफा अमिरस प्याला।\nरक्षा करे शम्भुजती गुरु गोरक्षनाथजी बाला।\nॐ मचन्दर पूता गोरख सिद्ध मंजु तारा शाबर सिद्ध।\nसिद्धासन सिद्ध कालनाथ सिद्ध प्रभुदेव ता प्रकाशनाथ शिष्य।\nनारदा शारदा ता परमानन्द शिष्य, गौरवनाथजी का मेरु सिद्ध संतोषनाथ विष्णुजी गोपाल सिद्ध।\nअचल अचम्बेनाथ शेष सिद्ध, सत्यनाथ ब्रह्माजी जल रूप सिद्ध।\nइनकी योग युगति सांधे काया, काल लागै ना लिपै माया।\nरक्षा करे श्रीशम्भुजती गुरु गोरक्षनाथजी बाला।\nॐ जती गोरख आप विराजे, अपना गुरु आपै चेले।\nचौरासी सिद्धां का भया उजियाला, गोरख कहे निरन्तर मेला।\nयोगी जागो योग, जगाना, अपना मांहीं आफी प्रगटया गुरु शब्द अनहद बाजा।\nरक्षा करे शम्भुजती गुरु गोरक्षनाथजी बाला।\nइतना 9 नाथ 84 सिद्ध नाम लेते, जाप जपन्ते जल में अग्नि प्रगटे।\nजिसकी रक्षा शम्भुजती गुरु गोरक्षनाथजी करे। श्रीनाथजी गुरुजी को आदेश॥",
    meaning: "Chaurasi siddha gayatri. Navnath aur 84 siddhon ke naam se tan-raksha. Gorakhnath tantra ka gupt paath.",
    note: "Guruvaar 1 baar. Dheere padho. Himsa ki ichha mat rakho."
  },
  {
    type: "shabar",
    deity: "Nath",
    title: "Mahadevi Karya Siddhi Shabar",
    preview: "ॐ नमो महादेवी सर्वकार्य सिद्धकर्णी जो पाती पुरे...",
    text: "ॐ नमो महादेवी।\nसर्वकार्य सिद्धकर्णी जो पाती पुरे।\nब्रह्मा विष्णु महेश तीनो देवतन।\nमेरी भक्ति गुरु की शक्ति।\nश्री गुरु गोरखनाथ की दुहाई।\nफुरो मंत्र ईश्वरो वाचा॥",
    meaning: "Guru Gorakhnath-Mahadevi tantra shabar. Karya siddhi aur raksha. Vashikaran ke liye nahi.",
    note: "Roz 27 baar. Face north. Satvik. Kisi ka vash mat maango."
  },
  {
    type: "shabar",
    deity: "Bhairav",
    title: "Kshetrapal Simha Shabar",
    preview: "ॐ क्षेत्रपालाय नमः। गाँव खेत घर रक्षको...",
    text: "ॐ नमो आदेश गुरु को।\nॐ क्षेत्रपालाय नमः।\nगाँव खेत घर रक्षको।\nसीमा सुरक्षित रहे।\nआँगन चौखट क्षेत्रपाल रखवाला।\nगोरखनाथ की आन।\nसत्य नाम क्षेत्रपाल का।\nफुरो मंत्र ईश्वरी वाचा॥",
    meaning: "Kshetrapal-Bhairav sima raksha. Gaon, khet aur ghar ki hadd bandhne ka prachin tantra shabar.",
    note: "Ghar ke dwar par 11 baar. Naya ghar ya khet ki hadd par vishesh."
  },
  {
    type: "shabar",
    deity: "Kali",
    title: "Jangli Jeev Raksha Shabar",
    preview: "बाघ बिजुरी सर्प चोर चारिउ बांधौ एक ठौर...",
    text: "बाघ बिजुरी सर्प चोर चारिउ बांधौ एक ठौर।\nधरती माता आकाश पिता।\nरक्ष रक्ष श्री परमेश्वरी कालिका की वाचा।\nदुहाई महादेव की॥",
    meaning: "Siddha Shabar granth, raksha-karm. Saanp, chor, bijli aur van-jeev ke bhay ke liye prachin paath.",
    note: "Sone se pehle 3 baar, 3 taali. Intention raksha ho. Kisi ka nuksaan mat maango."
  },
  {
    type: "shabar",
    deity: "Hanuman",
    title: "Ram Chauki Nidra Raksha Shabar",
    preview: "खाट पड़न धरती मरण या देहि नारायण आपके शरण...",
    text: "खाट पड़न धरती मरण या देहि नारायण आपके शरण।\nईश्वर की चौकी ब्रह्मा का ताला।\nजहाँ सोवै वहाँ राम रखवाला।\nआस्तिक आस्तिक। चोर सर्प भय सब नास्तिक॥",
    meaning: "Siddha Shabar granth ka nidra-raksha. Sote samay Ram-chauki, chor aur sarp-bhay ke liye.",
    note: "Sone se pehle 3 ya 7 baar. 3 taali. Face east ya north."
  },
  {
    type: "shabar",
    deity: "Hanuman",
    title: "Daso Dwar Chauki Shabar",
    preview: "ॐ नमो आदेश गुरु को। वज्र वज्री वज्र किवाड़...",
    text: "ॐ नमो आदेश गुरु को।\nवज्र वज्री वज्र किवाड़।\nवज्री मैं बांधा दशो द्वार।\nपहली चौकी गणपति की। दूजी चौकी हनुमंत की।\nतीजी चौकी भैरव की। चौथी चौकी राम रक्षा करने की।\nश्री नरसिंह देव जी आए।\nशब्द सांचा पिंड काँचा।\nफुरो मंत्र ईश्वरो वाचा।\nसत्यनाम आदेश गुरु को॥",
    meaning: "Siddha Shabar granth ka deh-raksha. Daso dwar par Ganpati-Hanumant-Bhairav-Ram-Narsingh ki chauki.",
    note: "Shanivaar se 11 ya 21 baar. Tel ka diya. Shraddha se."
  },
  {
    type: "shabar",
    deity: "Kali",
    title: "Kalika Bhakt Raksha Shabar",
    preview: "ॐ कालिका खड्ग खप्पर लिये ठाढ़ी...",
    text: "ॐ कालिका खड्ग खप्पर लिये ठाढ़ी।\nजोत तेरी है निराली।\nपीती भर भर रक्त प्याली।\nकर भक्तों की रखवाली।\nन कर रक्षा तो महाबली भैरव की दुहाई॥",
    meaning: "Siddha Shabar granth ka Kali raksha-paath. Bhakt ki rakhvali. Himsa ke liye nahi.",
    note: "11 baar. Apni raksha maango, kisi par hamla mat maango."
  },
  {
    type: "shabar",
    deity: "Kali",
    title: "Chor Bandhan Griha Shabar",
    preview: "ॐ करालिनी स्वाहा। ॐ कपालिनी स्वाहा...",
    text: "ॐ करालिनी स्वाहा।\nॐ कपालिनी स्वाहा।\nचोर बंधय ठः ठः॥",
    meaning: "Siddha Shabar granth ka ghar-chor raksha. Dwar bandhkar chori-bhay ke liye.",
    note: "108 baar siddh. Prayog mein 7 baar. Ghar ke dwar par. Kisi ko nuksaan mat maango."
  },
  {
    type: "shabar",
    deity: "Kali",
    title: "Kalika Disha Bandhan Shabar",
    preview: "ॐ उत्तरा-खण्ड की काली उत्तर को बाँध...",
    text: "ॐ उत्तरा-खण्ड की काली।\nउत्तर को बाँध। पूरब को बाँध। पच्छिम को बाँध। दक्खिन को बाँध।\nआगा बाँध। पीछा बाँध। घर के चारों कोने बाँध।\nमेरी बाँध न बँधे तो काली माई की फिरै दुहाई।\nशब्द साँचा पिण्ड काँचा।\nफुरे मन्त्र ईश्वरो वाचा॥",
    meaning: "Siddha Shabar granth ka griha-suraksha. Charon disha aur char kone ki Kalika chauki.",
    note: "21 din tak 11 baar. Ghar ke beech. Keval japa. Abhichar-kriya mat karo."
  },
  {
    type: "shabar",
    deity: "Kali",
    title: "Kamakhya Garbha Raksha Shabar",
    preview: "ॐ नमो कामरूप कामाख्या देवी जल बांधूं...",
    text: "ॐ नमो कामरूप कामाख्या देवी।\nजल बांधूं जलवाई बांधूं। बांधूं जल के तीर।\nपांचों दूत कलुआ बांधूं। बांधूं हनुमंत वीर।\nसहदेव की धनुवा अर्जुन का बाण।\nरावण रण को थाम ले। नहीं तो हनुमंत की आन।\nशब्द सांचा पिंड काँचा।\nफुरो मंत्र ईश्वरो वाचा॥",
    meaning: "Siddha Shabar granth ka garbha-raksha. Kamakhya-Hanumant se garbh ki suraksha.",
    note: "21 baar. Shraddha se. Doctor ki salah ke saath. Himsa mat maango."
  },
  {
    type: "shabar",
    deity: "Nath",
    title: "Gorakhnath Garbha Raksha Shabar",
    preview: "ॐ नमः आदेश गुरु का। अंग में बांधि राख...",
    text: "ॐ नमः आदेश गुरु का।\nॐ नमः आदेश अंग में बांधि राख।\nनारसिंह यती मोसते बांधि राख।\nश्री गोरखनाथ कांखते बांधि राख।\nदृढासन देवी यह मन पवन काया को राख।\nथमे गर्भ ओ बांधे घाव।\nथामे माता पार्वती यह गंडो बांध ईश्वर यती।\nजब लग गंडो कंठ पर रहे।\nतब लग गर्भ काया में रहे।\nफुरो मंत्र ईश्वरो वाचा॥",
    meaning: "Siddha Shabar granth ka Nath garbha-raksha. Gorakhnath-Parvati se garbh ko kaaya mein rakhne ka paath.",
    note: "21 baar. Shraddha se. Doctor/dawa zaroori. Keval mantra par mat chhodna."
  },
  {
    type: "shabar",
    deity: "Nath",
    title: "Gorakhnath Nazar Chauki Shabar",
    preview: "ॐ नमो आदेश गुरु को। उलटंत गोरख पलटंत काया...",
    text: "ॐ नमो आदेश गुरु को।\nउलटंत गोरख पलटंत काया।\nभाग भाग जमदूत गोरखनाथ आया।\nलोहे की कोठरी वज्र ताली।\nआगे मेरे हरि बसे पाछे देव अनंत।\nरक्षा हे गोरखनाथ जी की चौकी है हनुमंत की॥",
    meaning: "Siddha Shabar granth ka nazar-raksha. Gorakhnath-Hanumant chauki se buri nazar aur jam-bhay door.",
    note: "11 baar. Sir se pair tak dheere. Bachchon ke liye vishesh. Himsa mat maango."
  },
  {
    type: "shabar",
    deity: "Bhairav",
    title: "Kalabhairav Kapili Jata Shabar",
    preview: "ॐ काला भैरव कपिली जटा। रात दिन खेले चोपटा...",
    text: "ॐ काला भैरव कपिली जटा।\nरात दिन खेले चोपटा।\nकाला भस्म और मसान।\nडाकिनी शाकिनी पट्ट सिहारी।\nजरख चढ़ती गोरख मारी।\nछोड़ि छोड़ि रे पापिनी बालक पराया।\nगुरु गोरखनाथ का परवान आया॥",
    meaning: "Siddha Shabar granth ka Bhairav-Gorakhnath paath. Raat, pret-baadha aur balak-raksha ke liye.",
    note: "21 baar. Shaam. Intention raksha ho. Kisi par hamla mat maango."
  },
  {
    type: "shabar",
    deity: "Nath",
    title: "Navnath Chaurasi Atma Raksha Shabar",
    preview: "ॐ ह्रीं श्रीं फट् स्वाहा। पर्वत हंस पर्वत स्वामी आत्मरक्षा सदा भवेत्...",
    text: "ॐ ह्रीं श्रीं फट् स्वाहा।\nपर्वत हंस पर्वत स्वामी आत्मरक्षा सदा भवेत्।\nनौ नाथ चौरासी सिद्धों की दुहाई फुरे॥",
    meaning: "Siddha Shabar granth. Navnath aur 84 siddhon ki duhai se atma-raksha.",
    note: "11 ya 21 baar. Face north. Satvik raho."
  },
  {
    type: "shabar",
    deity: "Hanuman",
    title: "Narsingh Pind Raksha Shabar",
    preview: "ॐ नमो आदेश गुरु को। प्रहलाद राखे पाताल राखे...",
    text: "ॐ नमो आदेश गुरु को।\nप्रहलाद राखे पाताल राखे।\nपाँव देवी जांघ राखे।\nकाली का मस्तक राखे महादेव जी।\nदेव दानव भूत-प्रेत डाकिनी शाकिनी मंडा ताप तिजारी जूड़ी एक पहरू दो पहरू सांझ सबेरे किया कराया उलट वाही के पिंड परे।\nइस पिंड कौ रक्षा श्री नरसिंह जी करे।\nशब्द सांचा पिंड काँचा।\nफुरो मंत्र ईश्वरो वाचा॥",
    meaning: "Siddha Shabar granth ka Narsingh pind-raksha. Tan ke dwar, taap aur pret-baadha ke liye.",
    note: "7 ya 21 baar. Shaam. Shraddha se. Himsa ki ichha mat rakho."
  },
  {
    type: "shabar",
    deity: "Kali",
    title: "Kali Jadu Tona Nashak Shabar",
    preview: "जय काली कलकत्ते वाली। जय हनुमान जय चालीस...",
    text: "जय काली कलकत्ते वाली।\nजय हनुमान जय चालीस, तेरा वचन न जाए खाली।\nजो करे सो पाए खाली।\nअपनी चीज अपना मिल जाए।\nइसी वक्त जादू-टोना यहाँ से भाग जाई।\nमारूं हांक गुरु गोरखनाथ की हांक।\nईश्वर गौरा पार्वती महादेव की दुहाई॥",
    meaning: "Siddha Shabar granth ka jadu-tona nashak. Kali-Hanuman-Gorakhnath se ghar ki baadha door.",
    note: "21 baar. Diya jalao. Apni cheez wapas, kisi ka nuksaan nahi."
  },
  {
    type: "shabar",
    deity: "Shiva",
    title: "Tona Nashak Disha Bandhan Shabar",
    preview: "सोम शनिश्वर भौम अगारी। चारि जटा वज्र के वार...",
    text: "सोम शनिश्वर भौम अगारी कहां चललि देई अंधारी।\nचारि जटा वज्र के वार दीनहि बांधो सोम दुवार।\nउत्तर बांधो कोइला दानव। दक्षिण बांधो क्षेत्रपाल।\nचारि विद्या बांधिके देउ विशेष।\nभंवर गए चलु उत्तरापथ योगिनी। चलु पाताल से वासुकी।\nरामचन्द्र के पायक अंजनी के चीर लागे।\nईश्वर महादेव गौरा पार्वती की दुहाई।\nजो टोना रहे एड़ी पिंड मंत्र पढ़ि फूंके टोना कइल न रहे॥",
    meaning: "Siddha Shabar granth ka tona-totka nashak. Charon disha bandhkar ghar ki baadha utarne ka paath.",
    note: "7 baar. Face north. Kisi par hamla mat maango."
  }
];

const mantraGrid = document.getElementById("mantraGrid");
const mantraModal = document.getElementById("mantraModal");
const mantraCount = document.getElementById("mantraCount");
let deityFilter = "all";
let searchQuery = "";

function renderMantras() {
  if (!mantraGrid) return;
  const compact = document.body.classList.contains("home-view");
  const query = searchQuery.trim().toLowerCase();
  const list = sacredTexts.filter((item) => {
    const deityOk = compact || deityFilter === "all" || item.deity === deityFilter;
    const searchOk = compact || !query || [item.title, item.deity, item.preview, item.meaning]
      .join(" ")
      .toLowerCase()
      .includes(query);
    return deityOk && searchOk;
  });
  const shown = compact ? list.slice(0, 6) : list;
  if (mantraCount) {
    mantraCount.textContent = compact ? "" : `${shown.length} sampoorna paath`;
  }
  if (!shown.length) {
    mantraGrid.innerHTML = "<p class='mantra-empty'>Is devta par koi shabar nahi mila. Doosra filter ya search try karo.</p>";
    return;
  }
  mantraGrid.innerHTML = shown.map((item) => `
    <button type="button" class="mantra-item" data-index="${sacredTexts.indexOf(item)}">
      <span class="mantra-item-top">
        <span class="tag type-shabar">SIDDH SHABAR</span>
        <span class="deity-name">${item.deity}</span>
      </span>
      <h3>${item.title}</h3>
      <p class="preview">${item.preview}</p>
      <span class="mantra-item-cta">Sampoorna paath padho →</span>
    </button>
  `).join("");
  mantraGrid.querySelectorAll(".mantra-item").forEach((btn) => {
    btn.addEventListener("click", () => openMantraModal(Number(btn.dataset.index)));
  });
}

let currentMantraText = "";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function mantraParagraph(text) {
  return String(text).replace(/\s*\n+\s*/g, " ").replace(/\s+/g, " ").trim();
}

function openMantraModal(i) {
  const item = sacredTexts[i];
  if (!item || !mantraModal) return;
  const paath = mantraParagraph(item.text);
  currentMantraText = paath;
  document.getElementById("mantraModalType").textContent = "SIDDH SHABAR";
  document.getElementById("mantraModalTitle").textContent = item.title;
  document.getElementById("mantraModalDeity").textContent = item.deity;
  document.getElementById("mantraModalText").innerHTML = `<p class="shloka">${escapeHtml(paath)}</p>`;
  document.getElementById("mantraModalMeaning").textContent = item.meaning;
  document.getElementById("mantraModalNote").textContent = item.note;
  mantraModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeMantraModal() {
  if (!mantraModal) return;
  mantraModal.hidden = true;
  document.body.style.overflow = "";
}

document.getElementById("deityFilters")?.querySelectorAll(".mantra-deity-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#deityFilters .mantra-deity-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    deityFilter = btn.dataset.deity || "all";
    renderMantras();
  });
});

document.getElementById("mantraSearch")?.addEventListener("input", (e) => {
  searchQuery = e.target.value || "";
  renderMantras();
});

document.getElementById("mantraModalClose")?.addEventListener("click", closeMantraModal);
mantraModal?.addEventListener("click", (e) => {
  if (e.target === mantraModal) closeMantraModal();
});
document.getElementById("copyMantra")?.addEventListener("click", async () => {
  const text = currentMantraText || document.getElementById("mantraModalText")?.textContent || "";
  try {
    await navigator.clipboard.writeText(text);
    showToast("Mantra copied.");
  } catch {
    showToast("Copy failed. Please select the text.");
  }
});

renderMantras();

const cards = [...document.querySelectorAll(".testi-card")];
let index = 0;

function highlight() {
  cards.forEach((card, i) => {
    card.style.opacity = i === index ? "1" : "0.85";
  });
}

document.getElementById("nextTesti")?.addEventListener("click", () => {
  index = (index + 1) % cards.length;
  cards[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  highlight();
});

document.getElementById("prevTesti")?.addEventListener("click", () => {
  index = (index - 1 + cards.length) % cards.length;
  cards[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  highlight();
});

if (document.querySelector(".page-section")) {
  const initialHash = (location.hash || "#home").slice(1);
  showPage(initialHash === "top" ? "home" : initialHash);
}
