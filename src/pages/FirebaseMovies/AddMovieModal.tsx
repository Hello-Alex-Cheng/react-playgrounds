import React from 'react'
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal
} from 'antd'

interface IProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  addMovie: (values: any) => void
}

export default function AddMovieModal(props: IProps) {
  const {
    visible,
    setVisible,
    addMovie,
  } = props

  const onFinish = (values: any) => {
    addMovie(values)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title="Add Movie"
      open={visible}
      // onOk={handleOk}
      footer={null}
      onCancel={() => setVisible(false)}
      destroyOnClose
      maskClosable
    >
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="title"
          name="title"
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="description"
          name="desc"
          rules={[{ required: true, message: 'Please input description!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="author"
          name="author"
          rules={[{ required: true, message: 'Please input author!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="date"
          name="date"
          rules={[{ required: true, message: 'Please input date!' }]}
        >
          <Input type='number' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
