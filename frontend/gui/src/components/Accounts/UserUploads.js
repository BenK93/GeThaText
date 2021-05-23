import React from 'react';
import MaterialTable from 'material-table';

const UserUploads = (props) => {
    return (
        <div>
            <MaterialTable
                title="Uploads"
                // icons ={this.props.Icons}
                columns={[
                    { title: 'Name', field: 'name', },
                    { title: 'Team', field: 'team' },
                    { title: 'Joined Date', field: 'joinedAt' },
                ]}
                // data={[
                //     { name: this.props.personalInfo.name,
                //      team: this.props.personalInfo.team,
                //      joinedAt: this.props.personalInfo.joinedAt,
                //      avatar: this.props.personalInfo.avatar },                     
                // ]}
                options={{
                    maxBodyHeight:200, 
                    headerStyle: {
                        backgroundColor: '#137d1c',
                        fontWeight: 700, 
                        color: '#FFF'
                      }
                }}
                 /> 
        </div>
    )
}
export default UserUploads;