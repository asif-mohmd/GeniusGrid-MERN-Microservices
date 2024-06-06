export interface IInstructorInteractor {
    instructorRegister(instructorData: {
        name: string;
        email: string;
        password?: string;
        avatar?: string;
    }): any;
    updateUser(input:any): Promise<boolean>;
    instructorLogin(email:string,password:string):any;
    activateInstructor(instructorData: { name: string; email: string; password: string }): any;
    getAllInstructors():any;
    blockUnblockInstructor(instructorId:string,isVerified:Boolean):Promise<Boolean  | void> ;
    getProfile(instructorId: string):Promise<any>   
}
