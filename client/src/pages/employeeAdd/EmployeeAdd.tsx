import { Employee } from '@prisma/client';
import { EmployeeForm } from '../../components/employeeForm/EmployeeForm';
import { Layout } from '../../components/layout/Layout';
import { Row } from 'antd';
import { useAddEmployeeMutation } from '../../app/services/employees';
import {
  handleErrors,
  isErrorWithMessage,
} from '../../utils/isErrorWithMessage';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { selectIsAuthenticated } from '../../features/auth/authSlice';
import { useLayoutEffect, useState } from 'react';
import { Paths } from '../../paths';

export const EmployeeAdd = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isAuth = useAppSelector(selectIsAuthenticated);
  const [addEmployee, addEmployeeResult] = useAddEmployeeMutation();
  const onFinish = async (employee: Employee) => {
    try {
      await addEmployee(employee).unwrap();
      setError('');
      navigate(`${Paths.status}/created`);
    } catch (e) {
      const isError = isErrorWithMessage(e);
      if (isError) {
        setError(e.data.message);
      } else {
        setError('unknown error');
      }
    }
  };
  useLayoutEffect(() => {
    if (!isAuth) navigate(Paths.login);
  }, [isAuth, navigate]);
  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          title="Add Employee"
          btnText="Submit"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onFinish={onFinish}
          error={error}
        />
      </Row>
    </Layout>
  );
};
