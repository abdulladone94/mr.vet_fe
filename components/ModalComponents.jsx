/*
 * File: ModaComponent.jsx
 * Project: Sharing Sugar
 * Author: Ginthozan Varnakulasingam (ginthozanv@booleanlanbs.biz)
 * File Created: 18 April 2023
 * Copyright 2023 - 2023 Booleanlabs.
 */

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
