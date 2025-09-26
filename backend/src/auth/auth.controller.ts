import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

type Role = "admin" | "teacher";

const users: Array<{
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}> = [
  {
    id: "1",
    name: "Admin",
    email: "admin@demo.local",
    password: "admin123",
    role: "admin",
  },
  {
    id: "2",
    name: "Teacher",
    email: "teacher@demo.local",
    password: "teacher123",
    role: "teacher",
  },
];

@Controller("auth")
export class AuthController {
  constructor(private readonly jwt: JwtService) {}
  @Post("login")
  login(@Body() body: { email: string; password: string }) {
    const { email, password } = body ?? ({} as any);
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) {
      throw new UnauthorizedException("invalid credentials");
    }
    const accessToken = this.jwt.sign({
      sub: found.id,
      name: found.name,
      role: found.role,
    });
    return { accessToken };
  }
}
