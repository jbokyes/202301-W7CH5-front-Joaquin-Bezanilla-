import { JwtPayload } from "jsonwebtoken";
export interface PayloadToken extends JwtPayload {
  id: string;
  email: string;
  role: string;
}
