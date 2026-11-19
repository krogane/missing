/* ==============================================================
   NF 2026 行方調査室 — 編集するテキストと情報はこのファイルに集約。
   site-data.js の文字列を書き換えると各ページに反映されます。
   ============================================================= */
window.NF_SITE = {
  siteName: '行方調査室',
  siteSubtitle: 'INFORMATION & SEARCH',
  siteTagline: '現在、行方不明者について情報提供をお願いしています。',
  heroEyebrow: 'LOOKING FOR INFORMATION',
  heroTitle: '情報提供のお願い',
  heroText: '私たちは、消息のわからなくなった友人の情報を収集しています。些細な手掛かりでもかまいませんので、何かお持ちの情報があれば提供をお願いします。',

  organization: '京大ホラー同好会',
  representative: '高田 亜玲',
  representativeRole: '代表',
  representativeMessage: '我々の大切な友人を探すために、どうか皆様のご協力をお願いいたします。',
  organizationText: '私たち京大ホラー同好会は、周囲で行方不明になった学生の情報を調査し、目撃情報の提供を呼びかけています。収集した情報は精査・整理したうえで本Webサイト上で公開します。',
  // HNと役職は別々に編集できます。役職なしは空文字のままにしてください。
  members: [
    { name:'高田 亜玲', kana:'タカダ アレイ', handle:'赤レンガ', role:'代表' },
    { name:'川合 星凪', kana:'カワイ セナ', handle:'ちきん', role:'資料整理' },
    { name:'酒井 凛', kana:'サカイ リン', handle:'かばのき', role:'Web記録更新' },
    { name:'庄司 大和', kana:'ショウジ ヤマト', handle:'氷結', role:'' },
    { name:'森田 楓馬', kana:'モリタ フウマ', handle:'タラタラ', role:'' }
  ],

  announcement: '調査記録を更新しました。お心当たりのある方は、各記録をご確認ください。',
  updateDate: '2026.11.19', // サイトの更新表示日。公開日に応じて変更できます。
  kumcVenue: '法経本館 2階・第六教室',
  horrorVenue: '文学部校舎 2階・第5講義室',
  venueMapImage: 'assets/map.jpg', // 提供された案内画像をそのまま使用
  venueMapAlt: 'ご提供の京都大学キャンパスマップ。赤枠付きの構内位置図。',
  officialCampusMapUrl: 'https://www.kyoto-u.ac.jp/ja/access/campus/yoshida/map6r-y',
  // ひらがな・カタカナの両方を登録できます。判定は余白や全角半角を正規化します。
  keywords: {
    first:  ['マインクラフト', 'まいんくらふと'],
    second: ['アレイ', 'あれい']
  },
  // PDFでURLが指定されていない連絡先は空欄。公開前に設定してください。
  contact: {
    x: 'https://x.com/horror_kyotou?s=20',            // 例: https://x.com/...
    instagram: 'https://www.instagram.com/horror_kyotou?utm_source=ig_web_button_share_sheet&jplx=ZDNlZDc0MzIxNw==',    // 例: https://www.instagram.com/...
    email: 'horror.kyotou@gmail.com'         // 例: info@example.jp
  },

  unregisteredSlots: 3,
  cases: [
    {
      id:'001',
      name:'深野 翔太', kana:'フカノ ショウタ', age:'20歳', gender:'男性',
      heightWeight:'175cm / 54kg', missingDate:'2026/06/23 深夜',
      lastSeen:'2026/06/23 深夜', location:'京都市左京区京都大学吉田キャンパス内',
      affiliation:'京都大学2回生',
      features:'黒髪長髪（肩くらい）、左目の下にほくろがある',
      clothing:'紺色のワイシャツ、黒色のジーンズ、黒色のリュック（お守りがついている）',
      lead:'しばらく連絡がつかず自宅に訪れるが、部屋にはおらず、マンションの監視カメラに出ていく姿が記録されている。その後、大学構内の監視カメラにも姿が記録され、それを最後に失踪する。彼は、大学周辺の失踪事件を熱心に調査していた。最後に会った時に、最近家に帰ると部屋の物が動いている気がすると友人に話している。',
      linkUrl:'', linkLabel:'',
      photo:'assets/fukano.jpg', // 添付画像：深野翔太.jpg（原寸のまま）
      status:'情報募集中', statusType:'active', update:'2026.11.19'
    },
    {
      id:'002',
      name:'佐野 弘人', kana:'サノ ヒロト', age:'21歳', gender:'男性',
      heightWeight:'170cm / 64kg', missingDate:'2026/08/28',
      lastSeen:'2026/08/28', location:'京大最寄りのバス停',
      affiliation:'京都大学3回生',
      features:'一重、ひげ、短髪',
      clothing:'白のスニーカー、デニムパンツ、白のシャツ',
      lead:'2026年8月28日、大学でテストを受けた後、友人にこれからサークルのメンバーと打ち上げにいくと伝え、最寄りのバス停で別れてから行方が分からなくなっている。集合場所にも現れず、用事で遅れて合流した他のメンバーも道中で彼を見かけることはなかったという。サークルはホラー同好会に所属しており、活動には精力的に参加していた。',
      linkUrl:'', linkLabel:'', photo:'assets/sano.jpg', // 添付画像：佐野弘人.jpg（原寸のまま）
      status:'情報募集中', statusType:'active', update:'2026.11.19'
    },
    {
      id:'003',
      name:'秋田 修', kana:'アキタ シュウ', age:'21歳', gender:'男性',
      heightWeight:'169cm / 60kg', missingDate:'2026/10/13',
      lastSeen:'2026/10/13', location:'自宅（実家）',
      affiliation:'京都大学3回生',
      features:'色白、短髪、切れ長の目',
      clothing:'上下黒のスウェット',
      lead:'2026年10月12日夜から13日朝の間、家族が寝ている間に姿を消した。前日ごろから常に何かを気にしている様子だったという。本人の運用していたブログの最終更新は2026年10月13日午前3時7分。',
      linkUrl:'https://kisaragi-terminal.hatenablog.com/',
      linkLabel:'kisaragi-terminal.hatenablog.com',
      photo:'assets/akita.jpg', status:'情報募集中', statusType:'active', update:'2026.11.19' // 添付画像：秋田修.jpg（原寸のまま）
    }
  ]
};
