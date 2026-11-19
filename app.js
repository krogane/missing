(() => {
  'use strict';
  const C = window.NF_SITE;
  const main = document.getElementById('main');
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[ch]));
  const safeUrl = value => {
    try {
      const target = new URL(value);
      return ['https:', 'http:'].includes(target.protocol) ? target.href : '';
    } catch (_) { return ''; }
  };
  // 本番は assets/ 内の画像、単体プレビューは安全な JPEG data URI を使います。
  const imageSource = value => {
    const input = String(value || '');
    if (/^assets\/[a-z0-9._-]+\.(?:jpg|jpeg|png|webp|svg)$/i.test(input)) return input;
    if (/^data:image\/(?:jpeg|png|webp);base64,[a-z0-9+/=]+$/i.test(input)) return input;
    return safeUrl(input);
  };
  const withBreaks = value => esc(value).replace(/\n/g, '<br>');
  const status = c => `<span class="case-status ${c.statusType === 'closed' ? 'closed' : ''}">${esc(c.status)}</span>`;
  const art = `<div class="hero-art" aria-hidden="true"><div class="art-grid"></div><div class="art-frame"></div><div class="art-sheet"></div><span class="art-label">ARCHIVE / INFORMATION</span><span class="art-no">01</span></div>`;

  function pageHeader(title, description, code = 'INFORMATION & SEARCH') {
    return `<section class="subhero"><div class="wrap">
      <div class="breadcrumbs"><a href="#/">ホーム</a><span> / </span>${esc(title)}</div>
      <div class="eyebrow">${esc(code)}</div>
      <h1>${esc(title)}</h1>${description ? `<p>${esc(description)}</p>` : ''}
    </div></section>`;
  }
  function sectionHeading(title, code) {
    return `<div class="section-heading"><h2>${esc(title)}</h2><small>${esc(code)}</small></div>`;
  }
  function personThumbnail(c, style = 'card') {
    const src = imageSource(c.photo);
    const photo = src ? `<img class="person-image" src="${esc(src)}" alt="${esc(c.name)}の人物イメージ">` : '';
    const note = src ? '' : `<small class="image-todo-note">人物画像は後日追加予定</small>`;
    if (style === 'card') {
      return `<div class="person-thumb" aria-label="${esc(c.name)}の人物画像掲載欄">
        ${photo || `<em>RECORD ${esc(c.id)}</em><strong>${esc(c.id.slice(-2))}</strong>${note}`}
      </div>`;
    }
    return `<div class="person-side-thumb" aria-label="${esc(c.name)}の人物画像掲載欄">
      ${photo || `<span>${esc(c.id.slice(-2))}</span>${note}`}
    </div>`;
  }
  function profileImage(c) {
    const src = imageSource(c.photo);
    return `<div class="profile-photo">
      ${src ? `<img class="person-image" src="${esc(src)}" alt="${esc(c.name)}の人物イメージ">`
        : `<span>${esc(c.id.slice(-2))}</span><small>制作担当者向け：人物イメージ画像は後日追加予定</small>`}
    </div>`;
  }
  function emptyCard(slot) {
    return `<div class="person-card person-card-empty" aria-label="未登録の調査記録枠">
      <div class="person-thumb empty-thumb"><span>NO IMAGE</span></div>
      <div class="person-card-body"><div class="small-kicker">UNREGISTERED / SLOT ${String(slot).padStart(2,'0')}</div>
      <h3>未登録</h3><p>公開中の情報はありません。</p>
      <div class="card-foot"><span class="case-status closed">登録情報なし</span><span class="line-link-muted">—</span></div></div>
    </div>`;
  }
  function emptyRow(slot) {
    return `<div class="record-row record-row-empty" aria-label="未登録の調査記録枠">
      <div class="person-side-thumb empty-thumb"><span>—</span></div><div>
      <div class="small-kicker">UNREGISTERED / SLOT ${String(slot).padStart(2,'0')}</div>
      <h2 class="row-title">未登録</h2><p class="row-desc">現在、登録されている情報はありません。</p>
      <div class="record-meta"><span>氏名：—</span><span>最終確認：—</span></div></div>
      <span class="empty-row-indicator">登録情報なし</span></div>`;
  }
  function personCard(c) {
    return `<a class="person-card" href="#/record/${encodeURIComponent(c.id)}">
      ${personThumbnail(c)}<div class="person-card-body">
      <div class="small-kicker">SEARCH RECORD / ${esc(c.id)}</div>
      <h3>${esc(c.name)}</h3><p>失踪日時：${esc(c.missingDate)}</p>
      <div class="card-foot">${status(c)}<span class="line-link">詳細を見る →</span></div></div></a>`;
  }
  function home() {
    const featured = C.cases.slice(0, 3);
    const placeholders = Array.from({length: Math.max(0, 3 - featured.length)}, (_, i) => emptyCard(featured.length + i + 1));
    return `<div class="wrap"><section class="hero"><div>
      <div class="eyebrow">${esc(C.heroEyebrow)}</div>
      <h1>${withBreaks(C.heroTitle)}</h1>
      <p class="hero-description">${withBreaks(C.heroText)}</p>
      <div class="hero-actions"><a href="#/records" class="button-outline">調査記録を見る →</a>
      <a href="#/about" class="text-arrow">私たちについて</a></div></div>${art}
    </section><section class="section">
      ${sectionHeading('情報を探している人たち', 'RECORDS / RECENTLY UPDATED')}
      <div class="card-grid">${featured.map(personCard).join('')}${placeholders.join('')}</div>
      <div style="text-align:right;margin-top:23px"><a href="#/records" class="text-arrow">すべての調査記録を見る</a></div>
      <div class="announcement"><strong>お知らせ　${esc(C.updateDate)}</strong><p>${esc(C.announcement)}</p></div>
    </section></div><section class="soft-band"><div class="wrap band-grid"><div>
      <div class="eyebrow">YOUR INFORMATION MAY HELP</div>
      <h2>どんな小さな情報でも、構いません。</h2>
      <p>メモや見覚えのある言葉。<br>気になる手がかりがあれば、照合してみてください。</p>
    </div><div><a href="#/check" class="button-primary">キーワードを照合する →</a></div></div></section>`;
  }
  function records() {
    const rows = C.cases.map(c => `<article class="record-row">
      ${personThumbnail(c, 'list')}<div>
        <div class="small-kicker">SEARCH RECORD / ${esc(c.id)}　・　${status(c)}</div>
        <h2 class="row-title">${esc(c.name)}</h2>
        <p class="row-desc">${esc(c.features)}</p>
        <div class="record-meta"><span>失踪日時：${esc(c.missingDate)}</span><span>更新：${esc(c.update)}</span></div>
      </div><a class="row-action" href="#/record/${encodeURIComponent(c.id)}" aria-label="${esc(c.name)}の詳細情報を見る">詳細情報はこちら →</a>
    </article>`).join('');
    const emptyRows = Array.from({length:C.unregisteredSlots ?? 0}, (_, i) => emptyRow(C.cases.length + i + 1)).join('');
    return `${pageHeader('行方不明者一覧', '現在公開している調査記録の一覧です。', 'SEARCH RECORDS')}
      <div class="wrap page-body"><p class="page-intro">公開中の調査記録から、現在の状況や最後に確認された情報をご覧いただけます。更新内容は各ページに記載しています。</p>
      <p class="result-count">登録済みの記録：${C.cases.length} 件</p>
      <div class="record-list">${rows}${emptyRows}</div>
      <div class="page-footnote">※掲載情報は本企画の物語上の記録です。実在の人物に関する情報ではありません。</div></div>`;
  }
  function detailRow(label, value) {
    return `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`;
  }
  function record(id) {
    const c = C.cases.find(item => item.id === id);
    if (!c) return notFound();
    const related = c.linkUrl && safeUrl(c.linkUrl)
      ? `<p class="related-link">関連する記録：<a href="${esc(safeUrl(c.linkUrl))}" target="_blank" rel="noopener noreferrer">${esc(c.linkLabel || c.linkUrl)} ↗</a></p>` : '';
    return `${pageHeader(c.name + ' について', '調査記録 No.' + c.id + ' / 最終更新 ' + c.update, 'SEARCH RECORD / ' + c.id)}
      <div class="wrap page-body"><a class="crumbback" href="#/records">← 行方不明者一覧へ戻る</a>
      <div class="detail-layout"><aside>${profileImage(c)}</aside><div>
        <div class="small-kicker">RECORD STATUS　/　${status(c)}</div>
        <h2 class="section-title" style="margin-top:14px">基本情報</h2>
        <dl class="dl-table">
          ${detailRow('氏名', c.name)}
          ${detailRow('フリガナ', c.kana)}
          ${detailRow('年齢（失踪当時）', c.age)}
          ${detailRow('性別', c.gender)}
          ${detailRow('身長 / 体重', c.heightWeight)}
          ${detailRow('失踪日時', c.missingDate)}
          ${detailRow('最後に確認された場所', c.location)}
          ${detailRow('所属', c.affiliation)}
          ${detailRow('特徴', c.features)}
          ${detailRow('失踪時の服装', c.clothing)}
        </dl>
        <h2 class="section-title" style="margin-top:35px">調査メモ</h2>
        <p class="page-intro detail-memo">${esc(c.lead)}</p>${related}
        <div class="actions-row"><a href="#/check" class="button-primary">手がかりを照合する →</a>
        <a href="#/records" class="button-outline">一覧へ戻る</a></div>
      </div></div></div>`;
  }
  function memberItem(m) {
    return `<li class="member-item"><div class="member-person">
      <strong>${esc(m.name)}</strong><small>${esc(m.kana)}</small><span>HN：${esc(m.handle)}</span>
    </div>${m.role ? `<span class="member-role">${esc(m.role)}</span>` : ''}</li>`;
  }
  function about() {
    return `${pageHeader('私たちについて', '活動の目的と、調査記録の管理について。', 'ABOUT OUR WORK')}
      <div class="wrap page-body"><div class="two-col"><div>
        <div class="eyebrow">MESSAGE FROM THE REPRESENTATIVE</div>
        <h2 class="section-title" style="margin-top:10px">代表からのメッセージ</h2>
        <blockquote class="quote">${esc(C.representativeMessage)}</blockquote>
        <div class="signature">${esc(C.organization)}　代表　${esc(C.representative)}</div>
        <h2 class="section-title">活動について</h2>
        <p class="page-intro">${esc(C.organizationText)}</p>
        <p class="page-intro">一部の調査記録は、公開前の確認作業を行っています。気になる情報や見覚えのある記録がありましたら、照合ページをご利用ください。</p>
        <div class="actions-row"><a href="#/records" class="button-outline">調査記録を見る →</a></div>
      </div><aside>
        <section class="info-box"><div class="eyebrow">OUR TEAM</div><h3>活動メンバー</h3>
        <ul class="member-list">${C.members.map(memberItem).join('')}</ul>
        <div class="page-footnote">公開内容は随時更新しています。</div></section>
        <section class="info-box" style="margin-top:17px;background:#f7f8f6"><h3>ご協力のお願い</h3>
          <p>些細なことでも、情報の確認につながる可能性があります。お心当たりのある方は、情報照合欄をご利用ください。</p>
          <a href="#/check" class="text-arrow">情報を提供する</a></section>
      </aside></div></div>`;
  }
  function check() {
    return `${pageHeader('情報の提供・記録照合', '見つけたキーワードを入力してください。', 'INFORMATION CHECK')}
      <div class="wrap page-body"><div class="check-box">
      <div class="eyebrow">INFORMATION VERIFICATION</div>
      <h2>手がかりを照合する</h2>
      <p>お持ちの調査キーワードを入力してください。該当する情報が登録されている場合、その結果を表示します。</p>
      <form id="checkForm" novalidate>
        <label for="keywordInput" style="display:block;font-size:12px;font-weight:700">キーワード</label>
        <div class="input-row"><input id="keywordInput" class="keyword-input" type="text" placeholder="キーワードを入力" maxlength="80" autocomplete="off" required aria-describedby="keywordHelp">
        <button class="button-primary" type="submit">照合する →</button></div>
        <p id="keywordHelp" class="form-note">入力内容はこのブラウザ内で照合します。氏名・連絡先などの個人情報は入力しないでください。</p>
      </form><div class="feedback" id="checkFeedback" aria-live="polite"></div></div>
      <p class="minor-note">このWebサイトは学園祭の体験型謎解きとして構成されています。実際の目撃情報の受付は行っていません。</p></div>`;
  }
  function venueMap() {
    return `<div class="venue-map">
      <img src="${esc(C.venueMapImage)}" alt="${esc(C.venueMapAlt)}" loading="lazy">
      <div class="venue-map-caption"><span>ご提供のキャンパスマップ</span>
      <a href="${esc(safeUrl(C.officialCampusMapUrl))}" target="_blank" rel="noopener noreferrer">京都大学公式キャンパスマップを見る ↗</a></div>
    </div>`;
  }
  function matchResult(stage) {
    if (stage === 1) {
      return `<div class="feedback-inner"><div class="result-banner">RECORD MATCHED / 01</div>
        <h3>関連する調査記録が見つかりました。</h3>
        <p>記録の照合が完了しました。失踪者が制作に関わった謎が、別の展示企画で公開されているようです。</p>
        <div class="venue-panel"><div class="small-kicker">NEXT LOCATION / KUMC</div>
          <strong>${esc(C.kumcVenue)}</strong><p>こちらのKUMC出展企画で、関連する謎を確認してください。</p></div>
        <p style="margin-top:17px">得られた情報に心当たりがあれば、もう一度この照合欄に入力してください。</p>
      </div>`;
    }
    return `<div class="feedback-inner"><div class="result-banner">INFORMATION MATCHED / 02</div>
      <h3>照合結果が見つかりました。</h3>
      <p>この情報をご存じの方は、直接窓口までお越しいただき、この画面をお見せください。</p>
      <div class="venue-panel"><div class="small-kicker">FINAL LOCATION / ${esc(C.organization)}</div>
        <strong>${esc(C.horrorVenue)}</strong>
        <p>受付でこの画面をお見せください。</p>
      </div>${venueMap()}
    </div>`;
  }
  function notFound() {
    return `${pageHeader('ページが見つかりません', '指定された記録は確認できませんでした。', 'NOT FOUND')}
      <div class="wrap page-body"><p class="page-intro">アドレスをご確認ください。</p>
      <a href="#/" class="button-outline">ホームに戻る →</a></div>`;
  }
  const norm = value => String(value ?? '').trim().normalize('NFKC').toUpperCase();
  function bindCheck() {
    const form = $('#checkForm');
    if (!form) return;
    const field = $('#keywordInput');
    const feedback = $('#checkFeedback');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const submitted = norm(field.value);
      if (!submitted) {
        feedback.innerHTML = '<div class="feedback-inner failure"><h3>キーワードを入力してください。</h3></div>';
      } else if (C.keywords.first.some(word => norm(word) === submitted)) {
        feedback.innerHTML = matchResult(1);
      } else if (C.keywords.second.some(word => norm(word) === submitted)) {
        feedback.innerHTML = matchResult(2);
      } else {
        feedback.innerHTML = `<div class="feedback-inner failure"><h3>該当する記録は見つかりませんでした。</h3>
          <p>入力したキーワードを確認してください。必要に応じて、調査記録に戻って手がかりを探してみてください。</p>
          <a class="text-arrow" href="#/records">調査記録を確認する</a></div>`;
      }
      feedback.scrollIntoView({block:'nearest', behavior:'smooth'});
    });
  }
  function contactLink(label, value, isEmail = false) {
    const url = isEmail ? (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) ? 'mailto:' + value : '') : safeUrl(value);
    return url ? `<a href="${esc(url)}" ${isEmail ? '' : 'target="_blank" rel="noopener noreferrer"'}>${esc(label)} ↗</a>`
      : `<span class="contact-pending">${esc(label)}：準備中</span>`;
  }
  function renderContacts() {
    const el = $('#contactLinks');
    if (el) el.innerHTML = [
      contactLink('X', C.contact.x),
      contactLink('Instagram', C.contact.instagram),
      contactLink('メール', C.contact.email, true)
    ].join('');
    const org = $('#footerOrganization');
    if (org) org.textContent = C.organization;
  }
  function render() {
    const path = (location.hash || '#/').replace(/^#\/?/, '').replace(/^\//, '');
    let body, active = '', title = 'ホーム';
    if (path === '' || path === 'home') { body = home(); active = 'home'; }
    else if (path === 'records') { body = records(); active = 'records'; title = '行方不明者一覧'; }
    else if (path.startsWith('record/')) { const id = decodeURIComponent(path.slice(7)); body = record(id); active = 'records'; title = '調査記録 No.' + id; }
    else if (path === 'about') { body = about(); active = 'about'; title = '団体について'; }
    else if (path === 'check') { body = check(); active = 'check'; title = '情報の提供・記録照合'; }
    else { body = notFound(); title = 'ページが見つかりません'; }
    main.innerHTML = body;
    document.title = `${title}｜${C.siteName}`;
    document.querySelectorAll('[data-nav]').forEach(a => {
      const current = a.dataset.nav === active;
      a.classList.toggle('active', current);
      if (current) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    $('#siteNav').classList.remove('open');
    $('#mobileMenu').setAttribute('aria-expanded', 'false');
    if (active === 'check') bindCheck();
    window.scrollTo({top:0, behavior:'instant'});
  }
  $('#siteName').textContent = C.siteName;
  $('#siteSubtitle').textContent = C.siteSubtitle;
  $('#siteTagline').textContent = C.siteTagline;
  renderContacts();
  $('#mobileMenu').addEventListener('click', () => {
    const nav = $('#siteNav');
    const isOpen = nav.classList.toggle('open');
    $('#mobileMenu').setAttribute('aria-expanded', String(isOpen));
    $('#mobileMenu').setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  });
  window.addEventListener('hashchange', render);
  render();
})();
