import User from "src/app/models/User/User.interface";
import axios from "axios";

class UserBackend {


    constructor(){


    }


    async registerUserAccount(user: User){

        // call the backend api
        const feedback = await axios.post("http://localhost:1234/create-user-account", user);

        if(feedback.data.code === 'success'){

            return {
                message: "User account created",
                code: "success",
                data: feedback.data.data
            }

        }else{
            return {
                message: "User account could not be created",
                code: "error",
                data: null
            }

        }

    }




}


export default UserBackend;