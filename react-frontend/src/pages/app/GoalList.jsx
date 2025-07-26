import { Space, Flex, Button, Table, Tag, message } from "antd";
import { useState, useEffect } from "react";
import {
  EditOutlined,
  LinkOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import AddGoalModal from "../../components/goals/AddGoalModal";
import { createGoal, getGoals, updateGoal } from "../../api/goal.api";
import UpdateGoalModal from "../../components/goals/UpdateGoalModal";

const { Column } = Table;

const GoalList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [goal, setGoal] = useState({});

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const res = await getGoals();
      setGoals(res.data.data || []);
    } catch (err) {
      message.error("Failed to fetch goals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showUpdateModal = (goals) => {
    setGoal(goals);
    setIsUpdateModalOpen(true);
  };

  const handleAddGoal = async (data) => {
    try {
      const res = await createGoal(data);

      if (res.data.status === 200) {
        message.success(res.data.message);
        fetchGoals(); // refresh list
      }

      return res;
    } catch (err) {
      console.log("Error on create goal", err);
      message.error("Fail to create goal");
    }
  };

  const handleUpdateGoal = async (id, data) => {
    try {
      const res = await updateGoal(id, data);
      if (res.data.status === 200) {
        message.success(res.data.message);
        fetchGoals(); // refresh list
      }
      return res;
    } catch (err) {
      console.log("Error on update goal", err);
      message.error("Fail to update goal");
    }
  };

  return (
    <Flex gap="middle" vertical>
      <Flex align="center" justify="space-between" gap="middle">
        <Flex>
          <Button type="primary" onClick={fetchGoals} loading={loading}>
            Reload
          </Button>
        </Flex>
        <Flex>
          <Button type="primary" onClick={showModal}>
            Add Goal
          </Button>
        </Flex>
      </Flex>

      <Table
        dataSource={goals.map((goal) => ({ ...goal, key: goal.goal_id }))}
        loading={loading}
      >
        <Column title="Title" dataIndex="goal_title" key="goal_title" />
        <Column
          title="Category"
          dataIndex="goal_category"
          key="goal_category"
        />
        <Column
          title="Status"
          dataIndex="goal_status"
          key="goal_status"
          render={(status) => (
            <Tag color={status === "INITIATED" ? "blue" : "green"}>
              {status}
            </Tag>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button
                size="small"
                type="primary"
                onClick={() => showUpdateModal(record)}
              >
                <EditOutlined />
              </Button>
              <Button size="small" type="primary">
                <LinkOutlined />
              </Button>
            </Space>
          )}
        />
      </Table>
      <AddGoalModal
        isModalOpen={isModalOpen}
        handleCancel={() => setIsModalOpen(false)}
        onSubmit={handleAddGoal}
      />
      <UpdateGoalModal
        isModalOpen={isUpdateModalOpen}
        onSubmit={handleUpdateGoal}
        initialValues={goal}
        handleCancel={() => setIsUpdateModalOpen(false)}
      />
    </Flex>
  );
};

export default GoalList;
