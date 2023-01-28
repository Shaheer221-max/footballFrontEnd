import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux';
import Header from './Header'

export default function Notifications() {
    const [notifications, setNotifications] = React.useState([]);
    const [orderNotifications, setOrderNotifications] = React.useState([]);
    const {user} = useSelector((state) => state);
    const [loading, setLoading] = React.useState(false);
    console.log(user)
    // Get All Notifications

    const getData = async () => {
        const response = await axios.get('https://football-backend-updated.herokuapp.com/notification/getNotification', {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        const res1 = await axios.get('https://football-backend-updated.herokuapp.com/AdminOrderNotification/getNotification', {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        console.log(res1.data.data)
        setOrderNotifications(res1.data.data)
        setNotifications(response.data)
    }


    React.useEffect(() => {
        // Get All Notifications
        getData();
    }, [])
  return (
    <div className='flex-col w-full'>
        <Header title={"Notifications"} />
    </div>
  )
}
