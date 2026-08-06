import { GoogleGenerativeAI } from "@google/generative-ai";

export const handler = async (event) => {
  console.log("GEMINI_API_KEY exists:", Boolean(process.env.GEMINI_API_KEY));

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  let stones;
  try {
    ({ stones } = JSON.parse(event.body || "{}"));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "リクエストの形式が正しくありません" }) };
  }

  if (!Array.isArray(stones) || stones.length < 2) {
    return { statusCode: 400, body: JSON.stringify({ error: "石の情報が不足しています" }) };
  }

  if (!process.env.GEMINI_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: "サーバー設定エラー: APIキーが未設定です" }) };
  }

  const stoneDesc = stones
    .map(s => `${s.name}（属性: ${s.element}、チャクラ: ${s.chakra}、キーワード: ${(s.keywords || []).join("・")}）`)
    .join("、");

  const prompt = `あなたは経験豊かな天然石占い師です。以下の石の組み合わせについて、占い師らしい優しく詩的な語り口で、日本語で300字程度の鑑定文を書いてください。石の意味を活かしつつ、この組み合わせが持つエネルギーや、身につける人への具体的なメッセージを含めてください。

石の組み合わせ: ${stoneDesc}

鑑定文のみを出力してください。前置きや見出しは不要です。`;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });
    const response = await model.generateContent(prompt);
    const text = response.response.text().trim();

    return {
      statusCode: 200,
      body: JSON.stringify({ result: text }),
    };
  } catch (err) {
    console.error("Gemini API call failed:", err.message, err.stack);
    if (err.status === 429) {
      return {
        statusCode: 429,
        body: JSON.stringify({ error: "RATE_LIMIT" }),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "鑑定の生成に失敗しました: " + (err.message || "unknown error") }),
    };
  }
};
