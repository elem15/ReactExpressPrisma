import { Employee } from '@prisma/client';
import { EmployeeForm } from '../../components/employeeForm/EmployeeForm';
import { Layout } from '../../components/layout/Layout';
import { Row } from 'antd';
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from '../../app/services/employees';
import { isErrorWithMessage } from '../../utils/isErrorWithMessage';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { selectIsAuthenticated } from '../../features/auth/authSlice';
import { useLayoutEffect, useState } from 'react';
import { Paths } from '../../paths';

export const EmployeeEdit = () => {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading } = useGetEmployeeQuery(id);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isAuth = useAppSelector(selectIsAuthenticated);
  const [editEmployee, editEmployeeResult] = useEditEmployeeMutation();
  const onFinish = async (employee: Employee) => {
    try {
      await editEmployee({ ...data, ...employee }).unwrap();
      setError('');
      navigate(`${Paths.status}/updated`);
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
          employee={data}
        />
      </Row>
    </Layout>
  );
};
