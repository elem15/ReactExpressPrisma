import { Layout, Space, Typography } from 'antd';
import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import styles from './Header.module.css';
import { CustomButton } from '../CustomButton/CustomButton';
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';

export const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type="ghost">
            <Typography.Title>Employees</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      <Space>
        <Link to={Paths.register}>
          <CustomButton type="ghost" icon={<UserOutlined />}>
            Register
          </CustomButton>
        </Link>
        <Link to={Paths.login}>
          <CustomButton type="ghost" icon={<LoginOutlined />}>
            Login
          </CustomButton>
        </Link>
      </Space>
    </Layout.Header>
  );
};
