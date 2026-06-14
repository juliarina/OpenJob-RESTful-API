import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import UserRepositories from '../../users/repositories/user-repositories.js';
import ApplicationRepositories from '../../applications/repositories/application-repositories.js';
import BookmarkRepositories from '../../bookmarks/repositories/bookmark-repositories.js';

export const getUserById = async (req, res, next) => {
    const id = req.user.id;

    const user = await UserRepositories.getUserById(id);

    if (!user) {
        return next(new NotFoundError('User not found'));
    }

    return response(res, 200, 'User retrieved successfully', user);
};

export const getApplicationsByUserId = async (req, res, next) => {
    const userId = req.user.id;

    const applications = await ApplicationRepositories.getApplicationsByUserId(userId);

    return response(res, 200, 'Applications retrieved successfully', { applications: applications });
};

export const getBookmarksByUserId = async (req, res, next) => {
    const userId = req.user.id;

    const bookmarks = await BookmarkRepositories.getBookmarksByUserId(userId);

    return response(res, 200, 'Bookmarks retrieved successfully', { bookmarks: bookmarks });
};