const initialState = {
  categories: [
    {
      name: "High",
      id: 1,
    },
    {
      name: "Medium",
      id: 2,
    },
    {
      name: "Low",
      id: 3,
    },
  ],
  loading: false,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CATEGORY_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ADD_CATEGORY_SUCCESS":
      return {
        ...state,
        categories: [...state.categories, action.payload],
        loading: false,
      };

    case "ADD_CATEGORY_FAILURE":
      return {
        ...state,
        loading: false,
      };

    case "EDIT_CATEGORY_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "EDIT_CATEGORY_SUCCESS":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.categoryId
            ? { ...category, ...action.payload.updatedCategory }
            : category
        ),
        loading: false,
      };

    case "EDIT_CATEGORY_FAILURE":
      return {
        ...state,
        loading: false,
      };

    case "DELETE_CATEGORY_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "DELETE_CATEGORY_SUCCESS":
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
        loading: false,
      };

    case "DELETE_CATEGORY_FAILURE":
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default categoryReducer;
