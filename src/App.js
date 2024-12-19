import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'

import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditNote from './features/notes/EditNote'
import NewNote from './features/notes/NewNote'
import Prefetch from './features/auth/Prefetch'
import NewImage from './features/itemPictures/NewImage';
import ImageList from './features/itemPictures/ImageList';
import EditImage from './features/itemPictures/EditImage';

import PersistLogin from './features/auth/PersistLogin'

import useTitle from './hooks/useTitle';

import CheckConnection from './hooks/CheckConnection'
import ReservationList from './features/reservations/ReservationList'
import EditReservation from './features/reservations/EditReservation'
import NewReservation from './features/reservations/NewReservation'

import OrderList from './features/orders/OrderList'
import EditOrder from './features/orders/EditOrder'
// import NewOrder from './features/orders/NewOrder'
import Notification from './features/notifications/Notification'
import NewOrder from './features/orders/NewOrder'



function App() {
  useTitle('Megenagna Mart & Cafe')
  return (
    <CheckConnection>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Public />} /> */}
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />

          <Route element={<PersistLogin />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />
                <Route path="users">
                  <Route index element={<UsersList />} />
                  <Route path=":id" element={<EditUser />} />
                  <Route path="new" element={<NewUserForm />} />
                </Route>
                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>

                <Route path="reservation">
                  <Route index element={<ReservationList />} />
                  <Route path=":id" element={<EditReservation />} />
                  <Route path="new" element={<NewReservation />} />
                </Route>

                <Route path="orders">
                  <Route index element={<OrderList />} />
                  <Route path=":id" element={<EditOrder />} />
                  <Route path="new" element={<NewOrder />} />
                </Route>
                <Route path="notifications">
                  <Route index element={<Notification />} />
                  {/* <Route path=":id" element={<EditNotification />} />
                  <Route path="new" element={<NewNotification />} /> */}
                </Route>
                <Route path="ItemImage">
                  <Route index element={<ImageList />} />
                  <Route path=":id" element={<ImageList />} />
                  <Route path="new" element={<NewImage />} />
                </Route>

              </Route>{/* End Dash */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </CheckConnection>
  );
}

export default App;
