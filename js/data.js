window.FPS_DATA = {
  moods: [
    {
      id: "loneliness",
      label: "외로움",
      labelEn: "Loneliness",
      description: "빈 거리, 한 사람, 창백한 비, 먼 불빛으로 고립감을 만듭니다.",
      visualDetails: ["empty street", "shuttered storefronts", "one figure seen from behind", "wide negative space", "pale rain", "distant lights"],
      lighting: ["overcast diffused light", "dim streetlight", "grey evening light"],
      composition: ["negative_space", "centered", "diagonal"],
      films: ["ilford_hp5", "kodak_portra_800"],
      effects: ["visible_grain", "lifted_blacks"],
      avoid: ["crowded background", "bright cheerful colors", "warm tropical tones"]
    },
    {
      id: "warmth",
      label: "따뜻함",
      labelEn: "Warmth",
      description: "나무, 린넨, 크림색 벽, 오후빛으로 부드러운 온기를 만듭니다.",
      visualDetails: ["pale wood texture", "linen fabric", "cream-colored walls", "low afternoon sunlight", "soft shadows", "ceramic objects"],
      lighting: ["warm afternoon light", "window light", "soft natural daylight"],
      composition: ["rule_of_thirds", "centered"],
      films: ["kodak_gold_200", "kodak_portra_400"],
      effects: ["soft_halation", "fine_grain"],
      avoid: ["cold fluorescent light", "harsh shadows", "blue monochrome tone"]
    },
    {
      id: "mystery",
      label: "미스터리",
      labelEn: "Mystery",
      description: "금 간 거울, 반쯤 열린 문, 긴 그림자, 촛불로 긴장감을 만듭니다.",
      visualDetails: ["cracked mirror", "half-open door", "single candlelight", "long shadows across the wall", "thin fog", "obscured face"],
      lighting: ["single candlelight", "low directional light", "dim interior light"],
      composition: ["centered", "diagonal"],
      films: ["ilford_hp5", "cinestill_blue"],
      effects: ["lifted_blacks", "visible_grain", "vignette"],
      avoid: ["bright clean commercial lighting", "pastel cheerful palette"]
    },
    {
      id: "luxury",
      label: "고급스러움",
      labelEn: "Luxury",
      description: "대리석, 유리, 금속, 벨벳, 절제된 소품으로 프리미엄 이미지를 만듭니다.",
      visualDetails: ["black marble surface", "deep velvet fabric", "polished metal details", "clear glass reflections", "thin gold trim", "minimal props"],
      lighting: ["soft directional light", "controlled studio light"],
      composition: ["centered", "symmetrical"],
      films: ["kodak_portra_400"],
      effects: ["soft_halation", "fine_grain"],
      avoid: ["messy props", "cheap plastic texture", "overexposed background"]
    },
    {
      id: "calm",
      label: "평온함",
      labelEn: "Calm",
      description: "잔잔한 물, 옅은 하늘, 단순한 구도로 조용한 안정감을 만듭니다.",
      visualDetails: ["still water", "soft morning light", "pale blue sky", "simple composition", "open space", "gentle fabric folds"],
      lighting: ["soft morning light", "low contrast daylight"],
      composition: ["centered", "negative_space"],
      films: ["fujifilm_pro_400h", "kodak_portra_400"],
      effects: ["fine_grain", "soft_diffusion"],
      avoid: ["crowded frame", "strong contrast", "chaotic background"]
    },
    {
      id: "future",
      label: "미래적 분위기",
      labelEn: "Futuristic",
      description: "유리 타워, 홀로그램, 젖은 검은 도로, 시안 네온 반사로 미래감을 만듭니다.",
      visualDetails: ["glass towers", "holographic signs", "wet black pavement", "cyan neon reflections", "autonomous vehicles", "metallic surfaces"],
      lighting: ["cyan neon light", "cold directional light", "rainy night reflections"],
      composition: ["diagonal", "layered_depth"],
      films: ["cinestill_blue"],
      effects: ["bloom", "soft_halation", "visible_grain"],
      avoid: ["rustic wood texture", "warm cottage light"]
    }
  ],
  films: [
    { id: "kodak_portra_400", label: "Kodak Portra 400", style: "Kodak Portra 400 film photography", tones: ["warm skin tones", "creamy highlights", "soft contrast"], effects: ["fine_grain", "soft_halation"], avoid: ["oversaturated colors", "harsh digital sharpening", "plastic skin"] },
    { id: "kodak_portra_800", label: "Kodak Portra 800", style: "Kodak Portra 800 low-light film photography", tones: ["warm shadows", "soft highlight rolloff", "muted color palette"], effects: ["visible_grain", "soft_halation"], avoid: ["clean glossy studio look", "neon oversaturation"] },
    { id: "kodak_gold_200", label: "Kodak Gold 200", style: "Kodak Gold 200 snapshot photography", tones: ["warm yellow highlights", "amber shadows", "nostalgic color palette"], effects: ["fine_grain"], avoid: ["cold monochrome tone", "glossy luxury lighting"] },
    { id: "fujifilm_pro_400h", label: "Fujifilm Pro 400H", style: "Fujifilm Pro 400H film photography", tones: ["pastel green tones", "soft cream tones", "subtle pink shift"], effects: ["fine_grain", "vignette"], avoid: ["heavy black contrast", "neon cyberpunk color"] },
    { id: "ilford_hp5", label: "Ilford HP5", style: "Ilford HP5 black and white documentary photography", tones: ["monochrome tones", "deep black shadows", "silver highlights"], effects: ["visible_grain", "lifted_blacks"], avoid: ["pastel color palette", "warm tropical colors", "glossy commercial look"] },
    { id: "cinestill_blue", label: "Cinestill Blue Tone", style: "cool blue cinematic film photography", tones: ["cyan shadows", "blue-green color cast", "cold atmospheric palette"], effects: ["soft_halation", "bloom", "visible_grain"], avoid: ["warm golden kitchen light", "pastel wedding palette"] },
    { id: "disposable_snapshot", label: "Disposable Snapshot", style: "disposable camera snapshot photography", tones: ["direct flash colors", "slightly flat lighting", "imperfect casual tones"], effects: ["harsh_flash", "visible_grain"], avoid: ["minimal luxury product photography", "polished studio lighting"] }
  ],
  lenses: [
    { id: "24mm", label: "24mm", prompt: "wide-angle 24mm lens perspective", description: "넓은 공간감, 풍경, 건축, 환경 인물" },
    { id: "35mm", label: "35mm", prompt: "35mm documentary lens perspective", description: "거리 스냅, 일상, 다큐멘터리" },
    { id: "50mm", label: "50mm", prompt: "50mm natural lens perspective", description: "표준 시선, 균형 잡힌 인물과 장면" },
    { id: "85mm", label: "85mm", prompt: "85mm portrait lens with shallow depth of field", description: "인물 중심, 부드러운 배경 흐림" },
    { id: "135mm", label: "135mm", prompt: "135mm telephoto compression", description: "배경 압축, 망원적 분리감" },
    { id: "macro", label: "Macro", prompt: "macro lens close-up with extreme detail", description: "제품 디테일, 꽃, 질감, 음식" }
  ],
  angles: [
    { id: "eye_level", label: "아이 레벨", prompt: "eye-level perspective", effect: "자연스럽고 안정적인 시선" },
    { id: "high_angle", label: "하이 앵글", prompt: "high-angle view", effect: "피사체를 작고 연약하게 보이게 함" },
    { id: "low_angle", label: "로우 앵글", prompt: "low-angle view", effect: "힘과 존재감 강화" },
    { id: "hip_level", label: "힙 레벨", prompt: "hip-level camera angle", effect: "스냅샷 같은 우연성" },
    { id: "over_shoulder", label: "오버 더 숄더", prompt: "over-the-shoulder framing", effect: "서사와 관계성 강화" },
    { id: "close_up", label: "클로즈업", prompt: "close-up framing", effect: "감정과 표정 집중" },
    { id: "wide_shot", label: "와이드샷", prompt: "wide shot", effect: "환경과 피사체 관계 강조" },
    { id: "dutch_angle", label: "더치 앵글", prompt: "subtle dutch angle", effect: "불안감과 역동성" }
  ],
  compositions: [
    { id: "rule_of_thirds", label: "삼분할", prompt: "rule of thirds composition", effect: "안정적 시선 유도" },
    { id: "centered", label: "중앙 구도", prompt: "centered composition", effect: "집중감과 대칭성" },
    { id: "diagonal", label: "대각선", prompt: "strong diagonal composition", effect: "방향성과 긴장감" },
    { id: "golden_spiral", label: "황금 나선", prompt: "golden spiral composition", effect: "자연스러운 중심 이동" },
    { id: "s_curve", label: "S자 곡선", prompt: "S-curve composition", effect: "부드러운 흐름" },
    { id: "layered_depth", label: "깊이감", prompt: "layered depth composition", effect: "전경·중경·배경 분리" },
    { id: "symmetrical", label: "대칭", prompt: "symmetrical composition", effect: "권위와 정돈" },
    { id: "negative_space", label: "여백", prompt: "wide negative space", effect: "외로움과 미니멀함" }
  ],
  lighting: [
    { id: "soft_natural", label: "부드러운 자연광", prompt: "soft natural daylight" },
    { id: "overcast", label: "흐린 확산광", prompt: "overcast diffused light" },
    { id: "golden_backlight", label: "골든아워 역광", prompt: "golden hour backlight" },
    { id: "window_light", label: "창문빛", prompt: "window light" },
    { id: "cold_fluorescent", label: "차가운 형광등", prompt: "cold fluorescent light" },
    { id: "morning_haze", label: "아침 안개빛", prompt: "soft morning haze" },
    { id: "studio_directional", label: "스튜디오 방향광", prompt: "soft directional studio light" },
    { id: "cyan_neon", label: "시안 네온", prompt: "cyan neon light reflections" }
  ],
  effects: [
    { id: "fine_grain", label: "미세 그레인", prompt: "fine film grain" },
    { id: "visible_grain", label: "강한 그레인", prompt: "visible film grain" },
    { id: "soft_halation", label: "할레이션", prompt: "soft halation around highlights" },
    { id: "bloom", label: "블룸", prompt: "soft bloom in highlights" },
    { id: "lifted_blacks", label: "리프티드 블랙", prompt: "lifted blacks" },
    { id: "soft_diffusion", label: "소프트 디퓨전", prompt: "soft diffusion effect" },
    { id: "vignette", label: "비네팅", prompt: "subtle vignette" },
    { id: "chromatic_aberration", label: "색수차", prompt: "slight chromatic aberration" },
    { id: "harsh_flash", label: "직접 플래시", prompt: "direct flash" }
  ],
  presets: [
    { id: "japanese_everyday", title: "일본식 필름 일상", mood: "calm", film: "fujifilm_pro_400h", lens: "35mm", angle: "eye_level", composition: "rule_of_thirds", lighting: "soft_natural", effects: ["fine_grain", "vignette"], subjectType: "cinematic_scene", ratio: "auto", tags: ["quiet", "pastel", "35mm"] },
    { id: "british_rain", title: "영국식 흐린 거리", mood: "loneliness", film: "ilford_hp5", lens: "50mm", angle: "eye_level", composition: "diagonal", lighting: "overcast", effects: ["visible_grain", "lifted_blacks"], subjectType: "cinematic_scene", ratio: "auto", tags: ["rain", "street", "documentary"] },
    { id: "wedding_portra", title: "웨딩 포트라 룩", mood: "warmth", film: "kodak_portra_400", lens: "85mm", angle: "close_up", composition: "centered", lighting: "golden_backlight", effects: ["soft_halation", "soft_diffusion"], subjectType: "portrait_closeup", ratio: "auto", tags: ["romantic", "cream", "portrait"] },
    { id: "blue_forest", title: "푸른 숲속 새벽", mood: "calm", film: "cinestill_blue", lens: "35mm", angle: "wide_shot", composition: "layered_depth", lighting: "morning_haze", effects: ["visible_grain", "soft_diffusion"], subjectType: "landscape", ratio: "auto", tags: ["forest", "mist", "blue"] },
    { id: "luxury_product", title: "고급 제품 광고", mood: "luxury", film: "kodak_portra_400", lens: "macro", angle: "eye_level", composition: "centered", lighting: "studio_directional", effects: ["soft_halation", "fine_grain"], subjectType: "product", ratio: "auto", tags: ["marble", "glass", "premium"] },
    { id: "future_city", title: "미래 도시 콘셉트", mood: "future", film: "cinestill_blue", lens: "24mm", angle: "low_angle", composition: "diagonal", lighting: "cyan_neon", effects: ["bloom", "soft_halation"], subjectType: "cinematic_scene", ratio: "auto", tags: ["neon", "sci-fi", "rain"] }
  ],
  subjectTypes: [
    { id: "portrait_closeup", label: "인물 클로즈업" },
    { id: "full_body", label: "전신 인물" },
    { id: "fashion_editorial", label: "패션 화보" },
    { id: "cinematic_scene", label: "시네마틱 장면" },
    { id: "landscape", label: "풍경" },
    { id: "product", label: "제품" },
    { id: "food", label: "음식" },
    { id: "interior", label: "인테리어" },
    { id: "architecture", label: "건축" },
    { id: "character", label: "캐릭터" },
    { id: "sns_square", label: "SNS 정사각형" },
    { id: "generic", label: "일반" }
  ]
};
