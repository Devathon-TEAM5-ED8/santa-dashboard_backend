import cors from "cors";

interface CorsOptions {
  acceptedOrigins?: string[];
}
const ACCEPTED_ORIGINS: string[] = ["http://localhost:4200"];

export const corsMiddleware = ({
  acceptedOrigins = ACCEPTED_ORIGINS,
}: CorsOptions = {}) =>
  cors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void
    ) => {
      if (acceptedOrigins.includes(origin || "")) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("No permitido por CORS"));
    },
  });
