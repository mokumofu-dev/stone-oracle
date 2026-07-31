import { useState, useRef } from "react";

const STONES = [
  { id: "amethyst", name: "アメジスト", en: "Amethyst", color: "#9B7FC2", bg: "#F0EBF8", element: "風", chakra: "第三の目", keywords: ["直感", "癒し", "精神"], effects: { love: 60, healing: 85, money: 40, protection: 70, growth: 80 }, desc: "精神的な成長と直感力を高める石。心を落ち着かせ、深い洞察をもたらします。" },
  { id: "rose_quartz", name: "ローズクォーツ", en: "Rose Quartz", color: "#D4879C", bg: "#FBF0F3", element: "水", chakra: "ハート", keywords: ["愛情", "調和", "自己愛"], effects: { love: 95, healing: 75, money: 45, protection: 50, growth: 65 }, desc: "愛と美の石。自己愛を育み、人間関係に温かさと調和をもたらします。" },
  { id: "clear_quartz", name: "水晶", en: "Clear Quartz", color: "#A8C8D8", bg: "#EEF5F8", element: "光", chakra: "全て", keywords: ["浄化", "増幅", "明晰"], effects: { love: 65, healing: 80, money: 70, protection: 75, growth: 85 }, desc: "すべてのエネルギーを増幅させるマスターヒーラー。意図を明確にします。" },
  { id: "obsidian", name: "オブシディアン", en: "Obsidian", color: "#4A4A5A", bg: "#EBEBEF", element: "地", chakra: "ルート", keywords: ["保護", "浄化", "真実"], effects: { love: 40, healing: 65, money: 55, protection: 95, growth: 60 }, desc: "強力な保護の石。ネガティブなエネルギーを遮断し、真実を明らかにします。" },
  { id: "lapis_lazuli", name: "ラピスラズリ", en: "Lapis Lazuli", color: "#2E5FA3", bg: "#EAF0F8", element: "水", chakra: "喉", keywords: ["知恵", "真実", "表現"], effects: { love: 55, healing: 70, money: 65, protection: 65, growth: 88 }, desc: "古代から王族に愛された知恵の石。コミュニケーション力と洞察力を高めます。" },
  { id: "citrine", name: "シトリン", en: "Citrine", color: "#D4922A", bg: "#FBF3E8", element: "火", chakra: "太陽神経叢", keywords: ["豊かさ", "自信", "創造"], effects: { love: 55, healing: 60, money: 92, protection: 50, growth: 80 }, desc: "太陽のエネルギーを持つ豊かさの石。自信と創造力を引き出します。" },
  { id: "moonstone", name: "ムーンストーン", en: "Moonstone", color: "#8BA0B0", bg: "#EDF1F4", element: "水", chakra: "冠", keywords: ["直感", "女性性", "変化"], effects: { love: 80, healing: 72, money: 50, protection: 55, growth: 75 }, desc: "月の女神の石。直感と女性的なエネルギーを高め、新しい始まりをサポートします。" },
  { id: "tiger_eye", name: "タイガーアイ", en: "Tiger's Eye", color: "#B5762A", bg: "#F8F0E6", element: "火", chakra: "太陽神経叢", keywords: ["勇気", "決断", "幸運"], effects: { love: 50, healing: 58, money: 85, protection: 80, growth: 70 }, desc: "勇気と決断力をもたらす石。困難を乗り越える力と幸運を引き寄せます。" },
  { id: "aventurine", name: "アベンチュリン", en: "Aventurine", color: "#4A9B6F", bg: "#EAF4EF", element: "地", chakra: "ハート", keywords: ["幸運", "繁栄", "機会"], effects: { love: 72, healing: 68, money: 88, protection: 60, growth: 75 }, desc: "チャンスを引き寄せる幸運の石。心を開き、新しい可能性への扉を開きます。" },
  { id: "black_tourmaline", name: "ブラックトルマリン", en: "Black Tourmaline", color: "#3A3A4A", bg: "#EBEBEF", element: "地", chakra: "ルート", keywords: ["保護", "安定", "浄化"], effects: { love: 42, healing: 70, money: 58, protection: 98, growth: 55 }, desc: "最強の保護石。電磁波や悪いエネルギーをブロックし、心身を安定させます。" },
  { id: "labradorite", name: "ラブラドライト", en: "Labradorite", color: "#5A7A8A", bg: "#ECF1F4", element: "風", chakra: "第三の目", keywords: ["変容", "魔法", "直感"], effects: { love: 60, healing: 75, money: 62, protection: 80, growth: 90 }, desc: "変容と魔法の石。隠れた才能を引き出し、宇宙とのつながりを深めます。" },
  { id: "malachite", name: "マラカイト", en: "Malachite", color: "#2E8B57", bg: "#EAF4EF", element: "地", chakra: "ハート", keywords: ["変容", "保護", "感情"], effects: { love: 68, healing: 85, money: 65, protection: 82, growth: 78 }, desc: "感情の鏡とも呼ばれる変容の石。深層心理に働きかけ、真の変化をもたらします。" },
  { id: "sodalite", name: "ソーダライト", en: "Sodalite", color: "#3455A0", bg: "#EAF0F8", element: "風", chakra: "喉", keywords: ["論理", "誠実", "平和"], effects: { love: 58, healing: 72, money: 60, protection: 65, growth: 82 }, desc: "論理と直感のバランスをとる石。誠実さと平和的なコミュニケーションを促します。" },
  { id: "carnelian", name: "カーネリアン", en: "Carnelian", color: "#C85A2A", bg: "#FAF0EB", element: "火", chakra: "仙骨", keywords: ["情熱", "活力", "創造"], effects: { love: 70, healing: 62, money: 78, protection: 60, growth: 75 }, desc: "情熱と活力の石。創造力と行動力を高め、夢の実現をサポートします。" },
  { id: "aquamarine", name: "アクアマリン", en: "Aquamarine", color: "#4AABBA", bg: "#EAF6F8", element: "水", chakra: "喉", keywords: ["勇気", "浄化", "表現"], effects: { love: 72, healing: 80, money: 55, protection: 65, growth: 70 }, desc: "海の女神の石。コミュニケーションを助け、心を浄化して勇気をもたらします。" },
  { id: "garnet", name: "ガーネット", en: "Garnet", color: "#9B2335", bg: "#F5EBEc", element: "火", chakra: "ルート", keywords: ["情熱", "生命力", "絆"], effects: { love: 85, healing: 65, money: 70, protection: 72, growth: 65 }, desc: "深い愛と生命力の石。情熱的な絆を育み、活力とグラウンディングをもたらします。" },
  { id: "fluorite", name: "フローライト", en: "Fluorite", color: "#6A5AAA", bg: "#F0EEF8", element: "風", chakra: "第三の目", keywords: ["集中", "浄化", "秩序"], effects: { love: 52, healing: 85, money: 62, protection: 75, growth: 85 }, desc: "頭脳を明晰にする集中の石。混乱を整理し、学習能力と集中力を高めます。" },
  { id: "peridot", name: "ペリドット", en: "Peridot", color: "#7AB648", bg: "#F0F8EA", element: "地", chakra: "ハート", keywords: ["浄化", "再生", "豊かさ"], effects: { love: 65, healing: 80, money: 75, protection: 60, growth: 82 }, desc: "太陽の光を宿す浄化の石。ネガティブなパターンを断ち切り、新たな豊かさを招きます。" },
  { id: "sunstone", name: "サンストーン", en: "Sunstone", color: "#E07830", bg: "#FBF2EA", element: "火", chakra: "太陽神経叢", keywords: ["自由", "喜び", "リーダーシップ"], effects: { love: 68, healing: 65, money: 80, protection: 55, growth: 78 }, desc: "太陽のエネルギーを持つ喜びの石。自由な精神とリーダーシップを育みます。" },
  { id: "howlite", name: "ハウライト", en: "Howlite", color: "#B0A898", bg: "#F4F3F1", element: "風", chakra: "冠", keywords: ["静寂", "忍耐", "意識"], effects: { love: 55, healing: 88, money: 42, protection: 58, growth: 72 }, desc: "静寂と忍耐の石。怒りを鎮め、感情のコントロールと深い眠りをサポートします。" },
  { id: "pyrite", name: "パイライト", en: "Pyrite", color: "#C8AA3A", bg: "#FAF5E8", element: "地", chakra: "太陽神経叢", keywords: ["繁栄", "保護", "意志"], effects: { love: 45, healing: 58, money: 95, protection: 85, growth: 72 }, desc: "黄金の輝きを持つ繁栄の石。強い意志力と実行力で豊かさを引き寄せます。" },
  { id: "lepidolite", name: "レピドライト", en: "Lepidolite", color: "#A882C0", bg: "#F4EEF8", element: "風", chakra: "ハート", keywords: ["安定", "変容", "希望"], effects: { love: 65, healing: 92, money: 48, protection: 62, growth: 80 }, desc: "感情を安定させる変容の石。不安やストレスを和らげ、穏やかな変化を促します。" },
  { id: "amazonite", name: "アマゾナイト", en: "Amazonite", color: "#4AABA0", bg: "#EAF6F5", element: "水", chakra: "ハート", keywords: ["調和", "真実", "希望"], effects: { love: 75, healing: 78, money: 60, protection: 65, growth: 75 }, desc: "希望と真実の石。内なる真実を語る勇気を与え、心に調和をもたらします。" },
  { id: "rhodonite", name: "ロードナイト", en: "Rhodonite", color: "#C06080", bg: "#F8EEF2", element: "地", chakra: "ハート", keywords: ["愛", "赦し", "奉仕"], effects: { love: 88, healing: 80, money: 50, protection: 58, growth: 72 }, desc: "赦しと愛の石。過去の傷を癒し、無条件の愛と奉仕の精神を育みます。" },
  { id: "prehnite", name: "プレナイト", en: "Prehnite", color: "#88B878", bg: "#EFF6EC", element: "地", chakra: "ハート", keywords: ["予知", "癒し", "平和"], effects: { love: 68, healing: 88, money: 52, protection: 70, growth: 78 }, desc: "予知と平和の石。心の平和をもたらし、直感と予知能力を高めます。" },
  { id: "iolite", name: "アイオライト", en: "Iolite", color: "#5870B8", bg: "#ECF0F8", element: "風", chakra: "第三の目", keywords: ["方向性", "内省", "旅"], effects: { love: 58, healing: 70, money: 65, protection: 60, growth: 88 }, desc: "方向性の石。人生の道を照らし、内省と精神的な旅をサポートします。" },
  { id: "kyanite", name: "カイヤナイト", en: "Kyanite", color: "#4878B0", bg: "#EAF2F8", element: "風", chakra: "喉", keywords: ["調和", "浄化", "表現"], effects: { love: 62, healing: 85, money: 55, protection: 70, growth: 82 }, desc: "自浄作用を持つ調和の石。チャクラを整え、真実のコミュニケーションを促します。" },
  { id: "larimar", name: "ラリマー", en: "Larimar", color: "#58A8C8", bg: "#EAF5FA", element: "水", chakra: "喉", keywords: ["平和", "愛", "カリブ"], effects: { love: 80, healing: 88, money: 48, protection: 62, growth: 72 }, desc: "カリブ海の青を宿す平和の石。深い癒しと無条件の愛、精神的な静寂をもたらします。" },
  { id: "moldavite", name: "モルダバイト", en: "Moldavite", color: "#3A8040", bg: "#ECF5ED", element: "宇宙", chakra: "ハート", keywords: ["変容", "宇宙", "覚醒"], effects: { love: 70, healing: 80, money: 68, protection: 65, growth: 98 }, desc: "隕石起源の変容の石。強力なエネルギーで急速な霊的成長と覚醒をもたらします。" },
  { id: "tanzanite", name: "タンザナイト", en: "Tanzanite", color: "#4858A0", bg: "#ECEEF8", element: "風", chakra: "第三の目", keywords: ["変容", "洞察", "高次元"], effects: { love: 62, healing: 78, money: 65, protection: 68, growth: 95 }, desc: "霊的覚醒の石。高次元とのつながりを深め、深い洞察と変容をもたらします。" },
  { id: "charoite", name: "チャロアイト", en: "Charoite", color: "#7855A0", bg: "#F0ECF8", element: "風", chakra: "冠", keywords: ["変容", "奉仕", "洞察"], effects: { love: 65, healing: 82, money: 55, protection: 72, growth: 90 }, desc: "シベリア産の変容の石。精神的な奉仕の精神と深い洞察力を目覚めさせます。" },
  { id: "smoky_quartz", name: "スモーキークォーツ", en: "Smoky Quartz", color: "#6A5A50", bg: "#F0ECE8", element: "地", chakra: "ルート", keywords: ["浄化", "安定", "解放"], effects: { love: 48, healing: 78, money: 62, protection: 88, growth: 68 }, desc: "ネガティブなエネルギーを大地へ流す浄化の石。心身を安定させ、不安を手放す助けとなります。" },
  { id: "selenite", name: "セレナイト", en: "Selenite", color: "#E8E0D0", bg: "#FAF8F2", element: "光", chakra: "冠", keywords: ["浄化", "平和", "純粋"], effects: { love: 55, healing: 90, money: 45, protection: 68, growth: 82 }, desc: "月の光を宿す浄化の石。空間や他の石を清め、深い精神的な平和をもたらします。" },
  { id: "turquoise", name: "ターコイズ", en: "Turquoise", color: "#3AABA0", bg: "#EAF6F5", element: "水", chakra: "喉", keywords: ["保護", "癒し", "成功"], effects: { love: 65, healing: 82, money: 70, protection: 85, growth: 68 }, desc: "古来より旅人を守るお守りとされてきた石。癒しと成功、コミュニケーション力を高めます。" },
  { id: "opal", name: "オパール", en: "Opal", color: "#C8B8D8", bg: "#F4EEF8", element: "水", chakra: "ハート", keywords: ["創造", "感情", "希望"], effects: { love: 78, healing: 75, money: 58, protection: 55, growth: 80 }, desc: "虹色の輝きを宿す創造の石。感情表現を豊かにし、希望とインスピレーションをもたらします。" },
  { id: "onyx", name: "オニキス", en: "Onyx", color: "#2A2A32", bg: "#EAEAEC", element: "地", chakra: "ルート", keywords: ["意志", "保護", "集中"], effects: { love: 42, healing: 55, money: 65, protection: 92, growth: 62 }, desc: "強い意志力を支える石。困難な状況でも動じない精神力と自己コントロール力を養います。" },
  { id: "hematite", name: "ヘマタイト", en: "Hematite", color: "#4A4448", bg: "#ECEAEB", element: "地", chakra: "ルート", keywords: ["グラウンディング", "集中", "保護"], effects: { love: 40, healing: 60, money: 68, protection: 90, growth: 58 }, desc: "強力なグラウンディング効果を持つ石。地に足をつけ、現実的な判断力を高めます。" },
  { id: "amber", name: "アンバー", en: "Amber", color: "#D4822A", bg: "#FBF1E5", element: "火", chakra: "仙骨", keywords: ["浄化", "生命力", "太古の記憶"], effects: { love: 62, healing: 80, money: 72, protection: 75, growth: 70 }, desc: "太古の樹液が結晶化した琥珀。生命力を高め、心身を温かく浄化するお守りの石です。" },
  { id: "jade", name: "ジェイド", en: "Jade", color: "#4A9868", bg: "#EAF5EE", element: "地", chakra: "ハート", keywords: ["幸運", "調和", "長寿"], effects: { love: 70, healing: 75, money: 82, protection: 68, growth: 72 }, desc: "東洋で古くから尊ばれてきた幸運の石。調和と繁栄、健やかな長寿をもたらすとされます。" },
  { id: "sapphire", name: "サファイア", en: "Sapphire", color: "#2A4A9B", bg: "#EAEEF8", element: "水", chakra: "喉", keywords: ["知恵", "誠実", "運命"], effects: { love: 68, healing: 65, money: 75, protection: 78, growth: 90 }, desc: "王族に愛された知恵の石。誠実さと洞察力を高め、正しい運命の道を示すとされます。" },
  { id: "ruby", name: "ルビー", en: "Ruby", color: "#A8203A", bg: "#F8EAEE", element: "火", chakra: "ルート", keywords: ["情熱", "生命力", "勇気"], effects: { love: 88, healing: 58, money: 78, protection: 70, growth: 68 }, desc: "燃えるような情熱を宿す石。強い生命力と勇気を与え、恋愛運を大きく高めます。" },
  { id: "emerald", name: "エメラルド", en: "Emerald", color: "#1E8858", bg: "#E8F5EE", element: "地", chakra: "ハート", keywords: ["愛", "再生", "豊かさ"], effects: { love: 82, healing: 78, money: 80, protection: 60, growth: 75 }, desc: "永遠の愛の石として知られるエメラルド。再生と豊かさ、パートナーシップの調和を育みます。" },
  { id: "topaz", name: "トパーズ", en: "Topaz", color: "#E0A030", bg: "#FBF4E5", element: "火", chakra: "太陽神経叢", keywords: ["成功", "自信", "喜び"], effects: { love: 60, healing: 62, money: 88, protection: 55, growth: 78 }, desc: "太陽の輝きを宿す成功の石。自信と喜びを引き出し、目標達成をサポートします。" },
  { id: "chrysocolla", name: "クリソコラ", en: "Chrysocolla", color: "#2A9AA0", bg: "#E8F5F5", element: "水", chakra: "喉", keywords: ["癒し", "女性性", "表現"], effects: { love: 70, healing: 88, money: 55, protection: 60, growth: 75 }, desc: "女神の石とも呼ばれる癒しの石。感情の傷を優しく癒し、自己表現の力を育みます。" },
  { id: "unakite", name: "ユナカイト", en: "Unakite", color: "#8A9868", bg: "#F0F3E8", element: "地", chakra: "ハート", keywords: ["バランス", "忍耐", "統合"], effects: { love: 68, healing: 78, money: 60, protection: 65, growth: 72 }, desc: "陰陽のバランスを整える石。忍耐強く物事に取り組む力と、心身の統合をサポートします。" },
  { id: "azurite", name: "アズライト", en: "Azurite", color: "#2A50A0", bg: "#E8EEF8", element: "風", chakra: "第三の目", keywords: ["洞察", "覚醒", "知恵"], effects: { love: 55, healing: 72, money: 60, protection: 62, growth: 92 }, desc: "第三の目を開くとされる深い青の石。直感力と精神的な覚醒を強力に後押しします。" },
  { id: "bloodstone", name: "ブラッドストーン", en: "Bloodstone", color: "#3A6A48", bg: "#E8F0EA", element: "地", chakra: "ルート", keywords: ["勇気", "浄化", "活力"], effects: { love: 55, healing: 75, money: 65, protection: 85, growth: 68 }, desc: "古来より勇者の石とされてきました。血流を活性化するように活力と勇気を高めます。" },
  { id: "rhodochrosite", name: "ロードクロサイト", en: "Rhodochrosite", color: "#D0708A", bg: "#F8EEF0", element: "地", chakra: "ハート", keywords: ["自己愛", "情熱", "癒し"], effects: { love: 90, healing: 82, money: 55, protection: 55, growth: 70 }, desc: "インカの薔薇と呼ばれる情熱の石。自己愛を育み、深い心の傷を優しく癒します。" },
  { id: "sunstone_orange", name: "レッドジャスパー", en: "Red Jasper", color: "#A8402A", bg: "#F8EBE5", element: "地", chakra: "ルート", keywords: ["活力", "忍耐", "安定"], effects: { love: 62, healing: 65, money: 68, protection: 82, growth: 62 }, desc: "大地の力強いエネルギーを持つ石。持続的な活力と忍耐力、精神的な安定をもたらします。" },
  { id: "moss_agate", name: "モスアゲート", en: "Moss Agate", color: "#5A8858", bg: "#EEF5EC", element: "地", chakra: "ハート", keywords: ["成長", "豊穣", "新しい始まり"], effects: { love: 65, healing: 78, money: 75, protection: 62, growth: 80 }, desc: "苔のような模様を持つ成長の石。新しいプロジェクトや人間関係の始まりをサポートします。" },
  { id: "picture_jasper", name: "ピクチャージャスパー", en: "Picture Jasper", color: "#A87848", bg: "#F5EFE5", element: "地", chakra: "ルート", keywords: ["安定", "内省", "つながり"], effects: { love: 55, healing: 70, money: 62, protection: 78, growth: 65 }, desc: "大地の景色を宿す石。自然とのつながりを感じさせ、内省と精神的な安定を促します。" },
  { id: "blue_lace_agate", name: "ブルーレースアゲート", en: "Blue Lace Agate", color: "#7AB8D0", bg: "#EAF5FA", element: "水", chakra: "喉", keywords: ["平穏", "表現", "優しさ"], effects: { love: 65, healing: 85, money: 45, protection: 55, growth: 68 }, desc: "レース模様の優しい青の石。穏やかなコミュニケーションと心の落ち着きをもたらします。" },
  { id: "green_aventurine_dark", name: "グリーンカルセドニー", en: "Green Chalcedony", color: "#6AA878", bg: "#EEF6EF", element: "水", chakra: "ハート", keywords: ["育成", "優しさ", "満足"], effects: { love: 68, healing: 80, money: 60, protection: 55, growth: 70 }, desc: "母なる優しさを持つ石。心を育み、日々の暮らしへの穏やかな満足感をもたらします。" },
  { id: "obsidian_snowflake", name: "スノーフレークオブシディアン", en: "Snowflake Obsidian", color: "#3A3A42", bg: "#EBEBEE", element: "地", chakra: "ルート", keywords: ["バランス", "純粋", "気づき"], effects: { love: 45, healing: 72, money: 55, protection: 88, growth: 70 }, desc: "白い斑点模様を持つ変容の石。心のバランスを整え、無意識のパターンへの気づきを促します。" },
  { id: "kunzite", name: "クンツァイト", en: "Kunzite", color: "#D8A0C0", bg: "#F8EEF4", element: "水", chakra: "ハート", keywords: ["無条件の愛", "平和", "感受性"], effects: { love: 92, healing: 80, money: 42, protection: 48, growth: 68 }, desc: "無条件の愛を象徴する優しいピンクの石。心を開き、深い愛と平和の感覚をもたらします。" },
  { id: "morganite", name: "モルガナイト", en: "Morganite", color: "#E8A8B8", bg: "#FBF0F2", element: "水", chakra: "ハート", keywords: ["慈愛", "癒し", "感情の解放"], effects: { love: 88, healing: 82, money: 55, protection: 50, growth: 65 }, desc: "天使の石とも呼ばれる愛の石。深い慈愛のエネルギーで、感情のブロックを優しく解放します。" },
  { id: "iolite_sunstone", name: "サードオニキス", en: "Sardonyx", color: "#8A5030", bg: "#F2EAE3", element: "地", chakra: "仙骨", keywords: ["意志力", "勇気", "誠実"], effects: { love: 58, healing: 60, money: 72, protection: 80, growth: 65 }, desc: "古代ローマの戦士が身につけた石。強い意志力と勇気、誠実な人間関係を育みます。" },
  { id: "chrysoprase", name: "クリソプレーズ", en: "Chrysoprase", color: "#7AC088", bg: "#EEF8F0", element: "地", chakra: "ハート", keywords: ["喜び", "楽観", "新しい視点"], effects: { love: 72, healing: 78, money: 68, protection: 55, growth: 75 }, desc: "希望の石とも呼ばれるさわやかな緑の石。喜びと楽観性を引き出し、新しい視点を与えます。" },
  { id: "apatite", name: "アパタイト", en: "Apatite", color: "#3AA8B0", bg: "#E8F5F6", element: "水", chakra: "喉", keywords: ["自己実現", "目標達成", "明晰さ"], effects: { love: 55, healing: 68, money: 72, protection: 50, growth: 85 }, desc: "自己実現をサポートする石。目標を明確にし、それに向かう行動力を高めてくれます。" },
  { id: "danburite", name: "ダンビュライト", en: "Danburite", color: "#E8E0EE", bg: "#FAF8FC", element: "光", chakra: "冠", keywords: ["高次元", "純粋", "解放"], effects: { love: 62, healing: 88, money: 40, protection: 55, growth: 90 }, desc: "高い波動を持つ天使の石。純粋な意識状態へ導き、深い精神的な解放をもたらします。" },
  { id: "celestite", name: "セレスタイト", en: "Celestite", color: "#B0C8E0", bg: "#F0F4FA", element: "光", chakra: "喉", keywords: ["天使", "平穏", "コミュニケーション"], effects: { love: 60, healing: 90, money: 42, protection: 58, growth: 82 }, desc: "天空の色を宿す平穏の石。天使とのつながりを感じさせ、深いリラックスをもたらします。" },
];

