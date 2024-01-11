import { Alert, Modal } from 'antd';

const ModalComponents = ({
  title,
  isModalOpen,
  setIsModalOpen,
  handleOkClick,
  confirmLoading,
  error,
  children,
}) => {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOkClick}
      onCancel={setIsModalOpen}
      confirmLoading={confirmLoading}
      closable={false}
      okText="Submit"
      okButtonProps={{
        style: { backgroundColor: '#FD9340' },
      }}
    >
      <div className="mt-5">
        {error && (
          <div className="my-4">
            <Alert message={error} type="error" closable />
          </div>
        )}

        {children}
      </div>
    </Modal>
  );
};

export default ModalComponents;
