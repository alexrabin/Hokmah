import { HebrewTexts } from "@/types/Text";
import Axios from "axios";

const baseURL = "http://www.sefaria.org/api/";

const axios = Axios.create({
  baseURL,
});

export const getAllTexts = async (): Promise<HebrewTexts[] | null> => {
  try {
    const response = await axios.get("index");
    return response.data;
  } catch (e) {
    console.log("failed to get all texts");
  }
  return null;
};
