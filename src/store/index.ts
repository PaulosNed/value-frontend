import { configureStore } from '@reduxjs/toolkit'
import { userApi } from './users/usersApi'
import { coursesApi } from './courses/coursesApi'


export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
  },

  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(userApi.middleware, coursesApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch