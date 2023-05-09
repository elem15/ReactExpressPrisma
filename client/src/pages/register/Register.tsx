import { Card, Form, Row, Space, Typography } from 'antd';
import { Layout } from '../../components/layout/Layout';
import { CustomInput } from '../../components/CustomInput/CustomInput';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../paths';
import { UserData, useRegisterMutation } from '../../app/services/auth';
import { useState } from 'react';
import { isErrorWithMessage } from '../../utils/isErrorWithMessage';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

export const Register = () => {
  const navigate = useNavigate();
  const [registerUser, registerUserResult] = useRegisterMutation();
  const [error, setError] = useState('');
  const register = async (data: UserData) => {
    try {
      await registerUser(data).unwrap();
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
        <Card title="Register" style={{ width: '30rem' }}>
          <Form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onFinish={register}
          >
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
        <ErrorMessage message={error} />
      </Row>
    </Layout>
  );
};
