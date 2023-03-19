import MainLayout from "@/components/MainLayout";
import { getAllTexts, getSpecificText } from "@/services/sefariaService";
import { HebrewText } from "@/types/Text";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import Box from "@mui/material/Box";
import CategoryContent from "@/components/HebrewTexts/CategoryContent";

type Props = {
  hebrewText: HebrewText;
};
const TextPage = (props: Props) => {
  const { category, contents, enDesc } = props.hebrewText;
  return (
    <MainLayout documentTitle={category} description={enDesc}>
      <Container>
        <Box marginBottom={3}>
          <Typography variant="h3">{category}</Typography>
          <Typography>{enDesc}</Typography>
        </Box>
        <Grid container flexDirection={"column"} rowSpacing={5}>
          {contents.map((content, i) => {
            return (
              <Grid item key={i}>
                <CategoryContent content={content} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default TextPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getAllTexts();
  const paths = data?.map((text) => {
    return {
      params: {
        textSlug: text.category,
      },
    };
  });
  return {
    paths: paths ?? [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context || {};
  if (!params) {
    throw new Error("params do not exist");
  }
  const slug = params.textSlug as string;
  const data = await getSpecificText(slug);
  if (!data) {
    throw new Error(`Not Text found for ${slug}`);
  }
  return {
    props: {
      hebrewText: data,
    },
  };
};
