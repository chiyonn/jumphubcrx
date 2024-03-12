// 現在の時間（24時間表記）を取得
const currentHour = new Date().getHours();

// テーブルを生成する関数
function generateTradingHoursTable() {
  // テーブル要素を作成
  const table = document.createElement("table");
  table.setAttribute("border", "1");

  // テーブルのヘッダーを作成
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headings = ["為替市場", ...Array.from({ length: 24 }, (_, i) => i)];
  headings.forEach(heading => {
    const th = document.createElement("th");
    th.textContent = heading;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // テーブルのボディ（各市場）を作成
  const tbody = document.createElement("tbody");
  const markets = [
    { flag: "🇳🇿", name: "Wellington", openHours: [4, 5, 6, 7, 8, 9, 10, 11] },
    { flag: "🇦🇺", name: "Sydney", openHours: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
    { flag: "🇯🇵", name: "Tokyo", openHours: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19] },
    { flag: "🇬🇧", name: "London", openHours: [17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3] },
    { flag: "🇺🇸", name: "New York", openHours: [21, 22, 23, 0, 1, 2, 3, 4, 5, 6] }
  ];

  markets.forEach(market => {
    const row = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = market.flag + market.name;
    row.appendChild(td);
    // 24時間分のデータを空のセルで埋める
    for (let i = 0; i < 24; i++) {
      const td = document.createElement("td");
      // セルにopenクラスを追加するかどうかを判定
      if (market.openHours.includes(i)) {
        td.classList.add("open");
      }
      // 現在の時間に対応するセルにnowクラスを追加
      if (i === currentHour) {
        td.classList.add("now");
      }
      row.appendChild(td);
    }
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  return table;
}

// テーブルを取得し、trading-hours要素に挿入
const tradingHoursTable = generateTradingHoursTable();
const tradingHoursContainer = document.getElementById("trading-hours");
tradingHoursContainer.appendChild(tradingHoursTable);

