import { getAllTexts } from "@/services/sefariaService";
import { HebrewTexts } from "@/types/Text";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/system/Container";
import { GetStaticProps } from "next";

type Props = {
  hebrewTexts: HebrewTexts[];
};

export default function Home({ hebrewTexts }: Props) {
  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={2}
        justifyContent="center"
        height={"100%"}
        alignItems="center"
      >
        {hebrewTexts.map((text, i) => {
          return (
            <Grid item key={i}>
              <Typography>{text.category}</Typography>
            </Grid>
          );
        })}
      </Grid>
    </Container>
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
