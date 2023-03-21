import { ContentData } from "@/types/Text";
import React, { useMemo } from "react";
import slug from "slug";
import Book from "./Book";
import { complementaryColors } from "@/utils/randomColor";

type Props = {
  content: ContentData;
  color: string;
};
const CategoryContentCard = ({ content, color }: Props) => {
  const title = useMemo(() => {
    if (content.commentator && content.commentator.length > 0) {
      return content.commentator;
    }
    if (content.category && content.category.length > 0) {
      return content.category;
    }
    return content.title;
  }, [content]);

  const { mainColor, darkColor } = complementaryColors(color);

  return (
    <Book
      text={{
        category: title ?? "",
        enShortDesc: content.enShortDesc,
      }}
      mainColor={mainColor}
      startColor={darkColor}
      endColor={darkColor}
      href={`/book/${slug(title ?? "", {
        lower: false,
        replacement: "_",
      })}`}
    />
  );
};

export default CategoryContentCard;
