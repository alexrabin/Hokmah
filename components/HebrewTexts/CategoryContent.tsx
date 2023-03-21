import { CategoryBookStyle, HebrewTextContent } from "@/types/Text";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useMemo } from "react";
import CategoryContentCard from "./CategoryContentCard";
import chroma from "chroma-js";

type Props = {
  content: HebrewTextContent;
  colorScheme: CategoryBookStyle;
};
const CategoryContent = ({ content, colorScheme }: Props) => {
  const colors = useMemo(() => {
    return chroma
      .scale([colorScheme.mainColor, colorScheme.startColor])
      .mode("lch")
      .colors(content.contents?.length);
  }, [colorScheme.mainColor, colorScheme.startColor, content.contents?.length]);
  return (
    <div>
      <Typography variant="h4">{content.category}</Typography>
      {content.enShortDesc && <Typography>{content.enShortDesc}</Typography>}
      <Divider />
      <Grid container spacing={2} marginTop={1} alignItems="stretch">
        {content.contents?.map((content, i) => {
          return (
            <Grid item key={i} alignSelf="stretch">
              <CategoryContentCard content={content} color={colors[i]} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default CategoryContent;
