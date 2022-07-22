import axios from 'axios'
import { PAGE_LOADING,BUTTON_LOADING, STOP_LOADING, SITE_URL } from '../types'

export const pageLoadingRequest = () => {
    return {
		type: PAGE_LOADING
	}
}

export const buttonLoadingRequest = (data) => {
    return {
		type: BUTTON_LOADING,
    }
}

export const completeRequest = (data) => {
    return {
		type: STOP_LOADING,
    }
}



