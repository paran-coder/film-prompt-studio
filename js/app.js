(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const D = () => window.FPS_DATA;
  const E = () => window.FPS_ENGINE;

  function toast(message){
    let el = $('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('show');
    setTimeout(()=>el.classList.remove('show'), 1900);
  }

  function setOptions(select, items, labelKey='label', includeAuto=false){
    if (!select) return;
    select.innerHTML = '';
    if (includeAuto) select.add(new Option('자동 추천', 'auto'));
    items.forEach(item => select.add(new Option(item[labelKey] || item.label || item.title || item.id, item.id)));
  }

  function getParam(name){ return new URLSearchParams(location.search).get(name); }

  function initHome(){
    if (!document.body.dataset.page || document.body.dataset.page !== 'home') return;
    const moodSelect = $('#quickMood');
    setOptions(moodSelect, D().moods);

    const presetWrap = $('#presetPreview');
    if (presetWrap) {
      presetWrap.innerHTML = D().presets.slice(0, 8).map(p => {
        const mood = E().byId(D().moods, p.mood);
        const film = E().byId(D().films, p.film);
        return `<article class="preset-card">
          <h3>${p.title}</h3>
          <p>${mood?.description || ''}</p>
          <div class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}<span class="tag brown">${film?.label || ''}</span></div>
          <div style="margin-top:18px"><a class="btn small secondary" href="builder.html?preset=${p.id}">이 조합으로 시작</a></div>
        </article>`;
      }).join('');
    }

    const form = $('#quickForm');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const subject = encodeURIComponent($('#quickSubject').value || 'a woman in a black wool coat');
        const mood = encodeURIComponent($('#quickMood').value || 'loneliness');
        const tool = encodeURIComponent($('#quickTool').value || 'midjourney');
        const ratio = encodeURIComponent($('#quickRatio').value || 'auto');
        location.href = `builder.html?subject=${subject}&mood=${mood}&tool=${tool}&ratio=${ratio}`;
      });
    }
  }

  function createCardButtons(container, items, selected, onClick, label='label', sub='description'){
    container.innerHTML = items.map(item => `<button type="button" class="select-card ${selected===item.id?'active':''}" data-id="${item.id}">
      <strong>${item[label] || item.label || item.title}</strong>
      <span>${item[sub] || item.effect || item.prompt || ''}</span>
    </button>`).join('');
    $$('.select-card', container).forEach(btn => btn.addEventListener('click', () => onClick(btn.dataset.id)));
  }

  function createChips(container, items, selectedIds, onToggle){
    container.innerHTML = items.map(item => {
      const id = typeof item === 'string' ? item : item.id;
      const label = typeof item === 'string' ? item : (item.label || item.prompt || item.id);
      return `<button type="button" class="chip ${selectedIds.includes(id)?'active':''}" data-id="${id}">${label}</button>`;
    }).join('');
    $$('.chip', container).forEach(chip => chip.addEventListener('click', () => onToggle(chip.dataset.id)));
  }

  function initBuilder(){
    if (!document.body.dataset.page || document.body.dataset.page !== 'builder') return;
    const state = {
      subjectType: 'cinematic_scene',
      mainSubject: 'a woman in a black wool coat',
      visibleTrait: 'wet dark hair and a transparent umbrella',
      actionPose: 'walks across a wet London crosswalk',
      place: 'rainy London street',
      foreground: 'red bus lights reflected on black pavement',
      background: 'shuttered storefronts and distant streetlights',
      weatherTime: 'grey evening mist and pale rain',
      moodId: 'loneliness',
      selectedVisualDetails: [],
      filmId: 'ilford_hp5',
      lensId: '50mm',
      angleId: 'eye_level',
      compositionId: 'diagonal',
      lightingId: 'overcast',
      effectIds: ['visible_grain','lifted_blacks'],
      ratio: 'auto',
      platform: 'midjourney',
      strength: 'balanced'
    };

    let currentTab = 'midjourney';

    const savedParam = getParam('saved');
    if (savedParam && applySaved(savedParam)) {
      // Saved prompt restored from localStorage.
    } else {
      const presetParam = getParam('preset');
      if (presetParam) applyPreset(presetParam, false);
      const subjectParam = getParam('subject');
      if (subjectParam) state.mainSubject = subjectParam;
      const moodParam = getParam('mood');
      if (moodParam) state.moodId = moodParam;
      const ratioParam = getParam('ratio');
      if (ratioParam) state.ratio = ratioParam;
    }

    function applyPreset(id, shouldRender=true){
      const p = E().byId(D().presets, id);
      if (!p) return;
      state.subjectType = p.subjectType;
      state.moodId = p.mood;
      state.filmId = p.film;
      state.lensId = p.lens;
      state.angleId = p.angle;
      state.compositionId = p.composition;
      state.lightingId = p.lighting;
      state.effectIds = [...p.effects];
      state.ratio = p.ratio || 'auto';
      const mood = E().byId(D().moods, state.moodId);
      state.selectedVisualDetails = (mood?.visualDetails || []).slice(0,3);
      if (id === 'luxury_product') {
        Object.assign(state, { mainSubject:'a clear glass perfume bottle', visibleTrait:'pale gold liquid and thin gold trim', actionPose:'sits centered on a black marble surface', place:'minimal studio set', foreground:'deep velvet fabric and clear glass reflections', background:'soft amber light on a neutral wall', weatherTime:'' });
      }
      if (id === 'blue_forest') {
        Object.assign(state, { mainSubject:'a narrow forest trail', visibleTrait:'blue mist between tall pine trees', actionPose:'leads into the distance at dawn', place:'cold morning forest', foreground:'wet moss and dark roots', background:'pale blue sky behind tree silhouettes', weatherTime:'soft morning haze' });
      }
      if (id === 'wedding_portra') {
        Object.assign(state, { mainSubject:'a bride holding a small bouquet', visibleTrait:'cream silk dress and soft veil', actionPose:'turns toward warm backlight', place:'quiet garden aisle', foreground:'white petals on the ground', background:'blurred guests and pale flowers', weatherTime:'golden hour light' });
      }
      if (id === 'japanese_everyday') {
        Object.assign(state, { mainSubject:'a young woman with a canvas tote bag', visibleTrait:'short dark hair and a pale linen shirt', actionPose:'stands beside a vending machine on a quiet street', place:'small Japanese seaside town', foreground:'painted road markings and a parked bicycle', background:'cream walls and pastel green shutters', weatherTime:'soft natural daylight' });
      }
      if (id === 'future_city') {
        Object.assign(state, { mainSubject:'a lone courier in a reflective rain jacket', visibleTrait:'black helmet and glowing wrist device', actionPose:'stands on a wet pedestrian bridge', place:'futuristic city street', foreground:'cyan neon reflections on black pavement', background:'glass towers and holographic signs', weatherTime:'rainy night atmosphere' });
      }
      if (shouldRender) renderAll();
    }

    function applySaved(id){
      const saved = E().getSaved().find(item => item.id === id);
      if (!saved || !saved.input) return false;
      Object.assign(state, saved.input);
      state.effectIds = Array.isArray(state.effectIds) ? state.effectIds : [];
      state.selectedVisualDetails = Array.isArray(state.selectedVisualDetails) ? state.selectedVisualDetails : [];
      state.ratio = state.ratio || 'auto';
      state.platform = state.platform || preferredPlatform(saved);
      currentTab = preferredPlatform(saved);
      setTimeout(() => toast('저장한 프롬프트를 Builder로 불러왔습니다.'), 250);
      return true;
    }


    function applySubjectTypeDefaults(type){
      const lensMap = { portrait_closeup:'85mm', full_body:'35mm', fashion_editorial:'85mm', cinematic_scene:'35mm', landscape:'24mm', product:'macro', food:'macro', interior:'24mm', architecture:'24mm', character:'50mm', sns_square:'35mm' };
      const angleMap = { portrait_closeup:'close_up', full_body:'eye_level', fashion_editorial:'eye_level', product:'eye_level', food:'eye_level', architecture:'low_angle', landscape:'wide_shot', character:'eye_level' };
      const compositionMap = { portrait_closeup:'centered', full_body:'rule_of_thirds', fashion_editorial:'rule_of_thirds', product:'centered', food:'centered', architecture:'symmetrical', landscape:'layered_depth', cinematic_scene:'diagonal' };
      if (lensMap[type]) state.lensId = lensMap[type];
      if (angleMap[type]) state.angleId = angleMap[type];
      if (compositionMap[type]) state.compositionId = compositionMap[type];
      state.ratio = 'auto';
    }

    function hydrateControls(){
      setOptions($('#subjectType'), D().subjectTypes);
      setOptions($('#ratio'), [
        {id:'1:1', label:'1:1 SNS / 제품'}, {id:'2:3', label:'2:3 전신 / 포스터'}, {id:'3:2', label:'3:2 풍경 / 다큐'}, {id:'4:3', label:'4:3 인테리어'}, {id:'4:5', label:'4:5 인물 / 음식'}, {id:'16:9', label:'16:9 시네마틱'}
      ], 'label', true);
      setOptions($('#presetSelect'), D().presets, 'title', true);
      $('#presetSelect').querySelector('option[value="auto"]').textContent = '프리셋 선택 안 함';
      setOptions($('#moodId'), D().moods);

      createCardButtons($('#filmCards'), D().films, state.filmId, id => { state.filmId = id; renderAll(); }, 'label', 'style');
      createCardButtons($('#lensCards'), D().lenses, state.lensId, id => { state.lensId = id; renderAll(); }, 'label', 'description');
      createCardButtons($('#angleCards'), D().angles, state.angleId, id => { state.angleId = id; renderAll(); }, 'label', 'effect');
      createCardButtons($('#compositionCards'), D().compositions, state.compositionId, id => { state.compositionId = id; renderAll(); }, 'label', 'effect');
      createCardButtons($('#lightingCards'), D().lighting, state.lightingId, id => { state.lightingId = id; renderAll(); }, 'label', 'prompt');
      createChips($('#effectChips'), D().effects, state.effectIds, id => {
        if (state.effectIds.includes(id)) state.effectIds = state.effectIds.filter(x => x !== id);
        else {
          if (state.effectIds.length >= 3) { toast('효과는 최대 3개까지만 권장합니다.'); return; }
          state.effectIds.push(id);
        }
        renderAll();
      });
    }

    function syncInputsFromState(){
      const ids = ['subjectType','mainSubject','visibleTrait','actionPose','place','foreground','background','weatherTime','moodId','ratio'];
      ids.forEach(id => { const el = $('#'+id); if (el) el.value = state[id] || ''; });
    }

    function readBasicInputs(){
      ['subjectType','mainSubject','visibleTrait','actionPose','place','foreground','background','weatherTime','moodId','ratio'].forEach(id => {
        const el = $('#'+id); if (el) state[id] = el.value;
      });
    }

    function renderMoodDetails(){
      const mood = E().byId(D().moods, state.moodId);
      if (!mood) return;
      if (!state.selectedVisualDetails.length) state.selectedVisualDetails = mood.visualDetails.slice(0,3);
      const valid = mood.visualDetails;
      state.selectedVisualDetails = state.selectedVisualDetails.filter(v => valid.includes(v));
      if (!state.selectedVisualDetails.length) state.selectedVisualDetails = mood.visualDetails.slice(0,3);
      createChips($('#visualChips'), mood.visualDetails, state.selectedVisualDetails, prompt => {
        if (state.selectedVisualDetails.includes(prompt)) state.selectedVisualDetails = state.selectedVisualDetails.filter(x => x !== prompt);
        else state.selectedVisualDetails.push(prompt);
        renderAll();
      });
      $('#moodDescription').textContent = mood.description;
    }

    function renderCardsActive(){
      createCardButtons($('#filmCards'), D().films, state.filmId, id => { state.filmId = id; renderAll(); }, 'label', 'style');
      createCardButtons($('#lensCards'), D().lenses, state.lensId, id => { state.lensId = id; renderAll(); }, 'label', 'description');
      createCardButtons($('#angleCards'), D().angles, state.angleId, id => { state.angleId = id; renderAll(); }, 'label', 'effect');
      createCardButtons($('#compositionCards'), D().compositions, state.compositionId, id => { state.compositionId = id; renderAll(); }, 'label', 'effect');
      createCardButtons($('#lightingCards'), D().lighting, state.lightingId, id => { state.lightingId = id; renderAll(); }, 'label', 'prompt');
      createChips($('#effectChips'), D().effects, state.effectIds, id => {
        if (state.effectIds.includes(id)) state.effectIds = state.effectIds.filter(x => x !== id);
        else {
          if (state.effectIds.length >= 3) { toast('효과는 최대 3개까지만 권장합니다.'); return; }
          state.effectIds.push(id);
        }
        renderAll();
      });
    }

    let currentResult = null;

    function renderOutputs(){
      const result = E().generatePrompts(state);
      currentResult = result;
      const map = { midjourney: result.prompts.midjourney, gpt: result.prompts.gpt, universal: result.prompts.universal };
      if (!map[currentTab]) currentTab = 'midjourney';
      $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === currentTab));
      $('#promptOutput').value = map[currentTab];
      $('#negativeOutput').value = result.prompts.negative;
      $('#resolvedRatio').textContent = `적용 비율: --ar ${result.ctx.ratio}`;
      $('#scoreNumber').textContent = result.score.total;
      const bars = [
        ['피사체', result.score.subjectClarity, 20],
        ['시각성', result.score.visualSpecificity, 20],
        ['구도', result.score.compositionStability, 20],
        ['스타일', result.score.styleConsistency, 15],
        ['v8.1', result.score.mj81Compatibility, 15],
        ['독창성', result.score.originality, 10]
      ];
      $('#scoreBars').innerHTML = bars.map(([name,val,max]) => `<div class="bar-row"><span>${name}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.round(val/max*100)}%"></div></div><strong>${val}</strong></div>`).join('');
      const notices = [...result.score.warnings.map(w=>['warn',w]), ...result.score.suggestions.map(s=>['',s])].slice(0,6);
      $('#notices').innerHTML = notices.length ? notices.map(([type,text])=>`<div class="notice ${type}">${text}</div>`).join('') : '<div class="notice">현재 프롬프트 구조는 안정적입니다.</div>';
      $('#savedCount').textContent = E().getSaved().length;
    }

    function renderAll(){
      readBasicInputs();
      renderMoodDetails();
      syncInputsFromState();
      renderCardsActive();
      renderOutputs();
    }

    hydrateControls();
    syncInputsFromState();
    renderAll();

    ['subjectType','mainSubject','visibleTrait','actionPose','place','foreground','background','weatherTime','moodId','ratio'].forEach(id => {
      const el = $('#'+id);
      if (el) el.addEventListener('input', () => {
        if (id === 'moodId') state.selectedVisualDetails = [];
        if (id === 'subjectType') applySubjectTypeDefaults(el.value);
        renderAll();
      });
      if (el) el.addEventListener('change', () => {
        if (id === 'moodId') state.selectedVisualDetails = [];
        if (id === 'subjectType') applySubjectTypeDefaults(el.value);
        renderAll();
      });
    });

    $('#presetSelect').addEventListener('change', e => {
      if (e.target.value !== 'auto') applyPreset(e.target.value, true);
    });

    $$('.tab').forEach(tab => tab.addEventListener('click', () => {
      currentTab = tab.dataset.tab;
      $$('.tab').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      renderOutputs();
    }));

    $('#copyPrompt').addEventListener('click', async () => {
      await navigator.clipboard.writeText($('#promptOutput').value);
      toast('프롬프트를 복사했습니다.');
    });
    $('#copyNegative').addEventListener('click', async () => {
      await navigator.clipboard.writeText($('#negativeOutput').value);
      toast('네거티브 프롬프트를 복사했습니다.');
    });
    $('#savePrompt').addEventListener('click', () => {
      if (!currentResult) return;
      E().saveLocal({
        title: state.mainSubject || 'Untitled Prompt',
        input: currentResult.input,
        outputs: currentResult.prompts,
        score: currentResult.score,
        selectedPlatform: currentTab,
        tags: [state.moodId, state.filmId, state.lensId].filter(Boolean)
      });
      renderOutputs();
      toast('브라우저에 저장했습니다.');
    });
    $('#resetBuilder').addEventListener('click', () => {
      location.href = 'builder.html';
    });
    $('#polishPrompt').addEventListener('click', () => {
      // Lightweight polish: replace awkward first lines for common samples, otherwise keep stable output.
      if (!currentResult) return;
      const p = $('#promptOutput').value;
      const improved = p
        .replace(/A woman in a black wool coat with wet dark hair and a transparent umbrella in rainy London street\./i, 'A woman in a black wool coat walks across a wet London crosswalk.')
        .replace(/walks across a wet London crosswalk\./i, 'Pale rain clings to her dark hair and transparent umbrella.');
      $('#promptOutput').value = improved;
      toast('문장 흐름을 다듬었습니다.');
    });
  }



  function esc(value){
    return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  async function copyText(text){
    try {
      await navigator.clipboard.writeText(text || '');
      toast('복사되었습니다.');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text || '';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      toast('복사되었습니다.');
    }
  }


  function platformLabel(key){
    return ({ midjourney:'Midjourney 8.1', gpt:'GPT Image', universal:'Universal' })[key] || 'Midjourney 8.1';
  }

  function preferredPlatform(item){
    const key = item?.selectedPlatform || item?.platform || 'midjourney';
    return ['midjourney','gpt','universal'].includes(key) ? key : 'midjourney';
  }

  function preferredOutput(item){
    const key = preferredPlatform(item);
    return item?.outputs?.[key] || item?.outputs?.midjourney || item?.outputs?.gpt || item?.outputs?.universal || '';
  }

  function presetInputFor(id){
    const p = E().byId(D().presets, id) || D().presets[0];
    return Object.assign({
      subjectType: p.subjectType,
      moodId: p.mood,
      filmId: p.film,
      lensId: p.lens,
      angleId: p.angle,
      compositionId: p.composition,
      lightingId: p.lighting,
      effectIds: p.effects || [],
      ratio: p.ratio || 'auto',
      strength: 'balanced',
      platform: 'midjourney'
    }, p.input || {});
  }

  function presetCardLegacy(p){
    const mood = E().byId(D().moods, p.mood);
    const film = E().byId(D().films, p.film);
    return `<article class="preset-card preset-card-legacy" data-preset="${esc(p.id)}">
      <div class="preset-kicker">${esc(mood?.label || '')} · ${esc(film?.label || '')}</div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.input?.mainSubject || '')}</p>
      <div class="tags">${(p.tags || []).slice(0,4).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>
      <div class="preset-actions">
        <a class="btn small primary" href="builder.html?preset=${encodeURIComponent(p.id)}">Builder로 열기</a>
        <button class="btn small secondary" data-preview="${esc(p.id)}" type="button">상세</button>
      </div>
    </article>`;
  }

  function galleryCardLegacy(p, index){
    const result = E().generatePrompts(presetInputFor(p.id));
    const gradients = ['#263d31,#c99147','#7a4f32,#263d31','#1d2e2b,#8a6d49','#33251e,#b17842','#425947,#d0b184'];
    const firstLines = result.prompts.midjourney.split('\n').slice(0, 2).join(' ');
    return `<article class="gallery-card gallery-card-legacy">
      <div class="photo-thumb" style="background-image:linear-gradient(135deg, ${gradients[index % gradients.length]});"></div>
      <div class="gallery-body">
        <div class="preset-kicker">Prompt Score ${result.score.total}</div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(firstLines)}</p>
        <div class="tags">${(p.tags||[]).slice(0,4).map(t=>`<span class="tag green">${esc(t)}</span>`).join('')}</div>
        <div class="card-actions">
          <button class="btn small secondary" data-copy-prompt="${esc(p.id)}" type="button">프롬프트 복사</button>
          <a class="btn small primary" href="builder.html?preset=${encodeURIComponent(p.id)}">이 조합으로 시작</a>
        </div>
      </div>
    </article>`;
  }

  function initPresets(){
    if (document.body.dataset.page !== 'presets') return;
    setOptions($('#filterMood'), D().moods, 'label', true);
    setOptions($('#filterFilm'), D().films, 'label', true);
    const autoM = $('#filterMood option[value="auto"]'); if (autoM) autoM.textContent = '전체 무드';
    const autoF = $('#filterFilm option[value="auto"]'); if (autoF) autoF.textContent = '전체 필름';
    const focus = getParam('focus');

    function filtered(){
      const q = ($('#presetSearch')?.value || '').toLowerCase();
      const mood = $('#filterMood')?.value || 'auto';
      const film = $('#filterFilm')?.value || 'auto';
      return D().presets.filter(p => {
        const haystack = [p.title, ...(p.tags||[]), p.input?.mainSubject, p.input?.place].join(' ').toLowerCase();
        return (mood === 'auto' || p.mood === mood) && (film === 'auto' || p.film === film) && (!q || haystack.includes(q));
      });
    }

    function showDetail(id){
      const p = E().byId(D().presets, id) || D().presets[0];
      const result = E().generatePrompts(presetInputFor(p.id));
      const detail = $('#presetDetail');
      if (!detail) return;
      detail.innerHTML = `<div class="preset-kicker">Preset Detail</div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.input?.mainSubject || '')}</p>
        <div class="tags">${(p.tags||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>
        <textarea class="code" readonly>${esc(result.prompts.midjourney)}</textarea>
        <div class="card-actions">
          <a class="btn small primary" href="builder.html?preset=${encodeURIComponent(p.id)}">Builder로 열기</a>
          <button class="btn small secondary" id="copyPresetPrompt" type="button">복사</button>
        </div>`;
      $('#copyPresetPrompt')?.addEventListener('click', () => copyText(result.prompts.midjourney));
    }

    function render(){
      const list = filtered();
      const listEl = $('#presetList');
      if (listEl) listEl.innerHTML = list.map(presetCardLegacy).join('') || '<div class="notice">검색 결과가 없습니다.</div>';
      $$('#presetList [data-preview]').forEach(btn => btn.addEventListener('click', () => showDetail(btn.dataset.preview)));
      if ($('#presetCount')) $('#presetCount').textContent = `${list.length} presets`;
      if (list[0]) showDetail(focus || list[0].id);
    }

    ['presetSearch','filterMood','filterFilm'].forEach(id => $('#'+id)?.addEventListener('input', render));
    ['filterMood','filterFilm'].forEach(id => $('#'+id)?.addEventListener('change', render));
    render();
  }

  function initGallery(){
    if (document.body.dataset.page !== 'gallery') return;
    setOptions($('#galleryMood'), D().moods, 'label', true);
    const auto = $('#galleryMood option[value="auto"]'); if (auto) auto.textContent = '전체 무드';

    function render(){
      const mood = $('#galleryMood')?.value || 'auto';
      const q = ($('#gallerySearch')?.value || '').toLowerCase();
      const list = D().presets.filter(p => {
        const haystack = [p.title, ...(p.tags||[]), p.input?.mainSubject, p.input?.place].join(' ').toLowerCase();
        return (mood === 'auto' || p.mood === mood) && (!q || haystack.includes(q));
      });
      if ($('#galleryList')) $('#galleryList').innerHTML = list.map(galleryCardLegacy).join('') || '<div class="notice">검색 결과가 없습니다.</div>';
      $$('#galleryList [data-copy-prompt]').forEach(btn => btn.addEventListener('click', () => copyText(E().generatePrompts(presetInputFor(btn.dataset.copyPrompt)).prompts.midjourney)));
      if ($('#galleryCount')) $('#galleryCount').textContent = `${list.length} examples`;
    }

    ['galleryMood','gallerySearch'].forEach(id => $('#'+id)?.addEventListener('input', render));
    $('#galleryMood')?.addEventListener('change', render);
    render();
  }

  const LOCAL_KEY = 'film_prompt_studio_saved_prompts';
  function setSavedList(list){ localStorage.setItem(LOCAL_KEY, JSON.stringify(list)); }
  function exportSavedList(){
    const blob = new Blob([JSON.stringify(E().getSaved(), null, 2)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'film-prompt-studio-prompts.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function initWorkspace(){
    if (document.body.dataset.page !== 'workspace') return;
    function render(){
      const q = ($('#workspaceSearch')?.value || '').toLowerCase();
      const tab = $('#workspaceTab')?.value || 'all';
      const saved = E().getSaved();
      const list = saved.filter(item => {
        const haystack = [item.title, ...(item.tags||[]), item.input?.mainSubject].join(' ').toLowerCase();
        if (tab === 'favorite' && !item.favorite) return false;
        if (tab === 'highscore' && (item.score?.total || 0) < 90) return false;
        if (tab === 'midjourney' && !item.outputs?.midjourney) return false;
        return !q || haystack.includes(q);
      });
      const target = $('#workspaceList');
      if (target) target.innerHTML = list.map(item => {
        const primary = preferredPlatform(item);
        const platforms = ['midjourney','gpt','universal'];
        const platformBadges = platforms.map(key => `<span class="platform-badge ${key === primary ? 'active' : ''}">${platformLabel(key)}</span>`).join('');
        return `<article class="saved-card">
        <div class="saved-top"><div><h3>${esc(item.title || 'Untitled Prompt')}</h3><small>Score ${item.score?.total || '-'} · ${esc(item.createdAt?.slice(0,10) || '')} · 기본 출력: ${platformLabel(primary)}</small></div><button class="icon-btn ${item.favorite?'active':''}" data-fav="${esc(item.id)}" type="button">★</button></div>
        <div class="platform-badges">${platformBadges}</div>
        <p>${esc(preferredOutput(item).split('\n')[0] || item.input?.mainSubject || '')}</p>
        <div class="tags">${(item.tags||[]).slice(0,5).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>
        <div class="card-actions"><a class="btn small primary" href="builder.html?saved=${encodeURIComponent(item.id)}">Builder로 열기</a><button class="btn small secondary" data-copy="${esc(item.id)}" type="button">기본 출력 복사</button><button class="btn small secondary" data-dup="${esc(item.id)}" type="button">복제</button><button class="btn small ghost" data-del="${esc(item.id)}" type="button">삭제</button></div>
      </article>`;
      }).join('') || '<div class="notice">저장된 프롬프트가 없습니다.</div>';
      if ($('#workspaceCount')) $('#workspaceCount').textContent = String(list.length);
      $$('#workspaceList [data-copy]').forEach(btn => btn.addEventListener('click', () => { const item=E().getSaved().find(x=>x.id===btn.dataset.copy); copyText(preferredOutput(item)); }));
      $$('#workspaceList [data-del]').forEach(btn => btn.addEventListener('click', () => { setSavedList(E().getSaved().filter(x=>x.id!==btn.dataset.del)); render(); }));
      $$('#workspaceList [data-fav]').forEach(btn => btn.addEventListener('click', () => { const list=E().getSaved(); const item=list.find(x=>x.id===btn.dataset.fav); if (item) item.favorite=!item.favorite; setSavedList(list); render(); }));
      $$('#workspaceList [data-dup]').forEach(btn => btn.addEventListener('click', () => { const item=E().getSaved().find(x=>x.id===btn.dataset.dup); if (item) { const copy = Object.assign({}, item, { title:(item.title || 'Prompt')+' Copy' }); delete copy.id; delete copy.createdAt; delete copy.updatedAt; E().saveLocal(copy); } render(); }));
    }
    ['workspaceSearch','workspaceTab'].forEach(id => $('#'+id)?.addEventListener('input', render));
    $('#workspaceTab')?.addEventListener('change', render);
    $('#exportJson')?.addEventListener('click', exportSavedList);
    $('#clearAllSaved')?.addEventListener('click', () => { if (confirm('저장된 프롬프트를 모두 삭제할까요?')) { setSavedList([]); render(); } });
    $('#importJson')?.addEventListener('change', e => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try { const imported = JSON.parse(reader.result); if (Array.isArray(imported)) setSavedList([...imported, ...E().getSaved()]); toast('가져왔습니다.'); render(); }
        catch { toast('가져오기에 실패했습니다.'); }
      };
      reader.readAsText(file);
    });
    render();
  }


  document.addEventListener('DOMContentLoaded', () => {
    initHome();
    initBuilder();
    initPresets();
    initGallery();
    initWorkspace();
  });
})();
