import MainLayout from "@/components/MainLayout";
import { getTextRef } from "@/services/sefariaService";
import { TextRef } from "@/types/TextRef";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import { useInView } from "react-intersection-observer";
type Props = {
  refData: TextRef;
  book: string;
};
const ReaderPage = ({ refData, book }: Props) => {
  const { ref: title, he, text } = refData;
  const theme = useTheme();
  const router = useRouter();

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      // load next data
      console.log("loading next data");
    }
  }, [inView]);
  return (
    <MainLayout documentTitle={title}>
      <AppBar
        position="sticky"
        style={{
          top: 50,
          marginBottom: 10,
          boxShadow: "none",
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
              <IconButton onClick={() => router.back()}>
                <ArrowBackIos />
              </IconButton>
              <Link href={`/book/${book}`}>
                <Typography fontSize={30} textAlign="center">
                  {title}
                </Typography>
              </Link>
              <div></div>
            </Box>
          </Container>
        </Toolbar>
        <Divider />
      </AppBar>
      <Container maxWidth="md">
        {text.map((line, index) => {
          return (
            <Box key={index} marginBottom={3}>
              <Box
                display={"flex"}
                justifyContent="flex-end"
                alignItems={"center"}
                marginBottom={1}
              >
                <Box
                  dangerouslySetInnerHTML={{ __html: he[index] }}
                  textAlign="right"
                  fontSize={25}
                />
                <Typography color={"grey"} marginLeft={1}>
                  {index + 1}
                </Typography>
              </Box>
              <Box dangerouslySetInnerHTML={{ __html: line }} fontSize={18} />
            </Box>
          );
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
