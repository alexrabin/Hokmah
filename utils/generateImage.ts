const generateImage = ({ image, title }: { image?: string; title: string }) => {
  return (
    `https://hokmah.vercel.com/api/og?title=${title.replaceAll(" ", "%20")}` +
    (image ? `&image=${image}` : "")
  );
};

export default generateImage;
