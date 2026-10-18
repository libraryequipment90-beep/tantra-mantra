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
    type: "mantra",
    deity: "Ganesha",
    title: "Ganesh Mool Mantra",
    preview: "ॐ गं गणपतये नमः",
    text: "ॐ गं गणपतये नमः",
    meaning: "Salutations to Lord Ganesha, remover of obstacles. Chanted before any new beginning.",
    note: "Chant 108 times in the morning, facing east, after a bath."
  },
  {
    type: "stotra",
    deity: "Ganesha",
    title: "Sankat Nashan Ganesh Stotra",
    preview: "प्रणम्य शिरसा देवं गौरीपुत्रं विनायकम्...",
    text: "प्रणम्य शिरसा देवं गौरीपुत्रं विनायकम्।\nभक्तावासं स्मरेन्नित्यमायुःकामार्थसिद्धये॥\n\nप्रथमं वक्रतुण्डं च एकदन्तं द्वितीयकम्।\nतृतीयं कृष्णपिङ्गाक्षं गजवक्त्रं चतुर्थकम्॥\n\nलम्बोदरं पञ्चमं च षष्ठं विकटमेव च।\nसप्तमं विघ्नराजं च धूम्रवर्णं तथाष्टमम्॥\n\nनवमं भालचन्द्रं च दशमं तु विनायकम्।\nएकादशं गणपतिं द्वादशं तु गजाननम्॥\n\nद्वादशैतानि नामानि त्रिसन्ध्यं यः पठेन्नरः।\nन च विघ्नभयं तस्य सर्वसिद्धिकरः प्रभुः॥\n\nविद्यार्थी लभते विद्यां धनार्थी लभते धनम्।\nपुत्रार्थी लभते पुत्रान् मोक्षार्थी लभते गतिम्॥\n\nजपेद्गणपतिस्तोत्रं षड्भिर्मासैः फलं लभेत्।\nसंवत्सरेण सिद्धिं च लभते नात्र संशयः॥\n\nअष्टभ्यो ब्राह्मणेभ्यश्च लिखित्वा यः समर्पयेत्।\nतस्य विद्या भवेत्सर्वा गणेशस्य प्रसादतः॥",
    meaning: "Complete Sankat Nashan Ganesh Stotra — the twelve names of Ganesha with phalashruti for long life, learning, wealth and freedom from obstacles.",
    note: "Read every morning and evening, or for 21 days when starting new work. Tuesdays are especially sacred."
  },
  {
    type: "kavach",
    deity: "Ganesha",
    title: "Vakratunda Mahakaya",
    preview: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ...",
    text: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥\n\nॐ गं गणपतये नमः।\nॐ श्री महागणाधिपतये नमः।",
    meaning: "Complete Vakratunda shloka — the traditional opening prayer before any puja or work.",
    note: "Recite once at the start of every puja, journey or new work."
  },
  {
    type: "mantra",
    deity: "Shiva",
    title: "Panchakshari Mantra",
    preview: "ॐ नमः शिवाय",
    text: "ॐ नमः शिवाय",
    meaning: "I bow to Shiva, the auspicious one. The five-syllable mantra for purification and inner stillness.",
    note: "Chant 108 times with a rudraksha mala, preferably at dawn or dusk."
  },
  {
    type: "mantra",
    deity: "Shiva",
    title: "Maha Mrityunjaya Mantra",
    preview: "ॐ त्र्यम्बकं यजामहे...",
    text: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात्॥",
    meaning: "We worship the three-eyed Lord who nourishes all. May He free us from the bondage of death, not from immortality.",
    note: "Chant 108 times for health, protection from accidents and family wellbeing."
  },
  {
    type: "stotra",
    deity: "Shiva",
    title: "Shiva Panchakshara Stotra",
    preview: "नागेन्द्रहाराय त्रिलोचनाय...",
    text: "नागेन्द्रहाराय त्रिलोचनाय भस्माङ्गरागाय महेश्वराय।\nनित्याय शुद्धाय दिगम्बराय तस्मै नकाराय नमः शिवाय॥\n\nमन्दाकिनीसलिलचन्दनचर्चिताय नन्दीश्वरप्रमथनाथमहेश्वराय।\nमन्दारपुष्पबहुपुष्पसुपूजिताय तस्मै मकाराय नमः शिवाय॥\n\nशिवाय गौरीवदनाब्जबालसूर्याय दक्षाध्वरनाशकाय।\nश्रीनीलकण्ठाय वृषध्वजाय तस्मै शिकाराय नमः शिवाय॥\n\nवशिष्ठकुम्भोद्भवगौतमार्यमुनीन्द्रदेवार्चितशेखराय।\nचन्द्रार्कवैश्वानरलोचनाय तस्मै वकाराय नमः शिवाय॥\n\nयज्ञस्वरूपाय जटाधराय पिनाकहस्ताय सनातनाय।\nदिव्याय देवाय दिगम्बराय तस्मै यकाराय नमः शिवाय॥\n\nपञ्चाक्षरमिदं पुण्यं यः पठेच्छिवसंनिधौ।\nशिवलोकमवाप्नोति शिवेन सह मोदते॥",
    meaning: "Complete Shiva Panchakshara Stotra of Adi Shankaracharya — five verses on Na Ma Shi Va Ya, with phalashruti.",
    note: "Recite on Mondays and during Shravan after lighting a diya. Face north or east."
  },
  {
    type: "kavach",
    deity: "Shiva",
    title: "Shiva Kavach",
    preview: "ॐ नमः शिवाय सर्वाय देवदेवाय रम्भवे...",
    text: "ॐ नमः शिवाय।\nशिवो मे शिरसः पातु भालं चन्द्रकलाधरः।\nनेत्रे त्रिलोचनः पातु कर्णौ पातु महेश्वरः॥\nघ्राणं पातु गिरिशः स्यात् मुखं पातु वृषध्वजः।\nजिह्वां वेदस्वरूपः पातु कंठं नीलकण्ठः सदा॥\nस्कन्धौ शूलधरः पातु भुजौ पिनाकपाणिः।\nकरौ डमरुहस्तः पातु हृदयं शङ्करोऽवतु॥\nउदरं विश्वभोक्ता पातु नाभिं विश्वंभरो हरः।\nकटिं महादेवः पातु ऊरू त्रिपुरान्तकः॥\nजानुनी पशुपतिः पातु जङ्घे मृत्युञ्जयः सदा।\nगुल्फौ गिरीशः पातु पादौ दिगम्बरः स्वयम्॥\nसर्वाङ्गं शिव एव हि पातु भूमौ तथाऽम्बरे।\nभूतप्रेतपिशाचेभ्यो सर्वेभ्यो रक्ष मां शिव॥\nमृत्युंजय महादेव त्राहि मां शरणागतम्।\nॐ नमः शिवाय॥",
    meaning: "Complete Shiva Raksha Kavach covering the whole body from head to feet, with Mrityunjaya protection.",
    note: "Read at dawn or Pradosh after bath. Face north. A rudraksha mala and ghee diya are traditional."
  },
  {
    type: "mantra",
    deity: "Vishnu",
    title: "Vishnu Mool Mantra",
    preview: "ॐ नमो भगवते वासुदेवाय",
    text: "ॐ नमो भगवते वासुदेवाय",
    meaning: "Salutations to Bhagavan Vasudeva, the all-pervading protector.",
    note: "Chant 108 times on Thursdays or daily after lighting incense."
  },
  {
    type: "stotra",
    deity: "Vishnu",
    title: "Vishnu Shodashanam Stotra",
    preview: "शुक्लाम्बरधरं विष्णुं शशिवर्णं चतुर्भुजम्...",
    text: "शुक्लाम्बरधरं विष्णुं शशिवर्णं चतुर्भुजम्।\nप्रसन्नवदनं ध्यायेत् सर्वविघ्नोपशान्तये॥\n\nॐ विष्णवे नमः।\nॐ नारायणाय नमः।\nॐ कृष्णाय नमः।\nॐ वासुदेवाय नमः।\nॐ गोविन्दाय नमः।\nॐ मधुसूदनाय नमः।\nॐ त्रिविक्रमाय नमः।\nॐ वामनाय नमः।\nॐ श्रीधराय नमः।\nॐ हृषीकेशाय नमः।\nॐ पद्मनाभाय नमः।\nॐ दामोदराय नमः।\nॐ केशवाय नमः।\nॐ माधवाय नमः।\nॐ अनिरुद्धाय नमः।\nॐ पुरुषोत्तमाय नमः।\n\nयस्य स्मरणमात्रेण जन्मसंसारबन्धनात्।\nविमुच्यते नमस्तस्मै विष्णवे प्रभविष्णवे॥",
    meaning: "Complete Vishnu meditation shloka with the sixteen principal names used in daily Vishnu puja and before Sahasranama.",
    note: "Recite on Thursdays and Ekadashi after lighting incense. Face east."
  },
  {
    type: "kavach",
    deity: "Vishnu",
    title: "Narayana Raksha Kavach",
    preview: "ॐ नमो नारायणाय...",
    text: "ॐ नमो नारायणाय।\nनारायणः परं ब्रह्म तत्त्वं नारायणः परः।\nनारायणः परो ज्योतिरात्मा नारायणः परः॥\nनारायणः परो ध्याता ध्यानं नारायणः परः।\nयच्च किञ्चित् जगत् सर्वं दृश्यते श्रूयतेऽपि वा।\nअन्तर्बहिश्च तत्सर्वं व्याप्य नारायणः स्थितः॥\n\nनारायणः शिरः पातु नारायणो ललाटकम्।\nनारायणो दृशौ पातु नारायणः श्रुती तथा॥\nनारायणो मुखं पातु नारायणः कण्ठदेशकम्।\nनारायणः स्कन्धयुग्मं नारायणो भुजद्वयम्॥\nनारायणो हृदयं पातु नारायण उदरं तथा।\nनारायणः कटिं पातु नारायण ऊरुयुग्मकम्॥\nनारायणो जानुनी पातु नारायणोऽथ जङ्घिके।\nनारायणः पादयुग्मं सर्वाङ्गं नारायणः स्वयम्॥\nसर्वतो रक्षां करोतु मम नारायणः प्रभुः।",
    meaning: "Complete Narayana Raksha Kavach — Narayana as supreme Brahman, then protection of every limb of the body.",
    note: "Read at sunrise. Useful when travelling or when the home feels unsettled."
  },
  {
    type: "mantra",
    deity: "Durga",
    title: "Durga Beej Mantra",
    preview: "ॐ दुं दुर्गायै नमः",
    text: "ॐ दुं दुर्गायै नमः",
    meaning: "Salutations to Durga, the fierce mother who destroys fear and negativity.",
    note: "Chant 108 times during Navratri or on Tuesdays and Fridays."
  },
  {
    type: "stotra",
    deity: "Durga",
    title: "Durga Saptashloki",
    preview: "ॐ ज्ञानिनामपि चेतांसि देवी भगवती हि सा...",
    text: "ॐ ज्ञानिनामपि चेतांसि देवी भगवती हि सा।\nबलादाकृष्य मोहाय महामाया प्रयच्छति॥\n\nदुर्गे स्मृता हरसि भीतिमशेषजन्तोः\nस्वस्थैः स्मृता मतिमतीव शुभां ददासि।\nदारिद्र्यदुःखभयहारिणि का त्वदन्या\nसर्वोपकारकरणाय सदार्द्रचित्ता॥\n\nसर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके।\nशरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥\n\nशरणागतदीनार्तपरित्राणपरायणे।\nसर्वस्यार्तिहरे देवि नारायणि नमोऽस्तु ते॥\n\nसर्वस्वरूपे सर्वेशे सर्वशक्तिसमन्विते।\nभयेभ्यस्त्राहि नो देवि दुर्गे देवि नमोऽस्तु ते॥\n\nरोगानशेषानपहंसि तुष्टा\nरुष्टा तु कामान् सकलानभीष्टान्।\nत्वामाश्रितानां न विपन्नराणां\nत्वामाश्रिता ह्याश्रयतां प्रयान्ति॥\n\nसर्वाबाधाप्रशमनं त्रैलोक्यस्याखिलेश्वरि।\nएवमेव त्वया कार्यमस्मद्वैरिविनाशनम्॥",
    meaning: "Complete Durga Saptashloki — seven verses from Devi Mahatmya for fearlessness, protection and the grace of Narayani.",
    note: "Recite daily during Navratri or every Friday. Sit facing east with a lit diya."
  },
  {
    type: "kavach",
    deity: "Durga",
    title: "Devi Kavach",
    preview: "ॐ नमश्चण्डिकायै...",
    text: "ॐ नमश्चण्डिकायै।\nमार्कण्डेय उवाच।\nॐ यं दूरीकृत्य दुर्गायाश्चण्डिकायाश्च कीर्तनम्।\nभक्त्या शृणोति यो मर्त्यः स नरो नावसीदति॥\n\nशिरो मे पैठनी पातु ललाटे रत्नधारिणी।\nचक्षुषी खङ्गधारिणी पातु कर्णौ शङ्खधारिणी॥\nघ्राणं पातु गदाहस्ता मुखं पातु महाबला।\nजिह्वां पातु सरस्वती च कंठं चक्रधारिणी॥\nस्कन्धौ पातु महादेवी हृदयं सिंहवाहिनी।\nस्तनौ पातु महालक्ष्मीः नाभिं पातु महेश्वरी॥\nकटिं पातु भवानी मे ऊरू कात्यायनी तथा।\nजानुनी चण्डिका पातु जङ्घे काली सदाऽवतु॥\nगुल्फौ दुर्गा सदा पातु पादौ शैलसुताऽवतु।\nसर्वाङ्गं चण्डिका रक्षेत् भूतप्रेतभयं हर॥\nदुष्टग्रहान् विनाशय रक्ष रक्ष महेश्वरि।\nइदं कवचं दुर्गायाः पठितव्यं शुचिः सदा॥",
    meaning: "Complete Devi Raksha Kavach covering the whole body, traditionally read before Durga Saptashati.",
    note: "Sit facing east with a lit diya. Read after a bath, especially in Navratri."
  },
  {
    type: "mantra",
    deity: "Lakshmi",
    title: "Mahalakshmi Mantra",
    preview: "ॐ श्रीं महालक्ष्म्यै नमः",
    text: "ॐ श्रीं महालक्ष्म्यै नमः",
    meaning: "Salutations to Mahalakshmi, the mother of abundance, grace and right prosperity.",
    note: "Chant 108 times on Fridays, after cleaning the altar and offering a flower."
  },
  {
    type: "stotra",
    deity: "Lakshmi",
    title: "Mahalakshmi Ashtakam",
    preview: "नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते...",
    text: "नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते।\nशङ्खचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते॥\n\nनमस्ते गरुडारूढे कोलासुरभयंकरि।\nसर्वपापहरे देवि महालक्ष्मि नमोऽस्तु ते॥\n\nसर्वज्ञे सर्ववरदे सर्वदुष्टभयंकरि।\nसर्वदुःखहरे देवि महालक्ष्मि नमोऽस्तु ते॥\n\nसिद्धिबुद्धिप्रदे देवि भुक्तिमुक्तिप्रदायिनि।\nमन्त्रमूर्ते सदा देवि महालक्ष्मि नमोऽस्तु ते॥\n\nआद्यन्तरहिते देवि आद्यशक्तिमहेश्वरि।\nयोगजे योगसम्भूते महालक्ष्मि नमोऽस्तु ते॥\n\nस्थूलसूक्ष्ममहारौद्रे महाशक्ति महोदरे।\nमहापापहरे देवि महालक्ष्मि नमोऽस्तु ते॥\n\nपद्मासनस्थिते देवि परब्रह्मस्वरूपिणि।\nपरमेशि जगन्मातर्महालक्ष्मि नमोऽस्तु ते॥\n\nश्वेताम्बरधरे देवि नानालङ्कारभूषिते।\nजगत्स्थिते जगन्मातर्महालक्ष्मि नमोऽस्तु ते॥\n\nमहालक्ष्म्यष्टकं स्तोत्रं यः पठेद्भक्तिमान्नरः।\nसर्वसिद्धिमवाप्नोति राज्यं प्राप्नोति सर्वदा॥",
    meaning: "Complete Mahalakshmi Ashtakam of Indra — eight verses plus phalashruti for grace, prosperity and removal of sorrow.",
    note: "Recite on Diwali and every Friday evening after cleaning the altar."
  },
  {
    type: "kavach",
    deity: "Lakshmi",
    title: "Sri Lakshmi Kavach",
    preview: "ॐ श्रीं ह्रीं श्रीं कमले कमलालये...",
    text: "ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद।\nॐ श्रीं ह्रीं श्रीं महालक्ष्म्यै नमः॥\n\nलक्ष्मीः पातु शिरो मह्यं ललाटं कमलालया।\nनेत्रे पद्मावती पातु कर्णौ श्रीः सर्वमङ्गला॥\nनासिकां हरिप्रिया पातु मुखं पातु रमा सदा।\nकंठं इन्दिरिका पातु स्कन्धौ पातु धरणी तथा॥\nहृदयं कमला पातु नाभिं लोकमाताऽवतु।\nकटिं श्रीः पातु मे नित्यं ऊरू वैष्णवी तथा॥\nजानुनी च पद्महस्ता जङ्घे श्रीर्लोकविश्रुता।\nपादौ सिन्धुसुता पातु सर्वाङ्गं श्रीः सदाऽवतु॥\nगृहे लक्ष्मीः स्थिरा भूयात् धनधान्यसमाकुला।\nअलक्ष्मीर्नश्यतु सर्वा श्रीः प्रसीदतु मे सदा॥",
    meaning: "Complete Sri Lakshmi Raksha Kavach covering the whole body and inviting stable prosperity into the home.",
    note: "Keep the home clean. Do not chant only for greed; ask for honest livelihood."
  },
  {
    type: "mantra",
    deity: "Saraswati",
    title: "Saraswati Beej Mantra",
    preview: "ॐ ऐं सरस्वत्यै नमः",
    text: "ॐ ऐं सरस्वत्यै नमः",
    meaning: "Salutations to Saraswati, goddess of speech, learning, music and clear intellect.",
    note: "Chant 108 times before study, exams or any creative work. Wear white if possible."
  },
  {
    type: "stotra",
    deity: "Saraswati",
    title: "Saraswati Vandana",
    preview: "या कुन्देन्दुतुषारहारधवला...",
    text: "या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता\nया वीणावरदण्डमण्डितकरा या श्वेतपद्मासना।\nया ब्रह्माच्युतशङ्करप्रभृतिभिर्देवैः सदा वन्दिता\nसा मां पातु सरस्वती भगवती निःशेषजाड्यापहा॥\n\nशुक्लां ब्रह्मविचारसारपरमामाद्यां जगद्व्यापिनीं\nवीणापुस्तकधारिणीमभयदां जाड्यान्धकारापहाम्।\nहस्ते स्फाटिकमालिकां च दधतीं पद्मासने संस्थितां\nवन्दे तां परमेश्वरीं भगवतीं बुद्धिप्रदां शारदाम्॥\n\nसरस्वति नमस्तुभ्यं वरदे कामरूपिणि।\nविद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा॥\n\nया श्रीर्देवगणैः समस्तमुनिभिर्ध्याता हृदि पद्मजा\nया ब्रह्माच्युतशङ्करप्रभृतिभिर्देवैः सदा पूजिता।\nसा मां पातु सरस्वती भगवती निःशेषजाड्यापहा\nवागीशा च सरस्वती च वरदा ज्ञानप्रदा शारदा॥",
    meaning: "May the white-clad Goddess with veena and white lotus, worshipped by Brahma, Vishnu and Shiva, remove all dullness from me.",
    note: "Recite at the start of the school day or before writing."
  },
  {
    type: "mantra",
    deity: "Hanuman",
    title: "Hanuman Mool Mantra",
    preview: "ॐ हनुमते नमः",
    text: "ॐ हनुमते नमः",
    meaning: "Salutations to Hanuman, the embodiment of strength, devotion and fearlessness.",
    note: "Chant 108 times on Tuesdays and Saturdays."
  },
  {
    type: "stotra",
    deity: "Hanuman",
    title: "Hanuman Chalisa",
    preview: "श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि...",
    text: "दोहा\nश्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि।\nबरनउँ रघुबर बिमल जसु जो दायकु फल चारि॥\n\nबुद्धिहीन तनु जानिके सुमिरौं पवनकुमार।\nबल बुद्धि बिद्या देहु मोहिं हरहु कलेस बिकार॥\n\nचौपाई\nजय हनुमान ज्ञान गुण सागर।\nजय कपीस तिहुँ लोक उजागर॥\n\nराम दूत अतुलित बल धामा।\nअंजनि पुत्र पवनसुत नामा॥\n\nमहाबीर बिक्रम बजरंगी।\nकुमति निवार सुमति के संगी॥\n\nकंचन बरन बिराज सुबेसा।\nकानन कुंडल कुंचित केसा॥\n\nहाथ बज्र औ ध्वजा बिराजै।\nकाँधे मूँज जनेऊ साजै॥\n\nशंकर सुवन केसरी नंदन।\nतेज प्रताप महा जग बंदन॥\n\nबिद्यावान गुनी अति चातुर।\nराम काज करिबे को आतुर॥\n\nप्रभु चरित्र सुनिबे को रसिया।\nराम लखन सीता मन बसिया॥\n\nसूक्ष्म रूप धरि सियहिं दिखावा।\nबिकट रूप धरि लंक जरावा॥\n\nभीम रूप धरि असुर संहारे।\nरामचंद्र के काज संवारे॥\n\nलाय सजीवन लखन जियाये।\nश्रीरघुबीर हरषि उर लाये॥\n\nरघुपति कीन्ही बहुत बड़ाई।\nतुम मम प्रिय भरतहि सम भाई॥\n\nसहस बदन तुम्हरो जस गावैं।\nअस कहि श्रीपति कंठ लगावैं॥\n\nसनकादिक ब्रह्मादि मुनीसा।\nनारद सारद सहित अहीसा॥\n\nजम कुबेर दिगपाल जहाँ ते।\nकवि कोबिद कहि सके कहाँ ते॥\n\nतुम उपकार सुग्रीवहिं कीन्हा।\nराम मिलाय राज पद दीन्हा॥\n\nतुम्हरो मंत्र बिभीषण माना।\nलंकेश्वर भए सब जग जाना॥\n\nजुग सहस्र जोजन पर भानु।\nलील्यो ताहि मधुर फल जानू॥\n\nप्रभु मुद्रिका मेलि मुख माहीं।\nजलधि लाँघि गये अचरज नाहीं॥\n\nदुर्गम काज जगत के जेते।\nसुगम अनुग्रह तुम्हरे तेते॥\n\nराम दुआरे तुम रखवारे।\nहोत न आज्ञा बिनु पैसारे॥\n\nसब सुख लहै तुम्हारी सरना।\nतुम रक्षक काहू को डर ना॥\n\nआपन तेज सम्हारो आपै।\nतीनों लोक हाँक तें काँपै॥\n\nभूत पिशाच निकट नहिं आवै।\nमहाबीर जब नाम सुनावै॥\n\nनासै रोग हरै सब पीरा।\nजपत निरंतर हनुमत बीरा॥\n\nसंकट तें हनुमान छुड़ावै।\nमन क्रम बचन ध्यान जो लावै॥\n\nसब पर राम तपस्वी राजा।\nतिन के काज सकल तुम साजा॥\n\nऔर मनोरथ जो कोई लावै।\nसोई अमित जीवन फल पावै॥\n\nचारों जुग परताप तुम्हारा।\nहै परसिद्ध जगत उजियारा॥\n\nसाधु संत के तुम रखवारे।\nअसुर निकंदन राम दुलारे॥\n\nअष्ट सिद्धि नौ निधि के दाता।\nअस बर दीन जानकी माता॥\n\nराम रसायन तुम्हरे पासा।\nसदा रहो रघुपति के दासा॥\n\nतुम्हरे भजन राम को पावै।\nजनम जनम के दुख बिसरावै॥\n\nअंत काल रघुबर पुर जाई।\nजहाँ जन्म हरिभक्त कहाई॥\n\nऔर देवता चित्त न धरई।\nहनुमत सेइ सर्ब सुख करई॥\n\nसंकट कटै मिटै सब पीरा।\nजो सुमिरै हनुमत बलबीरा॥\n\nजय जय जय हनुमान गोसाईं।\nकृपा करहु गुरु देव की नाईं॥\n\nजो सत बार पाठ कर कोई।\nछूटहि बंदि महा सुख होई॥\n\nजो यह पढ़ै हनुमान चालीसा।\nहोय सिद्धि साखी गौरीसा॥\n\nतुलसीदास सदा हरि चेरा।\nकीजै नाथ हृदय महँ डेरा॥\n\nदोहा\nपवनतनय संकट हरन मंगल मूरति रूप।\nराम लखन सीता सहित हृदय बसहु सुर भूप॥",
    meaning: "Complete Hanuman Chalisa of Goswami Tulsidas — 40 chaupais with opening and closing dohas. Recite with devotion for strength, protection and the grace of Rama.",
    note: "Read the full Chalisa in the evening. Light a mustard-oil diya on Tuesdays. 108 recitations over 40 days is a traditional anushthan."
  },
  {
    type: "kavach",
    deity: "Hanuman",
    title: "Hanuman Kavach",
    preview: "ॐ श्रीहनुमते नमः...",
    text: "ॐ श्रीहनुमते रुद्रावतारायाऽञ्जनीसुताय महाबलाय नमः।\nहनुमान् मे शिरः पातु ललाटं च महाबलः।\nनेत्रे पातु महावीरः कर्णौ पातु महायशाः॥\nनासिकां पातु वायुपुत्रो मुखं पातु महामतिः।\nकंठं पातु रामभक्तः स्कन्धौ वज्रदेहकः॥\nभुजै पातु महातेजा हृदयं सीताशोकहृत्।\nउदरं पातु पवनात्मजः कटिं लंकादहकः॥\nऊरू पातु महाजङ्घः जानुनी च महाबलः।\nपादौ सागरलङ्घकः सर्वाङ्गं मारुतिः स्वयम्॥\nभूतप्रेतपिशाचानां डाकिनीशाकिनीगणम्।\nसर्वान् नाशय नाशय हनुमान् मे सदाऽवतु॥",
    meaning: "Complete Hanuman Raksha Kavach for night travel, black-magic fear, restlessness and protection of the whole body.",
    note: "Read on Tuesday or Saturday evening after lighting a mustard-oil diya."
  },
  {
    type: "mantra",
    deity: "Krishna",
    title: "Krishna Maha Mantra",
    preview: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे...",
    text: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे।\nहरे राम हरे राम राम राम हरे हरे॥",
    meaning: "The sixteen-name maha mantra, calling upon Hari, Krishna and Rama for devotion and inner joy.",
    note: "Chant aloud or softly, 108 times or more. Any time of day is acceptable."
  },
  {
    type: "stotra",
    deity: "Krishna",
    title: "Madhurashtakam",
    preview: "अधरं मधुरं वदनं मधुरम्...",
    text: "अधरं मधुरं वदनं मधुरं नयनं मधुरं हसितं मधुरम्।\nहृदयं मधुरं गमनं मधुरं मधुराधिपतेरखिलं मधुरम्॥\n\nवचनं मधुरं चरितं मधुरं वसनं मधुरं वलितं मधुरम्।\nचलितं मधुरं भ्रमितं मधुरं मधुराधिपतेरखिलं मधुरम्॥\n\nवेणुर्मधुरो रेणुर्मधुरः पाणिर्मधुरः पादौ मधुरौ।\nनृत्यं मधुरं सख्यं मधुरं मधुराधिपतेरखिलं मधुरम्॥\n\nगीतं मधुरं पीतं मधुरं भुक्तं मधुरं सुप्तं मधुरम्।\nरूपं मधुरं तिलकं मधुरं मधुराधिपतेरखिलं मधुरम्॥\n\nकरणं मधुरं तरणं मधुरं हरणं मधुरं रमणं मधुरम्।\nवमितं मधुरं शमितं मधुरं मधुराधिपतेरखिलं मधुरम्॥\n\nगुञ्जा मधुरा माला मधुरा यमुना मधुरा वीची मधुरा।\nसलिलं मधुरं कमलं मधुरं मधुराधिपतेरखिलं मधुरम्॥\n\nगोपी मधुरा लीला मधुरा युक्तं मधुरं मुक्तं मधुरम्।\nदृष्टं मधुरं शिष्टं मधुरं मधुराधिपतेरखिलं मधुरम्॥\n\nगोपा मधुरा गावो मधुरा यष्टिर्मधुरा सृष्टिर्मधुरा।\nदलितं मधुरं फलितं मधुरं मधुराधिपतेरखिलं मधुरम्॥",
    meaning: "Complete Madhurashtakam of Vallabhacharya — eight verses declaring that everything of Krishna, the Lord of sweetness, is sweet.",
    note: "Sing in the evening after lighting incense. Keep the mood gentle, not hurried."
  },
  {
    type: "mantra",
    deity: "Kali",
    title: "Kali Beej Mantra",
    preview: "ॐ क्रां क्रीं क्रौं सः कालिकायै नमः",
    text: "ॐ क्रां क्रीं क्रौं सः कालिकायै नमः",
    meaning: "Salutations to Kali, the mother who cuts through darkness, ego and hidden fear.",
    note: "Chant with a calm mind. Do not treat this as a weapon against others. Prefer Amavasya or midnight only under guidance."
  },
  {
    type: "stotra",
    deity: "Kali",
    title: "Kali Stuti",
    preview: "ॐ कालिकायै विद्महे श्मशानवासिन्यै धीमहि...",
    text: "ॐ कालिकायै विद्महे श्मशानवासिन्यै धीमहि।\nतन्नो काली प्रचोदयात्॥\n\nकृपां कुरु जगन्मातर्मां हि पाहि महेश्वरि।\nअज्ञानतिमिरान्धस्य ज्ञानाञ्जनशलाकया॥\nचक्षुरुन्मीलितं येन तस्मै श्रीगुरवे नमः।\n\nकालि कालि महाकालि कालिके परमेश्वरि।\nसर्वसिद्धिप्रदे देवि नारायणि नमोऽस्तु ते॥\n\nरक्ष रक्ष महादेवि दुष्टग्रहविनाशिनि।\nभूतप्रेतपिशाचेभ्यो त्राहि मां शरणागतम्॥",
    meaning: "Complete short Kali Stuti with Gayatri, guru vandana and a protective closing verse.",
    note: "Recite with a calm mind. Prefer Amavasya or evening. Do not use as a weapon against anyone."
  },
  {
    type: "kavach",
    deity: "Kali",
    title: "Kalika Kavach",
    preview: "ॐ क्रीं कालिकायै नमः...",
    text: "ॐ क्रीं कालिकायै नमः।\nकाली मे मस्तकं पातु ललाटं दक्षिणा तथा।\nनेत्रे पातु महाकाली कर्णौ पातु भयंकरी॥\nनासिकां भद्रकाली पातु मुखं पातु करालिनी।\nकंठं पातु महादेवी स्कन्धौ श्मशानवासिनि॥\nहृदयं कालिका पातु नाभिं चण्डी सदाऽवतु।\nकटिं पातु महामाया ऊरू भैरवनायिका॥\nजानुनी पातु योगेशी जङ्घे पातु महेश्वरी।\nपादौ पातु जगद्धात्री सर्वाङ्गं कालिका स्वयम्॥\nभूतप्रेतपिशाचानां डाकिनीशाकिनीगणम्।\nसर्वान् नाशय नाशय काली मे सदाऽवतु॥",
    meaning: "Complete Kalika Raksha Kavach covering the whole body and asking protection from pret, pishach and fear.",
    note: "Use only with faith, not anger. Sit facing north. Light a diya."
  },
  {
    type: "mantra",
    deity: "Surya",
    title: "Gayatri Mantra",
    preview: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यम्...",
    text: "ॐ भूर्भुवः स्वः\nतत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि\nधियो यो नः प्रचोदयात्॥",
    meaning: "We meditate on the divine radiance of Savitar, the Sun. May that light inspire and guide our intellect.",
    note: "Chant at sunrise facing east, 3, 11 or 108 times. Sit with a straight spine."
  },
  {
    type: "stotra",
    deity: "Surya",
    title: "Aditya Hridaya Stotra",
    preview: "आदित्यः सविता सूर्यः खगः पूषा गभस्तिमान्...",
    text: "ततो युद्धपरिश्रान्तं समरे चिन्तया स्थितम्।\nरावणं चाग्रतो दृष्ट्वा युद्धाय समुपस्थितम्॥\nदैवतैश्च समागम्य द्रष्टुमभ्यागतो रणम्।\nउपागम्याब्रवीद्राममगस्त्यो भगवानृषिः॥\n\nराम राम महाबाहो शृणु गुह्यं सनातनम्।\nयेन सर्वानरीन् वत्स समरे विजयिष्यसि॥\nआदित्यहृदयं पुण्यं सर्वशत्रुविनाशनम्।\nजयावहं जपेन्नित्यमक्षयं परमं शिवम्॥\n\nसर्वमङ्गलमाङ्गल्यं सर्वपापप्रणाशनम्।\nचिन्तशोकप्रशमनमायुर्वर्धनमुत्तमम्॥\nरश्मिमन्तं समुद्यन्तं देवासुरनमस्कृतम्।\nपूजयस्व विवस्वन्तं भास्करं भुवनेश्वरम्॥\n\nसर्वदेवात्मको ह्येष तेजस्वी रश्मिभावनः।\nएष देवासुरगणाँल्लोकान् पाति गभस्तिभिः॥\nएष ब्रह्मा च विष्णुश्च शिवः स्कन्दः प्रजापतिः।\nमहेंद्रो धनदः कालो यमः सोमो ह्यपां पतिः॥\n\nपितरो वसवः साध्या ह्यश्विनौ मरुतो मनुः।\nवायुर्वह्निः प्रजाप्राण ऋतुकर्ता प्रभाकरः॥\nआदित्यः सविता सूर्यः खगः पूषा गभस्तिमान्।\nसुवर्णसदृशो भानुर्हिरण्यरेता दिवाकरः॥\n\nहरिदश्वः सहस्रार्चिः सप्तसप्तिर्मरीचिमान्।\nतिमिरोन्मथनः शम्भुस्त्वष्टा मार्ताण्ड अंशुमान्॥\nहिरण्यगर्भः शिशिरस्तपनो भास्करो रविः।\nअग्निगर्भोऽदितेः पुत्रः शङ्खः शिशिरनाशनः॥\n\nव्योमनाथस्तमोभेदी ऋग्यजुःसामपारगः।\nघनवृष्टिरपां मित्रो विन्ध्यवीथीप्लवङ्गमः॥\nआतपी मण्डली मृत्युः पिङ्गलः सर्वतापनः।\nकविर्विश्वो महातेजा रक्तः सर्वभवोद्भवः॥\n\nनक्षत्रग्रहताराणामधिपो विश्वभावनः।\nतेजसामपि तेजस्वी द्वादशात्मन् नमोऽस्तु ते॥\nनमः पूर्वाय गिरये पश्चिमायाद्रये नमः।\nज्योतिर्गणानां पतये दिनाधिपतये नमः॥\n\nजयाय जयभद्राय हर्यश्वाय नमो नमः।\nनमो नमः सहस्रांशो आदित्याय नमो नमः॥\nनम उग्राय वीराय सारङ्गाय नमो नमः।\nनमः पद्मप्रबोधाय मार्ताण्डाय नमो नमः॥\n\nब्रह्मेशानाच्युतेशाय सूर्यायादित्यवर्चसे।\nभास्वते सर्वभक्षाय रौद्राय वपुषे नमः॥\nतमोघ्नाय हिमघ्नाय शत्रुघ्नायामितात्मने।\nकृतघ्नघ्नाय देवाय ज्योतिषां पतये नमः॥\n\nतप्तचामीकराभाय हरये विश्वकर्मणे।\nनमस्तमोऽभिनिघ्नाय रुचये लोकसाक्षिणे॥\nनाशयत्येष वै भूतं तदेव सृजति प्रभुः।\nपायत्येष तपत्येष वर्षत्येष गभस्तिभिः॥\n\nएष सुप्तेषु जागर्ति भूतेषु परिनिष्ठितः।\nएष एवाग्निहोत्रं च फलं चैवाग्निहोत्रिणाम्॥\nवेदाश्च क्रतवो यज्ञाः क्रतूंनां फलमेव च।\nयानि कृत्यानि लोकेषु सर्व एष रविः प्रभुः॥\n\nएनमापत्सु कृच्छ्रेषु कान्तारेषु भयेषु च।\nकीर्तयन् पुरुषः कश्चिन्नावशीदति राघव॥\nपूजयस्वैनमेकाग्रो देवदेवं जगत्पतिम्।\nएतत् त्रिगुणितं जप्त्वा युद्धेषु विजयिष्यसि॥\n\nअस्मिन् क्षणे महाबाहो रावणं त्वं वधिष्यसि।\nएवमुक्त्वा तदागस्त्यो जगाम च यथागतम्॥\nएतच्छ्रुत्वा महातेजा नष्टशोकोऽभवत्तदा।\nधारयामास सुप्रीतो राघवः प्रयतात्मवान्॥\n\nआदित्यं प्रेक्ष्य जप्त्वेदं परं हर्षमवाप्तवान्।\nत्रिराचम्य शुचिर्भूत्वा धनुरादाय वीर्यवान्॥\nआदित्यं प्रणतो नित्यं सर्वरोगभयापहम्।\nसर्वपापहरं देवं सर्वरक्षां करोतु मे॥",
    meaning: "Complete Aditya Hridaya Stotra from Valmiki Ramayana — Agastya's teaching to Rama, the names of Surya and the phalashruti for victory, health and fearlessness.",
    note: "Offer water to the rising sun (arghya) and then recite. Sunday mornings are especially suitable."
  },
  {
    type: "mantra",
    deity: "Rama",
    title: "Rama Taraka Mantra",
    preview: "ॐ श्री रामाय नमः",
    text: "ॐ श्री रामाय नमः\n\nश्री राम जय राम जय जय राम",
    meaning: "Salutations to Rama, the taraka (liberating) name. The shorter 'Shri Ram Jai Ram' is used for continuous japa.",
    note: "Chant throughout the day, especially in times of fear, travel or grief."
  },
  {
    type: "stotra",
    deity: "Rama",
    title: "Ram Stuti",
    preview: "श्री रामचन्द्र कृपालु भजु मन...",
    text: "श्री रामचन्द्र कृपालु भजु मन हरण भवभय दारुणम्।\nनवकंज लोचन कंज मुख कर कंज पद कंजारुणम्॥\n\nकन्दर्प अगणित अमित छवि नव नील नीरज सुन्दरम्।\nपट पीत मानहु तड़ित रुचि शुचि नौमि जनक सुतावरम्॥\n\nभजु दीन बन्धु दिनेश दानव दैत्य वंश निकन्दनम्।\nरघुनन्द आनन्द कन्द कोशल चन्द्र दशरथ नन्दनम्॥\n\nसिर मुकुट कुण्डल तिलक चारु उदारु अङ्ग विभूषणम्।\nआजानुभुज शर चाप धर संग्राम जित खरदूषणम्॥\n\nइति वदति तुलसीदास शङ्कर शेष मुनि मन रञ्जनम्।\nमम हृदय कंज निवास कुरु कामादि खल दल भञ्जनम्॥",
    meaning: "Complete Sri Ramachandra Kripalu Bhaj Man of Tulsidas — five verses of Ram stuti for removing worldly fear.",
    note: "Sing in the evening. Rama Navami and Tuesdays are traditional days."
  },
  {
    type: "stotra",
    deity: "Rama",
    title: "Rama Raksha Stotra",
    preview: "चरितं रघुनाथस्य शतकोटि प्रविस्तरम्...",
    text: "विनियोगः\nअस्य श्रीरामरक्षास्तोत्रमन्त्रस्य बुधकौशिक ऋषिः।\nश्रीसीतारामचन्द्रो देवता। अनुष्टुप् छन्दः। सीता शक्तिः।\nश्रीमान् हनुमान् कीलकम्। श्रीसीतारामचन्द्रप्रीत्यर्थे रामरक्षास्तोत्रजपे विनियोगः॥\n\nअथ ध्यानम्\nध्यायेदाजानुबाहुं धृतशरधनुषं बद्धपद्मासनस्थं\nपीतं वासो वसानं नवकमलदलस्पर्धिनेत्रं प्रसन्नम्।\nवामाङ्कारूढसीतामुखकमलमिलल्लोचनं नीरदाभं\nनानालङ्कारदीप्तं दधतमुरुजटामण्डलं रामचन्द्रम्॥\n\nचरितं रघुनाथस्य शतकोटिप्रविस्तरम्।\nएकैकमक्षरं पुंसां महापातकनाशनम्॥१॥\n\nध्यात्वा नीलोत्पलश्यामं रामं राजीवलोचनम्।\nजानकीलक्ष्मणोपेतं जटामुकुटमण्डितम्॥२॥\n\nसासितूणधनुर्बाणपाणिं नक्तञ्चरान्तकम्।\nस्वलीलया जगत्त्रातुमाविर्भूतमजं विभुम्॥३॥\n\nरामरक्षां पठेत् प्राज्ञः पापघ्नीं सर्वकामदाम्।\nशिरो मे राघवः पातु भालं दशरथात्मजः॥४॥\n\nकौसल्येयो दृशौ पातु विश्वामित्रप्रियः श्रुती।\nघ्राणं पातु मखत्राता मुखं सौमित्रिवत्सलः॥५॥\n\nजिह्वां विद्यानिधिः पातु कण्ठं भरतवन्दितः।\nस्कन्धौ दिव्यायुधः पातु भुजौ भग्नेशकार्मुकः॥६॥\n\nकरौ सीतापतिः पातु हृदयं जामदग्न्यजित्।\nमध्यं पातु खरध्वंसी नाभिं जाम्बवदाश्रयः॥७॥\n\nसुग्रीवेशः कटी पातु सक्थिनी हनुमत्प्रभुः।\nऊरू रघूत्तमः पातु रक्षःकुलविनाशकृत्॥८॥\n\nजानुनी सेतुकृत् पातु जङ्घे दशमुखान्तकः।\nपादौ विभीषणश्रीदः पातु रामोऽखिलं वपुः॥९॥\n\nएतां रामबलोपेतां रक्षां यः सुकृती पठेत्।\nस चिरायुः सुखी पुत्री विजयी विनयी भवेत्॥१०॥\n\nपातालभूतलव्योमचारिणश्छद्मचारिणः।\nन द्रष्टुमपि शक्तास्ते रक्षितं रामनामभिः॥११॥\n\nरामेति रामभद्रेति रामचन्द्रेति वा स्मरन्।\nनरो न लिप्यते पापैर्भुक्तिं मुक्तिं च विन्दति॥१२॥\n\nजगज्जैत्रैकमन्त्रेण रामनाम्नाभिरक्षितम्।\nयः कण्ठे धारयेत्तस्य करस्थाः सर्वसिद्धयः॥१३॥\n\nवज्रपञ्जरनामेदं यो रामकवचं स्मरेत्।\nअव्याहताज्ञः सर्वत्र लभते जयमङ्गलम्॥१४॥\n\nआदिष्टवान् यथा स्वप्ने रामरक्षामिमां हरः।\nतथा लिखितवान् प्रातः प्रबुद्धो बुधकौशिकः॥१५॥\n\nआरामः कल्पवृक्षाणां विरामः सकलापदाम्।\nअभिरामस्त्रिलोकानां रामः श्रीमान् स नः प्रभुः॥१६॥\n\nतरुणौ रूपसम्पन्नौ सुकुमारौ महाबलौ।\nपुण्डरीकविशालाक्षौ चीरकृष्णाजिनाम्बरौ॥१७॥\n\nफलमूलाशिनौ दान्तौ तापसौ ब्रह्मचारिणौ।\nपुत्रौ दशरथस्यैतौ भ्रातरौ रामलक्ष्मणौ॥१८॥\n\nशरण्यौ सर्वसत्त्वानां श्रेष्ठौ सर्वधनुष्मताम्।\nरक्षःकुलनिहन्तारौ त्रायेतां नो रघूत्तमौ॥१९॥\n\nआत्तसज्जधनुषा विषुस्पृशा वक्षया शुगनिषङ्गसङ्गिनौ।\nरक्षणाय मम रामलक्ष्मणावग्रतः पथि सदैव गच्छताम्॥२०॥\n\nसन्नद्धः कवची खड्गी चापबाणधरो युवा।\nगच्छन् मनोरथान् नश्च रामः पातु सलक्ष्मणः॥२१॥\n\nरामो दाशरथी शूरो लक्ष्मणानुचरो बली।\nकाकुत्स्थः पुरुषः पूर्णः कौसल्येयो रघूत्तमः॥२२॥\n\nवेदान्तवेद्यो यज्ञेशः पुराणपुरुषोत्तमः।\nजानकीवल्लभः श्रीमानप्रमेयपराक्रमः॥२३॥\n\nइत्येतानि जपन् नित्यं मद्भक्तः श्रद्धयान्वितः।\nअश्वमेधाधिकं पुण्यं सम्प्राप्नोति न संशयः॥२४॥\n\nरामं दुर्वादलश्यामं पद्माक्षं पीतवाससम्।\nस्तुवन्ति नामभिर्दिव्यैर्न ते संसारिणो नराः॥२५॥\n\nरामं लक्ष्मणपूर्वजं रघुवरं सीतापतिं सुन्दरं\nकाकुत्स्थं करुणार्णवं गुणनिधिं विप्रप्रियं धार्मिकम्।\nराजेन्द्रं सत्यसन्धं दशरथतनयं श्यामलं शान्तमूर्तिं\nवन्दे लोकाभिरामं रघुकुलतिलकं राघवं रावणारिम्॥२६॥\n\nरामाय रामभद्राय रामचन्द्राय वेधसे।\nरघुनाथाय नाथाय सीतायाः पतये नमः॥२७॥\n\nश्रीराम राम रघुनन्दन राम राम\nश्रीराम राम भरताग्रज राम राम।\nश्रीराम राम रणकर्कश राम राम\nश्रीराम राम शरणं भव राम राम॥२८॥\n\nश्रीरामचन्द्रचरणौ मनसा स्मरामि\nश्रीरामचन्द्रचरणौ वचसा गृणामि।\nश्रीरामचन्द्रचरणौ शिरसा नमामि\nश्रीरामचन्द्रचरणौ शरणं प्रपद्ये॥२९॥\n\nमाता रामो मत्पिता रामचन्द्रः।\nस्वामी रामो मत्सखा रामचन्द्रः।\nसर्वस्वं मे रामचन्द्रो दयालुः।\nनान्यं जाने नैव जाने न जाने॥३०॥\n\nदक्षिणे लक्ष्मणो यस्य वामे च जनकात्मजा।\nपुरतो मारुतिर्यस्य तं वन्दे रघुनन्दनम्॥३१॥\n\nलोकाभिरामं रणरङ्गधीरं राजीवनेत्रं रघुवंशनाथम्।\nकारुण्यरूपं करुणाकरं तं श्रीरामचन्द्रं शरणं प्रपद्ये॥३२॥\n\nमनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्।\nवातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥३३॥\n\nकूजन्तं राम रामेति मधुरं मधुराक्षरम्।\nआरुह्य कविताशाखां वन्दे वाल्मीकिकोकिलम्॥३४॥\n\nआपदामपहर्तारं दातारं सर्वसम्पदाम्।\nलोकाभिरामं श्रीरामं भूयो भूयो नमाम्यहम्॥३५॥\n\nभर्जनं भवबीजानामर्जनं सुखसम्पदाम्।\nतर्जनं यमदूतानां राम रामेति गर्जनम्॥३६॥\n\nरामो राजमणिः सदा विजयते रामं रमेशं भजे\nरामेणाभिहता निशाचरचमू रामाय तस्मै नमः।\nरामान्नास्ति परायणं परतरं रामस्य दासोऽस्म्यहं\nरामे चित्तलयः सदा भवतु मे भो राम मामुद्धर॥३७॥\n\nराम रामेति रामेति रमे रामे मनोरमे।\nसहस्रनाम तत्तुल्यं रामनाम वरानने॥३८॥",
    meaning: "Complete Shri Ram Raksha Stotram of Budha Kaushika — viniyoga, dhyana and 38 verses for protection, long life, victory and the grace of Sita-Ram.",
    note: "Read daily after bath facing east. Rama Navami and Tuesdays are especially sacred."
  },
  {
    type: "kavach",
    deity: "Rama",
    title: "Rama Raksha Kavach",
    preview: "शिरो मे राघवः पातु भालं दशरथात्मजः...",
    text: "रामरक्षां पठेत् प्राज्ञः पापघ्नीं सर्वकामदाम्।\nशिरो मे राघवः पातु भालं दशरथात्मजः॥४॥\n\nकौसल्येयो दृशौ पातु विश्वामित्रप्रियः श्रुती।\nघ्राणं पातु मखत्राता मुखं सौमित्रिवत्सलः॥५॥\n\nजिह्वां विद्यानिधिः पातु कण्ठं भरतवन्दितः।\nस्कन्धौ दिव्यायुधः पातु भुजौ भग्नेशकार्मुकः॥६॥\n\nकरौ सीतापतिः पातु हृदयं जामदग्न्यजित्।\nमध्यं पातु खरध्वंसी नाभिं जाम्बवदाश्रयः॥७॥\n\nसुग्रीवेशः कटी पातु सक्थिनी हनुमत्प्रभुः।\nऊरू रघूत्तमः पातु रक्षःकुलविनाशकृत्॥८॥\n\nजानुनी सेतुकृत् पातु जङ्घे दशमुखान्तकः।\nपादौ विभीषणश्रीदः पातु रामोऽखिलं वपुः॥९॥\n\nएतां रामबलोपेतां रक्षां यः सुकृती पठेत्।\nस चिरायुः सुखी पुत्री विजयी विनयी भवेत्॥१०॥",
    meaning: "The raksha-kavach portion of Shri Ram Raksha Stotram — Rama's protection placed on every limb of the body.",
    note: "Read after bath facing east. This is the main household raksha kavach in many families."
  },
  {
    type: "mantra",
    deity: "Bhairav",
    title: "Kalabhairav Beej Mantra",
    preview: "ॐ ह्रीं बं बटुकाय अपदुधरणाय कुरु कुरु बटुकाय ह्रीं",
    text: "ॐ ह्रीं बं बटुकाय अपदुधरणाय कुरु कुरु बटुकाय ह्रीं।\n\nॐ भैरवाय नमः",
    meaning: "Tantra beej of Batuk / Kala Bhairav for protection from sudden danger, black magic and night fear.",
    note: "Chant 108 times on Sundays or Ashtami after sunset. Light a mustard-oil diya. Do not use to harm anyone."
  },
  {
    type: "stotra",
    deity: "Bhairav",
    title: "Kalabhairava Ashtakam",
    preview: "देवराजसेव्यमानपावनीयप्रभवं...",
    text: "देवराजसेव्यमानपावनाङ्घ्रिपङ्कजं\nव्यालयज्ञसूत्रमिन्दुशेखरं कृपाकरम्।\nनारदादियोगिवृन्दवन्दितं दिगम्बरं\nकाशिकापुराधिनाथकालभैरवं भजे॥\n\nभानुकोटिभास्वरं भवब्धितारकं परं\nनीलकण्ठमीप्सितार्थदायकं त्रिलोचनम्।\nकालकालमम्बुजाक्षमक्षरं महाबलं\nकाशिकापुराधिनाथकालभैरवं भजे॥\n\nशूलटङ्कपाशदण्डपाणिमादिकारणं\nश्यामकायमादिकालमक्षराकृतिम्।\nभीमविक्रमं प्रभुं विचित्रताण्डवप्रियं\nकाशिकापुराधिनाथकालभैरवं भजे॥\n\nभुक्तिमुक्तिदायकं प्रशस्तचारुविग्रहं\nभक्तवत्सलं स्थितं समस्तलोकविग्रहम्।\nविनिक्वणन्मनोज्ञहेमकिङ्किणीलसत्कटिं\nकाशिकापुराधिनाथकालभैरवं भजे॥\n\nधर्मसेतुपालकं त्वधर्ममार्गनाशकं\nकर्मपाशमोचकं सुशर्मदायकं विभुम्।\nस्वर्णवर्णशेषपाशशोभिताङ्गमण्डलं\nकाशिकापुराधिनाथकालभैरवं भजे॥\n\nरत्नपादुकाप्रभाभिरामपादयष्टिकं\nनित्यमद्वितीयमिष्टदैवतं निरञ्जनम्।\nमृत्युदर्पनाशनं करालदंष्ट्रमोक्षणं\nकाशिकापुराधिनाथकालभैरवं भजे॥\n\nअट्टहासभिन्नपद्मजाण्डकोशसंततिं\nदृष्टिपातनष्टपापजालमुग्रशासनम्।\nअष्टसिद्धिदायकं कपालमालिकाधरं\nकाशिकापुराधिनाथकालभैरवं भजे॥\n\nभूतसङ्घनायकं विशालकीर्तिदायकं\nकाशिवासलोकपुण्यपापशोधकं विभुम्।\nनीतिमार्गकोविदं पुरातनं जगत्पतिं\nकाशिकापुराधिनाथकालभैरवं भजे॥\n\nकालभैरवाष्टकं पठन्ति ये मनोहरं\nज्ञानमुक्तिसाधनं विचित्रपुण्यवर्धनम्।\nशोकमोहदैन्यलोभकोपतापनाशनं\nप्रयान्ति कालभैरवांघ्रिसन्निधिं ध्रुवम्॥",
    meaning: "Complete Kalabhairava Ashtakam of Adi Shankaracharya — eight verses to Kala Bhairava of Kashi, with phalashruti.",
    note: "Recite on Sunday evening or Bhairav Ashtami. Keep the altar simple and clean."
  },
  {
    type: "kavach",
    deity: "Bhairav",
    title: "Bhairav Raksha Kavach",
    preview: "ॐ भैरवः पातु मे शीर्षं...",
    text: "ॐ नमः कालाय भैरवाय।\nभैरवः पातु मे शीर्षं ललाटं कालभैरवः।\nनेत्रे पातु महाकालः कर्णौ पातु भयङ्करः॥\nनासिकां धूम्रलोचनः पातु वक्त्रं कपालभृत्।\nकंठं पातु महावीरः स्कन्धौ दण्डधरः सदा॥\nहृदयं भैरवो रक्षेत् नाभिं क्षेत्रपालकः।\nकटिं पातु महायोगी ऊरू पातु महाबलः॥\nजानुनी पातु सर्वज्ञः जङ्घे पातु महाद्युतिः।\nपादौ पातु महातेजाः सर्वाङ्गं भैरवः स्वयम्॥\nभूतप्रेतपिशाचानां डाकिनीशाकिनीगणम्।\nसर्वान् नाशय नाशय भैरवो मे सदाऽवतु॥",
    meaning: "Raksha kavach of Bhairav over the whole body, asking protection from unseen fear, pret-pishach and harmful night energy.",
    note: "Read after lighting a diya. If fear is intense, combine with personal guidance."
  },
  {
    type: "mantra",
    deity: "Baglamukhi",
    title: "Baglamukhi Beej Mantra",
    preview: "ॐ ह्लीं बगलामुखि सर्वदुष्टानां वाचं मुखं...",
    text: "ॐ ह्लीं बगलामुखि सर्वदुष्टानां वाचं मुखं स्तम्भय जिह्वां कीलय बुद्धिं विनाशय ह्लीं ॐ स्वाहा।",
    meaning: "Tantra beej of Baglamukhi to still harmful speech, court trouble, enemies and scattered mind. Used for stambhan and protection, not for cruelty.",
    note: "Chant 108 times facing north, preferably on Tuesday. Yellow clothes and turmeric are traditional. Take guru guidance for long sadhana."
  },
  {
    type: "stotra",
    deity: "Baglamukhi",
    title: "Baglamukhi Stotra",
    preview: "ॐ पीताम्बरां पीतवर्णां पीताभरणभूषिताम्...",
    text: "ॐ पीताम्बरां पीतवर्णां पीताभरणभूषिताम्।\nपीतस्रग्दाममाल्याढ्यां पीताम्बरधरां भजे॥\n\nब्रह्मास्त्ररूपिणीं देवीं स्तम्भिन्यै ते नमो नमः।\nजिह्वां कीलय कीलय सर्वदुष्टान् निवारय॥\n\nशत्रूणां वाचं स्तम्भय बुद्धिं नाशय नाशय।\nरक्ष रक्ष महादेवि भक्तानां भयहारिणि॥\n\nपीतवस्त्रे पीतगन्धे पीतपुष्पविभूषिते।\nपीताम्बरधरे देवि बगले त्वां नमाम्यहम्॥\n\nसर्वसिद्धिप्रदे देवि सर्वमङ्गलकारिणि।\nसर्वदुष्टप्रशमनि बगले त्वां नमाम्यहम्॥\n\nनमोऽस्तु ते महादेवि श्रीबगलामुखि प्रिये।\nस्तम्भिनि मोहिनि देवि त्राहि मां शरणागतम्॥",
    meaning: "Praise of Pitambara Baglamukhi who stills the tongue of the wicked and removes fear of devotees.",
    note: "Recite before court dates, exams or when facing false speech. Keep the intention defensive."
  },
  {
    type: "kavach",
    deity: "Baglamukhi",
    title: "Baglamukhi Raksha Kavach",
    preview: "ॐ ह्लीं बगला पातु मे मस्तकम्...",
    text: "ॐ ह्लीं बगलामुख्यै नमः।\nबगला पातु मे मस्तकं ललाटं स्तम्भिनी तथा।\nनेत्रे पातु महामाया कर्णौ पातु भयङ्करी॥\nवाचं पातु महाजिह्वा कंठं पातु महाबला।\nहृदयं पीतवर्णा मे नाभिं रक्षतु सिद्धिदा॥\nसर्वाङ्गं बगला रक्षेत् शत्रुवाचं नियच्छतु।\nन मे बाधा भवेत् काचित् देवी बगला प्रसीदतु॥",
    meaning: "Raksha kavach of Baglamukhi over head, speech, heart and whole body, asking that hostile words be stilled.",
    note: "Read in the morning on yellow asana if possible. Do not chant with hatred."
  },
  {
    type: "mantra",
    deity: "Narasimha",
    title: "Narasimha Mantra",
    preview: "ॐ उग्रं वीरं महाविष्णुं ज्वलन्तं सर्वतोमुखम्...",
    text: "ॐ उग्रं वीरं महाविष्णुं ज्वलन्तं सर्वतोमुखम्।\nनृसिंहं भीषणं भद्रं मृत्युमृत्युं नमाम्यहम्॥",
    meaning: "I bow to fierce Narasimha, the blazing all-facing Vishnu, who is death even to death and auspicious to the devotee.",
    note: "Chant 108 times at dusk for protection from sudden danger, black magic and nightmares."
  },
  {
    type: "stotra",
    deity: "Narasimha",
    title: "Narasimha Kavacha Stotra",
    preview: "नृसिंहकवचं वक्ष्ये प्रह्लादेनोदितं पुरा...",
    text: "नृसिंहकवचं वक्ष्ये प्रह्लादेनोदितं पुरा।\nसर्वरक्षाकरं पुण्यं सर्वोपद्रवनाशनम्॥\n\nनृसिंहो मे शिरः पातु नृसिंहो मे ललाटकम्।\nनृसिंहो मे दृशौ पातु नृसिंहो मे श्रुती तथा॥\nनृसिंहो मे मुखं पातु नृसिंहो मे कण्ठदेशकम्।\nनृसिंहः स्कन्धयुग्मं मे नृसिंहो मे भुजद्वयम्॥\nनृसिंहो हृदयं पातु नृसिंहो मे तथोदरम्।\nनृसिंहः कटिदेशं मे नृसिंहो मे तथोरुकम्॥\nनृसिंहो जानुनी पातु नृसिंहो जङ्घयोर्द्वयोः।\nनृसिंहः पादयुग्मं मे सर्वाङ्गं नृहरिः स्वयम्॥\nभूतप्रेतपिशाचेभ्यो डाकिनीभ्यश्च रक्षतु।\nसर्वोपद्रवनाशाय नृसिंहः सततं मम॥",
    meaning: "Complete Narasimha Kavacha Stotra as spoken of old by Prahlada — full-body protection against every calamity.",
    note: "Read at twilight. Keep a picture or name of Narasimha if you have one."
  },
  {
    type: "kavach",
    deity: "Narasimha",
    title: "Narasimha Raksha Kavach",
    preview: "नृसिंहो मे शिरः पातु...",
    text: "ॐ नमो भगवते नृसिंहाय।\nनृसिंहो मे शिरः पातु ललाटं च महाबलः।\nनेत्रे ज्वलननेत्रः पातु कर्णौ सिंहनादकः॥\nनासिकां दंष्ट्रवान् पातु मुखं पातु महाहनुः।\nकंठं पातु महाग्रीवः स्कन्धौ विश्वंभरो हरिः॥\nभुजै नखायुधः पातु हृदयं नारसिंहकः।\nउदरं जठरो रक्षेत् कटिं पातु महाकटिः॥\nऊरू पातु महाजङ्घः जानुनी च महाबलः।\nपादौ चक्रधरः पातु सर्वाङ्गं नृहरिः स्वयम्॥\nभूतप्रेतपिशाचेभ्यो डाकिनीभ्यश्च रक्षतु।\nसर्वोपद्रवनाशाय नृसिंहः सततं मम॥",
    meaning: "Full-body raksha kavach of Narasimha against pret, pishach, dakini and every sudden affliction.",
    note: "Powerful evening recitation. Light a ghee diya. Sit facing east or north."
  },
  {
    type: "mantra",
    deity: "Navagraha",
    title: "Navagraha Beej Mantras",
    preview: "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः...",
    text: "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः।\nॐ श्रां श्रीं श्रौं सः चन्द्राय नमः।\nॐ क्रां क्रीं क्रौं सः भौमाय नमः।\nॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः।\nॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः।\nॐ द्रां द्रीं द्रौं सः शुक्राय नमः।\nॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः।\nॐ भ्रां भ्रीं भ्रौं सः राहवे नमः।\nॐ स्रां स्रीं स्रौं सः केतवे नमः।",
    meaning: "Beej mantras of the nine grahas, used in tantra and jyotish sadhana to balance planetary pressure.",
    note: "Chant each 11 or 108 times on the related weekday. For a full graha shanti, take personal guidance."
  },
  {
    type: "stotra",
    deity: "Navagraha",
    title: "Navagraha Stotra",
    preview: "जपाकुसुमसंकाशं काश्यपेयं महद्युतिम्...",
    text: "जपाकुसुमसंकाशं काश्यपेयं महद्युतिम्।\nतमोऽरिं सर्वपापघ्नं प्रणतोऽस्मि दिवाकरम्॥\nदधिशङ्खतुषाराभं क्षीरोदार्णवसम्भवम्।\nनमामि शशिनं सोमं शम्भोर्मुकुटभूषणम्॥\nधरणीगर्भसम्भूतं विद्युत्कान्तिसमप्रभम्।\nकुमारं शक्तिहस्तं तं मङ्गलं प्रणमाम्यहम्॥\nप्रियङ्गुकलिकाश्यामं रूपेणाप्रतिमं बुधम्।\nसौम्यं सौम्यगुणोपेतं तं बुधं प्रणमाम्यहम्॥\nदेवानां च ऋषीणां च गुरुं काञ्चनसन्निभम्।\nबुद्धिभूतं त्रिलोकेशं तं नमामि बृहस्पतिम्॥\nहिमकुन्दमृणालाभं दैत्यानां परमं गुरुम्।\nसर्वशास्त्रप्रवक्तारं भार्गवं प्रणमाम्यहम्॥\nनीलाञ्जनसमाभासं रविपुत्रं यमाग्रजम्।\nछायामार्तण्डसम्भूतं तं नमामि शनैश्चरम्॥\nअर्धकायं महावीर्यं चन्द्रादित्यविमर्दनम्।\nसिंहिकागर्भसम्भूतं तं राहुं प्रणमाम्यहम्॥\nपलाशपुष्पसङ्काशं तारकाग्रहमस्तकम्।\nरौद्रं रौद्रात्मकं घोरं तं केतुं प्रणमाम्यहम्॥",
    meaning: "The classic Navagraha stotra bowing to Surya, Chandra, Mangal, Budh, Guru, Shukra, Shani, Rahu and Ketu.",
    note: "Recite every morning after Surya namaskar or arghya, especially during dasha/antardasha stress."
  },
  {
    type: "kavach",
    deity: "Navagraha",
    title: "Navagraha Raksha Kavach",
    preview: "सूर्यः पातु शिरो मह्यं चन्द्रः पातु ललाटकम्...",
    text: "ॐ नवग्रहेभ्यो नमः।\nसूर्यः पातु शिरो मह्यं चन्द्रः पातु ललाटकम्।\nमङ्गलश्चक्षुषी पातु बुधः पातु च नासिकाम्॥\nगुरुः पातु मुखं मह्यं शुक्रः कण्ठं सदाऽवतु।\nशनैश्चरः स्कन्धयुग्मं राहुर्वक्षः सदाऽवतु॥\nकेतुः पातु तथा नाभिं सर्वाङ्गं नवग्रहः स्वयम्।\nग्रहपीडा विनश्यन्तु मम रक्षा भवत्वियम्॥",
    meaning: "Raksha kavach assigning each graha to a part of the body so planetary affliction is pacified.",
    note: "Read after Navagraha stotra. Offer water and a simple naivedya if you keep a graha altar."
  },
  {
    type: "mantra",
    deity: "Durga",
    title: "Navarna / Chandi Mantra",
    preview: "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे",
    text: "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे",
    meaning: "The Navarna mantra of Chandi / Durga, central tantra vidya of Devi Mahatmya sadhana.",
    note: "Chant 108 times during Navratri after obtaining permission if possible. Keep sattvic food that day."
  },
  {
    type: "mantra",
    deity: "Kali",
    title: "Dakshina Kali Mool Mantra",
    preview: "ॐ क्रीं क्रीं क्रीं हूं हूं ह्रीं ह्रीं दक्षिणे कालिके...",
    text: "ॐ क्रीं क्रीं क्रीं हूं हूं ह्रीं ह्रीं दक्षिणे कालिके क्रीं क्रीं क्रीं हूं हूं ह्रीं ह्रीं स्वाहा।",
    meaning: "Mool mantra of Dakshina Kali used in authentic Kali tantra for protection, cutting fear and destroying hidden negativity.",
    note: "Do not chant as a weapon against a person. Prefer Amavasya only with a calm mind or under guidance."
  },
  {
    type: "kavach",
    deity: "Durga",
    title: "Devi Raksha Kavach",
    preview: "ॐ नमश्चण्डिकायै...",
    text: "ॐ नमश्चण्डिकायै।\nशिरो मे पैठनी पातु ललाटे रत्नधारिणी।\nचक्षुषी खङ्गधारिणी पातु कर्णौ शङ्खधारिणी॥\nघ्राणं पातु गदाहस्ता मुखं पातु महाबला।\nजिह्वां पातु सरस्वती च कंठं चक्रधारिणी॥\nस्कन्धौ पातु महादेवी हृदयं सिंहवाहिनी।\nनाभिं पातु महालक्ष्मीः कटिं पातु महेश्वरी॥\nऊरू पातु भवानी मे जानुनी चण्डिका तथा।\nजङ्घे काली सदा पातु पादौ दुर्गा सदाऽवतु॥\nसर्वाङ्गं चण्डिका रक्षेत् भूतप्रेतभयं हर।\nदुष्टग्रहान् विनाशय रक्ष रक्ष महेश्वरि॥",
    meaning: "Fuller Devi raksha kavach covering the whole body and asking Chandi to remove pret, graha and fear.",
    note: "Traditionally read before Durga Saptashati. Sit facing east with a lit diya."
  },
  {
    type: "kavach",
    deity: "Hanuman",
    title: "Hanuman Raksha Kavach",
    preview: "ॐ श्रीहनुमते नमः...",
    text: "ॐ श्रीहनुमते रुद्रावतारायाऽञ्जनीसुताय महाबलाय नमः।\nहनुमान् मे शिरः पातु ललाटं च महाबलः।\nनेत्रे पातु महावीरः कर्णौ पातु महायशाः॥\nनासिकां पातु वायुपुत्रो मुखं पातु महामतिः।\nकंठं पातु रामभक्तः स्कन्धौ वज्रदेहकः॥\nभुजै पातु महातेजा हृदयं सीताशोकहृत्।\nउदरं पातु पवनात्मजः कटिं लंकादहकः॥\nऊरू पातु महाजङ्घः जानुनी च महाबलः।\nपादौ सागरलङ्घकः सर्वाङ्गं मारुतिः स्वयम्॥\nभूतप्रेतपिशाचानां डाकिनीशाकिनीगणम्।\nसर्वान् नाशय नाशय हनुमान् मे सदाऽवतु॥",
    meaning: "Fuller Hanuman raksha kavach for night travel, black-magic fear, restlessness and protection of the whole body.",
    note: "Read on Tuesday or Saturday evening after lighting mustard-oil diya."
  },
  {
    type: "kavach",
    deity: "Shiva",
    title: "Shiva Raksha Kavach",
    preview: "शिवो मे शिरसः पातु भालं चन्द्रकलाधरः...",
    text: "ॐ नमः शिवाय।\nशिवो मे शिरसः पातु भालं चन्द्रकलाधरः।\nनेत्रे त्रिलोचनः पातु कर्णौ पातु महेश्वरः॥\nघ्राणं पातु गिरिशः स्यात् मुखं पातु वृषध्वजः।\nकंठं नीलकण्ठः पातु स्कन्धौ शूलधरः सदा॥\nहृदयं शङ्करो रक्षेत् नाभिं विश्वंभरो हरः।\nकटिं पातु महादेवो ऊरू पातु त्रिपुरान्तकः॥\nजानुनी पशुपतिः पातु जङ्घे मृत्युञ्जयः सदा।\nपादौ दिगम्बरः पातु सर्वाङ्गं शिव एव हि॥\nभूतप्रेतपिशाचेभ्यो सर्वेभ्यो रक्ष मां शिव।\nमृत्युंजय महादेव त्राहि मां शरणागतम्॥",
    meaning: "Fuller Shiva raksha kavach with Mrityunjaya protection over every limb.",
    note: "Read at dawn or Pradosh. A rudraksha mala and a ghee diya are traditional."
  },
  {
    type: "mantra",
    deity: "Ganesha",
    title: "Ganesh Tantra Beej",
    preview: "ॐ गं गणपतये नमः ॐ गं गणेशाय स्वाहा",
    text: "ॐ गं गणपतये नमः।\nॐ श्रीं गं सौं गणपतये वर वरद सर्वजनं मे वशमानय स्वाहा।",
    meaning: "Tantra form of Ganesha mantra used to remove blocks and bring work under auspicious control, without harming anyone.",
    note: "Chant 108 times before any tantra sadhana, court matter or new business. Face east."
  }
];

