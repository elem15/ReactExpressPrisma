import { Layout, Space, Typography } from 'antd';
import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import styles from './Header.module.css';
import { CustomButton } from '../CustomButton/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../paths';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout, selectIsAuthenticated } from '../../features/auth/authSlice';

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(selectIsAuthenticated);
  const handleLogout = () => {
    dispatch(logout());
    navigate(Paths.login);
  };
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
      {isAuth ? (
        <Space>
          <Link to={Paths.login}>
            <CustomButton
              type="ghost"
              icon={<UserOutlined />}
              onClick={handleLogout}
            >
              Logout
            </CustomButton>
          </Link>
        </Space>
      ) : (
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
      )}
    </Layout.Header>
  );
};
