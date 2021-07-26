import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UploadsTable.scss";
import "../../Shared/Style/Colors.scss";
import MaterialTable from "material-table";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Image, Button, Typography, Modal, message } from "antd";
import {
  Pages,
  Search,
  ChevronLeft,
  ChevronRight,
  LastPage,
  FirstPage,
  ArrowDownward,
  ViewColumn,
  AddBox,
  Clear,
  FilterList,
} from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import { DeleteTwoTone, CopyTwoTone } from "@ant-design/icons";

const { Paragraph } = Typography;
const Icons = {
  Filter: () => <FilterList />,
  Search: () => <Search />,
  Page: () => <Pages />,
  NextPage: () => <ChevronRight />,
  PreviousPage: () => <ChevronLeft />,
  LastPage: () => <LastPage />,
  FirstPage: () => <FirstPage />,
  SortArrow: () => <ArrowDownward />,
  ViewColumn: () => <ViewColumn />,
  AddBox: () => <AddBox />,
  Clear: () => <Clear />,
  ResetSearch: () => <DeleteIcon />,
};

const UploadsTable = (props) => {
  const [visible, setVisible] = useState(false);
  const [uploads, setUploads] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [pk, setPk] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("username");
    axios
      .get(`http://localhost:8000/upload/?user=${user}`)
      .then((response) => {
        setUploads(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    return () => {};
  }, []);

  const handleOk = () => {
    setModalText("Deleting File... may take a few seconds");
    setConfirmLoading(true);
    let user = localStorage.getItem("email");
    console.log("🚀 ~ file: UploadsTable.js ~ line 64 ~ handleOk ~ user", user);
    axios
      .delete(`http://localhost:8000/upload/delete/?pk=${pk}&user=${user}`)
      .then((response) => {
        message.success(response.data.detail, 2.5);
        let filteredUploads = uploads.filter((upload) => upload.pk != pk);
        setUploads(filteredUploads);
      })
      .catch((error) => {
        message.error(error, 2.5);
      });
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    // closing modal
    setVisible(false);
  };

  const deleteImage = (event, rowData) => {
    let imageName = rowData.image.split("/").pop();
    setPk(rowData.pk);
    setModalText("Are you sure you want to delete " + imageName + " ?");
    setVisible(true);
  };

  const setDateAndTime = (dateTime) => {
    const dateAndTime = dateTime.split("T");
    let newDate = dateAndTime[0].split("-").reverse().join("/");
    let newTime = dateAndTime[1].split(".")[0];
    return newDate + "-" + newTime;
  };

  return (
    <div className="uploads-table-container">
      <MaterialTable
        title="Your Uploads"
        icons={Icons}
        columns={[
          {
            align: "center",
            title: "Name",
            field: "image",
            render: (rowData) => {
              if (rowData.image.split("%").length > 6) {
                return "Unknown Name";
              }
              let nameArray = rowData.image.split("/");
              return nameArray[3];
            },
          },
          {
            align: "center",
            title: "Image",
            field: "image",
            render: (rowData) => (
              <Image
                width={220}
                height={120}
                src={`http://localhost:8000${rowData.image}`}
              />
            ),
          },
          {
            align: "center",
            title: "Image Text",
            field: "img_content",
            render: (rowData) => (
              <>
                <Paragraph copyable={{ text: rowData.img_content }}>
                  <textarea value={rowData.img_content} rows={4} />
                </Paragraph>
              </>
            ),
          },

          {
            type: "datetime",
            align: "center",
            title: "Upload Date",
            field: "created_datetime",
            render: (rowData) => {
              return setDateAndTime(rowData.created_datetime);
            },
          },
        ]}
        actions={[
          {
            tooltip: "Delete Image",
            onDelete: (event, rowData) => deleteImage(event, rowData),
          },
        ]}
        components={{
          Action: (props) => (
            <>
              <DeleteTwoTone
                title="Delete File"
                style={{ fontSize: "25px" }}
                onClick={(event) => props.action.onDelete(event, props.data)}
              />
            </>
          ),
        }}
        data={uploads}
        totalCount={10}
        options={{
          maxBodyHeight: 600,
          headerStyle: {
            textAlign: "center",
            backgroundColor: "rgb(14 78 146)",
            fontWeight: 700,
            color: "white",
          },
        }}
      />
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
