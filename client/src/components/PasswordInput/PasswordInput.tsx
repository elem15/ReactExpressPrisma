import { Form, Input } from 'antd';
import { NamePath } from 'antd/es/form/interface';

type Props = {
  name: 'confirm' | 'password';
  placeholder: string;
  dependencies?: NamePath[];
};
export const PasswordInput = ({ name, placeholder, dependencies }: Props) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[
        { required: true, message: 'Required' },
        ({ getFieldValue }) => ({
          validator(_, value: string) {
            if (!value) {
              return Promise.resolve();
            }
            if (name === 'confirm') {
              if (getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              );
            } else {
              if (value.length < 6) {
                return Promise.reject(
                  new Error('Passwords must be more then 6 characters')
                );
              }
              return Promise.resolve();
            }
          },
        }),
      ]}
    >
      <Input placeholder={placeholder} type="password" size="large" />
    </Form.Item>
  );
};
