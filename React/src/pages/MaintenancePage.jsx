import { Link } from "react-router-dom";

const MaintenancePage = () => (
    <>
        <section className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                <div className="w-full flex-col justify-center items-center lg:gap-14 gap-10 inline-flex">

                    <div className="w-full flex-col justify-center items-center gap-5 flex">
                        <div className="w-full flex-col justify-center items-center gap-6 flex">
                            <div className="w-full flex-col justify-start items-center gap-2.5 flex">
                                <p className="text-center text-gray-800 text-3xl font-bold font-manrope leading-normal">
                                    Vui lòng kiên nhẫn với chúng tôi!
                                    <br />
                                    Chúng tôi hiện đang trong quá trình bảo trì.
                                </p>

                            </div>
                        </div>
                        <img
                            src="https://pagedone.io/asset/uploads/1718004199.png"
                            alt="under maintenance image"
                            className="object-cover"
                        />
                        <p className="text-center text-gray-500 text-base font-normal leading-relaxed">
                            Việc sửa lỗi sẽ mất một chút thời gian. Chúng tôi sẽ trở sớm hoạt động trở lại.
                        </p>
                        <Link
                            className="bg-primary-500 text-white px-3 py-2 rounded"
                            to="/"
                        >
                            Quay lại trang chủ
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        {/*Custom Script*/}
    </>

);

export default MaintenancePage;