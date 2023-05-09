import { Navigate, useNavigate, useParams } from 'react-router';
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from '../../app/services/employees';
import { selectUser } from '../../features/auth/authSlice';
import { useAppSelector } from '../../app/hooks';
import { Paths } from '../../paths';
import { Layout } from '../../components/layout/Layout';
import { Descriptions, Divider, Modal, Space } from 'antd';
import { useState } from 'react';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { Link } from 'react-router-dom';
import { isErrorWithMessage } from '../../utils/isErrorWithMessage';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export const Employee = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isOpen, setOpen] = useState(false);
  const params = useParams<{ id: string }>();
  const { id } = params as { id: string };
  const { data, isLoading } = useGetEmployeeQuery(id || '');
  const [removeEmployee] = useRemoveEmployeeMutation();
  const user = useAppSelector(selectUser);
  const handleRemove = async () => {
    setOpen(false);
    try {
      await removeEmployee(id).unwrap();
      navigate(Paths.status + '/deleted');
    } catch (error) {
      if (isErrorWithMessage(error)) {
        setError(error.data.message || 'unable to remove');
      } else {
        setError('unknown error');
      }
    }
  };
  if (isLoading) return <span>Loading</span>;

  if (!data) return <Navigate to={Paths.home} />;

  return (
    <Layout>
      <Descriptions title="About employee" bordered>
        <Descriptions.Item label="Name" span={3}>
          {`${data.firstName} ${data.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Age" span={3}>
          {`${data.age}`}
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={3}>
          {`${data.address}`}
        </Descriptions.Item>
      </Descriptions>
      {user?.id == data.userId && (
        <>
          <Divider orientation="left">Actions</Divider>
          <Space>
            <Link to={`${Paths.employeeUpdate}/${data.id}`}>
              <CustomButton
                shape="round"
                type="default"
                icon={<EditOutlined />}
              >
                Edit employee
              </CustomButton>
            </Link>
            <CustomButton
              shape="round"
              danger
              icon={<DeleteOutlined />}
              onClick={() => setOpen(true)}
            >
              Remove employee
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Confirm removing"
        open={isOpen}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onOk={handleRemove}
        okText="Confirm"
        onCancel={() => setOpen(false)}
      >
        Are you sure you want to delete an employee?
      </Modal>
    </Layout>
  );
};
