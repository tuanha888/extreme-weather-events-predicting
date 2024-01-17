import {createSlice} from "@reduxjs/toolkit"
import { getPredictions } from "../actions/image-action"

const imageSlice = createSlice({
    name: "image",
    initialState: {
        images: []
    },
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(getPredictions.fulfilled, (state, action)=> {
            const images = action.payload
            state.images = images
        })
    },
})

export const {} = imageSlice.actions;
export default imageSlice.reducer;