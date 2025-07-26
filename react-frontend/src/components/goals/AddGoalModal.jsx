import { Modal, Form, Input, DatePicker, Button, message } from "antd";
import dayjs from "dayjs";

const AddGoalModal = ({ isModalOpen, handleCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const formattedValues = {
        ...values,
        targeted_date: dayjs(values.targeted_date).format("YYYY-MM-DD"),
      };

      const res = await onSubmit?.(formattedValues);

      if (res?.data?.status === 200) {
        form.resetFields();
        handleCancel();
      } else {
        message.error("Fail to create goal");
      }
    } catch (errorInfo) {
      console.log("Validation Failed:", errorInfo);
      message.error("Fail to validate goal");
    }
  };

  return (
    <Modal
      title="Add Goal"
      open={isModalOpen}
      onCancel={() => {
        form.resetFields();
        handleCancel();
      }}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Category is required" }]}
        >
          <Input placeholder="Category" />
        </Form.Item>

        <Form.Item
          name="targeted_date"
          label="Target Date"
          rules={[{ required: true, message: "Date is required" }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input.TextArea placeholder="Describe your goal..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddGoalModal;
