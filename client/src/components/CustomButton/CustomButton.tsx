import { Button, Form } from 'antd';
import React from 'react';

type Props = {
  children: React.ReactNode;
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed';
  danger?: boolean;
  loading?: boolean;
  shape?: 'default' | 'circle' | 'round';
  icon?: React.ReactNode;
};
export const CustomButton = ({
  children,
  htmlType,
  type,
  danger,
  onClick,
  loading,
  shape,
  icon,
}: Props) => {
  return (
    <Form.Item>
      <Button
        htmlType={htmlType}
        type={type}
        danger={danger}
        onClick={onClick}
        loading={loading}
        shape={shape}
        icon={icon}
      >
        {children}
      </Button>
    </Form.Item>
  );
};
