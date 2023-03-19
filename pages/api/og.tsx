import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
export const config = {
  runtime: "edge",
};

const createImage = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title");
  const image = searchParams.get("image");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 120,
          color: "black",
          background: "#f6f6f6",
          width: "100%",
          height: "100%",
          paddingTop: 50,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Expletus Sans",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width="256"
          height="256"
          src={image ?? `https://www.alexrabin.com/apple-touch-icon.png`}
          alt={title ?? "Alex Rabin"}
        />
        <p
          style={{
            whiteSpace: "pre-wrap",
            paddingTop: 0,
            marginTop: 5,
            paddingBottom: 0,
            marginBottom: 0,
            textAlign: "center",
          }}
        >
          {title ?? "Alex Rabin"}
        </p>
      </div>
    )
  );
};
export default createImage;