if (typeof shabarMantras !== "undefined") {
  sacredTexts.push(...shabarMantras);
}

if (typeof rakshaMantras !== "undefined") {
  sacredTexts.push(...rakshaMantras);
}

const mantraGrid = document.getElementById("mantraGrid");
const mantraModal = document.getElementById("mantraModal");
let typeFilter = "all";
let deityFilter = "all";

function renderMantras() {
  if (!mantraGrid) return;
  const compact = document.body.classList.contains("home-view");
  const list = sacredTexts.filter((item) => {
    const typeOk = compact || typeFilter === "all" || item.type === typeFilter;
    const deityOk = compact || deityFilter === "all" || item.deity === deityFilter;
    return typeOk && deityOk;
  });
  const shown = compact ? list.slice(0, 6) : list;
  if (!shown.length) {
    mantraGrid.innerHTML = "<p class='sub'>No texts in this combination. Try another filter.</p>";
    return;
  }
  mantraGrid.innerHTML = shown.map((item) => `
    <button type="button" class="mantra-item" data-index="${sacredTexts.indexOf(item)}">
      <span class="mantra-top">
        <span class="tag">${item.type.toUpperCase()}</span>
        <span class="deity-name">${item.deity}</span>
      </span>
      <h3>${item.title}</h3>
      <p class="preview">${item.preview}</p>
      <span class="view-more">Read mantra <span>→</span></span>
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

function versesFromText(text) {
  const blocks = String(text).split(/\n{2,}/).map((part) => part.trim()).filter(Boolean);
  if (blocks.length >= 4) return blocks;
  const lines = String(text).split(/\n/).map((part) => part.trim()).filter(Boolean);
  return lines.length ? lines : [String(text)];
}

function openMantraModal(i) {
  const item = sacredTexts[i];
  if (!item || !mantraModal) return;
  currentMantraText = item.text;
  document.getElementById("mantraModalType").textContent = item.type.toUpperCase();
  document.getElementById("mantraModalTitle").textContent = item.title;
  const deityEl = document.getElementById("mantraModalDeity");
  deityEl.textContent = item.deity;
  deityEl.hidden = item.deity.toLowerCase() === item.type.toLowerCase();
  document.getElementById("mantraModalText").innerHTML = versesFromText(item.text)
    .map((verse) => `<p class="shloka">${escapeHtml(verse)}</p>`)
    .join("");
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

document.getElementById("typeFilters")?.querySelectorAll(".chip").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#typeFilters .chip").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    typeFilter = btn.dataset.type || "all";
    renderMantras();
  });
});

document.getElementById("deityFilters")?.querySelectorAll(".mini-chip").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#deityFilters .mini-chip").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    deityFilter = btn.dataset.deity || "all";
    renderMantras();
  });
});

document.getElementById("mantraModalClose")?.addEventListener("click", closeMantraModal);
document.getElementById("mantraModalCloseBtn")?.addEventListener("click", closeMantraModal);
document.getElementById("mantraConsultBtn")?.addEventListener("click", closeMantraModal);
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
