import express,{Application} from 'express'
import multer from "multer"

import { TranscodeController } from "../controllers/transcodeController";
import { TranscodeInteractor } from "../interactor/transcodeInteractor";
import { TranscodeRepository } from "../repository/transcodeRepository";

const storage = multer.memoryStorage()
const upload = multer({storage})

const TranscoderRoute:Application = express()


const repository = new TranscodeRepository()
const interactor = new TranscodeInteractor(repository)
const controller = new TranscodeController(interactor)

TranscoderRoute.post("/",upload.single("file"),controller.transcodeData.bind(controller))
TranscoderRoute.get("/videoURL",controller.getData.bind(controller))

export default TranscoderRoute