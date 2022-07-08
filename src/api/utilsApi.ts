export async function handleResponse(response: any) {
    if (response.ok) return response.json();
    if (response.status === 400 || response.status === 401) {
        // So, a server-side validation error occurred.
        // Server side validation returns a string error message, so parse as text instead of json.
        const error = await response.text();
        throw new Error(error);
    }
    throw new Error("Network response was not ok.");
}

// In a real app, would likely call an error logging service.
export function handleError(error: any) {
    // eslint-disable-next-line no-console
    console.log("API call failed. " + error);
    throw error;
}

// aici sunt rutele pt api-uri
export const apiURL =  process.env.REACT_APP_REST_API

export const imgURL = process.env.REACT_APP_REST_API


