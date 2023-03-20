import { ContentData } from "@/types/Text";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useMemo } from "react";
import { useTheme as useNextTheme } from "next-themes";
import CardActionArea from "@mui/material/CardActionArea";
import Link from "next/link";
import slug from "slug";

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

        height: "100%",
      }}
    >
      <CardActionArea sx={{ height: "100%" }}>
        <Link
          href={`/book/${slug(title ?? "", {
            lower: false,
            replacement: "_",
          })}`}
        >
          <CardContent>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body2">{content.enShortDesc}</Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
};

export default CategoryContentCard;
