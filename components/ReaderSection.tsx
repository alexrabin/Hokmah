import { TextRef } from "@/types/TextRef";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  book: string;
  refData: TextRef;
  setCurrentTitle: (title: string) => void;
};
const ReaderSection = ({ book, refData, setCurrentTitle }: Props) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      if (window.history.replaceState) {
        setCurrentTitle(refData.ref);
        //prevents browser from storing history with each change:
        window.history.replaceState(
          null,
          window.document.title,
          `/reader/${book}.${refData.sections[0]}`
        );
      }
    }
  }, [book, inView, refData]);

  return (
    <div ref={ref}>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flex: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          fontSize={25}
          textAlign="center"
          borderBottom={"3px solid #594176"}
          marginBottom={2}
        >
          {refData.sections[0]}
        </Typography>
      </Box>
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
