import { Employee } from '@prisma/client';
import { Card, Form } from 'antd';
import { CustomInput } from '../CustomInput/CustomInput';
import { CustomButton } from '../CustomButton/CustomButton';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: T;
};
export const EmployeeForm = ({
  onFinish,
  title,
  btnText,
  error,
  employee,
}: Props<Employee>) => {
  return (
    <Card title={title} style={{ width: '30rem' }}>
      <Form name="employee-form" onFinish={onFinish} initialValues={employee}>
        <CustomInput type="text" name="firstName" placeholder="First Name" />
        <CustomInput type="text" name="lastName" placeholder="Last Name" />
        <CustomInput type="number" name="age" placeholder="Age" />
        <CustomInput type="text" name="address" placeholder="Address" />
        <CustomButton htmlType="submit">{btnText}</CustomButton>
      </Form>
      <ErrorMessage message={error} />
    </Card>
  );
};
