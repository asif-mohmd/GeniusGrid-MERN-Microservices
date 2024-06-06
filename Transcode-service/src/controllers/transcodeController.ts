import { ITranscodeInteractor } from "../interface/ITranscodeInteractor";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../interface/custom";
import { statusCode } from "asif-status-codes-package";
export class TranscodeController {
  private interactor: ITranscodeInteractor;

  constructor(interactor: ITranscodeInteractor) {
    this.interactor = interactor;
  }

  transcodeData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const instructorData = req.cookies.instructorData;
      const decoded: any = jwt.verify(
        instructorData,
        process.env.JWT_SECRET || ""
      );
      const instructorId = decoded.instructorId;
      const file: any = req.file;
      const response: any = await this.interactor.addFileDetails(
        file?.originalname,
        instructorId
      );

      const status = await this.interactor.transcodeMedia(
        file?.buffer,
        response?._id
      );
      if (status.status === "Uploaded") {
        res.status(200).json({ status: true });
      } else if (status === 503) {
        res.status(503).json({ status: false });
      } else {
        res.status(404).json({ status: false });
      }
    } catch (err) {}
  };

  getData = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const instructorData = req.cookies.instructorData;
      const decoded: any = jwt.verify(
        instructorData,
        process.env.JWT_SECRET || ""
      );
      const instructorId = decoded.instructorId;
      const response = await this.interactor.getData(instructorId);
      res.status(statusCode.Accepted).json(response);
    } catch (e: any) {
      next(e);
    }
  };
}
