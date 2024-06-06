
export class User{
    constructor(
        public readonly email : string,
        public readonly name : string,
        public readonly isVerified : boolean,
        public readonly courses?:Array<{ courseId: string}>,
        public readonly avatar? :string,
        public password?: string,
        public readonly _id ?:string
    ){}
}