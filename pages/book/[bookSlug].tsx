import MainLayout from "@/components/MainLayout";
import { getAllBooks, getBook } from "@/services/sefariaService";
import { Book } from "@/types/Book";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import slug from "slug";

type Props = {
  book: Book;
};
const BookPage = ({ book }: Props) => {
  return (
    <MainLayout documentTitle={book.title} description={book.enDesc}>
      <Container>
        <Box marginBottom={3}>
          <Typography variant="h3">{book.title}</Typography>
          <Typography>{book.enDesc}</Typography>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default BookPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getAllBooks();
  if (!data) {
    throw Error("failed to get texts");
  }
  const paths = data.map((a) => {
    return {
      params: {
        bookSlug: slug(a, {
          lower: false,
          replacement: "_",
        }),
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
  const slug = params.bookSlug as string;
  const book = await getBook(slug);
  return {
    props: {
      book,
    },
  };
};
