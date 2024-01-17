import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getPredictions = createAsyncThunk(
    'get-images',
    async (data: any, {rejectWithValue} ) => {
        const response = await axios.post("http://127.0.0.1:5000/", data);
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return response.data

    }
)