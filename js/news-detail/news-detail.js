// 从common.js导入通用函数，包括新添加的getParameterByName
import { loadBefore, loadAfter, getParameterByName } from "../common.js";

// 新闻数据
const newsDetails = [
  {
    id: 1,
    title: "第16回 EDIX（教育総合展）東京",
    content: `
      <p>
        このたび、弊社は第16回 EDIX（教育総合展）東京に出展する運びとなりました。
        <br />
        本展示会は2025/4/23（水）～25（金） に東京ビッグサイト 南展示棟で開催され、当社は最新の製品および技術を出展いたします。業界の皆様やお客様との貴重な交流の機会として、心よりご来場をお待ちしております。
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
        <li>048-430-7969</li>
        <li>jyh@mana-tsuru.co.jp</li>
      </ul>
      <p>
        皆様のご来場を心よりお待ち申し上げております。
        <br />
        なお、展示会の詳細情報は、
          href="https://www.edix-expo.jp/tokyo/ja-jp/search/2025/directory/directory-details.%E3%83%9E%E3%83%8A%E3%83%84%E3%83%AB%E5%95%86%E4%BA%8B%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE.org-3d0ac210-2394-44f3-84ad-0ee6990d0b5c.html#/"
          >展示会公式サイトURL</a
        >をご覧ください。
      </p>
    `,
  },
  {
    id: 2,
    title: "第8回 EDIX（教育総合展）大阪",
    content: `
      <p>
        このたび、弊社は第8回 EDIX（教育総合展）大阪に出展する運びとなりました。
        <br />
        本展示会は2025/6/11（水）～13（金） に大阪インテックスで開催され、当社は最新の製品および技術を出展いたします。関西地区の業界の皆様やお客様との貴重な交流の機会として、心よりご来場をお待ちしております。
      </p>
      <p>出展情報：</p>
      <ul>
        <li>ブース番号： OA-21</li>
        <li>会期： 2025/6/11（水）～13（金）</li>
        <li>会場： 大阪インテックス</li>
      </ul>
      <p>
        当日は、オンラインインタラクティブシミュレーション職業技能トレーニングを含む、当社の革新的な製品ラインアップをご覧いただけます。最新の技術成果をご紹介するとともに、お客様一人ひとりに最適なソリューションをご提案させていただきます。
      </p>
      <p>展示会の見どころ：</p>
      <ul>
        <li>話題の新製品を実機展示</li>
        <li>専門スタッフによる個別デモンストレーション</li>
        <li>展示会限定の特別キャンペーン</li>
        <li>関西地区のお客様と直接交流の機会</li>
      </ul>
      <p>ご来場について：</p>
      <ul>
        <li>
          展示会へのご来場をご希望の方、または詳細情報をご希望の方は、以下の連絡先までお気軽にお問い合わせください。
        </li>
        <li>048-430-7969</li>
        <li>jyh@mana-tsuru.co.jp</li>
      </ul>
      <p>
        皆様のご来場を心よりお待ち申し上げております。
        <br />
        なお、展示会の詳細情報は、
          href="https://www.edix-expo.jp/osaka/"
          >展示会公式サイトURL</a
        >をご覧ください。
      </p>
    `,
  },
  // 可以添加更多新闻项...
];

// 加载新闻详情
function loadNewsDetail() {
  const newsId = parseInt(getParameterByName("id")) || 1; // 默认显示ID为1的新闻
  const newsDetail = newsDetails.find((item) => item.id === newsId);

  if (newsDetail) {
    // 更新页面标题
    document.title = newsDetail.title;

    // 更新内容
    const contentContainer = $(".news-detail-content");
    contentContainer.html(`
      <h3>${newsDetail.title}</h3>
      ${newsDetail.content}
    `);
  } else {
    // 如果找不到对应新闻，显示错误信息
    $(".news-detail-content").html(`
      <h3>新闻不存在</h3>
      <p>抱歉，您请求的新闻内容不存在。</p>
      <p><a href="news-list.html">返回新闻列表</a></p>
    `);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadBefore();
  loadNewsDetail(); // 加载新闻详情
  loadAfter();
});
