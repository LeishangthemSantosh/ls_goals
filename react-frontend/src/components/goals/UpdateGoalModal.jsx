import { Modal, Form, Input, DatePicker, Button, message, Select } from "antd";
import dayjs from "dayjs";
import { GoalStatus } from "../../constants/goalStatus";
import { useEffect } from "react";

const UpdateGoalModal = ({
  isModalOpen,
  onSubmit,
  initialValues,
  handleCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        title: initialValues.goal_title,
        category: initialValues.goal_category,
        description: initialValues.goal_description,
        status: initialValues.goal_status,
        targeted_date: dayjs(initialValues.targeted_date),
      });
    }
  }, [initialValues]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const formattedValues = {
        ...values,
        targeted_date: dayjs(values.targeted_date).format("YYYY-MM-DD"),
      };

      const res = await onSubmit?.(initialValues.goal_id, formattedValues);

      if (res?.data?.status === 200) {
        form.resetFields();
        handleCancel();
      } else {
        message.error("Fail to update goal");
      }
    } catch (errorInfo) {
      console.log("Validation Failed:", errorInfo);
      message.error("Fail to validate goal");
    }
  };

  return (
    <Modal
      title="Update Goal"
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
      <Form layout="vertical" form={form} onFinish={handleOk}>
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

        <Form.Item
          name="status"
          lable="Status"
          rules={[{ required: true, message: "Status is required" }]}
        >
          <Select>
            <Option value={GoalStatus.INITIATED}>{GoalStatus.INITIATED}</Option>
            <Option value={GoalStatus.IN_PROGRESS}>
              {GoalStatus.IN_PROGRESS}
            </Option>
            <Option value={GoalStatus.COMPLETED}>{GoalStatus.COMPLETED}</Option>
            <Option value={GoalStatus.HOLD}>{GoalStatus.HOLD}</Option>
            <Option value={GoalStatus.CANCELLED}>{GoalStatus.CANCELLED}</Option>
            <Option value={GoalStatus.ARCHIVED}>{GoalStatus.ARCHIVED}</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateGoalModal;
