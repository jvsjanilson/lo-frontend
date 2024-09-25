import axios from "axios";
import { BASE_URL } from "../utils/api";

class UserServce {
    async createUser(user: any) {
        return await axios.post(BASE_URL+"register/", user).then(response => response.data);
    }
}

const userService = new UserServce()

export default userService;