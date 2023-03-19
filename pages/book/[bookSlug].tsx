import MainLayout from "@/components/MainLayout";
import { getBook } from "@/services/sefariaService";
import { Book } from "@/types/Book";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";

type Props = {
  book: Book;
  slug: string;
};
const BookPage = ({ book, slug }: Props) => {
  return (
    <MainLayout documentTitle={book.title} description={book.enDesc}>
      <Container>
        <Box marginBottom={3}>
          <Typography variant="h3">{book.title}</Typography>
          <Typography>{book.enDesc}</Typography>
        </Box>
        <Divider />
        <Typography variant="h5" marginTop={1} marginBottom={2}>
          Chapters
        </Typography>
        <Grid container spacing={2}>
          {Array.from(Array(book.schema.lengths[0]).keys()).map(
            (num, index) => {
              return (
                <Grid item key={index} sx={{ width: 80, height: 80 }}>
                  <Card>
                    <Link href={`/reader/${slug}.${num + 1}`}>
                      <CardActionArea>
                        <CardContent sx={{ paddingBottom: "16px !important" }}>
                          <Typography
                            textAlign={"center"}
                            fontSize={20}
                            className="no-select"
                          >
                            {num + 1}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                  </Card>
                </Grid>
              );
            }
          )}
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default BookPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context || {};
  if (!params) {
    throw new Error("params do not exist");
  }
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=59"
  );
  const slug = params.bookSlug as string;
  const book = await getBook(slug);
  return {
    props: {
      book,
      slug,
    },
  };
};
