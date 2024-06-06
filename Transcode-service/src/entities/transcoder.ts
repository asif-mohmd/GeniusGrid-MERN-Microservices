export interface Transcoder {
    _id?: string;
    generatedName?: string;
    fileName: string;
    status: Status;
    createdAt?: string | Date;
    subtitleUrl: string;
    videoUrl: string;
    instructorId: string;
}

export enum Status{
    transcoding = "Transcoding",
    subtitle = "Subtitle generating",
    completed = "Uploaded",
    finishing = "Finishing process",
    error = "Error occured"
}