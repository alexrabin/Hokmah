import { getAllBooks } from "@/services/sefariaService";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import slug from "slug";

const BookPage = () => {
  return <div>BookPage</div>;
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
  console.log(slug);
  return {
    props: {},
  };
};
