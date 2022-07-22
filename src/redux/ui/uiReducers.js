import { PAGE_LOADING,BUTTON_LOADING, STOP_LOADING, SITE_URL } from '../types'
const initialState = {
	page_loading: false,
	btn_loading: false,
}


const uiReducer = (state = initialState, action) => {
    switch(action.type){
        case PAGE_LOADING:
            return {
                ... state,
                page_loading: true,
                btn_loading:false,
            }
        case BUTTON_LOADING:
            return {
                ... state,
                page_loading: false,
                btn_loading:true,
            }
        case STOP_LOADING:
            return {
                ... state,
                page_loading: false,
                btn_loading:false,
            }                
        default : return state    
    }
}

export default uiReducer;