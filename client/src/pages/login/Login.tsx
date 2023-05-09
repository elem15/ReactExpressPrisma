import { Card, Form, Row, Space, Typography } from 'antd';
import { Layout } from '../../components/layout/Layout';
import { CustomInput } from '../../components/CustomInput/CustomInput';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../paths';
import { UserData, useLoginMutation } from '../../app/services/auth';
import { isErrorWithMessage } from '../../utils/isErrorWithMessage';
import { useState } from 'react';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

export const Login = () => {
  const navigate = useNavigate();
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = useState('');
  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
      navigate(Paths.home);
    } catch (e) {
      const maybeError = isErrorWithMessage(e);
      if (maybeError) {
        setError(e.data.message);
      } else {
        setError('Unknown error');
      }
    }
  };
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="SignIn" style={{ width: '30rem' }}>
          <Form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onFinish={login}
          >
            <CustomInput name="email" placeholder="email" type="email" />
            <PasswordInput name="password" placeholder="password" />
            <CustomButton type="primary" htmlType="submit">
              Login
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              No account? <Link to={Paths.register}>Register</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
