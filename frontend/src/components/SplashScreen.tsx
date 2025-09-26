import { Icon } from "@iconify/react";
import { Typography } from "antd";

type SplashScreenProps = {
  title?: string;
};

export const SplashScreen = ({ title = "Lavita Music" }: SplashScreenProps) => {
  return (
    <div className="splash-root">
      <div className="splash-logo">
        <Icon icon="mdi:music" width={48} height={48} />
      </div>
      <Typography.Title level={3} style={{ marginTop: 12, marginBottom: 0 }}>
        {title}
      </Typography.Title>
      <Typography.Text type="secondary">Yükleniyor...</Typography.Text>
    </div>
  );
};

export default SplashScreen;
