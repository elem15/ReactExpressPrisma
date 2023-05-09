import { PlusCircleOutlined } from '@ant-design/icons';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { Layout } from '../../components/layout/Layout';
import { Table } from 'antd';
import { useGetAllEmployeesQuery } from '../../app/services/employees';
import { useNavigate } from 'react-router';
import { Paths } from '../../paths';
import { selectIsAuthenticated } from '../../features/auth/authSlice';
import { useAppSelector } from '../../app/hooks';
import { useLayoutEffect } from 'react';

const columns = [
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

export const Employees = () => {
  const { data, isLoading } = useGetAllEmployeesQuery();
  const navigate = useNavigate();
  const isAuth = useAppSelector(selectIsAuthenticated);
  useLayoutEffect(() => {
    if (!isAuth) navigate(Paths.login);
  }, [isAuth, navigate]);
  return (
    <Layout>
      <CustomButton
        type="primary"
        onClick={() => navigate(Paths.employeeAdd)}
        icon={<PlusCircleOutlined />}
      >
        Add
      </CustomButton>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`${Paths.employee}/${record.id}`);
            },
          };
        }}
      ></Table>
    </Layout>
  );
};
