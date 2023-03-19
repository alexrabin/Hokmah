export type Book = {
  title: string;
  categories: string[];
  schema: Schema;
  order: number[];
  authors: any[];
  enDesc: string;
  heDesc: string;
  enShortDesc: string;
  heShortDesc: string;
  pubDate: string;
  compDate: string;
  compPlace: string;
  pubPlace: string;
  errorMargin: string;
  isCited: boolean;
  corpora: string[];
  heTitle: string;
  titleVariants: any[];
  heTitleVariants: any[];
  alts: Alts;
  sectionNames: string[];
  depth: number;
  heCategories: string[];
  compDateString: CompEString;
  compPlaceString: CompEString;
};

export type Alts = {
  parasha: Parasha;
};

export type Parasha = {
  nodes: Node[];
  titles: Title[];
  title: string;
  heTitle: string;
};

export type Node = {
  nodeType: NodeType;
  depth: number;
  wholeRef: string;
  addressTypes: AddressType[];
  sectionNames: AddressType[];
  refs: string[];
  matchTemplates: NodeMatchTemplate[];
  sharedTitle: string;
  titles: Title[];
  title: string;
  heTitle: string;
};

export type AddressType = "Aliyah";

export type NodeMatchTemplate = {
  termSlugs: string[];
  scope: Scope;
};

export type Scope = "any";

export type NodeType = "ArrayMapNode";

export type Title = {
  primary?: boolean;
  text: string;
  lang: Lang;
};

export type Lang = "en" | "he";

export type CompEString = {
  en: string;
  he: string;
};

export type Schema = {
  nodeType: string;
  depth: number;
  addressTypes: string[];
  sectionNames: string[];
  matchTemplates: SchemaMatchTemplate[];
  lengths: number[];
  titles: Title[];
  title: string;
  heTitle: string;
  heSectionNames: string[];
  key: string;
};

export type SchemaMatchTemplate = {
  termSlugs: string[];
};
