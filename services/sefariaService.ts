import { Book } from "@/types/Book";
import { HebrewText } from "@/types/Text";
import Axios from "axios";

const baseURL = "http://www.sefaria.org/api/";

const axios = Axios.create({
  baseURL,
});

export const getAllTexts = async (): Promise<HebrewText[] | null> => {
  try {
    const response = await axios.get("index");
    return response.data;
  } catch (e) {
    console.log("failed to get all texts");
  }
  return null;
};

export const getSpecificText = async (
  text: string
): Promise<HebrewText | null> => {
  try {
    const data: HebrewText[] | null = await getAllTexts();
    if (!data) {
      return null;
    }
    return data.find((a) => a.category === text) ?? null;
  } catch (e) {}
  return null;
};

export const getAllBooks = async (): Promise<string[] | null> => {
  try {
    const response = await axios.get("index/titles");
    return response.data.books;
  } catch (e) {
    console.log("failed to get all books");
  }
  return null;
};

export const getBook = async (book: string): Promise<Book | null> => {
  try {
    const response = await axios.get("/v2/index/" + book);
    return response.data;
  } catch (e) {
    console.log("failed to get book", book);
  }
  return null;
};
