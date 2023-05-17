import { BeatLoader } from "react-spinners";
import { useMediaQuery } from "@react-hook/media-query";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Loader({ isLoading }) {
  const isMobile = useMediaQuery("(max-width: 486px)");

  const loaderSize = isMobile ? 50 : 100;
  const color = "#171e31";

  return (
    <BeatLoader
      color={color}
      loading={isLoading}
      cssOverride={override}
      size={loaderSize}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
