const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:5000"

export async function apiFetch(path: string, init?: RequestInit) {
  let response: Response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, init)
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        `Cannot connect to the API at ${API_BASE_URL}. Make sure the backend server is running.`
      )
    }

    throw error
  }

  if (!response.ok) {
    throw new Error(`The API request failed with status ${response.status}.`)
  }

  return response
}
