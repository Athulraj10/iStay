import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { USERSAPI } from '../../AxiosAPI/AxiosInstance';

// import io from 'socket.io-client'

const ENDPOINT = 'https://medicarez.online';
var socket,selectedChatCompare;

const SellerChat = () => {
    const  sellerInfo  = JSON.parse(localStorage.getItem('sellerInfo'))
    
    const [rooms, setRooms] = useState([]);
    const [chatId, setChatId] = useState('');
    const [chats,setChats] = useState([]);
    const [patient,setPatient] = useState('');
    const [content,setContent] = useState('');
    const [messageSent,setMessageSent] = useState(false)
    const [socketConnected,setSocketConnected] = useState(false)

    // useEffect(()=>{
    //     socket = io(ENDPOINT);
    //     socket.emit("setup",sellerInfo)
    //     socket.on('connection',()=>setSocketConnected(true))
    // },[])

    const sendHandler = async()=>{
        if(content===''){
            toast.error("Message cannot be empty")
            return
        }
        try {
            let res = await USERSAPI.post(`/chats/sendchat/${chatId}/${sellerInfo._id}/Seller`,{content})
            if(res){
                setContent('')
                setMessageSent(true)
                // socket.emit('new message',res.data)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        let fetchMessages = async () => {
            console.log("46")
            let res = await USERSAPI.get(`/chats/get-room-messages/${chatId}`);
            if (res) {
                console.log(res.data);
                setChats(res.data)
                setMessageSent(false)
                // socket.emit("join chat",chatId)
            }
        };
        if(chatId){
            fetchMessages();
        }
        // selectedChatCompare = chats;
    }, [chatId,messageSent]);

    // useEffect(() => {
    //     socket.on('message received',(newMessageReceived)=>{
    //         if(!selectedChatCompare || chatId!==newMessageReceived.room._id){

    //         }else{
    //             setChats([...chats,newMessageReceived])
    //         }
    //     })
    // })

    
    useEffect(() => {
        console.log("74")
        if (sellerInfo._id) {
            let fetchRooms = async () => {
                let res = await USERSAPI.get(`/chats/get-seller-rooms/${sellerInfo._id}`);
                setRooms(res.data);
            };
            fetchRooms();
        }
    },[]);

  return (
    <section style={{height:'100vh'}} className="container h-screen flex-col h-5/6">
        <div className='flex h-4/5 w-full border-r-2 rounded-lg' style={{background:"#141d39",outline:'1px solid gray'}}>
            <div className='w-1/2 p-5 overflow-y-auto' style={{background:"#141d39" ,outline:'1px solid gray'}}>
                {
                    rooms.length > 0 ?(
                        rooms.map((chat,index)=>(
                            <div key={index} onClick={()=>{setChatId(chat._id);setPatient(chat.user.name)}} className='flex justify-between my-2 items-center bg-blue-600 p-3 rounded-lg' style={{background:"#141d39" ,outline:'1px solid gray'}}>
                                <h3 className='font-bold text-white'>{chat.user.name}</h3>
                            </div>
                        ))
                    ):(
                        <div className='flex h-full justify-center items-center'>
                            <p className='text-blue-600 font-bold'>No Chats</p>
                        </div>
                    )
                }
            </div>
            <div className='w-1/2 h-full border-l-2 p-3'>
                {
                    chatId ? (  
                        <div className='h-full'>
                            <div  style={{background:"#141d39" ,outline:'1px solid gray'}} className=' w-full p-4 my-3 rounded-lg'><h3 className='font-medium text-white'>{patient}</h3></div>
                            <div style={{background:"#141d39" ,outline:'1px solid gray',color:'red'}} className='h-4/6 w-full overflow-y-auto p-5 rounded-3'>
                                {chats && chats.length > 0 ? (
                                    chats.map((chat, index) => (
                                        chat.senderType == 'Seller' ? (
                                            <div key={index} className='w-full flex my-2 justify-end'>
                                                <div style={{background:"#112A46"}} className='max-w-1/2 w-fit text-white p-3 rounded-tl-lg rounded-tr-lg rounded-bl-lg'>
                                                    {chat.content}
                                                </div>
                                            </div>
                                        ) : (
                                            <div key={index} className='w-50 my-2'>
                                                <div style={{background:"#253a59",color:"white"}} className='max-w-1/2 w-fit p-3 rounded-tl-lg rounded-tr-lg rounded-br-lg'>
                                                    {chat.content}
                                                </div>
                                            </div>
                                        )
                                    ))
                                ) : (
                                    <div className='w-full h-full flex items-center justify-center'>
                                        No Chats
                                    </div>
                                )}
                            </div>
                            <div className='flex my-3'>
                          

                            <div className='w-10/12'>
    <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className='h-full w-full p-3 rounded-lg'
        type="text"
        style={{ backgroundColor: 'black' }}
        placeholder="Enter your text"
    />
</div>






                                <div className='w-2/12'>
                                    <button type="button" onClick={sendHandler} className="h-full w-full text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-800">Send</button>
                                </div>
                            </div>
                        </div>                      
                    ):null
                }
            </div>
        </div>
    </section>
  )
}

export default SellerChat