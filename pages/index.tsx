import Book from "@/components/HebrewTexts/Book";
import MainLayout from "@/components/MainLayout";
import { getAllTexts } from "@/services/sefariaService";
import { categoryBookStyles, HebrewText } from "@/types/Text";
import Grid from "@mui/material/Grid";
import Container from "@mui/system/Container";
import { GetStaticProps } from "next";

type Props = {
  hebrewTexts: HebrewText[];
};

export default function Home({ hebrewTexts }: Props) {
  return (
    <MainLayout layoutProps={{ centerVertical: true }}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
          justifyContent="center"
          height={"100%"}
          alignItems="center"
        >
          {hebrewTexts.map((text, i) => {
            const styles = categoryBookStyles[text.category];
            return (
              <Grid item key={i}>
                <Book text={text} {...styles} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </MainLayout>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllTexts();
  return {
    props: {
      hebrewTexts: data,
    },
  };
};