const COMPAT_RULES = [
  { elements: ["火", "火"], score: 88, note: "同じ炎のエネルギーが共鳴し、情熱と行動力が高まります" },
  { elements: ["水", "水"], score: 85, note: "流れるエネルギーが調和し、感情と直感が豊かになります" },
  { elements: ["地", "地"], score: 82, note: "安定した大地のエネルギーが互いを支え合います" },
  { elements: ["風", "風"], score: 80, note: "知的エネルギーが共鳴し、直感と思考が鋭くなります" },
  { elements: ["火", "地"], score: 72, note: "火は大地を温め、安定の中に情熱が宿ります" },
  { elements: ["水", "地"], score: 88, note: "水と大地は自然の恵み。癒しと安定が深まります" },
  { elements: ["火", "風"], score: 85, note: "風は火を燃え上がらせる。創造力と情熱が爆発します" },
  { elements: ["水", "風"], score: 78, note: "水と風が交わり、感性と知性がバランスします" },
  { elements: ["火", "水"], score: 62, note: "対極のエネルギー。意識して使うと新しい視点が生まれます" },
  { elements: ["地", "風"], score: 68, note: "異なる性質が刺激し合い、新しい可能性が開きます" },
  { elements: ["光", "火"], score: 90, note: "光は火を増幅させる。全てのポジティブなエネルギーが高まります" },
  { elements: ["光", "水"], score: 88, note: "水晶の増幅力で感情と直感が研ぎ澄まされます" },
  { elements: ["光", "地"], score: 85, note: "水晶が大地のエネルギーを浄化・増幅します" },
  { elements: ["光", "風"], score: 87, note: "水晶と風の知的エネルギーが明晰さをもたらします" },
  { elements: ["宇宙", "風"], score: 92, note: "宇宙のエネルギーが風の知性を覚醒させます" },
  { elements: ["宇宙", "火"], score: 88, note: "宇宙の変容力が情熱を高次元へ導きます" },
];

