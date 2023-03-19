import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider as PreferredThemeProvider } from "next-themes";
import MUIThemeProvider from "@/components/MUIThemeProvider";
import NextNProgress from "nextjs-progressbar";
import generateImage from "@/utils/generateImage";
import Head from "next/head";
import { DefaultSeo, DefaultSeoProps } from "next-seo";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/utils/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

const config: DefaultSeoProps = {
  canonical: "https://hokmah.vercel.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hokmah.vercel.com",
    siteName: "Hokmah - Jewish Learning",
    description: "Like an everything bagel but with Jewish texts.",
    defaultImageWidth: 1200,
    defaultImageHeight: 630,
    title: "Hokmah",
    images: [
      {
        url: generateImage({ title: "Hokmah" }),
        alt: "Hokmah Logo",
      },
    ],
  },
};

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  return (
    <>
      <PreferredThemeProvider>
        <CacheProvider value={emotionCache}>
          <DefaultSeo {...config} />
          <MUIThemeProvider>
            <Head>
              <link rel="shortcut icon" href="/favicon.ico" />
              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
              />
            </Head>
            <Component {...pageProps} />
          </MUIThemeProvider>
        </CacheProvider>
      </PreferredThemeProvider>
    </>
  );
}
