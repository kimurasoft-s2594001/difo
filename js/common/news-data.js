import { companyInfo } from "../app.js";

// 新闻数据存储
export const newsData = [
  {
    id: 1,
    title: "出展のお知らせ（4/23～25）",
    date: "2025-04-15",
    category: "event",
    image: "img/news/exhibition.png",
    excerpt: "第16回 EDIX（教育総合展）東京",
    content: `
      <h3>第16回 EDIX（教育総合展）東京</h3>
      <p>
        このたび、弊社は第16回
        EDIX（教育総合展）東京に出展する運びとなりました。
        <br />
        本展示会は2025/4/23（水）～25（金） に東京ビッグサイト
        南展示棟で開催され、当社は最新の製品および技術を出展いたします。業界の皆様やお客様との貴重な交流の機会として、心よりご来場をお待ちしております。
      </p>
      <p>出展情報：</p>
      <ul>
        <li>ブース番号： ST-18</li>
        <li>会期： 2025/4/23（水）～25（金）</li>
        <li>会場： 東京ビッグサイト 南展示棟</li>
      </ul>
      <p>
        当日は、オンラインインタラクティブシミュレーション職業技能トレーニングを含む、当社の革新的な製品ラインアップをご覧いただけます。最新の技術成果をご紹介するとともに、お客様一人ひとりに最適なソリューションをご提案させていただきます。
      </p>
      <p>展示会の見どころ：</p>
      <ul>
        <li>話題の新製品を実機展示</li>
        <li>専門スタッフによる個別デモンストレーション</li>
        <li>展示会限定の特別キャンペーン</li>
        <li>業界の先輩とのネットワーキング</li>
      </ul>
      <p>ご来場について：</p>
      <ul>
        <li>
          展示会へのご来場をご希望の方、または詳細情報をご希望の方は、以下の連絡先までお気軽にお問い合わせください。
        </li>
        <li>${companyInfo.phone}</li>
        <li>${companyInfo.email}</li>
      </ul>
      <p>
        皆様のご来場を心よりお待ち申し上げております。
        <br />
        なお、展示会の詳細情報は、
          <a href="https://www.edix-expo.jp/tokyo/ja-jp/search/2025/directory/directory-details.%E3%83%9E%E3%83%8A%E3%83%84%E3%83%AB%E5%95%86%E4%BA%8B%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE.org-3d0ac210-2394-44f3-84ad-0ee6990d0b5c.html#/"
          >展示会公式サイトURL</a
        >をご覧ください。
      </p>
    `,
  },
  {
    id: 2,
    title: "出展のお知らせ（6/11～13）",
    date: "2025-04-10",
    category: "event",
    image: "img/news/exhibition.png",
    excerpt: "第8回 EDIX（教育 総合展）大阪",
    content: `
    <h3>第8回 EDIX（教育総合展）大阪</h3>
    <p>
      このたび、弊社は第8回
      EDIX（教育総合展）大阪に出展する運びとなりました。
      <br />
      本展示会は2025/6/11（水）～13（金） にインテックス大阪で開催され、当社は最新の製品および技術を出展いたします。業界の皆様やお客様との貴重な交流の機会として、心よりご来場をお待ちしております。
    </p>
    <p>出展情報：</p>
    <ul>
      <li>ブース番号： ST-18</li>
      <li>会期： 2025/6/11（水）～13（金）</li>
      <li>会場： インテックス大阪</li>
    </ul>
    <p>
      当日は、オンラインインタラクティブシミュレーション職業技能トレーニングを含む、当社の革新的な製品ラインアップをご覧いただけます。最新の技術成果をご紹介するとともに、お客様一人ひとりに最適なソリューションをご提案させていただきます。
    </p>
    <p>展示会の見どころ：</p>
    <ul>
      <li>話題の新製品を実機展示</li>
      <li>専門スタッフによる個別デモンストレーション</li>
      <li>展示会限定の特別キャンペーン</li>
      <li>業界の先輩とのネットワーキング</li>
    </ul>
    <p>ご来場について：</p>
    <ul>
      <li>
        展示会へのご来場をご希望の方、または詳細情報をご希望の方は、以下の連絡先までお気軽にお問い合わせください。
      </li>
      <li>${companyInfo.phone}</li>
      <li>${companyInfo.email}</li>
    </ul>
    <p>
      皆様のご来場を心よりお待ち申し上げております。
      <br />
      なお、展示会の詳細情報は、
          <a href="https://www.edix-expo.jp/osaka/ja-jp/search/2025/directory/directory-details.org-40a88f5b-95b8-416f-9099-17e860d6e3ce.html#/"
        >展示会公式サイトURL</a
      >をご覧ください。
    </p>`,
  },
  {
    id: 3,
    title: "新製品公開のお知らせ",
    date: "2025-04-05",
    category: "product",
    image: "img/news/soft.png",
    excerpt: "10月に新製品を公開予定です。詳細はお待ちください。",
    content: `
      <h3>新製品公開のお知らせ</h3>
      <p>
        2025年10月に新製品を公開予定です。弊社の革新的なオンラインインタラクティブシミュレーション職業技能トレーニングの最新版となります。
      </p>
      <p>
        詳細な情報は順次公開予定ですので、今しばらくお待ちください。
      </p>
      <p>お問い合わせ先：</p>
      <ul>
        <li>03 6807 9627</li>
        <li>jyh@mana-tsuru.co.jp</li>
      </ul>
    `,
  },
  //   {
  //     id: 4,
  //     title: "新オフィス移転のお知らせ",
  //     date: "2025-03-01",
  //     category: "update",
  //     image: "img/news/office.jpg",
  //     excerpt: "2025年3月1日より新オフィスに移転しました。",
  //     content: `
  //       <h3>新オフィス移転のお知らせ</h3>
  //       <p>
  //         平素は格別のご高配を賜り、厚く御礼申し上げます。
  //       </p>
  //       <p>
  //         この度、業務拡大に伴い、2025年3月1日より下記の新オフィスに移転いたしました。
  //       </p>
  //       <p>新オフィス所在地：</p>
  //       <p>
  //         〒114-0012<br>
  //         東京都北区田端新町1-8-14<br>
  //         山貴田端新町ビル 2階
  //       </p>
  //       <p>
  //         新オフィスでは、より一層のサービス向上に努めてまいります。今後とも変わらぬご愛顧を賜りますよう、よろしくお願い申し上げます。
  //       </p>
  //       <p>お問い合わせ先：</p>
  //       <ul>
  //         <li>03 6807 9627</li>
  //         <li>info@mana-tsuru.co.jp</li>
  //       </ul>
  //     `,
  //   },
  {
    id: 5,
    title: "公開予定",
    date: "2025-01-01",
    category: "update",
    image: "img/svg/no-image-placeholder.svg",
    excerpt: "公開予定",
    content: `
      <h3>公開予定</h3>
      <p>
        このコンテンツは現在準備中です。詳細は後日公開いたします。
      </p>
      <p>お問い合わせ先：</p>
      <ul>
        <li>03 6807 9627</li>
        <li>info@mana-tsuru.co.jp</li>
      </ul>
    `,
  },
  {
    id: 6,
    title: "公開予定",
    date: "2025-01-01",
    category: "event",
    image: "img/svg/no-image-placeholder.svg",
    excerpt: "公開予定",
    content: `
      <h3>公開予定</h3>
      <p>
        このコンテンツは現在準備中です。詳細は後日公開いたします。
      </p>
      <p>お問い合わせ先：</p>
      <ul>
        <li>03 6807 9627</li>
        <li>info@mana-tsuru.co.jp</li>
      </ul>
    `,
  },
];

