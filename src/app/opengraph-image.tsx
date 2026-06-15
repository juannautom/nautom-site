import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Nautom — El conocimiento de tu empresa vive en el sistema, no en las personas.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Paper + ink + oxide (spec §5.2). Hex equivalents of the oklch tokens,
// since satori needs concrete colors.
const PAPER = "#FBFAF6";
const INK = "#332E29";
const INK_2 = "#6E665E";
const OXIDE = "#A8572F";

export default async function Image() {
  const [newsreader, plexSans] = await Promise.all([
    readFile(join(process.cwd(), "src/app/fonts/Newsreader-Regular.woff")),
    readFile(join(process.cwd(), "src/app/fonts/IBMPlexSans-Regular.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: PAPER,
          padding: "80px",
        }}
      >
        <span
          style={{
            fontFamily: "Newsreader",
            fontSize: "40px",
            color: INK,
          }}
        >
          nautom
        </span>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{ width: "56px", height: "4px", backgroundColor: OXIDE }}
          />
          <span
            style={{
              fontFamily: "Newsreader",
              fontSize: "62px",
              lineHeight: 1.1,
              color: INK,
              marginTop: "28px",
              maxWidth: "920px",
            }}
          >
            El conocimiento de tu empresa vive en el sistema, no en las personas.
          </span>
        </div>

        <span
          style={{
            fontFamily: "IBM Plex Sans",
            fontSize: "26px",
            color: INK_2,
          }}
        >
          Software que se hace cargo de las reglas de tu negocio.
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: newsreader, style: "normal", weight: 400 },
        { name: "IBM Plex Sans", data: plexSans, style: "normal", weight: 400 },
      ],
    }
  );
}
