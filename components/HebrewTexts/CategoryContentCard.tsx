import { ContentData } from "@/types/Text";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useMemo } from "react";
import { useTheme as useNextTheme } from "next-themes";

type Props = {
  content: ContentData;
};
const CategoryContentCard = ({ content }: Props) => {
  const title = useMemo(() => {
    if (content.commentator && content.commentator.length > 0) {
      return content.commentator;
    }
    if (content.category && content.category.length > 0) {
      return content.category;
    }
    return content.title;
  }, [content]);

  const { resolvedTheme } = useNextTheme();
  const darkMode = resolvedTheme === "dark";
  return (
    <Card
      sx={{
        width: 300,
        ":hover": {
          boxShadow: `0 5px 15px
          ${darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.3)"}`,
        },
        height: "100%",
      }}
    >
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{content.enShortDesc}</Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryContentCard;
