/* export const baseLocalURL =
  (typeof window === "undefined"
    ? process.env.INTERNAL_API_URL // server-side: "http://backend:4000"
    : process.env.NEXT_PUBLIC_API_URL // client-side: "http://localhost:4000"
  ) + "/api"; */

const isProd = process.env.NODE_ENV === "production";
  
export const baseLocalURL = isProd
  ? "/api" // producción
  : "http://localhost:4000/api"; // desarrollo



export const jsonHeaders = {
  "Content-Type": "application/json",
}

export const multipartHeaders = {
  "Content-Type": "multipart/form-data",
}