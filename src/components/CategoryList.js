import React, { useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCategory,
  editCategory,
  deleteCategory,
} from "../redux/actions/categoryActions";

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const loading = useSelector((state) => state.categories.loading);

  const [categoryState, setCategoryState] = useState({
    newCategory: "",
    updatedCategory: null,
    updatedCategoryValue: "",
    isDuplicateCategory: false,
  });

  // ADD CATEGORIES
  const handleAddCategory = useCallback(() => {
    const { newCategory } = categoryState;
    if (newCategory.trim() === "") return;

    if (!categories.some((category) => category.name === newCategory)) {
      dispatch(addCategory({ id: Date.now().toString(), name: newCategory }));
      setCategoryState((prevState) => ({ ...prevState, newCategory: "", isDuplicateCategory: false }));
    } else {
      setCategoryState((prevState) => ({ ...prevState, isDuplicateCategory: true }));
    }
  }, [categoryState, categories, dispatch]);

    // EDIT CATEGORIES
  const handleEditCategory = useCallback(() => {
    const { updatedCategoryValue, updatedCategory } = categoryState;
    if (updatedCategoryValue.trim() === "") return;

    if (!categories.some((category) => category.name === updatedCategoryValue)) {
      dispatch(editCategory(updatedCategory.id, { name: updatedCategoryValue }));
      setCategoryState((prevState) => ({ ...prevState, isDuplicateCategory: false, updatedCategory: null, updatedCategoryValue: "" }));
    } else {
      setCategoryState((prevState) => ({ ...prevState, isDuplicateCategory: true }));
    }
  }, [categoryState, categories, dispatch]);

    // DELETE CATEGORIES
  const handleDeleteCategory = useCallback((categoryId) => {
    dispatch(deleteCategory(categoryId));
  }, [dispatch]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setCategoryState((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleEditInputChange = useCallback((e) => {
    setCategoryState((prevState) => ({ ...prevState, updatedCategoryValue: e.target.value }));
  }, []);

  const { newCategory, updatedCategory, updatedCategoryValue, isDuplicateCategory } = categoryState;

  const categoryList = useMemo(() => (
    <ul className="category-list">
      {categories.map((category) => (
        <li key={category.id} className="category-item">
          {updatedCategory?.id === category.id ? (
            <>
              <input
                type="text"
                value={updatedCategoryValue}
                onChange={handleEditInputChange}
              />
              <div className="category-actions">
                <button onClick={handleEditCategory}>Update</button>
                <button onClick={() => setCategoryState((prevState) => ({ ...prevState, updatedCategory: null }))}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <span>{category.name}</span>
              <div className="category-actions">
                <button onClick={() => setCategoryState((prevState) => ({ ...prevState, updatedCategoryValue: category.name, updatedCategory: category }))}>Edit</button>
                <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  ), [categories, updatedCategory, updatedCategoryValue, handleEditCategory, handleEditInputChange, handleDeleteCategory]);

  return (
    <div className="category-list-container">
      <h2>{loading ? "Processing..." : "Category List"}</h2>
      {categoryList}
      {isDuplicateCategory && (
        <div className="error">Please Add Unique Category</div>
      )}
      <div className="add-category-container">
        <input
          type="text"
          data-testid="newCategory"
          name="newCategory"
          placeholder="New category"
          value={newCategory}
          onChange={handleInputChange}
        />
        <button data-testid="newCategoryBtn" onClick={handleAddCategory}>Add Category</button>
      </div>
    </div>
  );
};

export default CategoryList;
