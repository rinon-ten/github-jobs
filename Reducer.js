import React, { useEffect, useState, useReducer, createContext } from 'react'

export default function Reducer(proxiUrl, apiUrl) {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "SET_JOBS": {
                return {
                    ...state,
                    loading: action.loading,
                    jobs: action.jobsData
                }
            }
            case "SET_DESCRIPTION": {
                return {
                    ...state, description: action.description,
                }
            }
            case "SET_LOCATION_VALUE": {
                return {
                    ...state, location: action.location,
                }
            }
            case "SET_FULLTIME_VALUE": {
                return {
                    ...state, fulltime: action.fulltime,
                }
            }
            case "SET_LOCATION_INPUT_VALUE": {
                return {
                    ...state, location: action.locationValue,
                }
            }
            default:
                return state
        }
    }, {
        jobs: [],
        loading: true,
        description: "",
        location: "",
        fulltime: false,
    })
    const [pageCount, setPageCount] = useState(0)
    const [perPage] = useState(5);

    // Fetch the first jobs to display 
    async function fetchJobs(endpoint) {
        const response = await fetch(endpoint);
        const data = await response.json();
        setPageCount(Math.ceil(data.length / perPage))
        dispatch({ type: "SET_JOBS", jobsData: data, loading: false })
    }

    return { state, dispatch, perPage, pageCount, setPageCount, fetchJobs };
}

