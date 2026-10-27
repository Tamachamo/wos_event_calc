export async function onRequest(context) {
  // 環境変数（D1データベース）を取得
  const { env } = context;

  // D1から全データを取得
  const { results } = await env.DB.prepare("SELECT * FROM items").all();

  // GASの時と同じJSONの形に整形する
  const formattedData = {};
  results.forEach(row => {
    if (!formattedData[row.event_name]) {
      formattedData[row.event_name] = [];
    }
    formattedData[row.event_name].push({ name: row.item_name, point: row.point });
  });

  // JSON形式でレスポンス
  return Response.json(formattedData);
}
