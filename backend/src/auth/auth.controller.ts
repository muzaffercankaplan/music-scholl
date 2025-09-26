import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";

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
  @Post("login")
  login(@Body() body: { email: string; password: string }) {
    const { email, password } = body ?? ({} as any);
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) {
      throw new UnauthorizedException("invalid credentials");
    }
    return {
      accessToken: `token-${found.role}-${Date.now()}`,
      user: { id: found.id, name: found.name, role: found.role },
    };
  }
}
