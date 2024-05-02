import { apiGetUser, apiDeleteUser } from "../apis/user";
import { useEffect, useState } from "react";
import { Pagination, Space, Table } from "antd";
import moment from "moment";
import icons from "../utils/icons";
import { useNavigate } from "react-router-dom";
import path from "../utils/path";
import Swal from "sweetalert2";

const { FaPlus } = icons;

const Home = () => {
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();
  const [reset, setReset] = useState(false);
  useEffect(() => {
    fetchApiGetUser();
  }, [reset]);
  const fetchApiGetUser = async () => {
    const response = await apiGetUser();
    if (response.success) {
      setUsers(response);
    }
  };
  const dataSource = users?.data?.map((el) => ({
    key: el.ID,
    id: el.ID,
    type: el.TYPE,
    name: el.NAME,
    birth: moment(el.BIRTH).format("DD-MM-YYYY"),
    identifire: el.IDENTIFIER,
    address: el.ADDRESS,
    email: el.EMAIL,
    phone: el.PHONE,
  }));
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "right",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Birth",
      dataIndex: "birth",
      key: "birth",
    },
    {
      title: "Identifier",
      dataIndex: "identifire",
      key: "identifire",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      align: "right",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => handleButtonClick(record)}
            className="px-2 py-1 bg-orange-400 text-white"
          >
            Edit
          </a>
          <a
            onClick={() => handleDeleteUser(record)}
            className="px-2 py-1 bg-red-500 text-white"
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  const handleButtonClick = (record) => {
    // Xử lý dữ liệu khi nút trong hàng được click
    console.log(record);
    if (record) {
      navigate(`${path.UPDATE}/${record.id}`);
    }
  };

  const handleNewUser = () => {
    navigate("/create");
  };

  const handleDeleteUser = async (user) => {
    Swal.fire({
      title: "Do you want delete user?",
      showCancelButton: true,
      confirmButtonText: "OK",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(user.id);
        if (response.success) {
          Swal.fire("Delete Success!", "success");
          setReset((prev) => (prev = !prev));
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
          });
        }
      }
    });
  };

  return (
    <div className="mx-2">
      <div className="m-4 flex justify-end">
        <span
          onClick={() => handleNewUser()}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white cursor-pointer hover:bg-green-700 duration-500"
        >
          <span className="">
            <FaPlus />
          </span>
          <span className="flex text-center">New user</span>
        </span>
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
};

export default Home;
