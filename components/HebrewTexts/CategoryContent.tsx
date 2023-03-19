import { HebrewTextContent } from "@/types/Text";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import CategoryContentCard from "./CategoryContentCard";

type Props = {
  content: HebrewTextContent;
};
const CategoryContent = ({ content }: Props) => {
  return (
    <div>
      <Typography variant="h4">{content.category}</Typography>
      {content.enShortDesc && <Typography>{content.enShortDesc}</Typography>}
      <Divider />
      <Grid container spacing={2} marginTop={1} alignItems="stretch">
        {content.contents?.map((content, i) => {
          return (
            <Grid item key={i} alignSelf="stretch">
              <CategoryContentCard content={content} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default CategoryContent;
