import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UploadsTable.scss";
import "../../Shared/Style/Colors.scss";
import { Image, Table, Typography, Modal, message } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
const { Paragraph } = Typography;

const UploadsTable = (props) => {
  const [visible, setVisible] = useState(false);
  const [uploads, setUploads] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");
  const [pk, setPk] = useState("");
  const columns = [
    {
      title: "Image",
      align: "center",
      dataIndex: "image",
      key: "image",
      render: (text) => {
        if (text.split("%").length > 6) {
          return "Unknown Name";
        }
        let nameArray = text.split("/");
        return nameArray[3];
      },
    },
    {
      title: "Name",
      align: "center",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <Image width={220} height={120} src={`http://localhost:8000${text}`} />
      ),
    },

    {
      title: "Content",
      align: "center",
      dataIndex: "img_content",
      key: "img_content",
      render: (text) => (
        <Paragraph copyable={{ text: text }}>
          <textarea value={text} rows={5} />
        </Paragraph>
      ),
    },
    {
      title: "Upload Date",
      align: "center",
      dataIndex: "created_datetime",
      key: "created_datetime",
      render: (text) => {
        const dateAndTime = text.split("T");
        let newDate = dateAndTime[0].split("-").reverse().join("/");
        let newTime = dateAndTime[1].split(".")[0];
        return newDate + "-" + newTime;
      },
    },
    {
      title: "Delete",
      key: "action",
      align: "center",
      render: (text, record) => (
        <DeleteTwoTone
          title="Delete File"
          style={{ fontSize: "25px" }}
          onClick={(event) => deleteImage(event, record)}
        />
      ),
    },
  ];

  useEffect(() => {
    const user = localStorage.getItem("username");
    axios
      .get(`http://localhost:8000/upload/?user=${user}`)
      .then((response) => {
        setUploads(response.data);
      })
      .catch((e) => {
        message.error(e);
      });
    return () => {};
  }, []);

  const deleteImage = (event, rowData) => {
    let imageName = rowData.image.split("/").pop();
    setPk(rowData.pk);
    setModalText("Are you sure you want to delete " + imageName + " ?");
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("Deleting File... may take a few seconds");
    setConfirmLoading(true);
    let user = localStorage.getItem("email");
    axios
      .delete(`http://localhost:8000/upload/delete/?pk=${pk}&user=${user}`)
      .then((response) => {
        message.success(response.data.detail, 2.5);
        let filteredUploads = uploads.filter((upload) => upload.pk !== pk);
        setUploads(filteredUploads);
      })
      .catch((error) => {
        message.error(error, 2.5);
      });
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className="uploads-table-container">
      <Table columns={columns} dataSource={uploads} sticky showSorterTooltip />
      <Modal
        title="Deleting Image"
        okText="Delete"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
};
export default UploadsTable;
