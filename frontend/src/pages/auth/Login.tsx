import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Form, Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import type { LoginParams } from "../../services";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/teacher", {
        replace: true,
      });
    }
  }, [user, navigate]);

  const onFinish = async (values: LoginParams) => {
    setError(null);
    setLoading(true);
    try {
      await login(values);
    } catch (e: any) {
      setError(e?.message || "Giriş başarısız");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Card
        style={{ width: 380 }}
        styles={{ body: { padding: 24 } }}
        className="shadow-md"
      >
        <div className="text-center mb-4">
          <Typography.Title level={3} style={{ marginBottom: 4 }}>
            a
          </Typography.Title>
          <Typography.Text type="secondary">
            Hesabınıza giriş yapın
          </Typography.Text>
        </div>

        {error && (
          <div className="mb-3">
            <Alert type="error" message={error} showIcon />
          </div>
        )}

        <Form
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{ email: "admin@demo.local", password: "admin123" }}
        >
          <Form.Item
            label="E‑posta"
            name="email"
            rules={[{ required: true, message: "E‑posta zorunlu" }]}
          >
            <Input
              type="email"
              placeholder="admin@demo.local"
              prefix={<MailOutlined style={{ color: "#9ca3af" }} />}
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: "Şifre zorunlu" }]}
          >
            <Input.Password
              placeholder="admin123"
              prefix={<LockOutlined style={{ color: "#9ca3af" }} />}
              size="large"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            style={{ marginTop: 6 }}
          >
            Giriş yap
          </Button>
        </Form>

        <div className="mt-4 text-center">
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            Demo: admin@demo.local / admin123 • teacher@demo.local / teacher123
          </Typography.Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;
