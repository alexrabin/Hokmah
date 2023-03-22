import MainLayout from "@/components/MainLayout";
import { getTextRef } from "@/services/sefariaService";
import { TextRef } from "@/types/TextRef";
import { GetServerSideProps } from "next";
import React, { useCallback, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { useInView } from "react-intersection-observer";
import ReaderSection from "@/components/ReaderSection";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Close from "@mui/icons-material/Close";
import { useRouter } from "next/dist/client/router";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Link from "next/link";

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
  const [currentPageTitle, setCurrentPageTitle] = useState(refData.ref);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const router = useRouter();
  const theme = useTheme();

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
        <AppBar
          position="sticky"
          style={{
            top: 50,
            marginBottom: 10,
            boxShadow: "none",
            zIndex: 10,
          }}
        >
          <Toolbar
            disableGutters
            style={{
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            }}
          >
            <Container maxWidth="md">
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flex: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <IconButton onClick={() => router.push("/")}>
                  <Close />
                </IconButton>
                <Link href={`/book/${book}`}>
                  <Typography
                    fontSize={30}
                    fontWeight="bold"
                    textAlign="center"
                  >
                    {currentPageTitle}
                  </Typography>
                </Link>
                <IconButton onClick={undefined} sx={{ opacity: 0 }}>
                  <Close />
                </IconButton>
              </Box>
            </Container>
          </Toolbar>
          <Divider />
        </AppBar>
        {Object.entries(textData).map((data) => {
          const [key, value] = data;
          return (
            <ReaderSection
              refData={value}
              key={key}
              book={book}
              setCurrentTitle={setCurrentPageTitle}
            />
          );
        })}
        {gettingNextData && (
          <Box justifyContent={"center"} display="flex">
            <CircularProgress />
          </Box>
        )}
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
