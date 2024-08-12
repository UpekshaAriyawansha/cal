import { React, useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteAColor, getColors, resetState } from "../features/color/colorSlice";
import { Table } from 'antd';
import CustomModel from "../components/customModal";

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  

const Colorlist = () => {

  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };
  // console.log(colorId);

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(resetState());
    dispatch(getColors());
  }, []);

  const colorState = useSelector ((state)=> state.colors.colors);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i+1,
      name: colorState[i].title,
      action: 
      <>
        <Link 
          className="fs-5 text-danger"
          to={`/admin/color/${colorState[i]._id}`}>
          <FaEdit />
        </Link>

        <button 
          className="ms-3 fs-5 text-danger bg-transparent border-0"
          onClick={()=> showModal(colorState[i]._id)}
        >
          <MdDelete />
        </button>
        </>
    });
  }

  // const deleteColor = (e) =>{
  //   console.log(e);
  //   dispatch(deleteAColor(e));
  //   setOpen(false);
  //   setTimeout(() => {
  //     dispatch(getColors());
  //   }, 100);
  // }

  const deleteColor = (e) => {
    dispatch(deleteAColor(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };
    return(
        <>
           <div>
                <h3 className="mb-4 title">
                    Color List
                </h3>
                <div>
                    <Table 
                        columns={columns} 
                        dataSource={data1} 
                    />
                </div>

                <CustomModel 
                  title="Are you sure you want to delete this color?"
                  open = {open}
                  hideModal = {hideModal}
                  performAction = {()=> {deleteColor(colorId)}}
                />
           </div>

        </>
    )
};

export default Colorlist;