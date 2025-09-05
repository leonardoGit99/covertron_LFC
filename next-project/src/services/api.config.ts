/* export const baseLocalURL =
  (typeof window === "undefined"
    ? process.env.INTERNAL_API_URL // server-side: "http://backend:4000"
    : process.env.NEXT_PUBLIC_API_URL // client-side: "http://localhost:4000"
  ) + "/api"; */

  // export const baseLocalURL ='http://localhost:4000/api'
  export const baseLocalURL ='https://covertron-server.onrender.com'



export const jsonHeaders = {
  "Content-Type": "application/json",
}

export const multipartHeaders = {
  "Content-Type": "multipart/form-data",
}