
export class Admin{
    constructor(
        public readonly email : string,
        public readonly name : string,
        public readonly isVerified : boolean,
        public readonly courses?:Array<{ courseId: string}>,
        public password?: string,
        public readonly _id ?:string

    ){}
}