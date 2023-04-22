import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {DefaultDALCollection} from '@/dal/SharedDALCollection';
import {IAppConfig} from '@/models';

export const fetchConfig = createAsyncThunk(
  'fetchAppConfig',
  async (_, {rejectWithValue}) => {
    const response = await DefaultDALCollection.getDALCollection()
      .getAppConfigDAL()
      .getAlls();
    if (response.data) {
      return response.data;
    } else if (response.error) {
      return rejectWithValue(response.error);
    } else {
      return rejectWithValue(null);
    }
  },
);

const slice = createSlice({
  name: 'appConfig',
  initialState: {} as IAppConfig,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchConfig.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export const reducer = slice.reducer;
