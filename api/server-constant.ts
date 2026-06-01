const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export interface ServerConstants {
  authenticationUrl: string;
}
export const serverConstants: ServerConstants = {
  authenticationUrl: `${baseUrl}/api`,
};

