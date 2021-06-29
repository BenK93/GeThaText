import React from "react";
import MaterialTable from "material-table";
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
};

const UserUploads = (props) => {
  return (
    <div>
      <MaterialTable
        title="Uploads"
        icons={Icons}
        columns={[
          { title: "Name", field: "name" },
          { title: "Team", field: "team" },
          { title: "Joined Date", field: "joinedAt" },
        ]}
        // data={[
        //     { name: this.props.personalInfo.name,
        //      team: this.props.personalInfo.team,
        //      joinedAt: this.props.personalInfo.joinedAt,
        //      avatar: this.props.personalInfo.avatar },
        // ]}
        options={{
          maxBodyHeight: 200,
          headerStyle: {
            backgroundColor: "#137d1c",
            fontWeight: 700,
            color: "#FFF",
          },
        }}
      />
    </div>
  );
};
export default UserUploads;
