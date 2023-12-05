import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

jest.mock("redux-persist", () => ({
  ...jest.requireActual("redux-persist"),
  persistStore: jest.fn(),
  persistReducer: jest.fn(),
}));

jest.mock("redux", () => ({
  ...jest.requireActual("redux"),
  legacy_createStore: jest.fn(),
  applyMiddleware: jest.fn(),
}));

describe("Redux Store Configuration", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("store configuration", () => {
    // Mock the return value of createStore and applyMiddleware
    createStore.mockImplementation((reducer, enhancer) => ({
      reducer,
      enhancer,
      getState: jest.fn(),
      dispatch: jest.fn(),
    }));

    applyMiddleware.mockImplementation((...middlewares) => middlewares);

    // Mock the return value of persistReducer
    const mockPersistedReducer = jest.fn();
    persistReducer.mockReturnValue(mockPersistedReducer);

    // Mock the return value of persistStore
    const mockPersistedStore = jest.fn();
    persistStore.mockReturnValue(mockPersistedStore);

    // Import the actual store configuration file
    const { store, persistedStore } = require("./store");

    // Assert that createStore and applyMiddleware were called with the expected arguments
    expect(createStore).toHaveBeenCalledWith(mockPersistedReducer, [thunk]);

    // Assert that persistReducer was called with the expected arguments
    expect(persistReducer).toHaveBeenCalledWith(
      { key: "iws", storage },
      rootReducer
    );

    // Assert that persistStore was called with the expected arguments
    expect(persistStore).toHaveBeenCalledWith(store);

    // Assert that the returned store and persistedStore match the mocked values
    expect(store).toEqual({
      reducer: mockPersistedReducer,
      enhancer: [thunk],
      getState: expect.any(Function),
      dispatch: expect.any(Function),
    });

    expect(persistedStore).toBe(mockPersistedStore);
  });
});
