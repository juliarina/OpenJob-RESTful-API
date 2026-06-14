import BookmarkRepositories from "../repositories/bookmark-repositories.js";
import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import CacheService from "../../../cache/redis-config.js";

export const createBookmark = async (req, res, next) => {
    const userId = req.user.id;
    const { jobId } = req.params;

    const bookmark = await BookmarkRepositories.createBookmark({
        userId,
        jobId,
    });

    if (!bookmark) {
        return next(new InvariantError('Failed to create bookmark'));
    }

    await CacheService.delete(`bookmarks:${bookmark.id}`);
    await CacheService.delete(`bookmarks:user:${userId}`);

    return response(res, 201, 'Bookmark added successfully', bookmark);
};

export const deleteBookmark = async (req, res, next) => {
    const userId = req.user.id;
    const { jobId } = req.params;

    const deletedBookmark = await BookmarkRepositories.deleteBookmark(userId, jobId);

    if (!deletedBookmark?.id) {
        return next(new NotFoundError('Bookmark not found'));
    }

    await CacheService.delete(`bookmarks:${deletedBookmark.id}`);
    await CacheService.delete(`bookmarks:user:${userId}`);

    return response(res, 200, 'Bookmark deleted successfully', deletedBookmark.id);
};

export const getBookmarksByUserId = async (req, res, next) => {
    const userId = req.user.id;
    let bookmarks;

    try {
        bookmarks = JSON.parse(await CacheService.get(`bookmarks:user:${userId}`));
        res.setHeader('X-Data-Source', 'cache');
    } catch(error) {
        bookmarks = await BookmarkRepositories.getBookmarksByUserId(userId);

        await CacheService.set(`bookmarks:user:${userId}`, JSON.stringify(bookmarks));
        res.setHeader('X-Data-Source', 'database');
    }

    return response(res, 200, 'Bookmarks retrieved successfully', { bookmarks: bookmarks });
};

export const getBookmarkById = async (req, res, next) => {
    const userId = req.user.id;
    const { id } = req.params;
    let bookmark;

    try {
        bookmark = JSON.parse(await CacheService.get(`bookmarks:${id}`));
        res.setHeader('X-Data-Source', 'cache');
    } catch(error) {
        bookmark = await BookmarkRepositories.getBookmarkById(userId, id);

        if (!bookmark) {
            return next(new NotFoundError('Bookmark not found'));
        }

        await CacheService.set(`bookmarks:${id}`, JSON.stringify(bookmark));
        res.setHeader('X-Data-Source', 'database');
    }

    return response(res, 200, 'Bookmark retrieved successfully', bookmark);
};