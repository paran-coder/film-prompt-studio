window.FPS_DATA = {
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
    { id: "sns_square", label: "SNS 정사각형" }
  ],
  moods: [
    { id: "loneliness", label: "외로움", labelEn: "Loneliness", description: "빈 거리, 한 사람, 창백한 비, 먼 불빛으로 고립감을 만듭니다.", visualDetails: ["empty street", "shuttered storefronts", "one figure seen from behind", "wide negative space", "pale rain", "distant lights"], lighting: ["overcast", "cold_fluorescent"], composition: ["negative_space", "centered", "diagonal"], films: ["ilford_hp5", "kodak_portra_800"], effects: ["visible_grain", "lifted_blacks"], avoid: ["crowded background", "bright cheerful colors", "warm tropical tones"] },
    { id: "warmth", label: "따뜻함", labelEn: "Warmth", description: "나무, 린넨, 크림색 벽, 오후빛으로 부드러운 온기를 만듭니다.", visualDetails: ["pale wood texture", "linen fabric", "cream-colored walls", "low afternoon sunlight", "soft shadows", "ceramic objects"], lighting: ["window_light", "soft_natural"], composition: ["rule_of_thirds", "centered"], films: ["kodak_gold_200", "kodak_portra_400"], effects: ["soft_halation", "fine_grain"], avoid: ["cold fluorescent light", "harsh shadows", "blue monochrome tone"] },
    { id: "mystery", label: "미스터리", labelEn: "Mystery", description: "금 간 거울, 반쯤 열린 문, 긴 그림자, 촛불로 설명하지 않는 긴장감을 만듭니다.", visualDetails: ["cracked mirror", "half-open door", "single candlelight", "long shadows across the wall", "thin fog", "obscured face"], lighting: ["candlelight", "cold_fluorescent"], composition: ["centered", "diagonal"], films: ["ilford_hp5", "cinestill_blue"], effects: ["lifted_blacks", "visible_grain", "vignette"], avoid: ["bright clean commercial lighting", "pastel cheerful palette"] },
    { id: "luxury", label: "고급스러움", labelEn: "Luxury", description: "대리석, 유리, 금속, 벨벳, 절제된 소품으로 프리미엄 이미지를 만듭니다.", visualDetails: ["black marble surface", "deep velvet fabric", "polished metal details", "clear glass reflections", "thin gold trim", "minimal props"], lighting: ["studio_directional", "window_light"], composition: ["centered", "symmetrical"], films: ["kodak_portra_400"], effects: ["soft_halation", "fine_grain"], avoid: ["messy props", "cheap plastic texture", "overexposed background"] },
    { id: "calm", label: "평온함", labelEn: "Calm", description: "잔잔한 물, 옅은 하늘, 단순한 구도로 조용한 안정감을 만듭니다.", visualDetails: ["still water", "soft morning light", "pale blue sky", "simple composition", "open space", "gentle fabric folds"], lighting: ["morning_haze", "soft_natural"], composition: ["centered", "negative_space"], films: ["fujifilm_pro_400h", "kodak_portra_400"], effects: ["fine_grain", "soft_diffusion"], avoid: ["crowded frame", "strong contrast", "chaotic background"] },
    { id: "future", label: "미래적 분위기", labelEn: "Futuristic", description: "유리 타워, 홀로그램, 젖은 검은 도로, 시안 네온 반사로 미래감을 만듭니다.", visualDetails: ["glass towers", "holographic signs", "wet black pavement", "cyan neon reflections", "autonomous vehicles", "metallic surfaces"], lighting: ["cyan_neon", "cold_fluorescent"], composition: ["diagonal", "layered_depth"], films: ["cinestill_blue"], effects: ["bloom", "soft_halation", "visible_grain"], avoid: ["rustic wood texture", "warm cottage light"] },
    { id: "authority", label: "힘과 권위", labelEn: "Authority", description: "로우 앵글, 대칭, 무거운 소재, 어두운 배너로 권위를 만듭니다.", visualDetails: ["low-angle view", "broad shoulders", "heavy cloak", "stone throne", "symmetrical hall", "dark banners"], lighting: ["studio_directional", "cold_fluorescent"], composition: ["symmetrical", "centered"], films: ["ilford_hp5", "kodak_portra_800"], effects: ["visible_grain", "lifted_blacks"], avoid: ["cute expression", "casual snapshot lighting"] },
    { id: "tragedy", label: "비극", labelEn: "Tragedy", description: "찢어진 천, 진흙, 연기, 부서진 오브젝트로 상실감을 만듭니다.", visualDetails: ["torn fabric", "mud-covered ground", "thin smoke", "broken objects", "fallen armor", "grey ash in the air"], lighting: ["overcast", "morning_haze"], composition: ["diagonal", "layered_depth"], films: ["ilford_hp5", "kodak_portra_800"], effects: ["visible_grain", "lifted_blacks"], avoid: ["cheerful colors", "clean studio floor"] }
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
    { id: "negative_space", label: "여백", prompt: "wide negative space", effect: "외로움과 미니멀함" },
    { id: "asymmetrical", label: "비대칭", prompt: "asymmetrical composition", effect: "우연성과 스냅 감각" }
  ],
  lighting: [
    { id: "soft_natural", label: "부드러운 자연광", prompt: "soft natural daylight" },
    { id: "overcast", label: "흐린 확산광", prompt: "overcast diffused light" },
    { id: "golden_backlight", label: "골든아워 역광", prompt: "golden hour backlight" },
    { id: "window_light", label: "창문빛", prompt: "window light" },
    { id: "cold_fluorescent", label: "차가운 형광등", prompt: "cold fluorescent light" },
    { id: "morning_haze", label: "아침 안개빛", prompt: "soft morning haze" },
    { id: "studio_directional", label: "스튜디오 방향광", prompt: "soft directional studio light" },
    { id: "cyan_neon", label: "시안 네온", prompt: "cyan neon light reflections" },
    { id: "candlelight", label: "촛불", prompt: "single candlelight" }
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
  useCases: [
    { id: "portrait", label: "인물 사진", subjectType: "portrait_closeup", ratio: "4:5" },
    { id: "fashion", label: "패션 화보", subjectType: "fashion_editorial", ratio: "4:5" },
    { id: "scene", label: "시네마틱 장면", subjectType: "cinematic_scene", ratio: "16:9" },
    { id: "product", label: "제품 광고", subjectType: "product", ratio: "4:5" },
    { id: "interior", label: "인테리어", subjectType: "interior", ratio: "4:3" },
    { id: "food", label: "음식", subjectType: "food", ratio: "4:5" },
    { id: "landscape", label: "풍경", subjectType: "landscape", ratio: "16:9" },
    { id: "character", label: "캐릭터", subjectType: "character", ratio: "2:3" }
  ],
  presets: []
};
(function(){
  const p = (id, title, mood, film, lens, angle, composition, lighting, effects, subjectType, tags, input) => ({ id, title, mood, film, lens, angle, composition, lighting, effects, subjectType, ratio: "auto", tags, input });
  window.FPS_DATA.presets = [
    p("japanese_everyday", "일본식 필름 일상", "calm", "fujifilm_pro_400h", "35mm", "eye_level", "rule_of_thirds", "soft_natural", ["fine_grain", "vignette"], "cinematic_scene", ["quiet", "pastel", "35mm"], { mainSubject:"a young woman in a beige cardigan", actionPose:"walks beside a quiet neighborhood vending machine", place:"a narrow Tokyo residential street", foreground:"fallen ginkgo leaves on pale asphalt", background:"small balconies and soft utility wires", weatherTime:"cloudy afternoon light" }),
    p("british_rain", "영국식 흐린 거리", "loneliness", "ilford_hp5", "50mm", "eye_level", "diagonal", "overcast", ["visible_grain", "lifted_blacks"], "cinematic_scene", ["rain", "street", "documentary"], { mainSubject:"a woman in a black wool coat", visibleTrait:"wet dark hair and a transparent umbrella", actionPose:"walks across a wet London crosswalk", place:"a rainy London street", foreground:"red bus lights reflected on black pavement", background:"shuttered storefronts and distant streetlights", weatherTime:"grey evening mist" }),
    p("wedding_portra", "웨딩 포트라 룩", "warmth", "kodak_portra_400", "85mm", "close_up", "centered", "golden_backlight", ["soft_halation", "soft_diffusion"], "portrait_closeup", ["wedding", "romantic", "portra"], { mainSubject:"a bride in an ivory silk dress", visibleTrait:"a loose veil and pearl earrings", actionPose:"turns her face toward warm window light", place:"an old garden house", foreground:"small white flowers near the frame", background:"cream curtains and pale wood walls", weatherTime:"late afternoon light" }),
    p("blue_forest", "푸른 숲속 새벽", "calm", "cinestill_blue", "35mm", "wide_shot", "layered_depth", "morning_haze", ["visible_grain", "soft_diffusion"], "landscape", ["forest", "blue", "mist"], { mainSubject:"a lone hiker in a dark rain jacket", actionPose:"stands between tall pine trees", place:"a misty blue forest at dawn", foreground:"wet fern leaves and mossy stones", background:"pale fog between distant trunks", weatherTime:"cold morning haze" }),
    p("flash_party", "2000년대 플래시 파티 스냅", "warmth", "disposable_snapshot", "35mm", "hip_level", "asymmetrical", "window_light", ["harsh_flash", "visible_grain"], "sns_square", ["flash", "party", "casual"], { mainSubject:"three friends in vintage jackets", actionPose:"laugh around a small kitchen table", place:"a cramped apartment party", foreground:"paper cups and a compact camera", background:"posters on cream walls", weatherTime:"late night direct flash" }),
    p("luxury_perfume", "고급 향수 광고", "luxury", "kodak_portra_400", "50mm", "eye_level", "centered", "studio_directional", ["soft_halation", "fine_grain"], "product", ["product", "luxury", "perfume"], { mainSubject:"a clear glass perfume bottle with pale gold liquid", actionPose:"stands upright on a black marble surface", place:"a minimal studio set", foreground:"a folded strip of deep velvet fabric", background:"soft amber reflections on dark glass", weatherTime:"controlled studio light" }),
    p("night_convenience", "심야 편의점 스냅", "loneliness", "kodak_portra_800", "35mm", "eye_level", "centered", "cold_fluorescent", ["visible_grain", "lifted_blacks"], "cinematic_scene", ["night", "convenience", "lonely"], { mainSubject:"a young man in a navy hoodie", actionPose:"stands beside a glowing convenience store window", place:"a quiet street corner at night", foreground:"wet asphalt and a discarded receipt", background:"bright shelves behind glass doors", weatherTime:"cold fluorescent midnight light" }),
    p("korean_indie", "한국 인디 영화 무드", "loneliness", "kodak_portra_800", "50mm", "over_shoulder", "negative_space", "overcast", ["visible_grain", "lifted_blacks"], "cinematic_scene", ["indie", "korea", "muted"], { mainSubject:"a young woman in an oversized grey coat", actionPose:"waits at an empty bus stop", place:"a suburban Korean roadside", foreground:"rain spots on the plastic shelter", background:"apartment lights across a wide road", weatherTime:"cold overcast evening" }),
    p("paris_morning", "파리 아침 필름", "warmth", "kodak_gold_200", "50mm", "eye_level", "rule_of_thirds", "soft_natural", ["fine_grain", "soft_halation"], "cinematic_scene", ["paris", "morning", "travel"], { mainSubject:"a woman carrying a paper bag of bread", actionPose:"walks past a small café terrace", place:"a quiet Paris street", foreground:"round café tables and wicker chairs", background:"cream stone buildings and open shutters", weatherTime:"soft morning daylight" }),
    p("nordic_winter", "노르딕 겨울 필름", "calm", "fujifilm_pro_400h", "35mm", "wide_shot", "negative_space", "morning_haze", ["fine_grain", "soft_diffusion"], "landscape", ["winter", "minimal", "nordic"], { mainSubject:"a small red cabin", actionPose:"sits beside a frozen lake", place:"a snowy Nordic shoreline", foreground:"smooth snow and faint animal tracks", background:"dark pine trees under a pale sky", weatherTime:"low winter morning light" }),
    p("editorial_beauty", "에디토리얼 뷰티 필름", "luxury", "kodak_portra_400", "85mm", "close_up", "centered", "studio_directional", ["soft_diffusion", "fine_grain"], "fashion_editorial", ["beauty", "editorial", "portrait"], { mainSubject:"a model with slick black hair", visibleTrait:"matte red lips and pearl skin highlights", actionPose:"faces the camera with a still expression", place:"a warm beige studio", foreground:"a thin silk glove near her chin", background:"smooth plaster wall", weatherTime:"soft directional studio light" }),
    p("documentary_bw", "다큐 흑백 인물", "authority", "ilford_hp5", "50mm", "eye_level", "centered", "window_light", ["visible_grain", "lifted_blacks"], "portrait_closeup", ["documentary", "black-white", "portrait"], { mainSubject:"an elderly craftsman with weathered hands", actionPose:"sits beside a wooden workbench", place:"a small repair shop", foreground:"metal tools and dust on the table", background:"old shelves and a narrow window", weatherTime:"soft side window light" }),
    p("rainy_bus_stop", "비 오는 버스정류장", "loneliness", "kodak_portra_800", "50mm", "eye_level", "diagonal", "overcast", ["visible_grain", "soft_halation"], "cinematic_scene", ["bus", "rain", "street"], { mainSubject:"a student in a navy school uniform", actionPose:"stands under a bus stop roof", place:"a rainy roadside", foreground:"puddles and reflected traffic lights", background:"blurred apartment windows", weatherTime:"pale rain at dusk" }),
    p("seaside_town", "조용한 바닷가 마을", "calm", "kodak_gold_200", "35mm", "wide_shot", "s_curve", "soft_natural", ["fine_grain", "vignette"], "landscape", ["sea", "town", "quiet"], { mainSubject:"a narrow road curving toward the sea", actionPose:"passes between small white houses", place:"a quiet seaside town", foreground:"dry grass and a rusted bicycle", background:"pale ocean and low clouds", weatherTime:"soft cloudy daylight" }),
    p("empty_motel", "빈 모텔 방", "mystery", "kodak_portra_800", "35mm", "wide_shot", "centered", "cold_fluorescent", ["visible_grain", "lifted_blacks"], "interior", ["motel", "mystery", "interior"], { mainSubject:"an unmade motel bed with a red blanket", actionPose:"sits beneath a flickering wall lamp", place:"a small old motel room", foreground:"a cracked phone on a wooden nightstand", background:"half-open bathroom door", weatherTime:"cold fluorescent night light" }),
    p("skincare_clean", "클린 스킨케어 제품", "luxury", "kodak_portra_400", "85mm", "eye_level", "centered", "studio_directional", ["soft_diffusion", "fine_grain"], "product", ["skincare", "clean", "commerce"], { mainSubject:"a matte white skincare bottle", actionPose:"stands on a cream stone tray", place:"a clean minimal bathroom set", foreground:"water droplets and folded cotton towel", background:"frosted glass and pale beige tiles", weatherTime:"soft studio daylight" }),
    p("vintage_camera", "빈티지 카메라 제품", "warmth", "kodak_gold_200", "50mm", "eye_level", "rule_of_thirds", "window_light", ["fine_grain", "soft_halation"], "product", ["camera", "vintage", "table"], { mainSubject:"a vintage silver film camera", actionPose:"rests on a scratched wooden table", place:"a small attic studio", foreground:"35mm film canisters and contact sheets", background:"dusty window light and old books", weatherTime:"warm afternoon window light" }),
    p("ceramic_tableware", "세라믹 테이블웨어", "warmth", "fujifilm_pro_400h", "50mm", "high_angle", "centered", "window_light", ["fine_grain", "soft_diffusion"], "product", ["ceramic", "table", "warm"], { mainSubject:"a handmade ceramic bowl with uneven blue glaze", actionPose:"sits on a linen tablecloth", place:"a quiet kitchen table", foreground:"wooden chopsticks and a folded napkin", background:"cream wall and pale wood shelf", weatherTime:"soft morning window light" }),
    p("editorial_cafe", "에디토리얼 카페 테이블", "warmth", "kodak_portra_400", "50mm", "high_angle", "rule_of_thirds", "window_light", ["fine_grain", "soft_halation"], "food", ["cafe", "food", "editorial"], { mainSubject:"a ceramic cup of cappuccino with a small croissant", actionPose:"sits on a round marble café table", place:"a quiet corner café", foreground:"linen napkin and brass spoon", background:"blurred window and wooden chair", weatherTime:"warm side window light" }),
    p("hotel_room", "미니멀 호텔 룸", "calm", "fujifilm_pro_400h", "24mm", "wide_shot", "centered", "soft_natural", ["fine_grain", "soft_diffusion"], "interior", ["hotel", "minimal", "interior"], { mainSubject:"a minimal hotel room with a low linen bed", actionPose:"faces a wide window", place:"a quiet boutique hotel", foreground:"wooden bench and folded robe", background:"cream curtains and pale morning skyline", weatherTime:"soft natural morning light" }),
    p("old_bookstore", "오래된 서점 인테리어", "warmth", "kodak_gold_200", "24mm", "wide_shot", "layered_depth", "window_light", ["fine_grain", "vignette"], "interior", ["bookstore", "wood", "warm"], { mainSubject:"a narrow old bookstore aisle", actionPose:"curves between tall wooden shelves", place:"a secondhand bookstore", foreground:"stacked paperbacks on a small cart", background:"dusty window and hand-written signs", weatherTime:"warm afternoon window light" }),
    p("futuristic_city", "미래 도시 네온", "future", "cinestill_blue", "24mm", "low_angle", "diagonal", "cyan_neon", ["bloom", "soft_halation", "visible_grain"], "architecture", ["sci-fi", "neon", "city"], { mainSubject:"a pedestrian bridge made of black glass", actionPose:"crosses between two metallic towers", place:"a futuristic city district", foreground:"cyan neon reflections on wet pavement", background:"holographic signs and autonomous vehicles", weatherTime:"rainy night atmosphere" }),
    p("sacred_hall", "신성한 홀", "authority", "kodak_portra_800", "24mm", "low_angle", "symmetrical", "window_light", ["soft_halation", "visible_grain"], "architecture", ["sacred", "hall", "symmetry"], { mainSubject:"a white-robed figure beneath a high stone ceiling", actionPose:"stands at the center of a candlelit hall", place:"an old cathedral-like interior", foreground:"rows of small candles", background:"tall arches and pale sunlight", weatherTime:"soft golden window light" }),
    p("dark_fantasy", "다크 판타지 인물", "mystery", "ilford_hp5", "50mm", "low_angle", "centered", "candlelight", ["visible_grain", "vignette"], "character", ["fantasy", "dark", "character"], { mainSubject:"a queen in a heavy black cloak", visibleTrait:"silver rings and a cracked bone crown", actionPose:"sits on a stone throne", place:"a narrow torch-lit hall", foreground:"black feathers scattered on the floor", background:"dark banners and long shadows", weatherTime:"single candlelight" }),
    p("storybook_kitchen", "동화책 부엌", "warmth", "kodak_gold_200", "35mm", "eye_level", "centered", "window_light", ["soft_diffusion", "fine_grain"], "interior", ["storybook", "kitchen", "warm"], { mainSubject:"a tiny kitchen with pale wood shelves", actionPose:"glows under a small round window", place:"a cottage interior", foreground:"ceramic jars and linen cloth", background:"cream walls and hanging herbs", weatherTime:"warm afternoon light" }),
    p("fashion_rooftop", "루프탑 패션 화보", "luxury", "kodak_portra_400", "85mm", "low_angle", "diagonal", "golden_backlight", ["soft_halation", "fine_grain"], "fashion_editorial", ["fashion", "rooftop", "editorial"], { mainSubject:"a model in a long black tailored coat", actionPose:"stands on a concrete rooftop edge", place:"an urban rooftop", foreground:"brushed metal railing", background:"golden city skyline", weatherTime:"low sunset backlight" }),
    p("macro_flower", "필름 매크로 플라워", "calm", "fujifilm_pro_400h", "macro", "close_up", "centered", "soft_natural", ["fine_grain", "soft_diffusion"], "product", ["macro", "flower", "detail"], { mainSubject:"a pale pink camellia flower", visibleTrait:"water droplets on soft petals", actionPose:"fills the center of the frame", place:"a shaded garden corner", foreground:"blurred green leaves", background:"dark soft bokeh", weatherTime:"soft cloudy daylight" }),
    p("ramen_editorial", "라멘 에디토리얼", "warmth", "kodak_gold_200", "50mm", "high_angle", "rule_of_thirds", "window_light", ["fine_grain", "soft_halation"], "food", ["ramen", "food", "editorial"], { mainSubject:"a bowl of ramen with sliced pork and soft egg", actionPose:"sits on a dark wooden counter", place:"a small noodle shop", foreground:"steam and lacquer chopsticks", background:"blurred ceramic cups and menu cards", weatherTime:"warm side window light" }),
    p("battlefield_tragedy", "비극적 전장", "tragedy", "ilford_hp5", "35mm", "low_angle", "diagonal", "overcast", ["visible_grain", "lifted_blacks"], "cinematic_scene", ["tragedy", "battlefield", "smoke"], { mainSubject:"a mud-covered warrior kneeling beside a torn banner", actionPose:"holds a dented shield against the ground", place:"a smoky battlefield", foreground:"broken spears and wet mud", background:"fallen armor and grey smoke", weatherTime:"cold overcast daylight" }),
    p("summer_portra", "여름 포트라 인물", "warmth", "kodak_portra_400", "85mm", "eye_level", "rule_of_thirds", "golden_backlight", ["soft_halation", "fine_grain"], "portrait_closeup", ["summer", "portrait", "portra"], { mainSubject:"a woman in a white cotton blouse", visibleTrait:"sunlit hair and freckled skin", actionPose:"stands beside tall summer grass", place:"a quiet field path", foreground:"soft grass stems near the lens", background:"golden trees and pale sky", weatherTime:"late golden hour backlight" }),
    p("cold_hallway", "불안한 복도", "mystery", "cinestill_blue", "35mm", "dutch_angle", "diagonal", "cold_fluorescent", ["visible_grain", "lifted_blacks"], "cinematic_scene", ["hallway", "uneasy", "cold"], { mainSubject:"a narrow hallway with a half-open door", actionPose:"extends toward darkness beyond the frame", place:"an old apartment building", foreground:"wet floor and tilted shadows", background:"cold fluorescent ceiling lights", weatherTime:"late night interior light" }),
    p("sns_square_snapshot", "SNS 정사각형 스냅", "warmth", "disposable_snapshot", "35mm", "hip_level", "asymmetrical", "soft_natural", ["harsh_flash", "fine_grain"], "sns_square", ["sns", "snapshot", "daily"], { mainSubject:"a pair of sneakers beside a café table", actionPose:"rests on a tiled floor", place:"a small local café", foreground:"iced coffee and a paper receipt", background:"sunlit chair legs and cream tiles", weatherTime:"casual afternoon light" })
  ];
})();
