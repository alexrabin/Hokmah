import styled from "@emotion/styled";
import dynamic from "next/dynamic";
const NavigationBar = dynamic(() => import("@/components/NavigationBar"));
// const Footer = dynamic(() => import("components/Footer"));
import { NextSeo } from "next-seo";
import Head from "next/head";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";
import useOnMount from "@/hooks/useOnMount";
import generateImage from "@/utils/generateImage";

interface LayoutProps {
  centerVertical?: boolean;
  centerHorizontal?: boolean;
}

const LayoutContainer = styled.div<LayoutProps>`
  position: relative;
  min-height: 92vh;
  padding: 2rem 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: ${(p) => (p.centerVertical ? "center" : "flex-start")};
  align-items: ${(p) => (p.centerHorizontal ? "center" : "flex-start")};
`;
type Props = {
  documentTitle?: string;
  description?: string;
  metaImageUrl?: string;
  metaUrl?: string;
  metaType?: string;
  metaDate?: string;
  metaLastUpdated?: string;
  children?: JSX.Element | JSX.Element[];
  showParticles?: boolean;
  layoutProps?: LayoutProps;
};

const MainLayout: React.FC<Props> = ({
  documentTitle = null,
  children,
  description,
  layoutProps,
  metaImageUrl,
  metaUrl,
  metaDate,
  metaLastUpdated,
  metaType = "website",
}) => {
  const theme = useTheme();
  const [height, setHeight] = useState<number | string>("100%");
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.document.body.scrollHeight);
      setShowBackground(true);
    };

    window.addEventListener("resize", handleResize);

    setTimeout(() => {
      handleResize();
    }, 500);
    // cleanup this component
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { setTheme, resolvedTheme } = useNextTheme();

  // When mounted on client, now we can show the UI
  const mounted = useOnMount();

  return (
    <div>
      <Head>
        {theme.palette.mode === "dark" ? (
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-one-dark.min.css"
          ></link>
        ) : (
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-one-light.min.css"
          ></link>
        )}
      </Head>
      <NextSeo
        title={
          documentTitle && documentTitle.length > 0
            ? `${documentTitle}`
            : "Hokmah"
        }
        canonical={metaUrl}
        description={description ?? "Cool Stuff Technology Expert"}
        openGraph={{
          url: metaUrl ?? "https://www.alexrabin.com",
          type: metaType,
          title:
            documentTitle && documentTitle.length > 0
              ? `${documentTitle}`
              : "Hokmah",
          description: description ?? "Cool Stuff Technology Expert",
          article: {
            publishedTime: metaDate,
            modifiedTime: metaLastUpdated,
          },
          images: [
            {
              url:
                metaImageUrl ??
                generateImage({ title: documentTitle ?? "Hokmah" }),
              alt:
                documentTitle && documentTitle.length > 0
                  ? `${documentTitle}`
                  : "Hokmah",
            },
          ],
          siteName: "Hokmah",
        }}
      />
      {mounted && (
        <React.Fragment>
          <NavigationBar
            toggleColorMode={() =>
              setTheme(resolvedTheme === "light" ? "dark" : "light")
            }
          />
          <LayoutContainer {...layoutProps}>
            {children}
            {/* <Footer /> */}
          </LayoutContainer>
        </React.Fragment>
      )}
    </div>
  );
};
export default MainLayout;
