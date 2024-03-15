import { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import useUser from '../../context/UserContext';
import { appVars } from '../../conf/conf';
import Loading from '../../common/Loading';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

const AddNotice = () => {
    const [Title, setTitle] = useState('');
    const [Post, setPost] = useState('');
    const [loading, setLoading] = useState(false);
    const [notice, setNotice] = useState([]);
    const { admin } = useUser();
    const navigate = useNavigate();

    const formData = {};

    function handleDelete(id) {
        if (window.confirm("Are you sure you want to delete this notice?")) {
          axios.delete(`${appVars.backendUrl}/api/adminDashboard/deleteBroadcast/${id}`, {
            headers: {
              Authorization: `Bearer ${admin.token}`
            }
          }).then((res) => {
            toast.success(res.data.message)
          }).catch((e) => {
            toast.error(e.response.data.message || 'Error Deleting Teacher');
          })
        }
      }

    const PostNotice = () => {

        console.log('object hi');
        setLoading(true);
        formData['title'] = Title;
        formData['message'] = Post;

        axios.post(`${appVars.backendUrl}/api/adminDashboard/createBroadcast`, formData,
            {
                headers: {
                    Authorization: `Bearer ${admin.token}`
                }
            }
        )
            .then((res) => {
                console.log(res);
                setLoading(false);
                toast.success('Notice Sent Successfully!');
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
                toast.error(err.response.data.message);
            });
    };

    useEffect(() => {
        let url = `${appVars.backendUrl}/api/adminDashboard/getBroadcasts`;
        // setLoading(true);
        if (admin) {
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${admin?.token}`,
                },
            })
                .then((res) => {
                    setNotice(res.data.data);
                    // console.log(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                })
        }
    }, [admin, notice]);

    //console.log(notice);
    return (

        <>
        
        <div className="flex justify-between absolute w-full">
            <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard')}>
                DashBoard
            </button>
        </div>

            <div className='bg-[#71C9CE] h-screen flex'>
                <div className='w-[60%] p-10 border-r-2 border-black'>
                    <h1 className='text-center text-2xl my-7 font-semibold'>Create Notice </h1>
                    <input
                        className='bg-[#E3FDFD] block rounded-full w-full py-2 px-4 text-md border-x shadow-md'
                        type='text'
                        placeholder='Title Of Notice........'
                        value={Title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className='bg-[#E3FDFD] rounded-lg w-full py-4 px-4 text-md mt-2 h-[50%]'
                        type='text'
                        placeholder='Enter your Post.....'
                        rows={20}
                        value={Post}
                        onChange={(e) => setPost(e.target.value)}
                    />
                    {loading && <Loading />}
                    <button onClick={PostNotice} className='bg-[#01081c] text-white py-2 text-md px-4 rounded-xl mt-2'>SUBMIT</button>
                    <Toaster />
                </div>
                <div className='w-[40%] flex justify-center'>
                    <h1 className='h-[20%] fixed text-center text-2xl my-7 font-semibold ml-4'>Previous Notices</h1>
                    <div className='h-[80%] mt-20 top-0 left-0 right-0 whitespace-pre-line' style={{ overflowWrap: 'break-word',overflow:'auto' }}>
                        {notice.length > 0 ?
                            notice.map((msg) => (
                                <div key={msg.id} className='m-2 p-2 bg-[#E3FDFD] rounded-lg'>
                                    <p className='flex font-bold justify-between'>{msg.title} <MdDelete className="rounded-md cursor-pointer text-xl" onClick={() => handleDelete(msg.id)} /></p>

                                    <p>{msg.message}</p>
                                    {/* <p>{msg.created_at.toString()}</p> */}
                                </div>
                            ))
                            :
                            <p className='text-center'>No new notices!</p>
                        }
                    </div>
                </div>
            </div></>
    );
};

export default AddNotice;