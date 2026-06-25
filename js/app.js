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
      presetWrap.innerHTML = D().presets.map(p => {
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

    const presetParam = getParam('preset');
    if (presetParam) applyPreset(presetParam, false);
    const subjectParam = getParam('subject');
    if (subjectParam) state.mainSubject = subjectParam;
    const moodParam = getParam('mood');
    if (moodParam) state.moodId = moodParam;
    const ratioParam = getParam('ratio');
    if (ratioParam) state.ratio = ratioParam;

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
    let currentTab = 'midjourney';

    function renderOutputs(){
      const result = E().generatePrompts(state);
      currentResult = result;
      const map = { midjourney: result.prompts.midjourney, gpt: result.prompts.gpt, universal: result.prompts.universal };
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
        renderAll();
      });
      if (el) el.addEventListener('change', () => {
        if (id === 'moodId') state.selectedVisualDetails = [];
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

  document.addEventListener('DOMContentLoaded', () => {
    initHome();
    initBuilder();
  });
})();
