(function(){
  const D = () => window.FPS_DATA;
  const byId = (list, id) => (list || []).find(item => item.id === id);
  const compact = arr => arr.filter(Boolean).map(v => String(v).trim()).filter(Boolean);
  const sentence = text => {
    const t = String(text || "").replace(/\s+/g, " ").trim();
    if (!t) return "";
    return /[.!?]$/.test(t) ? t : `${t}.`;
  };
  const lower = text => String(text || "").toLowerCase();

  const weakWords = [
    "beautiful", "amazing", "stunning", "cool", "emotional", "meaningful", "symbolic", "mysterious", "dramatic",
    "cinematic masterpiece", "ultra detailed masterpiece", "best quality", "8k", "very very detailed", "make", "draw", "add", "show"
  ];

  function resolveRatio(input){
    if (input.ratio && input.ratio !== "auto") return input.ratio;
    const type = input.subjectType || "generic";
    const map = {
      portrait_closeup: "4:5",
      full_body: "2:3",
      fashion_editorial: "4:5",
      character: "2:3",
      cinematic_scene: "16:9",
      landscape: "16:9",
      product: "4:5",
      food: "4:5",
      interior: "4:3",
      architecture: "16:9",
      sns_square: "1:1",
      generic: "4:5"
    };
    return map[type] || "4:5";
  }

  function fillMissingSlots(input){
    const data = D();
    const mood = byId(data.moods, input.moodId);
    const next = Object.assign({}, input);
    if (!next.filmId) next.filmId = mood?.films?.[0] || "kodak_portra_400";
    if (!next.lensId) next.lensId = defaultLens(next.subjectType);
    if (!next.angleId) next.angleId = defaultAngle(next.subjectType);
    if (!next.compositionId) next.compositionId = mood?.composition?.[0] || defaultComposition(next.subjectType);
    if (!next.lightingId) next.lightingId = resolveLightingId(mood?.lighting?.[0]) || defaultLighting(next.subjectType);
    if (!next.effectIds || !next.effectIds.length) next.effectIds = (mood?.effects || byId(data.films, next.filmId)?.effects || []).slice(0,2);
    next.effectIds = next.effectIds.slice(0,3);
    if (!next.selectedVisualDetails || !next.selectedVisualDetails.length) {
      next.selectedVisualDetails = (mood?.visualDetails || []).slice(0,3);
    }
    return next;
  }

  function defaultLens(type){
    return ({ portrait_closeup:"85mm", full_body:"35mm", fashion_editorial:"85mm", cinematic_scene:"35mm", landscape:"24mm", product:"macro", food:"macro", interior:"24mm", architecture:"24mm", character:"50mm", sns_square:"35mm" })[type] || "35mm";
  }
  function defaultAngle(type){
    return ({ product:"eye_level", food:"eye_level", architecture:"low_angle", landscape:"wide_shot", portrait_closeup:"close_up", character:"eye_level" })[type] || "eye_level";
  }
  function defaultComposition(type){
    return ({ product:"centered", food:"centered", architecture:"symmetrical", landscape:"layered_depth", portrait_closeup:"centered", cinematic_scene:"diagonal" })[type] || "rule_of_thirds";
  }
  function defaultLighting(type){
    return ({ product:"studio_directional", food:"window_light", interior:"window_light", architecture:"soft_natural", cinematic_scene:"overcast" })[type] || "soft_natural";
  }
  function resolveLightingId(prompt){
    if (!prompt) return "";
    const match = D().lighting.find(item => item.prompt === prompt);
    return match?.id || "";
  }

  function buildContext(rawInput){
    const data = D();
    const input = fillMissingSlots(rawInput);
    const mood = byId(data.moods, input.moodId);
    const film = byId(data.films, input.filmId);
    const lens = byId(data.lenses, input.lensId);
    const angle = byId(data.angles, input.angleId);
    const composition = byId(data.compositions, input.compositionId);
    const lighting = byId(data.lighting, input.lightingId);
    const effects = (input.effectIds || []).map(id => byId(data.effects, id)).filter(Boolean);
    const ratio = resolveRatio(input);
    return { input, mood, film, lens, angle, composition, lighting, effects, ratio };
  }

  function buildMidjourney(ctx){
    const { input, film, lens, angle, composition, lighting, effects, ratio } = ctx;
    const visible = input.visibleTrait ? ` with ${input.visibleTrait}` : "";
    const place = input.place ? ` in ${input.place}` : "";
    const subjectLine = sentence(`${input.mainSubject || "A main subject"}${visible}${place}`);
    const actionLine = sentence(input.actionPose || defaultAction(input.subjectType));
    const foregroundParts = compact([input.foreground, ...(input.selectedVisualDetails || []).slice(0,2)]);
    const backgroundParts = compact([input.background, input.weatherTime, ...(input.selectedVisualDetails || []).slice(2,4)]);
    const foregroundLine = foregroundParts.length ? sentence(`${foregroundParts.join(", ")} in the foreground`) : "";
    const backgroundLine = backgroundParts.length ? sentence(`${backgroundParts.join(", ")} in the background`) : "";
    const styleParts = compact([
      film?.style,
      lens?.prompt,
      angle?.prompt,
      composition?.prompt,
      lighting?.prompt,
      ...effects.map(e => e.prompt),
      ...(film?.tones || []).slice(0,2)
    ]);
    const styleLine = sentence(styleParts.join(", "));
    return compact([subjectLine, actionLine, foregroundLine, backgroundLine, styleLine]).join("\n") + `\n--ar ${ratio} --raw --v 8.1`;
  }

  function defaultAction(type){
    const map = {
      product: "The product is centered clearly with its key design detail visible",
      food: "The dish is arranged clearly with visible texture and garnish",
      interior: "The room is arranged with a clear furniture layout",
      architecture: "The building stands clearly against the surrounding environment",
      landscape: "The main landscape form leads the eye through the frame",
      character: "The character stands in a neutral pose with a clear silhouette"
    };
    return map[type] || "The subject remains the visual focus of the frame";
  }

  function buildGPT(ctx){
    const { input, mood, film, lens, angle, composition, lighting, effects } = ctx;
    const subject = `${input.mainSubject || "a main subject"}${input.visibleTrait ? ` with ${input.visibleTrait}` : ""}`;
    const scene = input.place ? ` in ${input.place}` : "";
    const lines = [
      `Create a realistic film-style image of ${subject}${scene}.`,
      input.actionPose ? `The subject ${input.actionPose}.` : "",
      input.foreground ? `The foreground includes ${input.foreground}.` : "",
      input.background ? `The background includes ${input.background}.` : "",
      input.weatherTime ? `The time and atmosphere feel like ${input.weatherTime}.` : "",
      (input.selectedVisualDetails || []).length ? `Use visible mood details such as ${(input.selectedVisualDetails || []).join(", ")}.` : "",
      `The style should follow ${compact([film?.style, lens?.prompt, angle?.prompt, composition?.prompt, lighting?.prompt, ...effects.map(e=>e.prompt)]).join(", ")}.`,
      mood ? `The mood should feel like ${mood.labelEn.toLowerCase()}, but show it through physical details rather than abstract symbolism.` : "",
      "Keep the result photographic, coherent, and visually specific."
    ];
    return compact(lines).join(" ").replace(/\s+/g, " ");
  }

  function buildUniversal(ctx){
    const { input, film, lens, angle, composition, lighting, effects } = ctx;
    return compact([
      `Realistic film photo of ${input.mainSubject || "a main subject"}`,
      input.visibleTrait,
      input.actionPose,
      input.place,
      input.foreground,
      input.background,
      input.weatherTime,
      ...(input.selectedVisualDetails || []),
      film?.style,
      lens?.prompt,
      angle?.prompt,
      composition?.prompt,
      lighting?.prompt,
      ...effects.map(e => e.prompt),
      ...(film?.tones || []).slice(0,2)
    ]).join(", ");
  }

  function buildNegative(ctx){
    const base = ["oversaturated colors", "plastic skin", "harsh digital sharpening", "artificial HDR look", "distorted anatomy", "extra fingers", "warped face", "low detail", "cartoonish rendering", "messy composition"];
    const avoid = compact([...(ctx.mood?.avoid || []), ...(ctx.film?.avoid || [])]);
    return Array.from(new Set([...base, ...avoid])).join(", ");
  }

  function scorePrompt(prompt, ctx){
    const warnings = [];
    const suggestions = [];
    let subjectClarity = 20, visualSpecificity = 20, compositionStability = 20, styleConsistency = 15, mj81Compatibility = 15, originality = 10;
    const lines = prompt.split("\n").filter(Boolean);
    const first = lower(lines[0]);
    const subjectToken = lower(ctx.input.mainSubject || "").split(" ").filter(Boolean)[0];

    if (subjectToken && !first.includes(subjectToken)) {
      subjectClarity -= 8;
      warnings.push("첫 문장에 핵심 피사체가 충분히 앞쪽에 보이지 않습니다.");
      suggestions.push("핵심 피사체를 첫 문장의 주어로 이동하십시오.");
    }
    const weakUsed = weakWords.filter(w => lower(prompt).includes(w));
    if (weakUsed.length) {
      visualSpecificity -= Math.min(10, weakUsed.length * 3);
      warnings.push(`약한 표현이 포함되어 있습니다: ${weakUsed.join(", ")}`);
      suggestions.push("추상어를 빛, 재질, 위치, 사물, 표정 같은 시각 디테일로 바꾸십시오.");
    }
    if (!ctx.input.foreground && !(ctx.input.selectedVisualDetails || []).length) {
      compositionStability -= 5;
      warnings.push("전경 요소가 약합니다.");
      suggestions.push("가까운 오브젝트나 바닥 반사, 소품을 추가하십시오.");
    }
    if (!ctx.input.background) {
      compositionStability -= 4;
      warnings.push("배경 설명이 부족합니다.");
      suggestions.push("배경은 1~2개 요소로 짧게 추가하십시오.");
    }
    if ((ctx.input.effectIds || []).length > 3) {
      compositionStability -= 5;
      warnings.push("효과가 너무 많아 이미지가 지저분해질 수 있습니다.");
      suggestions.push("필름 효과는 2~3개로 줄이십시오.");
    }
    const last = lines[lines.length - 1] || "";
    if (!last.includes("--ar") || !last.includes("--raw") || !last.includes("--v 8.1")) {
      mj81Compatibility -= 10;
      warnings.push("Midjourney 8.1 파라미터가 마지막 줄에 충분히 정리되지 않았습니다.");
    }
    if (!ctx.film || !ctx.lens || !ctx.composition) {
      styleConsistency -= 4;
      warnings.push("필름, 렌즈, 구도 중 일부가 빠져 스타일 방향이 약합니다.");
    }
    if ((ctx.input.selectedVisualDetails || []).length < 2) originality -= 2;
    const clamp = (n,min,max)=>Math.max(min,Math.min(max,n));
    const result = {
      subjectClarity: clamp(subjectClarity,0,20),
      visualSpecificity: clamp(visualSpecificity,0,20),
      compositionStability: clamp(compositionStability,0,20),
      styleConsistency: clamp(styleConsistency,0,15),
      mj81Compatibility: clamp(mj81Compatibility,0,15),
      originality: clamp(originality,0,10),
      warnings,
      suggestions
    };
    result.total = result.subjectClarity + result.visualSpecificity + result.compositionStability + result.styleConsistency + result.mj81Compatibility + result.originality;
    return result;
  }

  function generatePrompts(rawInput){
    const ctx = buildContext(rawInput);
    const midjourney = buildMidjourney(ctx);
    const prompts = {
      midjourney,
      gpt: buildGPT(ctx),
      universal: buildUniversal(ctx),
      negative: buildNegative(ctx)
    };
    return { input: ctx.input, ctx, prompts, score: scorePrompt(midjourney, ctx) };
  }

  const STORAGE_KEY = "film_prompt_studio_saved_prompts";
  function getSaved(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
  }
  function saveLocal(payload){
    const now = new Date().toISOString();
    const item = Object.assign({ id: `fps_${Date.now()}`, createdAt: now, updatedAt: now, favorite: false }, payload);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([item, ...getSaved()]));
    return item;
  }

  window.FPS_ENGINE = { generatePrompts, resolveRatio, getSaved, saveLocal, byId };
})();
