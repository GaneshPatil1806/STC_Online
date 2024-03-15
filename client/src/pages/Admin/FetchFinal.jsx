import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import useUser from '../../context/UserContext'
import { appVars } from '../../conf/conf'
import { useNavigate } from 'react-router-dom'

const FetchFinal = () => {
  const [dataList, setDataList] = useState([])
  const { admin } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (admin) {
      axios.get(`${appVars.backendUrl}/api`,
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

  return (
    <>

      <div className="flex justify-between absolute w-full">
        <button className="bg-black text-white m-4 p-2 rounded-md relative" onClick={() => navigate('/admin/dashboard')}>
          DashBoard
        </button>
      </div>


      <div className='bg-[#71C9CE] h-screen'>
        {dataList.length === 0 ? <h1 className='text-xl text-center p-20'>There are no final documents available.</h1> :
          <div className='flex justify-center items-center mt-10'>
            <table className="border rounded-xl bg-[#e9ebf0]">
              <thead className=''>
                <tr className='bg-[#4076fe] text-gray-50'>
                  <th className="border-b border-r-2 border-gray-300 md:p-4 p-2 md:text-2xl text-xl">Group Id</th>
                  <th className="border-b border-r-2 border-gray-300 md:p-4 p-2 md:text-2xl text-xl">Download</th>
                </tr>
              </thead>
              <tbody>
                {dataList.map(({ id, roll_number }, index) => (
                  <tr key={id} className={`${index % 2 == 0 ? "bg-gray-100" : "bg-[#bed0fd]"}`}>
                    <td className="border-b border-r-2 border-gray-400  md:p-6 p-2 md:text-xl text-lg">{id}</td>
                    <td className="border-b border-r-2 border-gray-400  md:p-4 p-2 md:text-xl text-lg ">{roll_number}</td>
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