import { Transcoder } from "../entities/transcoder";

export interface ITranscodeInteractor {

    addFileDetails(fileName: string, instructorId: string): Promise<Transcoder | null>
    transcodeMedia(file: File, id:String): any;
    getData(id:string):Promise<Transcoder | null>;

}