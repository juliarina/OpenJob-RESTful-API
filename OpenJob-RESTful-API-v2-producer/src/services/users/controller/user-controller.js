import UserRepositories from "../repositories/user-repositories.js";
import { ClientError, InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import CacheService from "../../../cache/redis-config.js";

export const createUser = async (req, res, next) => {
    const { name, email, password, role } = req.validated;

    const isEmailExist = await UserRepositories.verifyNewEmail(email)

    if (isEmailExist) {
        return next(new InvariantError('Failed to add user. Email already registered.'))
    }

    const user = await UserRepositories.createUser({
        name,
        email,
        password,
        role       
    });

    if (!user) {
        return next(new InvariantError('Failed to add user'));
    }

    await CacheService.delete(`users:${user.id}`);

    return response(res, 201, 'User added successfully', user);
}

export const getUserById = async (req, res, next) => {
    const { id } = req.params;
    let user;

    try {
        user = JSON.parse(await CacheService.get(`users:${id}`));
        res.setHeader('X-Data-Source', 'cache');
    } catch(error) {
        user = await UserRepositories.getUserById(id);
        if (!user) {
            return next(new NotFoundError('User not found'));
        }

        await CacheService.set(`users:${id}`, JSON.stringify(user));
        res.setHeader('X-Data-Source', 'database');
    }

    return response(res, 200, 'User retrieved successfully', user);
}