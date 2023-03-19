export type HebrewTexts = {
  contents: HebrewTextContent[];
  order: number;
  enComplete: boolean;
  heComplete: boolean;
  enDesc: string;
  heDesc: string;
  enShortDesc: string;
  heShortDesc: string;
  heCategory: string;
  category: Category;
};

export type Category =
  | "Tanakh"
  | "Commentary"
  | "Mishnah"
  | "Midrash"
  | "Halakhah"
  | "Kabbalah"
  | "Liturgy"
  | "Jewish Thought"
  | "Chasidut"
  | "Musar"
  | "Responsa"
  | "Second Temple"
  | "Reference"
  | "Talmud"
  | "Tosefta";

export type HebrewTextContent = {
  contents?: ContentData[];
  order?: number;
  enComplete?: boolean;
  heComplete?: boolean;
  enDesc?: string;
  heDesc?: string;
  enShortDesc: string;
  heShortDesc: string;
  heCategory?: string;
  category?: string;
  searchRoot?: string;
  isPrimary?: boolean;
  categories?: Category[];
  primary_category?: Category;
  heTitle?: string;
  title?: string;
  name?: string;
  slug?: string;
  isCollection?: boolean;
  nodeType?: string;
};

export type ContentData = {
  categories?: string[];
  order?: number;
  primary_category?: Category;
  enShortDesc: string;
  heShortDesc: string;
  corpus?: Category;
  heTitle?: string;
  title?: string;
  contents?: Content[];
  enComplete?: boolean;
  heComplete?: boolean;
  enDesc?: string;
  heDesc?: string;
  heCategory?: string;
  category?: string;
  dependence?: Category;
  collectiveTitle?: string;
  heCollectiveTitle?: string;
  commentator?: string;
  heCommentator?: string;
  base_text_order?: number;
  hidden?: boolean;
  name?: string;
  slug?: string;
  isCollection?: boolean;
  nodeType?: string;
  searchRoot?: string;
};

export type Content = {
  contents?: ChildContent[];
  order?: number;
  enComplete?: boolean;
  heComplete?: boolean;
  enDesc?: string;
  heDesc?: string;
  enShortDesc: string;
  heShortDesc: string;
  heCategory?: string;
  category?: string;
  categories?: string[];
  dependence?: Dependence;
  primary_category?: Dependence;
  collectiveTitle?: string;
  heCollectiveTitle?: string;
  commentator?: string;
  heCommentator?: string;
  base_text_order?: number;
  heTitle?: string;
  title?: string;
  corpus?: Corpus;
  hidden?: boolean;
};

export type ChildContent = {
  categories?: string[];
  dependence?: Dependence;
  primary_category?: Dependence;
  enShortDesc: string;
  heShortDesc: string;
  collectiveTitle?: string;
  heCollectiveTitle?: string;
  commentator?: string;
  heCommentator?: string;
  base_text_order?: number;
  heTitle?: string;
  title?: string;
  contents?: ChildContent2[];
  order?: number;
  enComplete?: boolean;
  heComplete?: boolean;
  enDesc?: string;
  heDesc?: string;
  heCategory?: string;
  category?: string;
};

export type ChildContent2 = {
  categories?: string[];
  dependence?: Category;
  primary_category?: Category;
  enShortDesc: string;
  heShortDesc: string;
  collectiveTitle?: string;
  heCollectiveTitle?: string;
  commentator?: string;
  heCommentator?: string;
  base_text_order?: number;
  heTitle?: string;
  title?: string;
  contents?: ChildContent3[];
  enComplete?: boolean;
  heComplete?: boolean;
  enDesc?: string;
  heDesc?: string;
  heCategory?: string;
  category?: string;
  order?: number;
};

export type ChildContent3 = {
  categories?: CollectiveTitle[];
  dependence?: Category;
  primary_category?: Category;
  enShortDesc: string;
  heShortDesc: string;
  collectiveTitle?: CollectiveTitle;
  heCollectiveTitle?: HebrewCollectiveTitle;
  commentator?: CollectiveTitle;
  heCommentator?: HebrewCollectiveTitle;
  base_text_order?: number;
  heTitle?: string;
  title?: string;
  contents?: ChildContent4[];
  order?: number;
  enComplete?: boolean;
  heComplete?: boolean;
  enDesc?: string;
  heDesc?: string;
  heCategory?: string;
  category?: string;
};

export type CollectiveTitle =
  | "Talmud"
  | "Bavli"
  | "Rishonim on Talmud"
  | "Rif"
  | "Commentary"
  | "Baal HaMaor"
  | "Chiddushei Anshei Shem"
  | "Ha'atakat Teshuvat HaRif"
  | "Hagahot Chavot Yair"
  | "Hagahot HaBach"
  | "Hagahot MeAlfas Yashan"
  | "Hasagot HaRaavad"
  | "Katuv Sham"
  | "Milchemet Hashem"
  | "Nimukei Yosef"
  | "Ran"
  | "Sefer HaZekhut"
  | "Shiltei HaGiborim"
  | "HaMaor";

export type ChildContent4 = {
  categories: string[];
  dependence: Category;
  primary_category: Category;
  enShortDesc: string;
  heShortDesc: string;
  collectiveTitle: CollectiveTitle2;
  heCollectiveTitle: HebrewCollectiveTitle2;
  commentator: HebrewCollectiveTitle;
  heCommentator: HebrewCollectiveTitle2;
  base_text_order: number;
  heTitle: string;
  title: string;
};

export type CollectiveTitle2 =
  | "Divrey Chamudot"
  | "Korban Netanel"
  | "Maadaney Yom Tov"
  | "Pilpula Charifta"
  | "Tiferet Shmuel";

export type HebrewCollectiveTitle2 =
  | "דברי חמודות"
  | "קרבן נתנאל"
  | "מעדני יום טוב"
  | "פילפולא חריפתא"
  | "תפארת שמואל";

export type HebrewCollectiveTitle =
  | "המאור"
  | "חידושי אנשי שם"
  | 'העתקת פירוש הרי"ף'
  | "הגהות חוות יאיר"
  | 'הגהות הב"ח'
  | "הגהות מאלפס ישן"
  | 'השגות הראב"ד'
  | "כתוב שם"
  | "מלחמת השם"
  | "נימוקי יוסף"
  | 'ר"ן'
  | "ספר הזכות"
  | "שלטי הגיבורים";

export type Dependence =
  | "Targum"
  | "Commentary"
  | "Guides"
  | "Midrash"
  | "Talmud"
  | "Halakhah"
  | "Jewish Thought"
  | "Tosefta"
  | "Responsa"
  | "Reference";

export type Corpus = "Bavli" | "Yerushalmi" | "Midrash Rabbah";
