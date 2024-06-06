import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import ffmpeg from "fluent-ffmpeg";
import crypto from "crypto";

ffmpeg.setFfmpegPath("/usr/local/bin/ffmpeg");

// in windows use this commented path . make sure the ffmpeg installed in our system . and also configure path in environment variables
// ffmpeg.setFfmpegPath("C:\\ffmpeg\\bin\\ffmpeg.exe");


export const FFmpegTranscoder = async (file: any): Promise<any> => {
  try {
    const randomName = (bytes = 32) =>
      crypto.randomBytes(bytes).toString("hex");
    const fileName = randomName();
    const directoryPath = path.join(__dirname, "..", "..", "input");
    const filePath = path.join(directoryPath, `${fileName}.mp4`);

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    const paths = await new Promise<any>((resolve, reject) => {
      fs.writeFile(filePath, file, async (err) => {
        if (err) {
          console.error("Error saving file:", err);
          throw err;
        }
        console.log("File saved successfully:", filePath);

        try {
          const outputDirectoryPath = await transcodeWithFFmpeg(
            fileName,
            filePath
          );
          resolve({ directoryPath, filePath, fileName, outputDirectoryPath });
        } catch (error) {
          console.error("Error transcoding with FFmpeg:", error);
        }
      });
    });
    return paths;
  } catch (e: any) {
    console.log(e);
  }
};

const transcodeWithFFmpeg = async (fileName: string, filePath: string) => {
  const directoryPath = path.join(
    __dirname,
    "..",
    "..",
    `output/hls/${fileName}`
  );

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  const resolutions = [
    {
      resolution: "256x144",
      videoBitrate: "200k",
      audioBitrate: "64k",
    },
    {
      resolution: "640x360",
      videoBitrate: "800k",
      audioBitrate: "128k",
    },
    {
      resolution: "1280x720",
      videoBitrate: "2500k",
      audioBitrate: "192k",
    },
    {
      resolution: "1920x1080",
      videoBitrate: "5000k",
      audioBitrate: "256k",
    },
  ];

  const variantPlaylists: { resolution: string; outputFileName: string }[] = [];

  for (const { resolution, videoBitrate, audioBitrate } of resolutions) {
    console.log(`HLS conversion starting for ${resolution}`);
    const outputFileName = `${fileName}_${resolution}.m3u8`;
    const segmentFileName = `${fileName}_${resolution}_%03d.ts`;

    try {
      await new Promise<void>((resolve, reject) => {
        ffmpeg(filePath)
          .outputOptions([
            `-c:v h264`,
            `-b:v ${videoBitrate}`,
            `-c:a aac`,
            `-b:a ${audioBitrate}`,
            `-vf scale=${resolution}`,
          ])
          .addOptions([
            "-profile:v baseline",
            "-level 3.0",
            "-start_number 0",
            "-hls_time 4",
            "-hls_list_size 0",
            "-master_pl_name master.m3u8",
          ])
          .output(`${directoryPath}/${outputFileName}`)
          .on("end", (stdout, stderr) => {
            console.log(stdout);
            resolve();
          })
          .on("error", (err) => reject(err))
          .run();
      });
      const variantPlaylist = {
        resolution,
        outputFileName,
      };
      variantPlaylists.push(variantPlaylist);
      console.log(`HLS conversion done for ${resolution}`);
    } catch (error) {
      console.error(
        `Error occurred during HLS conversion for ${resolution}: ${error}`
      );
      const status = false;
      return status;
      // Handle error as per your requirement, e.g., retry, skip, or terminate.
    }
  }
  console.log(`HLS master m3u8 playlist generating`);

  let masterPlaylist = variantPlaylists
    .map((variantPlaylist) => {
      const { resolution, outputFileName } = variantPlaylist;
      const bandwidth =
        resolution === "256x144"
          ? 264000
          : resolution === "640x360"
          ? 1024000
          : resolution === "1280x720"
          ? 3072000
          : 5500000;
      ``;
      return `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${resolution}\n${outputFileName}`;
    })
    .join("\n");
  masterPlaylist = `#EXTM3U\n` + masterPlaylist;

  const masterPlaylistFileName = `${fileName}_master.m3u8`;

  const masterPlaylistPath = `${directoryPath}/${masterPlaylistFileName}`;
  fs.writeFileSync(masterPlaylistPath, masterPlaylist);
  console.log(`HLS master m3u8 playlist generated`);
  return directoryPath;
};