const getCompatScore = (s1, s2) => {
  if (s1.id === s2.id) return { score: 100, note: "同じ石は完全に共鳴します。エネルギーが純粋に増幅されます。" };
  const chakraBonus = s1.chakra === s2.chakra ? 8 : 0;
  const rule = COMPAT_RULES.find(r =>
    (r.elements[0] === s1.element && r.elements[1] === s2.element) ||
    (r.elements[0] === s2.element && r.elements[1] === s1.element)
  );
  const base = rule ? rule.score : 70;
  const score = Math.min(99, base + chakraBonus);
  const note = rule ? rule.note : "異なる個性を持つ石。それぞれの強みが補い合います。";
  return { score, note };
};

const getThreeStoneCompat = (stones) => {
  const pairs = [[0,1],[1,2],[0,2]];
  const scores = pairs.map(([i,j]) => getCompatScore(stones[i], stones[j]).score);
  const avg = Math.round(scores.reduce((a,b) => a+b, 0) / 3);
  const elementSet = [...new Set(stones.map(s => s.element))];
  let bonus = elementSet.length === 1 ? "同じ属性が集まり、エネルギーが強力に共鳴します。" :
    elementSet.length === 3 ? "三つの異なる属性がバランスを生み出します。" :
    "二つの属性が調和しながら補完し合います。";
  return { score: avg, note: bonus };
};

