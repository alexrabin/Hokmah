import MainLayout from "@/components/MainLayout";
import { getTextRef } from "@/services/sefariaService";
import { TextRef } from "@/types/TextRef";
import { useTheme } from "@mui/material/styles";
import { GetServerSideProps } from "next";
import React, { useCallback, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import ReaderSection from "@/components/ReaderSection";

type Props = {
  refData: TextRef;
  book: string;
  number: number;
};
const ReaderPage = ({ refData, book, number }: Props) => {
  const { ref: title } = refData;
  const [textData, setTextData] = useState<{ [key: string]: TextRef }>({});
  const [currentPage, setCurrentPage] = useState(number);
  const [gettingNextData, setGettingNextData] = useState(false);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    const key = `${book + number}`;
    setTextData({ [key]: refData });
  }, [book, number, refData]);
  const getNextRef = useCallback(async () => {
    try {
      setGettingNextData(true);
      const nextData = await getTextRef(book + "." + (currentPage + 1));
      setCurrentPage((prev) => prev + 1);
      if (nextData) {
        const key = `${book + currentPage + 1}`;
        setTextData((prev) => {
          return {
            ...prev,
            [key]: nextData,
          };
        });
      }
    } catch (e) {
    } finally {
      setGettingNextData(false);
    }
  }, [currentPage, book]);

  useEffect(() => {
    if (inView) {
      // load next data
      if (!gettingNextData) {
        getNextRef();
      }
    }
  }, [getNextRef, gettingNextData, inView]);

  return (
    <MainLayout documentTitle={title}>
      <Container maxWidth="md">
        {Object.entries(textData).map((data) => {
          const [key, value] = data;
          return <ReaderSection refData={value} key={key} book={book} />;
        })}
        <div ref={ref} style={{ width: 10, height: 10 }} />
      </Container>
    </MainLayout>
  );
};

export default ReaderPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context || {};
  if (!params) {
    throw new Error("params do not exist");
  }
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=59"
  );
  try {
    const slug = params.slug as string;
    const refData = await getTextRef(slug);
    return {
      props: {
        refData,
        book: slug.split(".")[0],
        number: parseInt(slug.split(".")[1]),
      },
    };
  } catch (e) {
    return {
      notFound: true,
      props: {
        error: e,
      },
    };
  }
};
