import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import useUser from '../../context/UserContext'
import { appVars } from '../../conf/conf'
import { useNavigate } from 'react-router-dom'
import toast,{Toaster} from 'react-hot-toast'

const FetchFinal = () => {
  const [dataList, setDataList] = useState([])
  const { admin } = useUser();
  const navigate = useNavigate();

  const downloadDoc = (link) => {
    if (link === undefined || link === null) {
      toast.error('Invalid link:', link);
      return;
    }

    let link_clean = link.slice(2, -2);
    window.open(link_clean);
  };


  useEffect(() => {
    if (admin) {
      axios.get(`${appVars.backendUrl}/api/adminDashboard/getAbstract`,
        {
          headers: {
            Authorization: `Bearer ${admin.token}`
          }
        }
      )
        .then((res) => {
          setDataList(res.data.data);
          // console.log(DomainList)
        })
        .catch((e) => {
          console.log(e);
        })
    }
  }, [admin, dataList])

  //console.log(dataList);
  return (
    <>

      <div className="flex justify-between fixed w-full">
        <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard')}>
          DashBoard
        </button>
      </div>

      <Toaster/>

      <div className='bg-[#71C9CE] h-screen'>
        {dataList.length === 0 ? <h1 className='text-xl text-center p-20'>There are no final documents available.</h1> :
          <div className='flex justify-center items-center p-20'>
            <table className="border rounded-xl bg-[#e9ebf0]">
              <thead className=''>
                <tr className='bg-[#A6E3E9]'>
                  <th className="border border-black px-4 py-2 text-xl">Sr.</th>
                  <th className="border border-black px-4 py-2 text-xl">Group Id</th>
                  <th className="border border-black px-4 py-2 text-xl">Download</th>
                </tr>
              </thead>
              <tbody>
                {dataList.map(({ id,fk_group, data }, index) => (
                  <tr key={id} className={ index%2==0 ? `bg-[#CBF1F5]`: `bg-[#A6E3E9]`}>
                    <td className="border border-black  px-4 py-2 text-md">{index+1}</td>
                    <td className="border border-black  px-4 py-2 text-md">GRP {fk_group}</td>
                    <td className="border border-black  px-4 py-2 text-md cursor-pointer underline" onClick={()=>downloadDoc(data)}><p className='text-blue-800'>Download</p></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div >
    </>
  )
}

export default FetchFinal