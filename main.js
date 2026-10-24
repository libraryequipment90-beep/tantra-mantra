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

const initialHash = (location.hash || "#home").slice(1);
showPage(initialHash === "top" ? "home" : initialHash);
