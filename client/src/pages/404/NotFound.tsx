import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';
import { Layout } from '../../components/layout/Layout';

export const NotFound = () => {
  return (
    <Layout>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="dashed">
            <Link to={Paths.home}>Back Home</Link>
          </Button>
        }
      />
    </Layout>
  );
};
