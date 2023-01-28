import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './siteDataReducer'

export const store = configureStore({ reducer: { data: dataReducer } })