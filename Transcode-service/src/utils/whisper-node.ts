import { whisper } from "whisper-node-ts";
import * as fs from "fs";
import path from "path";

const options = {
  modelName: "tiny.en",
  whisperOptions: {
    gen_file_vtt: true, // outputs .vtt file
  },
};

export const transcriber = async (filePath: string): Promise<any> => {

    try {
      const transcript = await whisper(filePath, options);
      console.log("Transcription completed");
      return

    } catch (err) {
      console.error("Error during transcription:", err);
      throw err; 
    }
    
  };