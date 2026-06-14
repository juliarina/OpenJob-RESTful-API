import CategoryRepositories from "../repositories/category-repositories.js";
import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";

export const createCategory = async(req, res, next) => {
    const { name } = req.validated;

    const category = await CategoryRepositories.createCategory({ name });

    if (!category) {
        return next(new InvariantError('Failed to create category'));
    }

    return response(res, 201, 'Category added successfully', category);
};

export const editCategory = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.validated;

    const category = await CategoryRepositories.editCategory({ id, name });

    if (!category) {
        return next(new NotFoundError('Category not found'));
    }

    return response(res, 200, 'Category updated successfully', category);
} 

export const deleteCategory = async (req, res, next) => {
    const { id } = req.params;

    const deletedCategory = await CategoryRepositories.deleteCategory(id);

    if (!deletedCategory?.id) {
        return next(new NotFoundError('Category not found'));
    }

    return response(res, 200, 'Category deleted successfully', deleteCategory.id);
}

export const getCategories = async (req, res, next) => {
    const categories = await CategoryRepositories.getAllCategories();

    return response(res, 200, 'Categories retrieved successfully', { categories: categories });
};

export const getCategoryById = async (req, res, next) => {
    const { id } = req.params;

    const category = await CategoryRepositories.getCategoryById(id);

    if (!category) {
        return next(new NotFoundError('Category not found'));
    }
    
    return response(res, 200, 'Category retrieved successfully', category);
};