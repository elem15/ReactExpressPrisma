import Title from 'antd/es/typography/Title';
import { Layout } from '../../components/layout/Layout';
import { useParams } from 'react-router';
import { Button, Result, Row } from 'antd';
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';

const statuses: Record<string, string> = {
  created: 'Employee successfully created',
  updated: 'Employee successfully updated',
  deleted: 'Employee successfully deleted',
};

export const Status = () => {
  const { status } = useParams();
  return (
    <Row align="middle" justify="center" style={{ width: '100%' }}>
      <Result
        status={status ? 'success' : 404}
        title={status ? statuses[status] : 'unknown'}
        extra={
          <Button>
            <Link to={Paths.home}>Home</Link>
          </Button>
        }
      />
      <Title></Title>
    </Row>
  );
};
