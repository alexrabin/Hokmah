import { TextRef } from "@/types/TextRef";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  book: string;
  refData: TextRef;
};
const ReaderSection = ({ book, refData }: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const [hasSetRoute, setRoute] = useState(false);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !hasSetRoute) {
      setRoute(true);
      router.push(`/reader/${book}.${refData.sections[0]}`, undefined, {
        shallow: true,
      });
    } else if (!inView) {
      setRoute(false);
    }
  }, [book, hasSetRoute, inView, refData, router]);

  return (
    <div ref={ref}>
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
              <IconButton onClick={() => router.back()}>
                <ArrowBackIos />
              </IconButton>
              <Link href={`/book/${book}`}>
                <Typography fontSize={30} textAlign="center">
                  {refData.ref}
                </Typography>
              </Link>
              <div></div>
            </Box>
          </Container>
        </Toolbar>
        <Divider />
      </AppBar>
      {refData.text.map((line, index) => {
        return (
          <Box key={index} marginBottom={3}>
            <Box
              display={"flex"}
              justifyContent="flex-end"
              alignItems={"center"}
              marginBottom={1}
            >
              <Box
                dangerouslySetInnerHTML={{ __html: refData.he[index] }}
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
    </div>
  );
};

export default ReaderSection;
