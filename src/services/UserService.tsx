import api from "../utils/api"

class UserServce {
    async createUser(user: any) {
        return await api.post("/register/", user).then(response => response.data);
    }
}


const userService = new UserServce()

export default userService;