// 辅助函数
export function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(date.getDate()).padStart(2, "0")}`;
}

export function getCategoryName(category) {
  const categories = {
    product: "製品情報",
    event: "イベント",
    update: "アップデート",
  };
  return categories[category] || "";
}

// 获取新闻分类列表
export function getCategories() {
  const categories = [];

  // 添加"全部"类别
  categories.push({
    id: "all",
    name: "全部",
    count: newsData.length,
  });

  // 计算每个类别的数量
  const categoryCounts = {};
  newsData.forEach((item) => {
    if (!categoryCounts[item.category]) {
      categoryCounts[item.category] = 0;
    }
    categoryCounts[item.category]++;
  });

  // 添加其他类别
  for (const [category, count] of Object.entries(categoryCounts)) {
    categories.push({
      id: category,
      name: getCategoryName(category),
      count: count,
    });
  }

  return categories;
}

// 按ID获取新闻
export function getNewsById(id) {
  return newsData.find((item) => item.id === parseInt(id)) || null;
}

// 获取最新的N条新闻
export function getLatestNews(count = 3) {
  return [...newsData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, count);
}

// 按日期排序的所有新闻
export function getAllNewsSortedByDate() {
  return [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));
}

// 获取特定类别的新闻
export function getNewsByCategory(category) {
  if (category === "all") {
    return getAllNewsSortedByDate();
  }
  return [...newsData]
    .filter((item) => item.category === category)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// 搜索新闻
export function searchNews(keyword) {
  if (!keyword) return getAllNewsSortedByDate();

  const lowerKeyword = keyword.toLowerCase();
  return newsData
    .filter(
      (item) =>
        item.title.toLowerCase().includes(lowerKeyword) ||
        item.excerpt.toLowerCase().includes(lowerKeyword)
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// 导出基本功能集
export const newsUtils = {
  getById: getNewsById,
  getLatest: getLatestNews,
  getAll: getAllNewsSortedByDate,
  getByCategory: getNewsByCategory,
  search: searchNews,
  getCategories: getCategories,
  formatDate: formatDate,
  getCategoryName: getCategoryName,
};