const GRADE = (s) => s >= 90 ? { label: "最高の相性", color: "#C8902A" } :
  s >= 80 ? { label: "とても良い", color: "#4A9B6F" } :
  s >= 70 ? { label: "良い相性", color: "#4A7BC8" } :
  s >= 60 ? { label: "普通", color: "#8A8A8A" } :
  { label: "要注意", color: "#C85A5A" };

const EFFECT_LABELS = { love: "恋愛運", healing: "癒し", money: "金運", protection: "守護", growth: "成長" };

export default function App() {
  const [tab, setTab] = useState("diagnose"); // diagnose | search | mystone
  const [selected, setSelected] = useState([]);
  const [searchQ, setSearchQ] = useState("");
  const [filterEl, setFilterEl] = useState("");
  const [detailStone, setDetailStone] = useState(null);
  const [result, setResult] = useState(null);
  const [showStoneSelector, setShowStoneSelector] = useState(false);
  const [selectingSlot, setSelectingSlot] = useState(null);
  const [myStones, setMyStones] = useState([]);
  const [diagMode, setDiagMode] = useState(2); // 2 or 3
  const [rankingStone, setRankingStone] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  const MAX_FREE = 3;

  const filtered = STONES.filter(s => {
    const q = searchQ.toLowerCase();
    return (!q || s.name.includes(q) || s.en.toLowerCase().includes(q) || s.keywords.some(k => k.includes(q))) &&
      (!filterEl || s.element === filterEl);
  });

  const elements = [...new Set(STONES.map(s => s.element))];

  const openSelector = (slot) => {
    setSelectingSlot(slot);
    setShowStoneSelector(true);
    setSearchQ("");
    setFilterEl("");
  };

  const selectStone = (stone) => {
    const next = [...selected];
    next[selectingSlot] = stone;
    setSelected(next);
    setShowStoneSelector(false);
    setResult(null);
  };

  const diagnose = () => {
    const count = diagMode;
    const stones = selected.slice(0, count).filter(Boolean);
    if (stones.length < count) return;
    setAiResult(null);
    setAiError(null);
    setAiLoading(false);
    if (count === 2) {
      const r = getCompatScore(stones[0], stones[1]);
      setResult({ type: 2, ...r, stones, grade: GRADE(r.score) });
    } else {
      const r = getThreeStoneCompat(stones);
      setResult({ type: 3, ...r, stones, grade: GRADE(r.score) });
    }
  };

  const fetchAiKantei = async (stones) => {
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await fetch("/.netlify/functions/kantei", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stones: stones.map(s => ({ name: s.name, element: s.element, chakra: s.chakra, keywords: s.keywords })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "鑑定に失敗しました");
      setAiResult(data.result);
    } catch {
      setAiError("鑑定に失敗しました。もう一度お試しください");
    } finally {
      setAiLoading(false);
    }
  };

  const SlotCard = ({ idx }) => {
    const stone = selected[idx];
    return (
      <div onClick={() => openSelector(idx)} style={{
        flex: 1,
        border: stone ? `2px solid ${stone.color}` : "2px dashed #D4C8BC",
        borderRadius: 16,
        padding: "16px 12px",
        cursor: "pointer",
        background: stone ? stone.bg : "#FAFAF8",
        textAlign: "center",
        transition: "all 0.2s",
        minHeight: 110,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
      }}>
        {stone ? (
          <>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: stone.color, opacity: 0.85, margin: "0 auto" }} />
            <div style={{ fontSize: 13, fontWeight: 600, color: "#3A2E28", fontFamily: "'Noto Serif JP', serif" }}>{stone.name}</div>
            <div style={{ fontSize: 10, color: stone.color, letterSpacing: "0.1em" }}>{stone.en.toUpperCase()}</div>
          </>
        ) : (
          <>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#E8E0D8", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#B0A898", fontSize: 20 }}>+</span>
            </div>
            <div style={{ fontSize: 12, color: "#B0A898" }}>石を選ぶ</div>
          </>
        )}
      </div>
    );
  };

  const ResultView = () => {
    if (!result) return null;
    const { score, note, stones, grade, type } = result;
    return (
      <div style={{ background: "#FFFDF9", border: "1px solid #E8DDD0", borderRadius: 20, padding: 24, marginTop: 20 }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 12, letterSpacing: "0.2em", color: "#B0A898", marginBottom: 6 }}>COMPATIBILITY</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: grade.color, fontFamily: "Georgia, serif", lineHeight: 1 }}>{score}</div>
            <div style={{ fontSize: 13, color: "#8A7A6A" }}>/ 100</div>
          </div>
          <div style={{
            display: "inline-block",
            background: grade.color + "18",
            color: grade.color,
            borderRadius: 20,
            padding: "4px 16px",
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "'Noto Serif JP', serif",
          }}>{grade.label}</div>
        </div>

        {/* Score bar */}
        <div style={{ height: 6, background: "#EDE8E2", borderRadius: 3, overflow: "hidden", marginBottom: 16 }}>
          <div style={{
            height: "100%",
            width: `${score}%`,
            background: `linear-gradient(90deg, ${grade.color}88, ${grade.color})`,
            borderRadius: 3,
            transition: "width 1s ease",
          }} />
        </div>

        <p style={{ fontSize: 13, color: "#6A5A4A", lineHeight: 1.8, textAlign: "center", marginBottom: 20, fontFamily: "'Noto Serif JP', serif" }}>{note}</p>

        {/* Radar chart */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: "#B0A898", textAlign: "center", marginBottom: 10, letterSpacing: "0.1em" }}>運気バランス</div>
          <RadarChart stones={stones} />
        </div>

        {/* Pair details */}
        {type === 3 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: "#B0A898", marginBottom: 8, letterSpacing: "0.1em" }}>ペア相性</div>
            {[[0,1],[1,2],[0,2]].map(([i,j]) => {
              const p = getCompatScore(stones[i], stones[j]);
              const g = GRADE(p.score);
              return (
                <div key={`${i}-${j}`} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: "#8A7A6A", flex: 1 }}>{stones[i].name} × {stones[j].name}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: g.color }}>{p.score}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Stone chips */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {stones.map(s => (
            <div key={s.id} style={{
              display: "flex", alignItems: "center", gap: 6,
              background: s.bg, border: `1px solid ${s.color}44`,
              borderRadius: 20, padding: "4px 10px",
            }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.color }} />
              <span style={{ fontSize: 11, color: "#5A4A3A", fontFamily: "'Noto Serif JP', serif" }}>{s.name}</span>
            </div>
          ))}
        </div>

        {/* AI kantei */}
        <div style={{ marginBottom: 20 }}>
          {!aiResult && !aiLoading && !aiError && (
            <button onClick={() => fetchAiKantei(stones)} style={{
              width: "100%",
              padding: "13px",
              background: "linear-gradient(135deg, #C8902A, #B57A20)",
              color: "#FFFDF9",
              border: "none",
              borderRadius: 14,
              fontSize: 13,
              fontFamily: "'Noto Serif JP', serif",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.08em",
            }}>✦ AI鑑定を見る</button>
          )}

          {aiLoading && (
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
              padding: "20px 0",
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                border: "3px solid #EDE0CC", borderTopColor: "#C8902A",
                animation: "spin 0.9s linear infinite",
              }} />
              <div style={{ fontSize: 12, color: "#B0A898", fontFamily: "'Noto Serif JP', serif", letterSpacing: "0.1em" }}>鑑定中...</div>
            </div>
          )}

          {aiError && (
            <div style={{
              textAlign: "center", fontSize: 12, color: "#C85A5A",
              fontFamily: "'Noto Serif JP', serif", padding: "8px 0",
            }}>
              {aiError}
              <div>
                <button onClick={() => fetchAiKantei(stones)} style={{
                  marginTop: 8, background: "none", border: "1px solid #C85A5A",
                  color: "#C85A5A", borderRadius: 20, padding: "4px 14px",
                  fontSize: 11, cursor: "pointer", fontFamily: "'Noto Serif JP', serif",
                }}>もう一度試す</button>
              </div>
            </div>
          )}

          {aiResult && (
            <div style={{
              background: "linear-gradient(135deg, #FBF3E8, #FDF8F0)",
              border: "1px solid #E8D8B8",
              borderRadius: 16,
              padding: "18px 18px",
              position: "relative",
            }}>
              <div style={{ fontSize: 11, color: "#C8902A", letterSpacing: "0.2em", marginBottom: 10, textAlign: "center" }}>✦ AI鑑定 ✦</div>
              <p style={{ fontSize: 13, color: "#5A4A3A", lineHeight: 2, fontFamily: "'Noto Serif JP', serif", whiteSpace: "pre-wrap" }}>{aiResult}</p>
            </div>
          )}
        </div>

        {/* Best3 next stones */}
        <div style={{ borderTop: "1px solid #EDE8E2", paddingTop: 16 }}>
          <div style={{ fontSize: 11, color: "#B0A898", letterSpacing: "0.15em", marginBottom: 12 }}>次に相性のいい石 TOP3</div>
          {(() => {
            const base = stones[0];
            const best3 = STONES
              .filter(s => !stones.find(sel => sel.id === s.id))
              .map(s => ({ ...s, compat: getCompatScore(base, s) }))
              .sort((a, b) => b.compat.score - a.compat.score)
              .slice(0, 3);
            return best3.map((s, idx) => {
              const g = GRADE(s.compat.score);
              return (
                <div key={s.id} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: s.bg, border: `1px solid ${s.color}33`,
                  borderRadius: 12, padding: "10px 12px", marginBottom: 8,
                }}>
                  <div style={{ fontSize: 16, width: 24, textAlign: "center", flexShrink: 0 }}>
                    {["🥇","🥈","🥉"][idx]}
                  </div>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: s.color, opacity: 0.85, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#3A2E28", fontFamily: "'Noto Serif JP', serif" }}>{s.name}</div>
                    <div style={{ fontSize: 10, color: "#8A7A6A", marginTop: 1 }}>{s.keywords.join(" · ")}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: g.color, fontFamily: "Georgia, serif" }}>{s.compat.score}</div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>
    );
  };

  const RadarChart = ({ stones }) => {
    const keys = Object.keys(EFFECT_LABELS);
    const size = 140;
    const cx = size / 2, cy = size / 2, r = 52;
    const avgEffects = keys.map(k => stones.reduce((acc, s) => acc + s.effects[k], 0) / stones.length);

    const pts = keys.map((_, i) => {
      const angle = (Math.PI * 2 * i) / keys.length - Math.PI / 2;
      return { angle, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    });

    const dataPoints = avgEffects.map((v, i) => {
      const { angle } = pts[i];
      const rv = (v / 100) * r;
      return `${cx + rv * Math.cos(angle)},${cy + rv * Math.sin(angle)}`;
    });

    return (
      <svg width={size} height={size + 20} style={{ display: "block", margin: "0 auto" }}>
        {[0.25, 0.5, 0.75, 1].map(ratio => (
          <polygon key={ratio}
            points={pts.map(p => `${cx + r * ratio * Math.cos(p.angle)},${cy + r * ratio * Math.sin(p.angle)}`).join(" ")}
            fill="none" stroke="#E0D8D0" strokeWidth="1" />
        ))}
        {pts.map((p, i) => (
          <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#E0D8D0" strokeWidth="1" />
        ))}
        <polygon points={dataPoints.join(" ")} fill="#C8902A22" stroke="#C8902A" strokeWidth="1.5" />
        {pts.map((p, i) => (
          <text key={i} x={cx + (r + 14) * Math.cos(p.angle)} y={cy + (r + 14) * Math.sin(p.angle)}
            textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: 9, fill: "#8A7A6A", fontFamily: "'Noto Serif JP', serif" }}>
            {EFFECT_LABELS[keys[i]]}
          </text>
        ))}
      </svg>
    );
  };

  const StoneCard = ({ stone, onSelect, selected: isSelected }) => (
    <div onClick={() => onSelect ? onSelect(stone) : setDetailStone(stone)} style={{
      background: isSelected ? stone.bg : "#FAFAF8",
      border: isSelected ? `2px solid ${stone.color}` : "1px solid #EDE8E2",
      borderRadius: 14,
      padding: "14px 12px",
      cursor: "pointer",
      transition: "all 0.2s",
      display: "flex",
      flexDirection: "column",
      gap: 6,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: stone.color, flexShrink: 0, opacity: 0.85 }} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#3A2E28", fontFamily: "'Noto Serif JP', serif" }}>{stone.name}</div>
          <div style={{ fontSize: 10, color: "#B0A898", letterSpacing: "0.08em" }}>{stone.element} · {stone.chakra}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {stone.keywords.map(k => (
          <span key={k} style={{ fontSize: 10, background: stone.color + "18", color: stone.color, borderRadius: 10, padding: "2px 8px", fontFamily: "'Noto Serif JP', serif" }}>{k}</span>
        ))}
      </div>
    </div>
  );

  const DiagnoseTab = () => (
    <div>
      {/* Mode toggle */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, background: "#F0EBE4", borderRadius: 12, padding: 4 }}>
        {[2, 3].map(n => (
          <button key={n} onClick={() => { setDiagMode(n); setResult(null); }} style={{
            flex: 1, padding: "8px", border: "none", borderRadius: 10, cursor: "pointer",
            background: diagMode === n ? "#FFFFFF" : "transparent",
            color: diagMode === n ? "#3A2E28" : "#8A7A6A",
            fontSize: 13, fontWeight: diagMode === n ? 600 : 400,
            fontFamily: "'Noto Serif JP', serif",
            boxShadow: diagMode === n ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            transition: "all 0.2s",
          }}>
            {n}石の相性診断
          </button>
        ))}
      </div>

      {/* Stone slots */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
        <SlotCard idx={0} />
        <div style={{ color: "#C8B8A8", fontSize: 18, flexShrink: 0 }}>×</div>
        <SlotCard idx={1} />
        {diagMode === 3 && (
          <>
            <div style={{ color: "#C8B8A8", fontSize: 18, flexShrink: 0 }}>×</div>
            <SlotCard idx={2} />
          </>
        )}
      </div>

      <button onClick={diagnose} disabled={selected.slice(0, diagMode).filter(Boolean).length < diagMode} style={{
        width: "100%",
        padding: "14px",
        background: selected.slice(0, diagMode).filter(Boolean).length >= diagMode ? "#3A2E28" : "#C8B8A8",
        color: "#FFFFFF",
        border: "none",
        borderRadius: 14,
        fontSize: 14,
        fontFamily: "'Noto Serif JP', serif",
        fontWeight: 600,
        cursor: selected.slice(0, diagMode).filter(Boolean).length >= diagMode ? "pointer" : "not-allowed",
        letterSpacing: "0.1em",
        transition: "all 0.2s",
      }}>
        相性を診断する
      </button>

      <ResultView />
    </div>
  );

  const topRef = useRef(null);

  const getRanking = (baseStone) =>
    STONES
      .filter(s => s.id !== baseStone.id)
      .map(s => ({ ...s, compat: getCompatScore(baseStone, s) }))
      .sort((a, b) => b.compat.score - a.compat.score);

  const MEDAL = ["🥇", "🥈", "🥉"];

  const SearchTab = () => (
    <div>
      {!rankingStone ? (
        <>
          <div style={{
            background: "linear-gradient(135deg, #FBF3E8, #F0EBF8)",
            border: "1px solid #E8D8CC",
            borderRadius: 14,
            padding: "12px 16px",
            marginBottom: 16,
            fontSize: 12,
            color: "#8A7A6A",
            fontFamily: "'Noto Serif JP', serif",
            lineHeight: 1.7,
          }}>
            💎 石をタップすると、その石と相性のいい順にランキング表示されます
          </div>
          <input
            placeholder="石の名前・キーワードで検索..."
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "1px solid #E0D8D0",
              borderRadius: 12,
              fontSize: 14,
              background: "#FAFAF8",
              color: "#3A2E28",
              marginBottom: 12,
              fontFamily: "'Noto Serif JP', serif",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            {["", ...elements].map(el => (
              <button key={el} onClick={() => setFilterEl(el)} style={{
                padding: "5px 12px",
                border: `1px solid ${filterEl === el ? "#3A2E28" : "#E0D8D0"}`,
                borderRadius: 20,
                background: filterEl === el ? "#3A2E28" : "#FAFAF8",
                color: filterEl === el ? "#FFF" : "#8A7A6A",
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "'Noto Serif JP', serif",
              }}>{el || "すべて"}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {filtered.map(s => (
              <div key={s.id} onClick={() => { setRankingStone(s); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{
                background: "#FAFAF8",
                border: "1px solid #EDE8E2",
                borderRadius: 14,
                padding: "14px 12px",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: s.color, flexShrink: 0, opacity: 0.85 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#3A2E28", fontFamily: "'Noto Serif JP', serif" }}>{s.name}</div>
                    <div style={{ fontSize: 10, color: "#B0A898", letterSpacing: "0.08em" }}>{s.element} · {s.chakra}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {s.keywords.map(k => (
                    <span key={k} style={{ fontSize: 10, background: s.color + "18", color: s.color, borderRadius: 10, padding: "2px 8px", fontFamily: "'Noto Serif JP', serif" }}>{k}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Ranking view */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <button onClick={() => { setRankingStone(null); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{
              background: "#F0EBE4", border: "none", borderRadius: 20,
              padding: "6px 14px", fontSize: 12, color: "#8A7A6A",
              cursor: "pointer", fontFamily: "'Noto Serif JP', serif",
            }}>← 戻る</button>
            <div style={{ fontSize: 13, color: "#3A2E28", fontFamily: "'Noto Serif JP', serif", fontWeight: 600 }}>
              相性ランキング
            </div>
          </div>

          {/* Base stone */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            background: rankingStone.bg,
            border: `2px solid ${rankingStone.color}`,
            borderRadius: 16, padding: "14px 16px", marginBottom: 20,
          }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: rankingStone.color, opacity: 0.85 }} />
            <div>
              <div style={{ fontSize: 11, color: rankingStone.color, letterSpacing: "0.15em", marginBottom: 2 }}>選択中の石</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#3A2E28", fontFamily: "'Noto Serif JP', serif" }}>{rankingStone.name}</div>
            </div>
          </div>

          {/* Ranking list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {getRanking(rankingStone).map((s, idx) => {
              const g = GRADE(s.compat.score);
              return (
                <div key={s.id} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  background: "#FAFAF8",
                  border: idx < 3 ? `1px solid ${s.color}44` : "1px solid #EDE8E2",
                  borderRadius: 14, padding: "12px 14px",
                  background: idx < 3 ? s.bg : "#FAFAF8",
                }}>
                  <div style={{ fontSize: idx < 3 ? 22 : 14, width: 28, textAlign: "center", flexShrink: 0, color: "#B0A898", fontWeight: 600 }}>
                    {idx < 3 ? MEDAL[idx] : `${idx + 1}`}
                  </div>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: s.color, opacity: 0.85, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#3A2E28", fontFamily: "'Noto Serif JP', serif" }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: "#8A7A6A", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.compat.note}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: g.color, fontFamily: "Georgia, serif", lineHeight: 1 }}>{s.compat.score}</div>
                    <div style={{ fontSize: 9, color: g.color, marginTop: 2 }}>{g.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );

  // ★ 投げ銭URLはここを差し替えるだけ
  const DONATION_URL = "https://ko-fi.com/YOUR_ID";

  const PREMIUM_FEATURES = [
    { icon: "💎", title: "手持ち石の登録・管理", desc: "自分のコレクションを登録して組み合わせを管理" },
    { icon: "✨", title: "最適パターン自動生成", desc: "1石から3〜5石の最強組み合わせTop10を表示" },
    { icon: "🎯", title: "目的別おすすめ", desc: "恋愛・仕事・癒し・金運で最適な石を提案" },
    { icon: "🔮", title: "AI詳細鑑定", desc: "組み合わせの意味をAIが詳しく読み解く" },
  ];

  const MyStoneTab = () => (
    <div>
      {/* Coming soon banner */}
      <div style={{
        background: "linear-gradient(135deg, #2A1F1A, #3A2E28)",
        borderRadius: 20,
        padding: "24px 20px",
        marginBottom: 24,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 70% 30%, #C8902A22, transparent 60%)",
          pointerEvents: "none",
        }} />
        <div style={{ fontSize: 11, letterSpacing: "0.3em", color: "#C8902A", marginBottom: 8, fontFamily: "'Cormorant Garamond', serif" }}>COMING SOON</div>
        <div style={{ fontSize: 22, fontWeight: 600, color: "#FFFDF9", fontFamily: "'Cormorant Garamond', serif", marginBottom: 8 }}>プレミアムプラン</div>
        <div style={{ fontSize: 12, color: "rgba(255,253,249,0.6)", lineHeight: 1.7, fontFamily: "'Noto Serif JP', serif", marginBottom: 16 }}>
          もっと深く、もっと便利に。<br />天然石との対話をひろげる4つの機能を開発中です。
        </div>
        <div style={{
          display: "inline-block",
          background: "rgba(200,144,42,0.2)",
          border: "1px solid #C8902A55",
          borderRadius: 20,
          padding: "4px 16px",
          fontSize: 12,
          color: "#C8902A",
          fontFamily: "'Noto Serif JP', serif",
        }}>月額 500円 予定</div>
      </div>

      {/* Feature list */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: "#B0A898", letterSpacing: "0.15em", marginBottom: 12 }}>開発中の機能</div>
        {PREMIUM_FEATURES.map((f, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 14,
            background: "#FAFAF8",
            border: "1px solid #EDE8E2",
            borderRadius: 14, padding: "14px 16px", marginBottom: 10,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, width: 3, height: "100%",
              background: "linear-gradient(180deg, #C8902A, #C8902A55)",
            }} />
            <div style={{ fontSize: 22, flexShrink: 0 }}>{f.icon}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#3A2E28", fontFamily: "'Noto Serif JP', serif", marginBottom: 3 }}>{f.title}</div>
              <div style={{ fontSize: 11, color: "#8A7A6A", lineHeight: 1.6, fontFamily: "'Noto Serif JP', serif" }}>{f.desc}</div>
            </div>
            <div style={{
              marginLeft: "auto", flexShrink: 0,
              fontSize: 10, color: "#C8902A",
              background: "#C8902A15", borderRadius: 10,
              padding: "3px 8px", fontFamily: "'Noto Serif JP', serif",
            }}>開発中</div>
          </div>
        ))}
      </div>

      {/* Donation section */}
      <div style={{
        background: "linear-gradient(135deg, #FBF3E8, #FDF6F0)",
        border: "1px solid #E8D8CC",
        borderRadius: 20,
        padding: "24px 20px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 24, marginBottom: 8 }}>☕</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#3A2E28", fontFamily: "'Cormorant Garamond', serif", marginBottom: 8 }}>開発を応援する</div>
        <div style={{ fontSize: 12, color: "#8A7A6A", lineHeight: 1.8, fontFamily: "'Noto Serif JP', serif", marginBottom: 16 }}>
          このアプリが気に入ったら、開発の続きを<br />応援していただけると嬉しいです。<br />
          <span style={{ color: "#C8902A", fontWeight: 600 }}>支援者には有料機能を先行開放予定！</span>
        </div>
        <a href={DONATION_URL} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-block",
          background: "#3A2E28",
          color: "#FFFDF9",
          borderRadius: 25,
          padding: "13px 32px",
          fontSize: 13,
          fontFamily: "'Noto Serif JP', serif",
          fontWeight: 600,
          textDecoration: "none",
          letterSpacing: "0.05em",
        }}>☕ Ko-fiで応援する</a>
        <div style={{ marginTop: 10, fontSize: 11, color: "#B0A898", fontFamily: "'Noto Serif JP', serif" }}>
          100円から応援できます
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F5F0EA",
      fontFamily: "'Noto Serif JP', 'Hiragino Mincho ProN', Georgia, serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #C0B8B0; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Header */}
      <div ref={topRef} style={{
        background: "#FFFDF9",
        borderBottom: "1px solid #EDE8E2",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "#C8B8A8", fontFamily: "'Cormorant Garamond', serif" }}>STONE ORACLE</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: "#3A2E28", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.05em" }}>天然石 相性診断</div>
        </div>
        <div style={{ fontSize: 20 }}>💎</div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#FFFDF9", borderBottom: "1px solid #EDE8E2", display: "flex" }}>
        {[["diagnose", "相性診断"], ["search", "石を探す"], ["mystone", "✦ プレミアム"]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            flex: 1,
            padding: "12px 4px",
            border: "none",
            borderBottom: tab === key ? "2px solid #3A2E28" : "2px solid transparent",
            background: "transparent",
            color: tab === key ? "#3A2E28" : "#B0A898",
            fontSize: 13,
            fontFamily: "'Noto Serif JP', serif",
            fontWeight: tab === key ? 600 : 400,
            cursor: "pointer",
            transition: "all 0.2s",
          }}>{label}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "20px 16px", maxWidth: 480, margin: "0 auto" }}>
        {tab === "diagnose" && <DiagnoseTab />}
        {tab === "search" && <SearchTab />}
        {tab === "mystone" && <MyStoneTab />}
      </div>

      {/* Stone selector modal */}
      {showStoneSelector && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(40,30,20,0.5)",
          zIndex: 200, display: "flex", alignItems: "flex-end",
        }} onClick={() => setShowStoneSelector(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#FFFDF9",
            borderRadius: "20px 20px 0 0",
            padding: "20px 16px",
            width: "100%",
            maxHeight: "80vh",
            overflow: "auto",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#3A2E28", fontFamily: "'Noto Serif JP', serif" }}>石を選択</div>
              <button onClick={() => setShowStoneSelector(false)} style={{ background: "none", border: "none", fontSize: 20, color: "#B0A898", cursor: "pointer" }}>✕</button>
            </div>
            <input
              placeholder="名前・キーワードで絞り込み..."
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1px solid #E0D8D0",
                borderRadius: 10,
                fontSize: 13,
                background: "#F5F0EA",
                marginBottom: 12,
                fontFamily: "'Noto Serif JP', serif",
                outline: "none",
              }}
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {filtered.map(s => (
                <StoneCard key={s.id} stone={s} onSelect={selectStone} selected={selected.includes(s)} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detail modal */}
      {detailStone && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(40,30,20,0.5)",
          zIndex: 200, display: "flex", alignItems: "flex-end",
        }} onClick={() => setDetailStone(null)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#FFFDF9",
            borderRadius: "20px 20px 0 0",
            padding: "24px 20px",
            width: "100%",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: detailStone.color, opacity: 0.85 }} />
              <div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#3A2E28", fontFamily: "'Cormorant Garamond', serif" }}>{detailStone.name}</div>
                <div style={{ fontSize: 11, color: "#B0A898", letterSpacing: "0.1em" }}>{detailStone.en.toUpperCase()}</div>
              </div>
              <button onClick={() => setDetailStone(null)} style={{ marginLeft: "auto", background: "none", border: "none", fontSize: 20, color: "#B0A898", cursor: "pointer" }}>✕</button>
            </div>
            <p style={{ fontSize: 13, color: "#6A5A4A", lineHeight: 1.8, marginBottom: 16, fontFamily: "'Noto Serif JP', serif" }}>{detailStone.desc}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
              {[["属性", detailStone.element], ["チャクラ", detailStone.chakra]].map(([k, v]) => (
                <div key={k} style={{ background: detailStone.bg, borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ fontSize: 10, color: "#B0A898", marginBottom: 2 }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: detailStone.color }}>{v}</div>
                </div>
              ))}
            </div>
            {Object.entries(EFFECT_LABELS).map(([k, label]) => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ fontSize: 11, color: "#8A7A6A", width: 50, flexShrink: 0 }}>{label}</div>
                <div style={{ flex: 1, height: 5, background: "#EDE8E2", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: `${detailStone.effects[k]}%`, height: "100%", background: detailStone.color, borderRadius: 3 }} />
                </div>
                <div style={{ fontSize: 11, color: "#8A7A6A", width: 24, textAlign: "right" }}>{detailStone.effects[k]}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
