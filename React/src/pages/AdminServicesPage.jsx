import Services from "@components/ManageServices/Services.jsx";

const AdminServicesPage = () => {
    return (
        <div className="w-full">
            {/* <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-[#1A2233] mb-1">Quản Lý Dịch Vụ</h1>
                <p className="text-gray-500 text-base">Quản lý tất cả dịch vụ của cửa hàng</p>
            </div> */}
            <Services />
        </div>
    )
};

export default AdminServicesPage;