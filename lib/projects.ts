export interface Project {
  id: string
  title: string
  description: string
  descriptionJa: string
  image: string
  link: string
  number: string
}

export interface Category {
  slug: string
  name: string
  projects: Project[]
}

export const CATEGORIES: Record<string, Category> = {
  genai: {
    slug: "genai",
    name: "GenAI",
    projects: [
      {
        id: "red-card-tokyo",
        title: "RED CARD TOKYO",
        description:
          "New concept denim from Tokyo, evolving with the times and culture. The theory that denim is sturdy and long wearing is out of date denim that is not constrained to stereotypes. Creation based on producer Yuji Honzawa's 3F principles (Fabric, Fit, Finish), each piece represents each artisan's craftsmanship.",
        descriptionJa:
          "東京で生まれた新しいデニムだから、時代、文化に応じて進化していく。デニムは頑丈で長く履けるもんていうオオリーにはもなナナセン。",
        image: "/images/image.png",
        link: "http://redcard.tokyo/",
        number: "01",
      },
      {
        id: "upper-hights",
        title: "upper hights",
        description:
          "Exploring the upper dimensions of denim aesthetics. A project focused on elevated craftsmanship and premium material selection. Each piece is carefully curated to represent the pinnacle of denim innovation.",
        descriptionJa:
          "デニムの美学の上層次元を探索する。プレミアム素材選択と職人技術の向上に焦点を当てたプロジェクト。",
        image: "/premium-denim-fashion.jpg",
        link: "http://example.com/upper-hights",
        number: "02",
      },
      {
        id: "healthy-denim",
        title: "Healthy DENIM",
        description:
          "Sustainable denim production with focus on environmental responsibility. This collection emphasizes healthy manufacturing practices and eco-friendly materials without compromising on quality and design.",
        descriptionJa: "環境責任に焦点を当てた持続可能なデニム生産。健康的な製造慣行とエコフレンドリー素材を強調する。",
        image: "/sustainable-denim-eco-friendly.jpg",
        link: "http://example.com/healthy-denim",
        number: "03",
      },
      {
        id: "haunt",
        title: "HAUNT",
        description:
          "A haunting collection that explores the darker aesthetics of vintage denim. Each piece carries a mysterious narrative, blending traditional craftsmanship with contemporary edge and bold design statements.",
        descriptionJa: "ビンテージデニムの暗い美学を探索するコレクション。謎めいたストーリーを持つ各ピースが特徴。",
        image: "/dark-gothic-denim-vintage.jpg",
        link: "http://example.com/haunt",
        number: "04",
      },
      {
        id: "state-of-mind",
        title: "STATE OF MIND",
        description:
          "An introspective collection that reflects emotional states through fabric and form. This project examines how denim can express psychological concepts and personal narratives through innovative design.",
        descriptionJa:
          "生地と形態を通じて感情状態を反映する内省的なコレクション。デニムが心理的概念をどのように表現できるかを検討。",
        image: "/abstract-emotional-denim-art.jpg",
        link: "http://example.com/state-of-mind",
        number: "05",
      },
    ],
  },
  datascience: {
    slug: "datascience",
    name: "Data Science",
    projects: [
      {
        id: "predictive-analytics",
        title: "Predictive Analytics",
        description:
          "Advanced machine learning models for forecasting trends and patterns. This collection showcases innovative data-driven solutions that transform raw data into actionable insights for business intelligence.",
        descriptionJa:
          "トレンドとパターンを予測するための高度な機械学習モデル。生データをビジネスインテリジェンスの実用的なインサイトに変換する革新的なデータ駆動ソリューション。",
        image: "/premium-denim-fashion.jpg",
        link: "http://example.com/predictive-analytics",
        number: "01",
      },
      {
        id: "data-visualization",
        title: "Data Visualization",
        description:
          "Interactive visualization tools that bring complex datasets to life. Every visualization is crafted to tell a compelling story, making data accessible and understandable to all stakeholders.",
        descriptionJa:
          "複雑なデータセットを実現するインタラクティブなビジュアライゼーションツール。すべてのビジュアライゼーションは、説得力のあるストーリーを伝えるように作成されています。",
        image: "/sustainable-denim-eco-friendly.jpg",
        link: "http://example.com/data-visualization",
        number: "02",
      },
      {
        id: "nlp-solutions",
        title: "NLP Solutions",
        description:
          "Natural Language Processing applications for text analysis and understanding. Advanced algorithms enable computers to interpret, analyze, and generate human language with remarkable accuracy.",
        descriptionJa:
          "テキスト分析と理解のための自然言語処理アプリケーション。高度なアルゴリズムにより、コンピュータが人間の言語を注目すべき精度で解釈、分析、生成することができます。",
        image: "/dark-gothic-denim-vintage.jpg",
        link: "http://example.com/nlp-solutions",
        number: "03",
      },
      {
        id: "deep-learning",
        title: "Deep Learning",
        description:
          "Neural network architectures pushing the boundaries of artificial intelligence. From computer vision to sequence models, our deep learning projects demonstrate cutting-edge AI capabilities.",
        descriptionJa:
          "人工知能の限界を押し広げるニューラルネットワークアーキテクチャ。コンピュータビジョンからシーケンスモデルまで、最先端のAI機能を実証します。",
        image: "/abstract-emotional-denim-art.jpg",
        link: "http://example.com/deep-learning",
        number: "04",
      },
      {
        id: "data-engineering",
        title: "Data Engineering",
        description:
          "Robust data pipelines and infrastructure for scalable analytics. Building the foundation for reliable, efficient data systems that support enterprise-level analytics and reporting.",
        descriptionJa:
          "スケーラブルな分析のための堅牢なデータパイプラインとインフラストラクチャ。エンタープライズレベルの分析とレポートをサポートする信頼性の高い効率的なデータシステムの基盤を構築します。",
        image: "/premium-denim-fashion.jpg",
        link: "http://example.com/data-engineering",
        number: "05",
      },
    ],
  },
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES[slug.toLowerCase()]
}

export function getProjectById(category: string, projectId: string): Project | undefined {
  const cat = getCategoryBySlug(category)
  return cat?.projects.find((p) => p.id === projectId)
}

export function getAllProjects(): Project[] {
  return Object.values(CATEGORIES).flatMap((cat) => cat.projects)
}
