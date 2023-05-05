import { Card, Form, Row, Space, Typography } from 'antd';
import { Layout } from '../../components/layout/Layout';
import { CustomInput } from '../../components/CustomInput/CustomInput';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';

export const Login = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="SignIn" style={{ width: '30rem' }}>
          <Form onFinish={() => null}>
            <CustomInput name="email" placeholder="email" />
            <PasswordInput name="password" placeholder="password" />
            <CustomButton type="primary" htmlType="submit">
              Login
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              No account? <Link to={Paths.register}>Register</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
