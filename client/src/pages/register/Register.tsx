import { Card, Form, Row, Space, Typography } from 'antd';
import { Layout } from '../../components/layout/Layout';
import { CustomInput } from '../../components/CustomInput/CustomInput';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';

export const Register = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Register" style={{ width: '30rem' }}>
          <Form onFinish={() => null}>
            <CustomInput name="name" placeholder="name" />
            <CustomInput name="email" placeholder="email" />
            <PasswordInput name="password" placeholder="password" />
            <PasswordInput name="confirm" placeholder="confirm password" />
            <CustomButton type="primary" htmlType="submit">
              Register
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Already registered? <Link to={Paths.login}>Login </Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
