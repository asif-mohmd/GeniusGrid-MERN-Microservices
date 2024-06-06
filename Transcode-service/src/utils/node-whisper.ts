import path from 'path';
import { nodewhisper } from 'nodejs-whisper';

export const transcriberNode = async (AudiofileName: string): Promise<void> => {
    const MODELS_LIST = [
        'tiny',
        'tiny.en',
        'base',
        'base.en',
        'small',
        'small.en',
        'medium',
        'medium.en',
        'large-v1',
        'large',
    ];

    // Define the directory where your audio files are located
    const fileInputPath = "C:\\Users\\asifa\\Desktop\\Genius Grid\\Transcode-service\\input\\";
    
    // Resolve the full path to the audio file
    const filePath = path.resolve(fileInputPath,"2b90e37308c744a6c422a4012e156b68e7264e464b90192a75af832e08cec97f.mp4");

    // Transcribe the audio file using nodewhisper
    try {
        await nodewhisper(filePath, {
            modelName: 'tiny.en',
            verbose: true,
            removeWavFileAfterTranscription: true,
            whisperOptions: {
                outputInVtt: true,
                translateToEnglish: true,
                timestamps_length: 20,
            },
        });
        console.log("Transcription completed successfully!");
    } catch (error) {
        console.error("Error occurred during transcription:", error);
    }
};
