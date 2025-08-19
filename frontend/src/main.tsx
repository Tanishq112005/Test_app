import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { Provider } from 'react-redux';
import { store } from './redux_state_manegemet/store.ts';
import Page_frame from './test_decider/page_frame.tsx';
import Loader from './Loader/loader.tsx';
import Timer_page from './Timer_page/timer_page.tsx';
import Test_page from './test_page/test_page.tsx';

import ConfirmationPage from './checking_loader.tsx/conframation_page.tsx';

import Login_Page from './auth/login.tsx';
import Dashboard from './dashboard/components/dashboard.tsx';
import SignUp from './auth/sign_up.tsx';
import SummaryPage from './summary/Summarypage.tsx';
import Landing_Page from './landing_page/landing_page.tsx';
import ForgotPassword from './auth/forgot_password.tsx';
import Verification from './auth/verifcation_password.tsx';
import ContactPage from './auth/contact.tsx';
import { Analytics } from "@vercel/analytics/next"



const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing_Page></Landing_Page>,
  },
  {
    path : "/test_decider" , 
    element : <Page_frame></Page_frame>
  } , 
  {
    path : "/loader",
    element : <Loader></Loader>
  } , 
  {
    path : "/loader_to_timer" , 
    element : <Timer_page></Timer_page>
  } , {
    path : "/test_page" , 
    element : <Test_page></Test_page>
  } , 
  {
    path : "/summary_page" , 
    element : <SummaryPage></SummaryPage>
    } , {
      path : "/confirmation_page" , 
      element : <ConfirmationPage></ConfirmationPage>
    }  ,
    {
      path : "/landing_page" , 
      element : <Landing_Page></Landing_Page>
    } ,
    {
      path : "/login" , 
      element : <Login_Page></Login_Page>
    } ,
     {
      path : "/dashboard" , 
      element : <Dashboard></Dashboard>
     } , 
     {
      path : "/signup" , 
      element : <SignUp></SignUp>
     } , 
     {
      path : "/forgot_password" , 
      element : <ForgotPassword></ForgotPassword>
     } , 
     {
      path : "/verification" , 
      element : <Verification></Verification>
     } , 
     {
      path : "/contact" , 
      element : <ContactPage></ContactPage>
     }
  ]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Analytics></Analytics>
    </Provider>
  </StrictMode>,
)
