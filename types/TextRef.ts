export type TextRef = {
  ref: string;
  heRef: string;
  isComplex: boolean;
  text: string[];
  he: string[];
  versions: Version[];
  textDepth: number;
  sectionNames: string[];
  addressTypes: string[];
  lengths: number[];
  length: number;
  heTitle: string;
  titleVariants: string[];
  heTitleVariants: string[];
  type: string;
  primaryCategory: string;
  book: string;
  categories: string[];
  order: number[];
  sections: number[];
  toSections: number[];
  isDependant: boolean;
  indexTitle: string;
  heIndexTitle: string;
  sectionRef: string;
  firstAvailableSectionRef: string;
  heSectionRef: string;
  isSpanning: boolean;
  versionTitle: string;
  versionTitleInHebrew: string;
  shortVersionTitle: string;
  shortVersionTitleInHebrew: string;
  versionSource: string;
  versionStatus: Status;
  versionNotes: string;
  extendedNotes: string;
  extendedNotesHebrew: string;
  versionNotesInHebrew: string;
  digitizedBySefaria: boolean;
  license: string;
  formatEnAsPoetry: boolean;
  heVersionTitle: string;
  heVersionTitleInHebrew: string;
  heShortVersionTitle: string;
  heShortVersionTitleInHebrew: string;
  heVersionSource: string;
  heVersionStatus: Status;
  heVersionNotes: string;
  heExtendedNotes: string;
  heExtendedNotesHebrew: string;
  heVersionNotesInHebrew: string;
  heDigitizedBySefaria: boolean;
  heLicense: string;
  formatHeAsPoetry: boolean;
  alts: Alt[];
  indexOffsetsByDepth: IndexOffsetsByDepth;
  next: string;
  prev: null;
  commentary: any[];
  sheets: any[];
  layer: any[];
};

export type Alt = {
  en: string[];
  he: string[];
  whole: boolean;
};

export enum Status {
  Empty = "",
  Locked = "locked",
}

export type IndexOffsetsByDepth = {};

export type Version = {
  title: string;
  versionTitle: string;
  versionSource: string;
  language: Language;
  status: Status;
  license: string;
  versionNotes: string;
  digitizedBySefaria: string;
  priority: number | string;
  versionTitleInHebrew: string;
  versionNotesInHebrew: string;
  extendedNotes: string;
  extendedNotesHebrew: string;
  purchaseInformationImage: string;
  purchaseInformationURL: string;
  shortVersionTitle: string;
  shortVersionTitleInHebrew: string;
  isBaseText: boolean;
};

export enum Language {
  En = "en",
  He = "he",
}
