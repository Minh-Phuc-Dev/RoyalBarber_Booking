import Users from "@components/ManageUsers/Users.jsx";
import React from 'react';

const AdminUsersPage = () => {
    
    return (
        <div className="w-full space-y-6">
            
            {/* <div className="">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Quản Lý Tài Khoản Người Dùng</h1>
                <p className="text-gray-500">Quản lý tất cả tài khoản người dùng trong hệ thống</p>
            </div> */}
            
            <Users/>
        
        </div>
    );
};

export default AdminUsersPage;